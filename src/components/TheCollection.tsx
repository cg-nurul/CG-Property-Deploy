import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Armchair,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface TheCollectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const TheCollection: React.FC<TheCollectionProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const res1 = PROPERTIES[0];
  const res2 = PROPERTIES[1];

  return (
    <section id="the-collection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-14 max-w-2xl">
        <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#042F61] tracking-tight">
          {t('collection.heading')}
        </h2>
        <p className="text-[#5E574E] text-base mt-2 leading-relaxed">
          {t('collection.subheading')}
        </p>
      </div>

      <div className="space-y-16 lg:space-y-24">
        
        {/* RESIDENCE 01 PRESENTATION (Composition A: Large Photo Left, Specs & Story Right) */}
        <div
          id="feature-residence-01"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
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
                <MapPin className="w-3.5 h-3.5 text-[#DFB85A]" />
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
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.bedrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bedrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.bathrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bathrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.size')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {Math.ceil(res1.sizeSqm)} {t('spec.sqm')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Armchair className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.interior')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {t('spec.furnishedStatus')}
                </div>
              </div>
            </div>

            {/* Bottom: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-view-residence-01"
                onClick={() => onNavigate('/properties/residence-01')}
                className="inline-flex items-center gap-2 bg-[#042F61] hover:bg-[#021B38] text-white px-5 sm:px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>{t('collection.viewProperty')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                id="btn-book-residence-01"
                href={res1.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shine inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-full text-xs font-bold tracking-wide cursor-pointer"
              >
                <span>{t('collection.bookNow')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RESIDENCE 02 PRESENTATION (Composition B: Alternating - Specs & Story Left, Photo Right) */}
        <div
          id="feature-residence-02"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
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
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.bedrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  2 {t('spec.bedrooms')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.bathrooms')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  1 {t('spec.bathroom')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.size')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {Math.ceil(res2.sizeSqm)} {t('spec.sqm')}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E0D8]">
                <div className="text-[11px] text-[#8A8175] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Armchair className="w-3.5 h-3.5 text-[#9D7C38]" />
                  {t('spec.interior')}
                </div>
                <div className="text-base font-bold text-[#042F61] mt-1">
                  {t('spec.furnishedStatus')}
                </div>
              </div>
            </div>

            {/* Bottom: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-view-residence-02"
                onClick={() => onNavigate('/properties/residence-02')}
                className="inline-flex items-center gap-2 bg-[#042F61] hover:bg-[#021B38] text-white px-5 sm:px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>{t('collection.viewProperty')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                id="btn-book-residence-02"
                href={res2.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shine inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-full text-xs font-bold tracking-wide cursor-pointer"
              >
                <span>{t('collection.bookNow')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
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
                <MapPin className="w-3.5 h-3.5 text-[#DFB85A]" />
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
        </div>

      </div>
    </section>
  );
};

