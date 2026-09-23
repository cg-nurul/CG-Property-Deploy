import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { SpecularButton } from './ui/SpecularButton';
import { 
  FilledMapPin, 
  FilledBed, 
  FilledBath, 
  FilledArea, 
  FilledArrowRight,
  AirbnbIcon 
} from './ui/FilledIcons';

interface HeroProps {
  onNavigate: (route: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const activeProperty = PROPERTIES[activeUnitIndex];

  // Auto-switch between residences on a smooth 6-second interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUnitIndex((prev) => (prev + 1) % PROPERTIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeUnitIndex]);

  return (
    <div className="w-full flex justify-center items-center overflow-x-hidden">
      <section 
        id="hero-section" 
        className="relative w-full h-[100dvh] pt-24 sm:pt-28 pb-3 sm:pb-4 px-0.5 sm:px-1 md:px-1.5 lg:px-2 xl:px-3.5 mx-auto flex flex-col justify-center items-center selection:bg-[#DFB85A] selection:text-[#042F61]"
      >
        {/* Main Architectural Hero Container - Fills available height to complete viewport */}
        <div className="relative flex-1 w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden bg-transparent border-0 border-transparent outline-none ring-0 shadow-none flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
        
        {/* Background Image (Clean static display, no animation) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[36px]">
          <img
            src={activeProperty.heroImage || activeProperty.coverImage}
            alt={`${activeProperty.name} - CG Property Luxury Architecture`}
            className="w-full h-full object-cover rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] transition-opacity duration-700"
          />

          {/* Enhanced deep brand blue & black corner/bottom overlay for crisp contrast behind text & CTAs */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-[24px] sm:rounded-[32px] lg:rounded-[36px]"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 75% 70% at 0% 100%, rgba(2, 27, 56, 0.98) 0%, rgba(4, 47, 97, 0.92) 35%, rgba(4, 47, 97, 0.65) 60%, transparent 85%),
                radial-gradient(ellipse 75% 70% at 100% 100%, rgba(2, 27, 56, 0.98) 0%, rgba(4, 47, 97, 0.92) 35%, rgba(4, 47, 97, 0.65) 60%, transparent 85%),
                linear-gradient(to top, rgba(2, 27, 56, 0.9) 0%, rgba(4, 47, 97, 0.5) 30%, transparent 60%)
              `
            }}
          />
        </div>

        {/* Top Badges / Category Pills */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium tracking-wide shadow-sm">
            <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] shrink-0 fill-current" />
            <span className="font-semibold">{activeProperty.city}, {activeProperty.country}</span>
          </div>
        </div>

        {/* NUE District R9 Architectural Key Advantages Callouts with Vertical Lines */}
        {activeProperty.id === 'residence-01' && (
          <>
            {/* Desktop & Tablet Architectural Callout Overlay with Vertical Lines (z-40 for full hoverability above all layers) */}
            <div className="absolute inset-0 pointer-events-none z-40 hidden md:block">
              {/* Point 1: Incredible City View (Pointing to the top of Tower R, shifted 100px up) */}
              <div 
                className="absolute pointer-events-auto z-40 transition-all duration-300 hover:scale-[1.06] group cursor-pointer"
                style={{ top: 'calc(28% - 100px)', left: '42.6%' }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white/95 hover:bg-white backdrop-blur-md border border-white rounded-full px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] -translate-x-1/2 left-1/2 relative text-center transition-all whitespace-nowrap mb-1">
                    <span className="text-xs sm:text-[13px] font-bold text-[#042F61] tracking-wide select-none">
                      Incredible City View
                    </span>
                  </div>
                  <div className="w-[1.5px] h-8 sm:h-9 bg-gradient-to-t from-white via-white/80 to-white/20" />
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-white/20 animate-ping opacity-60" />
                    <div className="w-3.5 h-3.5 rounded-full bg-white/30 border border-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Point 2: Our 16th Floor Suite (Exact coordinate [523, 426] on Tower R, elevated z-index & fully hoverable) */}
              <div 
                className="absolute pointer-events-auto z-40 transition-all duration-300 hover:scale-[1.06] group cursor-pointer"
                style={{ top: '52.3%', left: '42.6%' }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-white/25 animate-ping opacity-75" />
                    <div className="w-3.5 h-3.5 rounded-full bg-white/30 border border-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.95)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                    </div>
                  </div>
                  <div className="w-[1.5px] h-8 sm:h-10 bg-gradient-to-b from-white via-white/80 to-white/20" />
                  <div className="bg-white/95 hover:bg-white backdrop-blur-md border border-white rounded-full px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] -translate-x-1/2 left-1/2 relative text-center transition-all whitespace-nowrap">
                    <span className="text-xs sm:text-[13px] font-bold text-[#042F61] tracking-wide select-none">
                      Our 16th Floor Suite
                    </span>
                  </div>
                </div>
              </div>

              {/* Point 3: Tower 9 Middle Pointer (Shifted 200px up) */}
              <div 
                className="absolute pointer-events-auto z-40 transition-all duration-300 hover:scale-[1.06] group cursor-pointer"
                style={{ top: 'calc(46% - 200px)', left: '58%' }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-white/20 animate-ping opacity-60" />
                    <div className="w-3.5 h-3.5 rounded-full bg-white/30 border border-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="w-[1.5px] h-8 sm:h-10 bg-gradient-to-b from-white via-white/80 to-white/20" />
                  <div className="bg-white/95 hover:bg-white backdrop-blur-md border border-white rounded-full px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] -translate-x-1/2 left-1/2 relative text-center transition-all whitespace-nowrap">
                    <span className="text-xs sm:text-[13px] font-bold text-[#042F61] tracking-wide select-none">
                      Feel Relaxed on top of Everything
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Callout Highlights Bar (Clean, compact horizontal 1-liner chips) */}
            <div className="relative z-10 md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar py-1 my-2">
              <div className="shrink-0 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white text-[11px] text-[#042F61] font-bold shadow-md">
                Incredible City View
              </div>
              <div className="shrink-0 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white text-[11px] text-[#042F61] font-bold shadow-md">
                Our 16th Floor Suite
              </div>
              <div className="shrink-0 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white text-[11px] text-[#042F61] font-bold shadow-md">
                Feel Relaxed on top of Everything
              </div>
            </div>
          </>
        )}

        {/* Bottom Area: Main Editorial Headline & Residence Details directly on Hero */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-end mt-auto pt-4">
          
          {/* Left Column: Editorial Headline & Subheadline */}
          <div className="lg:col-span-7 flex flex-col justify-end pb-2 lg:pb-4">
            <div className="max-w-2xl">
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white tracking-tight leading-[1.08]">
                {language === 'en' ? (
                  <>
                    <span className="block">Stay</span>
                    <span className="block">Somewhere</span>
                    <span className="italic text-gold-shine inline-block">
                      Exceptional.
                    </span>
                  </>
                ) : (
                  t('hero.headline')
                )}
              </h1>
              {/* Clean solid line below Exceptional */}
              <div className="w-24 h-[2px] bg-[#DFB85A] mt-4 rounded-full" />
              <p className="text-white/85 text-xs sm:text-sm font-normal leading-relaxed max-w-none whitespace-nowrap mt-3 sm:mt-4 overflow-hidden text-ellipsis">
                {t('hero.subheadline')}
              </p>
            </div>
          </div>

          {/* Right Column: Directly on Hero - Property Name, 3 Stats, and Buttons */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end items-end pb-2 lg:pb-4">
            <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3.5">
              {/* Property Name */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#DFB85A] font-bold">
                    {activeUnitIndex % 2 === 0 ? 'Explore' : 'Visit'}
                  </span>
                </div>
                <h3 className="font-bold text-2xl sm:text-3xl text-white tracking-wide drop-shadow-md">
                  {activeProperty.name}
                </h3>
              </div>

              {/* 3 Stats Row Directly on Hero */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs shadow-lg">
                <div className="flex items-center gap-1.5 text-white">
                  <FilledBed className="w-3.5 h-3.5 text-[#DFB85A] shrink-0 fill-current" />
                  <span className="font-medium text-white">{activeProperty.bedrooms} {t('spec.bedrooms')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <FilledBath className="w-3.5 h-3.5 text-[#DFB85A] shrink-0 fill-current" />
                  <span className="font-medium text-white">{activeProperty.bathrooms} {t('spec.bathrooms')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <FilledArea className="w-3.5 h-3.5 text-[#DFB85A] shrink-0 fill-current" />
                  <span className="font-medium text-white">{Math.ceil(activeProperty.sizeSqm)} sqm</span>
                </div>
              </div>

              {/* View Property & Book Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <SpecularButton
                  id={`hero-view-${activeProperty.slug}`}
                  variant="white"
                  onClick={() => onNavigate(`/properties/${activeProperty.slug}` as PageRoute)}
                  className="w-full"
                >
                  <span className="text-[#042F61] font-bold">
                    {t('hero.viewDetails')}
                  </span>
                  <FilledArrowRight className="w-[21px] h-[21px] text-[#042F61] fill-current group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
                </SpecularButton>
                <a
                  href={activeProperty.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-shine w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-[#042F61] shadow-lg"
                >
                  <span>Book Airbnb</span>
                  <AirbnbIcon className="w-[21px] h-[21px] shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Center Interactive Unit Loop Indicator - Clean Horizontal Lines */}
        <div className="relative z-10 flex justify-center mt-3 pt-1">
          <div className="inline-flex items-center gap-2 py-1">
            {PROPERTIES.map((prop, idx) => {
              const isActive = activeUnitIndex === idx;
              return (
                <button
                  key={prop.id}
                  id={`hero-unit-line-indicator-${idx + 1}`}
                  onClick={() => setActiveUnitIndex(idx)}
                  className="group py-2 px-1 cursor-pointer flex items-center justify-center transition-all focus:outline-hidden"
                  aria-label={`View ${prop.name}`}
                  title={prop.name}
                >
                  <span
                    className={`block h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-10 sm:w-14 bg-gradient-to-r from-[#DEA659] via-[#DFB85A] to-[#DEC659] shadow-[0_0_12px_rgba(223,184,90,0.85)]'
                        : 'w-5 sm:w-7 bg-white/40 group-hover:bg-white/90 group-hover:w-7'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  </div>
  );
};

