import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { RippleButton } from './ui/RippleButton';
import { FullToSemiDottedLine } from './ui/FullToSemiDottedLine';
import { 
  FilledMapPin, 
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

  return (
    <section id="the-collection" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="max-w-2xl">
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#042F61] tracking-tight">
            {t('collection.heading')}
          </h2>
          <FullToSemiDottedLine className="my-2" />
          <p className="text-[#5E574E] text-base mt-2 leading-relaxed">
            {t('collection.subheading')}
          </p>
        </div>
      </motion.div>

      <div className="relative z-10 space-y-16 lg:space-y-24">
        
        {/* RESIDENCE 01 PRESENTATION (Composition A: Large Photo Left, Specs & Story Right) */}
        <motion.div
          id="feature-residence-01"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm hover:shadow-md card-interactive-glow transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* Photo Column */}
          <div className="lg:col-span-7 h-full">
            <div 
              className="relative rounded-2xl overflow-hidden aspect-4/3 w-full h-full min-h-[320px] sm:min-h-[380px] group cursor-pointer" 
              onClick={() => onNavigate('/properties/residence-01')}
            >
              <img
                src={res1.coverImage}
                alt={res1.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                <span>{res1.location}</span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                <span className="bg-[#042F61]/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {res1.tower}
                </span>
                <span className="bg-white/95 backdrop-blur-md text-[#042F61] text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                  {res1.floor}
                </span>
              </div>
            </div>
          </div>

          {/* Details Column (Stretched & Spaced from top to bottom) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-0.5 space-y-6 lg:space-y-0">
            {/* Top: Title, Location, and Overview */}
            <div className="space-y-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#042F61] leading-tight">
                  {res1.name}
                </h3>
                <p className="text-xs text-[#9D7C38] uppercase tracking-wider font-semibold mt-1">
                  {res1.location} · {res1.city}
                </p>
              </div>

              <p className="text-sm text-[#5E574E] leading-relaxed">
                {res1.overview[language] || res1.overview.en}
              </p>
            </div>

            {/* Middle: Architectural Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 my-4 lg:my-auto">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledBed className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.bedrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bedrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledBath className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.bathrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bathrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledArea className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.size')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {Math.ceil(res1.sizeSqm)} {t('spec.sqm')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledArmchair className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.interior')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {t('spec.furnishedStatus')}
                </div>
              </div>
            </div>

            {/* Bottom: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <RippleButton
                id="btn-view-residence-01"
                variant="primary"
                onClick={() => onNavigate('/properties/residence-01')}
                className="px-5 sm:px-6 py-3 rounded-full text-xs font-semibold tracking-wide"
              >
                <span>{t('collection.viewProperty')}</span>
                <FilledArrowRight className="w-4 h-4 text-white fill-current" />
              </RippleButton>

              <a
                id="btn-book-residence-01"
                href={res1.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shine inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-full text-xs font-bold tracking-wide cursor-pointer"
              >
                <span>{t('collection.bookNow')}</span>
                <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RESIDENCE 02 PRESENTATION (Composition B: Alternating - Specs & Story Left, Photo Right) */}
        <motion.div
          id="feature-residence-02"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm hover:shadow-md card-interactive-glow transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* Details Column (Left on Desktop, Stretched & Spaced from top to bottom) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between h-full py-0.5 space-y-6 lg:space-y-0">
            {/* Top: Title, Location, and Overview */}
            <div className="space-y-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#042F61] leading-tight">
                  {res2.name}
                </h3>
                <p className="text-xs text-[#9D7C38] uppercase tracking-wider font-semibold mt-1">
                  {res2.location} · {res2.city}
                </p>
              </div>

              <p className="text-sm text-[#5E574E] leading-relaxed">
                {res2.overview[language] || res2.overview.en}
              </p>
            </div>

            {/* Middle: Architectural Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 my-4 lg:my-auto">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledBed className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.bedrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bedrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledBath className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.bathrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  1 {t('spec.bathroom')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledArea className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.size')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {Math.ceil(res2.sizeSqm)} {t('spec.sqm')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white transition-all duration-200">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FilledArmchair className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
                  {t('spec.interior')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {t('spec.furnishedStatus')}
                </div>
              </div>
            </div>

            {/* Bottom: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <RippleButton
                id="btn-view-residence-02"
                variant="primary"
                onClick={() => onNavigate('/properties/residence-02')}
                className="px-5 sm:px-6 py-3 rounded-full text-xs font-semibold tracking-wide"
              >
                <span>{t('collection.viewProperty')}</span>
                <FilledArrowRight className="w-4 h-4 text-white fill-current" />
              </RippleButton>

              <a
                id="btn-book-residence-02"
                href={res2.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shine inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-full text-xs font-bold tracking-wide cursor-pointer"
              >
                <span>{t('collection.bookNow')}</span>
                <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Photo Column (Right on Desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-full">
            <div 
              className="relative rounded-2xl overflow-hidden aspect-4/3 w-full h-full min-h-[320px] sm:min-h-[380px] group cursor-pointer" 
              onClick={() => onNavigate('/properties/residence-02')}
            >
              <img
                src={res2.coverImage}
                alt={res2.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                <span>{res2.location}</span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                <span className="bg-[#042F61]/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {res2.tower}
                </span>
                <span className="bg-white/95 backdrop-blur-md text-[#042F61] text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                  {res2.floor}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

