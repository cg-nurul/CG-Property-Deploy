import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { 
  MapPin, 
  ChevronRight, 
  Maximize2, 
  BedDouble, 
  Bath, 
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  onNavigate: (route: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const activeProperty = PROPERTIES[activeUnitIndex];

  // Auto-switch between residences on a smooth 6-second loop
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
        className="relative w-full h-[100dvh] pt-24 sm:pt-28 pb-3 sm:pb-4 px-0.5 sm:px-1 md:px-1.5 lg:px-2 xl:px-3.5 mx-auto flex flex-col justify-center items-center"
      >
        {/* Main Architectural Hero Container - Fills available height to complete viewport */}
        <div className="relative flex-1 w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden bg-[#14171A] border border-[#2B2E33] flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
        
        {/* Background Image with Cinematic Luxury Grading Overlay - Crossfades with active unit */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {PROPERTIES.map((prop, idx) => (
            <img
              key={prop.id}
              src={prop.coverImage}
              alt={`${prop.name} - CG Property Luxury Architecture`}
              className={`absolute inset-0 w-full h-full object-cover object-center scale-105 transform transition-opacity duration-1000 ease-in-out ${
                activeUnitIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Multi-layered cinematic vignettes to guarantee text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171A] via-[#14171A]/45 to-[#14171A]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14171A]/85 via-[#14171A]/30 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#14171A]/20 to-[#14171A]/70" />
        </div>

        {/* Top Badges / Category Pills */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium tracking-wide shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#DFB85A]" />
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
                    Stay
                    <br />
                    Somewhere
                    <br />
                    <span className="italic">Exceptional.</span>
                  </>
                ) : (
                  t('hero.headline')
                )}
              </h1>
              <p className="text-white/85 text-xs sm:text-sm font-normal leading-relaxed max-w-none whitespace-nowrap mt-3 sm:mt-4 overflow-hidden text-ellipsis">
                {t('hero.subheadline')}
              </p>
            </div>
          </div>

          {/* Right Column: Dedicated Single Unit Showcase Card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="w-full max-w-sm xl:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 text-[#14171A]">
              
              {/* Header: Title and Position Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#042F61] leading-snug">
                    {activeProperty.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#9D7C38]" />
                    <span>{activeProperty.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-bold text-[#042F61] bg-[#DFB85A]/20 px-2.5 py-1 rounded-lg border border-[#DFB85A]/40">
                    {activeProperty.tower}
                  </span>
                  <span className="text-[11px] font-semibold text-[#042F61] bg-[#EDE8E1] px-2.5 py-1 rounded-lg">
                    {activeProperty.floor}
                  </span>
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden aspect-16/9 sm:aspect-16/10 mb-3.5 group">
                <img
                  key={activeProperty.id}
                  src={activeProperty.coverImage}
                  alt={activeProperty.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Specs Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 mb-3.5 border-y border-[#E6E0D8] text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 text-[#4A453E]">
                  <BedDouble className="w-3.5 h-3.5 text-[#9D7C38]" />
                  <span>{activeProperty.bedrooms} {t('spec.bedrooms')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4A453E]">
                  <Bath className="w-3.5 h-3.5 text-[#9D7C38]" />
                  <span>{activeProperty.bathrooms} {t('spec.bathrooms')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4A453E]">
                  <Maximize2 className="w-3.5 h-3.5 text-[#9D7C38]" />
                  <span>{Math.ceil(activeProperty.sizeSqm)} sqm</span>
                </div>
              </div>

              {/* View Residence Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  id={`hero-view-${activeProperty.slug}`}
                  onClick={() => onNavigate(`/properties/${activeProperty.slug}` as PageRoute)}
                  className="w-full bg-[#042F61] hover:bg-[#021B38] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{t('hero.viewDetails')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>
                <a
                  href={activeProperty.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-shine w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Airbnb</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Center Interactive Unit Loop Indicator - Horizontal Lines */}
        <div className="relative z-10 flex justify-center mt-3 pt-1">
          <div className="inline-flex items-center gap-2 py-1">
            {PROPERTIES.map((prop, idx) => {
              const isActive = activeUnitIndex === idx;
              return (
                <button
                  key={prop.id}
                  id={`hero-unit-line-indicator-${idx + 1}`}
                  onClick={() => setActiveUnitIndex(idx)}
                  className="group py-2 px-1 cursor-pointer flex items-center justify-center transition-all"
                  aria-label={`View ${prop.name}`}
                  title={prop.name}
                >
                  <span
                    className={`block h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-out ${
                      isActive
                        ? 'w-10 sm:w-14 bg-[#DFB85A] shadow-[0_0_12px_rgba(223,184,90,0.85)]'
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

