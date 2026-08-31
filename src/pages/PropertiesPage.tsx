import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTIES } from '../data/properties';
import { PageRoute } from '../types';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  Maximize2, 
  BedDouble, 
  Bath, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PropertiesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [filterTower, setFilterTower] = useState<'all' | 'Tower R' | 'Tower N'>('all');

  const filteredProperties = PROPERTIES.filter((p) => {
    if (filterTower === 'all') return true;
    return p.tower === filterTower;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>The Rama 9 Collection</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#042F61] tracking-tight">
          {t('collection.heading')}
        </h1>
        <p className="text-base sm:text-lg text-[#5E574E] mt-3 leading-relaxed">
          {t('collection.subheading')}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-6">
          <button
            onClick={() => setFilterTower('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterTower === 'all'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            All Residences (2)
          </button>
          <button
            onClick={() => setFilterTower('Tower R')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterTower === 'Tower R'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            Tower R (16th Floor)
          </button>
          <button
            onClick={() => setFilterTower('Tower N')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterTower === 'Tower N'
                ? 'bg-[#042F61] text-white shadow-xs'
                : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61]'
            }`}
          >
            Tower N (40th Floor)
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-12">
        {filteredProperties.map((prop, idx) => (
          <div
            key={prop.id}
            id={`property-card-${prop.slug}`}
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
                  <MapPin className="w-3.5 h-3.5 text-[#DFB85A]" />
                  <span>{prop.location}</span>
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
                  {prop.location}, Bangkok, Thailand
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
                <button
                  id={`btn-explore-${prop.slug}`}
                  onClick={() => onNavigate(`/properties/${prop.slug}` as PageRoute)}
                  className="bg-[#042F61] hover:bg-[#021B38] text-white px-5 py-3 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <span>{t('collection.viewResidence')}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <a
                  href={prop.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EDE8E1] hover:bg-[#E3DCD3] text-[#2D2A26] px-5 py-3 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>{t('booking.airbnbCta')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8A8175]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
