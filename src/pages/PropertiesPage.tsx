import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { RippleButton } from '../components/ui/RippleButton';
import { FullToSemiDottedLine } from '../components/ui/FullToSemiDottedLine';
import { 
  FilledBuilding, 
  FilledMapPin, 
  FilledArrowRight, 
  AirbnbIcon 
} from '../components/ui/FilledIcons';

interface PropertiesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [filterCity, setFilterCity] = useState<'all' | 'Bangkok' | 'Hong Kong'>('all');

  const filteredProperties = PROPERTIES.filter((p) => {
    if (filterCity === 'all') return true;
    return p.city === filterCity;
  });

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative overflow-hidden">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <FilledBuilding className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
          <span>Curated Portfolio</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#042F61] tracking-tight">
          {t('collection.heading')}
        </h1>
        <FullToSemiDottedLine className="my-2" />
        <p className="text-base sm:text-lg text-[#5E574E] mt-3 leading-relaxed">
          {language === 'zh'
            ? '探索位于曼谷与中国香港核心区域的高端精装住宅系列。'
            : language === 'th'
            ? 'สัมผัสคอลเลกชันเรสซิเดนซ์หรูพร้อมอยู่ใจกลางกรุงเทพฯ และฮ่องกง'
            : 'Explore our curated collection of furnished luxury residences across premier districts in Bangkok and Hong Kong.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          <button
            onClick={() => setFilterCity('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterCity === 'all'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            All Residences ({PROPERTIES.length})
          </button>
          <button
            onClick={() => setFilterCity('Bangkok')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterCity === 'Bangkok'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            Bangkok, Thailand (2)
          </button>
          <button
            onClick={() => setFilterCity('Hong Kong')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterCity === 'Hong Kong'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            Hong Kong SAR (1)
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-12">
        {filteredProperties.map((prop, idx) => (
          <motion.div
            key={prop.id}
            id={`property-card-${prop.slug}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Image */}
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div 
                className="relative rounded-2xl overflow-hidden aspect-16/10 group cursor-pointer"
                onClick={() => onNavigate(`/properties/${prop.slug}` as PageRoute)}
              >
                <img
                  src={prop.coverImage}
                  alt={prop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <FilledMapPin className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />
                  <span>{prop.city}, {prop.country}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#042F61] text-xs font-bold px-3 py-1 rounded-lg">
                  {prop.tower} · {prop.floor}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9D7C38] font-bold">
                  {prop.tower} · {prop.floor}
                </span>
                <h2 className="text-3xl font-bold text-[#042F61] mt-1">
                  {prop.name}
                </h2>
                <p className="text-xs text-[#8A8175] font-semibold mt-0.5">
                  {prop.location}, {prop.city}, {prop.country}
                </p>
              </div>

              <p className="text-sm text-[#5E574E] leading-relaxed">
                {prop.overview[language] || prop.overview.en}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0D8]">
                  <div className="text-[10px] text-[#8A8175] uppercase font-bold">Bedrooms</div>
                  <div className="text-sm font-bold text-[#042F61] mt-0.5">{prop.bedrooms} Bed</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0D8]">
                  <div className="text-[10px] text-[#8A8175] uppercase font-bold">Bathrooms</div>
                  <div className="text-sm font-bold text-[#042F61] mt-0.5">{prop.bathrooms} Bath</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0D8]">
                  <div className="text-[10px] text-[#8A8175] uppercase font-bold">Size</div>
                  <div className="text-sm font-bold text-[#042F61] mt-0.5">{Math.ceil(prop.sizeSqm)} sqm</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E0D8]">
                  <div className="text-[10px] text-[#8A8175] uppercase font-bold">Elevation</div>
                  <div className="text-sm font-bold text-[#042F61] mt-0.5">{prop.floor}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 items-center pt-2">
                <RippleButton
                  id={`btn-explore-${prop.slug}`}
                  variant="primary"
                  onClick={() => onNavigate(`/properties/${prop.slug}` as PageRoute)}
                  className="px-5 py-3 rounded-full text-xs font-semibold tracking-wide"
                >
                  <span>{t('collection.viewResidence')}</span>
                  <FilledArrowRight className="w-4 h-4 text-white fill-current" />
                </RippleButton>

                <a
                  href={prop.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EDE8E1] hover:bg-[#E3DCD3] text-[#2D2A26] px-5 py-3 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>{t('booking.airbnbCta')}</span>
                  <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
