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

  const viewerRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const allImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [{ url: property.coverImage, caption: { en: property.name, zh: property.name, th: property.name }, category: 'living' as const }];

  const currentImage = allImages[activeIndex] || allImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : prev));
  };

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
      const len = allImages.length;
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
  }, [allImages.length]);

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
      const max = allImages.length - 1;

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
    const max = allImages.length - 1;
    if (touchDeltaXRef.current > threshold && activeIndexRef.current < max) {
      setActiveIndex((prev) => prev + 1);
    } else if (touchDeltaXRef.current < -threshold && activeIndexRef.current > 0) {
      setActiveIndex((prev) => prev - 1);
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
  };

  // Keyboard navigation when Lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ImageIcon className="w-4 h-4 text-[#9D7C38]" />
          <h3 className="text-xl font-bold text-[#042F61]">
            {t('property.gallery')}
          </h3>
          <span className="text-xs bg-[#EDE8E1] text-[#042F61] px-2.5 py-0.5 rounded-full font-semibold">
            {allImages.length} Photos
          </span>
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          className="text-xs font-semibold text-[#042F61] hover:text-[#9D7C38] flex items-center gap-1.5 bg-[#EDE8E1] hover:bg-[#E3DCD3] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-2xs"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{t('property.viewGallery')}</span>
        </button>
      </div>

      {/* Main Image Viewer Stage (Isolated Scroll Area) */}
      <div 
        ref={viewerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-16/10 sm:aspect-16/9 bg-[#0E1116] group shadow-sm border border-[#E6E0D8]"
      >
        {/* Ambient Blurred Background matching current photograph */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={currentImage.url}
            alt=""
            className="w-full h-full object-cover blur-2xl scale-110 opacity-40 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Horizontal Sliding Track for Images */}
        <div 
          className="relative z-10 w-full h-full flex will-change-transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {allImages.map((img, idx) => (
            <div 
              key={idx}
              className="w-full h-full shrink-0 flex items-center justify-center p-0 sm:p-1 relative select-none cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={img.url}
                alt={img.caption[language] || img.caption.en}
                className="w-full h-full object-contain pointer-events-none transition-all duration-300"
                loading={Math.abs(activeIndex - idx) <= 2 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Floating Caption & Photo Counter */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-end justify-between text-white text-xs gap-3 pointer-events-none">
          <div className="max-w-md bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/15 pointer-events-auto">
            <p className="font-medium text-white/95 text-xs sm:text-sm truncate">
              {currentImage.caption[language] || currentImage.caption.en}
            </p>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 font-mono text-[11px] text-white/90 whitespace-nowrap">
            {activeIndex + 1} / {allImages.length}
          </div>
        </div>

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
        {activeIndex < allImages.length - 1 && (
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 cursor-pointer active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* The ONE and ONLY Navigation Bar: Active Thumbnail Cards Bar */}
      <div className="relative group/thumbs pt-1">
        {/* Left Arrow Button for Thumbnail Cards Strip */}
        {allImages.length > 5 && (
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
          {allImages.map((img, idx) => {
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
        {allImages.length > 5 && (
          <button
            onClick={() => scrollThumbnails('right')}
            aria-label="Scroll thumbnails right"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-[#042F61] border border-[#E6E0D8] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover/thumbs:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-20">
            <div>
              <span className="font-bold text-base sm:text-lg">{property.name}</span>
              <span className="text-xs text-white/60 block">{property.location} · {property.tower}</span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Lightbox Stage */}
          <div 
            className="relative flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
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
              {allImages.map((img, idx) => (
                <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center p-2 relative select-none">
                  <img
                    src={img.url}
                    alt={img.caption[language] || img.caption.en}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
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
            {activeIndex < allImages.length - 1 && (
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
            className="z-20 max-w-4xl mx-auto w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption & Counter */}
            <div className="text-center text-white/90 text-xs sm:text-sm bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/15 flex items-center justify-between gap-4">
              <p className="font-medium text-left truncate">
                {currentImage.caption[language] || currentImage.caption.en}
              </p>
              <span className="text-xs text-white/60 font-mono shrink-0">
                {activeIndex + 1} of {allImages.length}
              </span>
            </div>

            {/* Thumbnail Cards in Lightbox */}
            <div className="flex items-center justify-center gap-1.5 py-1 px-2 overflow-x-auto scrollbar-none">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative shrink-0 rounded-lg overflow-hidden aspect-4/3 w-12 sm:w-16 transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'ring-2 ring-[#DFB85A] opacity-100 scale-105'
                      : 'opacity-40 hover:opacity-90'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
