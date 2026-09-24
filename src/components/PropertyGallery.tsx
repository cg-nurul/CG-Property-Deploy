import React, { useState, useEffect, useRef } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon 
} from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ property }) => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Check whether property has images tagged with 'interior' or 'amenities' or 'exterior' or is NUE District R9
  const isNueDistrict = property.slug === 'residence-01' || property.name.toLowerCase().includes('nue district');
  const rawGallery = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [{ url: property.coverImage, caption: { en: property.name, zh: property.name, th: property.name }, category: 'living' as const, tag: 'interior' as const }];

  const hasTagFilter = isNueDistrict || rawGallery.some((img) => img.tag === 'interior' || img.tag === 'amenities' || img.tag === 'exterior');
  const [selectedTag, setSelectedTag] = useState<'exterior' | 'interior' | 'amenities'>('exterior');

  const interiorCount = rawGallery.filter((img) => img.tag === 'interior' || (!img.tag && !hasTagFilter)).length;
  const amenitiesCount = rawGallery.filter((img) => img.tag === 'amenities').length;
  const exteriorCount = rawGallery.filter((img) => img.tag === 'exterior').length;

  const displayedImages = hasTagFilter
    ? rawGallery.filter((img) => {
        if (selectedTag === 'interior') {
          return img.tag === 'interior' || (!img.tag && !hasTagFilter);
        }
        if (selectedTag === 'amenities') {
          return img.tag === 'amenities';
        }
        if (selectedTag === 'exterior') {
          return img.tag === 'exterior';
        }
        return true;
      })
    : rawGallery;

  const displayedImagesRef = useRef(displayedImages);
  displayedImagesRef.current = displayedImages;

  const viewerRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const lightboxThumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const lightboxThumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentImage = displayedImages[activeIndex] || displayedImages[0] || null;

  const handleSelectTag = (tag: 'interior' | 'amenities' | 'exterior') => {
    if (tag === selectedTag) return;
    setSelectedTag(tag);
    setActiveIndex(0);
    activeIndexRef.current = 0;
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const len = displayedImagesRef.current.length;
    if (len === 0) return;
    setActiveIndex((prev) => {
      const next = Math.max(0, prev - 1);
      activeIndexRef.current = next;
      return next;
    });
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const len = displayedImagesRef.current.length;
    if (len === 0) return;
    setActiveIndex((prev) => {
      const next = Math.min(len - 1, prev + 1);
      activeIndexRef.current = next;
      return next;
    });
  };

  // Reset thumbnail scroll when tag changes
  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      thumbnailsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    if (lightboxThumbnailsContainerRef.current) {
      lightboxThumbnailsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedTag]);

  // Auto-scroll the thumbnail card strip so the active thumbnail stays visible/centered
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[activeIndex];
    if (activeThumb && thumbnailsContainerRef.current) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  // Auto-scroll the fullscreen lightbox thumbnail strip so active thumbnail stays visible/centered
  useEffect(() => {
    if (!lightboxOpen) return;
    const activeThumb = lightboxThumbnailRefs.current[activeIndex];
    if (activeThumb && lightboxThumbnailsContainerRef.current) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex, lightboxOpen]);

  const scrollLightboxThumbnails = (dir: 'left' | 'right') => {
    if (lightboxThumbnailsContainerRef.current) {
      const amount = dir === 'left' ? -220 : 220;
      lightboxThumbnailsContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Scroll trap strictly on image view section:
  // - While between first and last photo: scrolling switches photos and PREVENTS the page from scrolling up or down.
  // - When the last image is reached: scrolling down DOES NOT prevent default, allowing the page to scroll down.
  // - When the first image is reached: scrolling up DOES NOT prevent default, allowing the page to scroll up.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    let lastWheelTime = 0;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      const len = displayedImages.length;
      if (len <= 1) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return;

      const current = activeIndexRef.current;
      const max = len - 1;

      // User is wheeling DOWN (forward through photos)
      if (delta > 0) {
        if (current < max) {
          // Not at the end yet: trap scroll in viewer and step to next photo
          e.preventDefault();
          e.stopPropagation();

          const now = performance.now();
          accumulatedDelta += delta;

          if (now - lastWheelTime > 220 || accumulatedDelta > 45) {
            lastWheelTime = now;
            accumulatedDelta = 0;
            setActiveIndex((prev) => {
              const next = Math.min(max, prev + 1);
              activeIndexRef.current = next;
              return next;
            });
          }
        } else {
          // Last image reached! Allow normal page scroll down (do NOT preventDefault)
        }
      } else if (delta < 0) {
        // User is wheeling UP (backward through photos)
        if (current > 0) {
          // Not at the start yet: trap scroll in viewer and step to prev photo
          e.preventDefault();
          e.stopPropagation();

          const now = performance.now();
          accumulatedDelta += delta;

          if (now - lastWheelTime > 220 || accumulatedDelta < -45) {
            lastWheelTime = now;
            accumulatedDelta = 0;
            setActiveIndex((prev) => {
              const next = Math.max(0, prev - 1);
              activeIndexRef.current = next;
              return next;
            });
          }
        } else {
          // First image reached! Allow normal page scroll up (do NOT preventDefault)
        }
      }
    };

    viewer.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      viewer.removeEventListener('wheel', handleWheel);
    };
  }, [displayedImages.length]);

  // Touch Swipe on mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      touchDeltaXRef.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartXRef.current - currentX;
    const diffY = touchStartYRef.current - currentY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      const current = activeIndexRef.current;
      const max = displayedImages.length - 1;

      if (diffX > 0 && current < max) {
        e.preventDefault();
        e.stopPropagation();
      } else if (diffX < 0 && current > 0) {
        e.preventDefault();
        e.stopPropagation();
      }
      touchDeltaXRef.current = diffX;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const threshold = 35;
    const max = displayedImages.length - 1;
    if (touchDeltaXRef.current > threshold && activeIndexRef.current < max) {
      setActiveIndex((prev) => prev + 1);
    } else if (touchDeltaXRef.current < -threshold && activeIndexRef.current > 0) {
      setActiveIndex((prev) => prev - 1);
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
  };

    // Touch Swipe for Lightbox Stage on mobile
  const lbTouchStartXRef = useRef<number | null>(null);
  const lbTouchStartYRef = useRef<number | null>(null);
  const lbTouchDeltaXRef = useRef(0);

  const handleLbTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      lbTouchStartXRef.current = e.touches[0].clientX;
      lbTouchStartYRef.current = e.touches[0].clientY;
      lbTouchDeltaXRef.current = 0;
    }
  };

  const handleLbTouchMove = (e: React.TouchEvent) => {
    if (lbTouchStartXRef.current === null || lbTouchStartYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = lbTouchStartXRef.current - currentX;
    const diffY = lbTouchStartYRef.current - currentY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      const current = activeIndexRef.current;
      const max = displayedImagesRef.current.length - 1;

      if (diffX > 0 && current < max) {
        e.preventDefault();
        e.stopPropagation();
      } else if (diffX < 0 && current > 0) {
        e.preventDefault();
        e.stopPropagation();
      }
      lbTouchDeltaXRef.current = diffX;
    }
  };

  const handleLbTouchEnd = () => {
    if (lbTouchStartXRef.current === null) return;
    const threshold = 35;
    const max = displayedImagesRef.current.length - 1;
    if (lbTouchDeltaXRef.current > threshold && activeIndexRef.current < max) {
      handleNext();
    } else if (lbTouchDeltaXRef.current < -threshold && activeIndexRef.current > 0) {
      handlePrev();
    }
    lbTouchStartXRef.current = null;
    lbTouchStartYRef.current = null;
    lbTouchDeltaXRef.current = 0;
  };

  // Keyboard navigation and scroll locking when Lightbox is in full screen mode
  useEffect(() => {
    if (!lightboxOpen) return;

    // Save previous overflow & padding styles to restore when closing
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar removal to prevent layout jump
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Lock page scroll in fullscreen mode
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    // Wheel navigation & scroll lock
    let lastWheelTime = 0;
    let accumulatedDelta = 0;
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      // If wheeling over the lightbox thumbnail container, horizontally scroll the thumbnails!
      const thumbStrip = target?.closest('.lightbox-thumbnails-container') as HTMLElement | null;
      if (thumbStrip) {
        e.preventDefault();
        e.stopPropagation();
        const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        thumbStrip.scrollBy({ left: delta * 1.5, behavior: 'auto' });
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const len = displayedImagesRef.current.length;
      if (len <= 1) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return;

      const now = performance.now();
      accumulatedDelta += delta;

      if (now - lastWheelTime > 220 || Math.abs(accumulatedDelta) > 40) {
        lastWheelTime = now;
        accumulatedDelta = 0;
        const current = activeIndexRef.current;
        const max = len - 1;

        if (delta > 0) {
          if (current < max) {
            setActiveIndex((prev) => {
              const next = Math.min(max, prev + 1);
              activeIndexRef.current = next;
              return next;
            });
          }
        } else if (delta < 0) {
          if (current > 0) {
            setActiveIndex((prev) => {
              const next = Math.max(0, prev - 1);
              activeIndexRef.current = next;
              return next;
            });
          }
        }
      }
    };

    // Prevent background touch scrolling on mobile
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.overflow-x-auto, .overflow-y-auto')) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lightboxOpen]);

  const scrollThumbnails = (dir: 'left' | 'right') => {
    if (thumbnailsContainerRef.current) {
      const amount = dir === 'left' ? -220 : 220;
      thumbnailsContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div id="property-gallery-component" className="space-y-3 sm:space-y-4 select-none">
      
      {/* Clean Minimal Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ImageIcon className="w-4 h-4 text-[#9D7C38]" />
          <h3 className="text-xl font-bold text-[#042F61]">
            {t('property.gallery')}
          </h3>
          <span className="text-xs bg-[#EDE8E1] text-[#042F61] px-2.5 py-0.5 rounded-full font-semibold">
            {displayedImages.length} {language === 'zh' ? '张照片' : language === 'th' ? 'รูปภาพ' : 'Photos'}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Toggle Option for [Interior], [Amenities], and [Exterior] */}
          {hasTagFilter && (
            <div 
              role="tablist"
              aria-label="Gallery category filter"
              className="inline-flex p-1 bg-[#EDE8E1] rounded-full border border-[#E6E0D8] shadow-2xs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedTag === 'exterior'}
                onClick={() => handleSelectTag('exterior')}
                className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  selectedTag === 'exterior'
                    ? 'bg-[#042F61] text-[#DFB85A] shadow-xs'
                    : 'text-[#5E574E] hover:text-[#042F61]'
                }`}
              >
                <span>{language === 'zh' ? '建筑外观' : language === 'th' ? 'ภายนอกอาคาร' : 'Exterior'}</span>
                {exteriorCount > 0 && (
                  <span className={`ml-1.5 text-[10px] font-semibold ${selectedTag === 'exterior' ? 'text-[#DFB85A]/80' : 'text-[#8A8175]'}`}>
                    {exteriorCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={selectedTag === 'interior'}
                onClick={() => handleSelectTag('interior')}
                className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  selectedTag === 'interior'
                    ? 'bg-[#042F61] text-[#DFB85A] shadow-xs'
                    : 'text-[#5E574E] hover:text-[#042F61]'
                }`}
              >
                <span>{language === 'zh' ? '室内空间' : language === 'th' ? 'ภายในห้อง' : 'Interior'}</span>
                <span className={`ml-1.5 text-[10px] font-semibold ${selectedTag === 'interior' ? 'text-[#DFB85A]/80' : 'text-[#8A8175]'}`}>
                  {interiorCount}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={selectedTag === 'amenities'}
                onClick={() => handleSelectTag('amenities')}
                className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  selectedTag === 'amenities'
                    ? 'bg-[#042F61] text-[#DFB85A] shadow-xs'
                    : 'text-[#5E574E] hover:text-[#042F61]'
                }`}
              >
                <span>{language === 'zh' ? '配套设施' : language === 'th' ? 'สิ่งอำนวยความสะดวก' : 'Amenities'}</span>
                {amenitiesCount > 0 && (
                  <span className={`ml-1.5 text-[10px] font-semibold ${selectedTag === 'amenities' ? 'text-[#DFB85A]/80' : 'text-[#8A8175]'}`}>
                    {amenitiesCount}
                  </span>
                )}
              </button>
            </div>
          )}

          <button
            onClick={() => {
              if (displayedImages.length > 0) setLightboxOpen(true);
            }}
            disabled={displayedImages.length === 0}
            className={`text-xs font-semibold text-[#042F61] hover:text-[#9D7C38] flex items-center gap-1.5 bg-[#EDE8E1] hover:bg-[#E3DCD3] px-3.5 py-1.5 rounded-full transition-colors shadow-2xs ${
              displayedImages.length === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{t('property.viewGallery')}</span>
          </button>
        </div>
      </div>

      {/* Main Image Viewer Stage (Isolated Scroll Area) */}
      <div 
        ref={viewerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-16/10 sm:aspect-16/9 bg-[#0E1116] group shadow-sm border border-[#E6E0D8]"
      >
        {displayedImages.length === 0 ? (
          <div className="w-full h-full min-h-[300px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-[#0E1116] text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 text-[#DFB85A] border border-white/15 shadow-inner">
              <ImageIcon className="w-6 h-6 text-[#DFB85A]" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">
              {selectedTag === 'exterior'
                ? (language === 'zh' ? '建筑外观实景照片即将上线' : language === 'th' ? 'รูปภาพภายนอกอาคารกำลังจะมาถึง' : 'Exterior Photos Coming Soon')
                : (language === 'zh' ? '配套设施实景照片即将上线' : language === 'th' ? 'รูปภาพสิ่งอำนวยความสะดวกกำลังจะมาถึง' : 'Amenities Photos Coming Soon')}
            </p>
            <p className="text-xs sm:text-sm text-white/70 max-w-md mt-2 leading-relaxed">
              {selectedTag === 'exterior'
                ? (language === 'zh'
                    ? 'NUE District R9 现代建筑立面与城市天际线外景照片即将更新。'
                    : language === 'th'
                    ? 'ภาพถ่ายสถาปัตยกรรมภายนอกอาคารของโครงการ NUE District R9 จะพร้อมให้รับชมในเร็วๆ นี้'
                    : 'Architectural photography of the modern exterior facade and surrounding streetscapes will be available shortly.')
                : (language === 'zh'
                    ? 'NUE District R9 顶层无边际泳池、全景健身中心及创智 Idea Gen 会客区实景照片即将更新。'
                    : language === 'th'
                    ? 'ภาพถ่ายสิ่งอำนวยความสะดวกของโครงการ NUE District R9 จะพร้อมให้รับชมในเร็วๆ นี้'
                    : 'Architectural photography of the Sky Infinity Pool, Panoramic Sky Fitness Studio, and Idea Gen Lounge will be available shortly.')}
            </p>
            <div className="mt-5 flex items-center gap-2.5 flex-wrap justify-center">
              {exteriorCount > 0 && selectedTag !== 'exterior' && (
                <button
                  type="button"
                  onClick={() => handleSelectTag('exterior')}
                  className="px-5 py-2 text-xs font-bold rounded-full bg-[#DFB85A] hover:bg-[#cfa545] text-[#042F61] transition-all cursor-pointer shadow-md active:scale-98"
                >
                  {language === 'zh' ? `查看建筑外观 (${exteriorCount})` : language === 'th' ? `ดูภาพภายนอกอาคาร (${exteriorCount})` : `View Exterior Photos (${exteriorCount})`}
                </button>
              )}
              {interiorCount > 0 && selectedTag !== 'interior' && (
                <button
                  type="button"
                  onClick={() => handleSelectTag('interior')}
                  className="px-5 py-2 text-xs font-bold rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  {language === 'zh' ? `查看室内空间 (${interiorCount})` : language === 'th' ? `ดูภาพภายในห้อง (${interiorCount})` : `View Interior Photos (${interiorCount})`}
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Ambient Blurred Background matching current photograph */}
            {currentImage && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={currentImage.url}
                  alt=""
                  className="w-full h-full object-cover blur-2xl scale-110 opacity-40 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
            )}

            {/* Horizontal Sliding Track for Images */}
            <div 
              className="relative z-10 w-full h-full flex will-change-transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
            >
              {displayedImages.map((img, idx) => (
                <div 
                  key={idx}
                  className="w-full h-full shrink-0 flex items-center justify-center p-2 sm:p-3 relative select-none cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={img.url}
                    alt={img.caption[language] || img.caption.en}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl pointer-events-none transition-all duration-300 drop-shadow-md select-none"
                    loading={Math.abs(activeIndex - idx) <= 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 pointer-events-none" />

            {/* Floating Caption & Photo Counter */}
            {currentImage && (
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-end justify-between text-white text-xs gap-3 pointer-events-none">
                <div className="max-w-md bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/15 pointer-events-auto">
                  <p className="font-medium text-white/95 text-xs sm:text-sm truncate">
                    {currentImage.caption[language] || currentImage.caption.en}
                  </p>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 font-mono text-[11px] text-white/90 whitespace-nowrap">
                  {activeIndex + 1} / {displayedImages.length}
                </div>
              </div>
            )}

            {/* Left & Right Chevron Controls */}
            {activeIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 cursor-pointer active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {activeIndex < displayedImages.length - 1 && (
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 cursor-pointer active:scale-95 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </>
        )}
      </div>

      {/* The ONE and ONLY Navigation Bar: Active Thumbnail Cards Bar */}
      {displayedImages.length > 0 && (
        <div className="relative group/thumbs pt-1">
          {/* Left Arrow Button for Thumbnail Cards Strip */}
          {displayedImages.length > 5 && (
            <button
              onClick={() => scrollThumbnails('left')}
              aria-label="Scroll thumbnails left"
              className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-[#042F61] border border-[#E6E0D8] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover/thumbs:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Thumbnail Cards Strip with Active Card Highlight */}
          <div
            ref={thumbnailsContainerRef}
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1 px-1 scroll-smooth scrollbar-none"
          >
            {displayedImages.map((img, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Select photo ${idx + 1}`}
                  className={`relative shrink-0 w-20 sm:w-24 md:w-28 aspect-16/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-[#042F61] border-2 border-white shadow-md scale-[1.03] opacity-100'
                      : 'opacity-55 hover:opacity-90 border border-[#E6E0D8] hover:border-[#042F61]/40'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption[language] || img.caption.en}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#042F61]/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button for Thumbnail Cards Strip */}
          {displayedImages.length > 5 && (
            <button
              onClick={() => scrollThumbnails('right')}
              aria-label="Scroll thumbnails right"
              className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-[#042F61] border border-[#E6E0D8] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover/thumbs:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && displayedImages.length > 0 && currentImage && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-20 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg">{property.name}</span>
                {hasTagFilter && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DFB85A]/20 text-[#DFB85A] border border-[#DFB85A]/30">
                    {selectedTag === 'interior' 
                      ? (language === 'zh' ? '室内空间' : language === 'th' ? 'ภายในห้อง' : 'Interior')
                      : selectedTag === 'amenities'
                      ? (language === 'zh' ? '配套设施' : language === 'th' ? 'สิ่งอำนวยความสะดวก' : 'Amenities')
                      : (language === 'zh' ? '建筑外观' : language === 'th' ? 'ภายนอกอาคาร' : 'Exterior')}
                  </span>
                )}
              </div>
              <span className="text-xs text-white/60 block">{property.location} · {property.tower}</span>
            </div>

            <div className="flex items-center gap-3">
              {hasTagFilter && (
                <div className="hidden sm:inline-flex p-0.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (exteriorCount > 0) handleSelectTag('exterior');
                    }}
                    disabled={exteriorCount === 0}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      exteriorCount === 0 ? 'opacity-40 cursor-not-allowed text-white/40' : 'cursor-pointer'
                    } ${
                      selectedTag === 'exterior'
                        ? 'bg-[#DFB85A] text-[#042F61] font-bold shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {language === 'zh' ? '外观' : language === 'th' ? 'ภายนอก' : 'Exterior'}
                    {exteriorCount > 0 && ` (${exteriorCount})`}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTag('interior');
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      selectedTag === 'interior'
                        ? 'bg-[#DFB85A] text-[#042F61] font-bold shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {language === 'zh' ? '室内' : language === 'th' ? 'ภายใน' : 'Interior'} ({interiorCount})
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (amenitiesCount > 0) handleSelectTag('amenities');
                    }}
                    disabled={amenitiesCount === 0}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      amenitiesCount === 0 ? 'opacity-40 cursor-not-allowed text-white/40' : 'cursor-pointer'
                    } ${
                      selectedTag === 'amenities'
                        ? 'bg-[#DFB85A] text-[#042F61] font-bold shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {language === 'zh' ? '配套' : language === 'th' ? 'ส่วนกลาง' : 'Amenities'}
                    {amenitiesCount > 0 && ` (${amenitiesCount})`}
                  </button>
                </div>
              )}

              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Lightbox Stage */}
          <div 
            className="relative flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleLbTouchStart}
            onTouchMove={handleLbTouchMove}
            onTouchEnd={handleLbTouchEnd}
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src={currentImage.url}
                alt=""
                className="w-full h-full object-cover blur-3xl scale-125 opacity-25"
              />
            </div>

            {/* Horizontal Slide Track */}
            <div 
              className="w-full h-full flex will-change-transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
            >
              {displayedImages.map((img, idx) => (
                <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center p-2 relative select-none">
                  <img
                    src={img.url}
                    alt={img.caption[language] || img.caption.en}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* Prev/Next arrows in Lightbox */}
            {activeIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {activeIndex < displayedImages.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Info & Thumbnail Cards in Lightbox */}
          <div 
            className="z-20 max-w-4xl mx-auto w-full space-y-2.5 sm:space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption & Counter */}
            <div className="text-center text-white/90 text-xs sm:text-sm bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/15 flex items-center justify-between gap-4">
              <p className="font-medium text-left truncate">
                {currentImage.caption[language] || currentImage.caption.en}
              </p>
              <span className="text-xs text-white/60 font-mono shrink-0">
                {activeIndex + 1} of {displayedImages.length}
              </span>
            </div>

            {/* Thumbnail Cards Strip in Lightbox with Smooth Scrolling & Active Auto-Focus */}
            <div className="relative group/lbthumbs w-full flex items-center justify-center">
              {displayedImages.length > 5 && (
                <button
                  type="button"
                  onClick={() => scrollLightboxThumbnails('left')}
                  aria-label="Scroll thumbnails left"
                  className="hidden sm:flex absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/25 items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <div
                ref={lightboxThumbnailsContainerRef}
                className="lightbox-thumbnails-container w-full max-w-full overflow-x-auto scroll-smooth scrollbar-none py-1 px-1 sm:px-2"
              >
                <div className="flex items-center gap-1.5 w-max min-w-full justify-center px-1">
                  {displayedImages.map((img, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={idx}
                        ref={(el) => (lightboxThumbnailRefs.current[idx] = el)}
                        onClick={() => {
                          setActiveIndex(idx);
                          activeIndexRef.current = idx;
                        }}
                        aria-label={`Select photo ${idx + 1}`}
                        className={`relative shrink-0 rounded-lg overflow-hidden aspect-4/3 w-12 sm:w-16 transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'ring-2 ring-[#DFB85A] opacity-100 scale-105 shadow-md border border-white/40'
                            : 'opacity-40 hover:opacity-90 border border-white/15'
                        }`}
                      >
                        <img 
                          src={img.url} 
                          alt="" 
                          className="w-full h-full object-cover pointer-events-none" 
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {displayedImages.length > 5 && (
                <button
                  type="button"
                  onClick={() => scrollLightboxThumbnails('right')}
                  aria-label="Scroll thumbnails right"
                  className="hidden sm:flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/25 items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
