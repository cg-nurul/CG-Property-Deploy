import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { SpecularButton } from './ui/SpecularButton';
import { FullToSemiDottedLine } from './ui/FullToSemiDottedLine';
import { 
  FilledMapPin, 
  FilledBuilding,
  FilledBed, 
  FilledBath, 
  FilledArea, 
  FilledArmchair, 
  FilledArrowRight, 
  AirbnbIcon 
} from './ui/FilledIcons';

interface TheCollectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const TheCollection: React.FC<TheCollectionProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const res1 = PROPERTIES[0];
  const res2 = PROPERTIES[1];

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  const jumpToCard = useCallback((target: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, target));
  }, []);

  // Isolate scroll and touch strictly to the cards container
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    // Wheel event handler on cards container only
    const handleWheel = (e: WheelEvent) => {
      // Prevent page scrolling while user scrolls on the cards
      e.preventDefault();
      e.stopPropagation();

      // Smooth delta scaling for card-to-card flow
      const sensitivity = 0.0018;
      const next = targetProgressRef.current + e.deltaY * sensitivity;
      targetProgressRef.current = Math.max(0, Math.min(1, next));
    };

    // Touch handlers on cards container only
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      // Prevent page scrolling on card swipe
      e.preventDefault();
      e.stopPropagation();

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      const next = targetProgressRef.current + deltaY * 0.004;
      targetProgressRef.current = Math.max(0, Math.min(1, next));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Smooth animation loop using requestAnimationFrame
    let animId: number;
    const animate = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0008) {
        currentProgressRef.current += diff * 0.14;
        const p = currentProgressRef.current;
        setProgress(p);
        if (progressBarFillRef.current) {
          progressBarFillRef.current.style.height = `${Math.min(100, Math.max(0, p * 100))}%`;
        }
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        const p = targetProgressRef.current;
        setProgress(p);
        if (progressBarFillRef.current) {
          progressBarFillRef.current.style.height = `${Math.min(100, Math.max(0, p * 100))}%`;
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const card1Transform = {
    transform: `translate3d(0, -${progress * 14}px, 0) scale(${1 - progress * 0.035})`,
    opacity: 1 - progress * 0.25,
    filter: progress > 0.05 ? `brightness(${1 - progress * 0.18})` : 'none',
  };

  const card2Y = (1 - progress) * 105;
  const card2Transform = {
    transform: `translate3d(0, ${card2Y}%, 0) scale(${0.96 + progress * 0.04})`,
    opacity: Math.min(1, progress * 3),
    boxShadow: progress > 0.08 ? '0 -20px 45px -10px rgba(0, 0, 0, 0.5)' : 'none',
  };

  return (
    <section
      id="the-collection"
      style={{ marginTop: '-50px' }}
      className="relative w-full min-h-screen flex flex-col justify-center py-6 sm:py-8 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Header - Aligned Left with Cards, with generous vertical spacing below */}
        <div className="w-full mb-10 sm:mb-14 lg:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#042F61] tracking-tight">
              {t('collection.heading')}
            </h2>
            <FullToSemiDottedLine className="my-1.5" />
            <p className="text-[#5E574E] text-xs sm:text-sm lg:text-base leading-relaxed">
              {t('collection.subheading')}
            </p>
          </div>
        </div>

        {/* Card Stack Area with Vertical Rail */}
        <div className="w-full flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Card Stack Container - Wheel/Touch events strictly attached here */}
          <div
            ref={cardsContainerRef}
            className="flex-1 relative h-[480px] sm:h-[480px] lg:h-[500px] select-none"
          >
            {/* RESIDENCE 01 CARD */}
            <div
              id="feature-residence-01"
              className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E6E0D8] z-10 will-change-transform"
              style={card1Transform}
            >
              {/* Full landscape image taking entire card space with no outer padding */}
              <img
                src={res1.coverImage}
                alt={res1.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Subtle photographic vignette on the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Brand-colored frosted glass pills at top-left of the card image */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2">
                {/* Location Pill: Brand Blue frosted glass with gold text & svg */}
                <span className="bg-[#042F61]/85 backdrop-blur-md text-[#DFB85A] text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#DFB85A]/35 shadow-md">
                  <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                  <span className="text-[#DFB85A]">{res1.location}</span>
                </span>

                {/* Tower Pill: Brand Blue frosted glass with building svg and matching gold text */}
                <span className="bg-[#042F61]/85 backdrop-blur-md text-[#DFB85A] text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#DFB85A]/35 shadow-md">
                  <FilledBuilding className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                  <span className="text-[#DFB85A]">{res1.tower}</span>
                </span>

                {/* Floor Pill: Brand Gold frosted glass with matching brand blue text & svg */}
                <span className="bg-[#DFB85A]/90 backdrop-blur-md text-[#042F61] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#042F61]/25 shadow-md">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#042F61] fill-current" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.24 7 12 3.1 19.76 7 12 10.5zM2 12l10 5 10-5-1.8-0.9L12 15.2l-8.2-4.1L2 12zm0 5l10 5 10-5-1.8-0.9L12 20.2l-8.2-4.1L2 17z" />
                  </svg>
                  <span className="text-[#042F61]">{res1.floor}</span>
                </span>
              </div>

              {/* Partial overlay positioned strictly to the right */}
              <div className="absolute inset-y-0 right-0 w-full sm:w-[58%] md:w-[52%] lg:w-[48%] xl:w-[46%] bg-[#042F61]/85 backdrop-blur-md sm:border-l border-white/15 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-20 overflow-y-auto sm:overflow-visible">
                {/* Top: Headings shifted up for proper spacing */}
                <div className="pt-0 sm:pt-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {res1.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DFB85A] uppercase tracking-wider font-semibold mt-1">
                    {res1.location} · {res1.city}
                  </p>
                </div>

                {/* Middle: Description & Specs */}
                <div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3 mb-3">
                    {res1.overview[language] || res1.overview.en}
                  </p>

                  {/* 2x2 Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledBed className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.bedrooms')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        2 Bedrooms
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledBath className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.bathrooms')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        2 Bathrooms
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledArea className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.size')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        46 sqm
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledArmchair className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.interior')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {t('spec.furnishedStatus')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <SpecularButton
                    id="btn-view-residence-01"
                    variant="white"
                    onClick={() => onNavigate('/properties/residence-01')}
                  >
                    <span className="text-[#042F61] font-bold">
                      {t('collection.viewProperty')}
                    </span>
                    <FilledArrowRight className="w-3.5 h-3.5 text-[#042F61] fill-current group-hover:translate-x-0.5 transition-transform duration-200" />
                  </SpecularButton>

                  <a
                    id="btn-book-residence-01"
                    href={res1.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-shine inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide cursor-pointer text-[#042F61]"
                  >
                    <span>{t('collection.bookNow')}</span>
                    <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>
            </div>

            {/* RESIDENCE 02 CARD */}
            <div
              id="feature-residence-02"
              className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-20 will-change-transform"
              style={card2Transform}
            >
              {/* Full landscape image taking entire card space with no outer padding */}
              <img
                src={res2.coverImage}
                alt={res2.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Subtle photographic vignette on the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Brand-colored frosted glass pills at top-left of the card image */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2">
                {/* Location Pill: Brand Blue frosted glass with gold text & svg */}
                <span className="bg-[#042F61]/85 backdrop-blur-md text-[#DFB85A] text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#DFB85A]/35 shadow-md">
                  <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                  <span className="text-[#DFB85A]">{res2.location}</span>
                </span>

                {/* Tower Pill: Brand Blue frosted glass with building svg and matching gold text */}
                <span className="bg-[#042F61]/85 backdrop-blur-md text-[#DFB85A] text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#DFB85A]/35 shadow-md">
                  <FilledBuilding className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                  <span className="text-[#DFB85A]">{res2.tower}</span>
                </span>

                {/* Floor Pill: Brand Gold frosted glass with matching brand blue text & svg */}
                <span className="bg-[#DFB85A]/90 backdrop-blur-md text-[#042F61] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#042F61]/25 shadow-md">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#042F61] fill-current" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.24 7 12 3.1 19.76 7 12 10.5zM2 12l10 5 10-5-1.8-0.9L12 15.2l-8.2-4.1L2 12zm0 5l10 5 10-5-1.8-0.9L12 20.2l-8.2-4.1L2 17z" />
                  </svg>
                  <span className="text-[#042F61]">{res2.floor}</span>
                </span>
              </div>

              {/* Partial overlay positioned strictly to the right */}
              <div className="absolute inset-y-0 right-0 w-full sm:w-[58%] md:w-[52%] lg:w-[48%] xl:w-[46%] bg-[#042F61]/85 backdrop-blur-md sm:border-l border-white/15 p-5 sm:p-6 lg:p-7 flex flex-col justify-between z-20 overflow-y-auto sm:overflow-visible">
                {/* Top: Headings shifted up for proper spacing */}
                <div className="pt-0 sm:pt-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {res2.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DFB85A] uppercase tracking-wider font-semibold mt-1">
                    {res2.location} · {res2.city}
                  </p>
                </div>

                {/* Middle: Description & Specs */}
                <div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3 mb-3">
                    {res2.overview[language] || res2.overview.en}
                  </p>

                  {/* 2x2 Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledBed className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.bedrooms')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        2 Bedrooms
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledBath className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.bathrooms')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        1 Bathroom
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledArea className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.size')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        35 sqm
                      </div>
                    </div>

                    <div className="bg-white/12 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                      <div className="text-[10px] sm:text-[11px] text-[#DFB85A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <FilledArmchair className="w-3.5 h-3.5 fill-current text-[#DFB85A]" />
                        {t('spec.interior')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {t('spec.furnishedStatus')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <SpecularButton
                    id="btn-view-residence-02"
                    variant="white"
                    onClick={() => onNavigate('/properties/residence-02')}
                  >
                    <span className="text-[#042F61] font-bold">
                      {t('collection.viewProperty')}
                    </span>
                    <FilledArrowRight className="w-3.5 h-3.5 text-[#042F61] fill-current group-hover:translate-x-0.5 transition-transform duration-200" />
                  </SpecularButton>

                  <a
                    id="btn-book-residence-02"
                    href={res2.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-shine inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide cursor-pointer text-[#042F61]"
                  >
                    <span>{t('collection.bookNow')}</span>
                    <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Vertical Progress Rail (Visual Only) */}
          <div className="flex flex-col items-center justify-center gap-6 h-[380px] sm:h-[420px] lg:h-[450px] py-4 select-none">
            {/* Vertical Angle Label ("Property 1" / "Property 2") */}
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#042F61] transition-colors duration-200"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {progress < 0.5 ? 'Property 1' : 'Property 2'}
            </span>

            {/* Vertical Visual Progress Bar (no text) */}
            <div 
              onClick={() => jumpToCard(progress < 0.5 ? 1 : 0)}
              className="relative w-1.5 sm:w-2 h-36 sm:h-44 bg-[#E6E0D8] rounded-full overflow-hidden cursor-pointer hover:w-2 sm:hover:w-2.5 transition-[width] duration-200 shadow-inner"
              title="Click or scroll on cards to switch property"
            >
              {/* Synchronous 60fps Fill with Brand Blue to Champagne Gold Gradient and zero CSS transition delay */}
              <div
                ref={progressBarFillRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#042F61] via-[#0A3B75] to-[#DFB85A] rounded-full will-change-[height]"
                style={{ 
                  height: `${Math.min(100, Math.max(0, progress * 100))}%`,
                  minHeight: '8px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
