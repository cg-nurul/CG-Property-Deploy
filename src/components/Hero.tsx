import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { RippleButton } from './ui/RippleButton';
import { 
  FilledMapPin, 
  FilledBed, 
  FilledBath, 
  FilledArea, 
  AirbnbIcon 
} from './ui/FilledIcons';
import { ChevronRight } from 'lucide-react';

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
        <div className="relative flex-1 w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden bg-[#14171A] border border-[#2B2E33] flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
        
        {/* Background Image (Clean static display, no animation) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={activeProperty.coverImage}
            alt={`${activeProperty.name} - CG Property Luxury Architecture`}
            className="w-full h-full object-cover transition-opacity duration-700"
          />

          {/* Architectural Background Vector Grid in Hero Negative Space */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.09]"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, #DFB85A 0%, transparent 40%),
                                linear-gradient(to right, rgba(88, 139, 199, 0.18) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(88, 139, 199, 0.18) 1px, transparent 1px)`,
              backgroundSize: '100% 100%, 64px 64px, 64px 64px'
            }}
          />

          {/* Multi-layered cinematic vignettes to guarantee text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171A] via-[#14171A]/45 to-[#14171A]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14171A]/85 via-[#14171A]/30 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#14171A]/20 to-[#14171A]/70" />
        </div>

        {/* Top Badges / Category Pills */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium tracking-wide shadow-sm">
            <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] shrink-0 fill-current" />
            <span className="font-semibold">Bangkok, Thailand</span>
            <span className="w-1 h-1 rounded-full bg-[#DFB85A]" />
            <span className="text-white/85">Nue District Rama 9</span>
          </div>
        </div>

        {/* Bottom Area: Main Editorial Headline & Floating Showcase Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-end mt-auto pt-4">
          
          {/* Left Column: Editorial Headline & Subheadline */}
          <div className="lg:col-span-7 flex flex-col justify-end pb-2 lg:pb-4">
            <div className="max-w-2xl">
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white tracking-tight leading-[1.08]">
                {language === 'en' ? (
                  <>
                    <span className="block">Stay</span>
                    <span className="block">Somewhere</span>
                    <span className="italic bg-gradient-to-r from-[#DFB85A] via-[#DEA659] to-[#DEC659] bg-clip-text text-transparent inline-block drop-shadow-[0_2px_18px_rgba(223,184,90,0.4)]">
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

          {/* Right Column: Dedicated Single Unit Showcase Card with Premium Glass & Partial SVG Fill */}
          <div className="lg:col-span-5 flex justify-end">
            <div 
              id="hero-residence-card"
              className="w-full max-w-sm xl:max-w-md bg-[#042F61]/85 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 shadow-2xl border border-[#588BC7]/35 text-white overflow-hidden relative"
            >
              {/* Partial Architectural SVG Geometry Fill */}
              <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-20 pointer-events-none -z-0">
                <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                  <circle cx="60" cy="60" r="50" stroke="#588BC7" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="60" cy="60" r="35" stroke="#DFB85A" strokeWidth="1" />
                  <circle cx="60" cy="60" r="20" stroke="#D6E9FF" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="0" y1="60" x2="120" y2="60" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="2 4" />
                  <line x1="60" y1="0" x2="60" y2="120" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="2 4" />
                  <polygon points="60,15 105,60 60,105 15,60" stroke="#BA994A" strokeWidth="0.7" fill="none" />
                </svg>
              </div>

              {/* Static Card Content (No Animations) */}
              <div className="relative z-10">
                {/* Header: Title and Location (Tower and Floor pills removed per request) */}
                <div className="mb-3">
                  <h4 className="font-bold text-base sm:text-lg text-white leading-snug">
                    {activeProperty.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#D6E9FF]/75 mt-0.5">
                    <FilledMapPin className="w-3 h-3 text-[#D6E9FF]/75 shrink-0 fill-current" />
                    <span>{activeProperty.location}</span>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-16/9 sm:aspect-16/10 mb-3.5 border border-white/10">
                  <img
                    src={activeProperty.coverImage}
                    alt={activeProperty.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Specs Row with Filled SVGs and Identical Text/SVG Colors */}
                <div className="grid grid-cols-3 gap-2 py-2.5 mb-3.5 border-y border-white/15 text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5 text-[#D6E9FF]/90">
                    <FilledBed className="w-3.5 h-3.5 text-[#D6E9FF]/90 shrink-0 fill-current" />
                    <span>{activeProperty.bedrooms} {t('spec.bedrooms')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D6E9FF]/90">
                    <FilledBath className="w-3.5 h-3.5 text-[#D6E9FF]/90 shrink-0 fill-current" />
                    <span>{activeProperty.bathrooms} {t('spec.bathrooms')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D6E9FF]/90">
                    <FilledArea className="w-3.5 h-3.5 text-[#D6E9FF]/90 shrink-0 fill-current" />
                    <span>{Math.ceil(activeProperty.sizeSqm)} sqm</span>
                  </div>
                </div>

                {/* View Residence & Book Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <RippleButton
                    id={`hero-view-${activeProperty.slug}`}
                    variant="primary"
                    onClick={() => onNavigate(`/properties/${activeProperty.slug}` as PageRoute)}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold"
                  >
                    <span>{t('hero.viewDetails')}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </RippleButton>
                  <a
                    href={activeProperty.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-shine w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Airbnb</span>
                    <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
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

