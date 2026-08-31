import React, { useState } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ property }) => {
  const { t, language } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = property.gallery.length > 0 
    ? property.gallery 
    : [{ url: property.coverImage, caption: { en: property.name, zh: property.name, th: property.name } }];

  const currentImage = images[activeImageIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="property-gallery-component" className="space-y-4">
      
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#DFB85A]" />
          <h3 className="text-xl font-bold text-[#042F61]">
            {t('property.gallery')}
          </h3>
        </div>
        <button
          onClick={() => setLightboxOpen(true)}
          className="text-xs font-semibold text-[#042F61] hover:text-[#9D7C38] flex items-center gap-1.5 bg-[#EDE8E1] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{t('property.viewGallery')} ({images.length})</span>
        </button>
      </div>

      {/* Main Image View */}
      <div 
        className="relative rounded-3xl overflow-hidden aspect-16/10 sm:aspect-16/9 bg-[#14171A] cursor-pointer group shadow-sm border border-[#E6E0D8]"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentImage.url}
          alt={currentImage.caption[language] || currentImage.caption.en}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Caption & Counter on Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white text-xs">
          <div className="max-w-md bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
            <p className="font-medium">
              {currentImage.caption[language] || currentImage.caption.en}
            </p>
          </div>
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 font-mono">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Desktop Quick Nav Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`relative rounded-xl overflow-hidden aspect-4/3 transition-all cursor-pointer ${
              activeImageIndex === idx
                ? 'ring-2 ring-[#DFB85A] ring-offset-2 ring-offset-[#FAF8F5] opacity-100'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <span className="font-bold text-lg">{property.name}</span>
              <span className="text-xs text-white/60 block">{property.location} · {property.tower}</span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image */}
          <div 
            className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto my-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption[language] || currentImage.caption.en}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="text-center text-white/90 text-sm max-w-xl mx-auto z-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/15">
            <p className="font-medium">
              {currentImage.caption[language] || currentImage.caption.en}
            </p>
            <span className="text-xs text-white/50 font-mono mt-1 block">
              {activeImageIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
