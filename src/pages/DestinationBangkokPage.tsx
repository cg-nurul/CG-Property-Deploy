import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { PROPERTIES } from '../data/properties';
import { MapPin, Building2, ChevronLeft, ArrowRight, BedDouble, Bath, Maximize2 } from 'lucide-react';

interface DestinationBangkokPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const DestinationBangkokPage: React.FC<DestinationBangkokPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Back Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/destinations"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/destinations');
          }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] hover:text-[#042F61] hover:border-[#DFB85A] hover:bg-[#FAF8F5] transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-[#9D7C38] transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{language === 'zh' ? '返回目的地列表' : language === 'th' ? 'กลับสู่จุดหมายปลายทาง' : 'Back to Destinations'}</span>
        </a>

        <div className="flex items-center gap-1.5 text-xs text-[#8A8175]">
          <a
            href="/destinations"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/destinations');
            }}
            className="hover:text-[#042F61] hover:underline transition-colors"
          >
            Thailand
          </a>
          <span>/</span>
          <span className="font-semibold text-[#042F61]">Bangkok</span>
          <span>/</span>
          <span>Nue District Rama 9</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[380px] bg-[#14171A] text-white flex flex-col justify-end p-6 sm:p-10 border border-[#2B2E33] shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2000&q=80"
          alt="Bangkok Skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#DFB85A] text-xs font-semibold uppercase tracking-widest border border-white/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Thailand Destination</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Bangkok
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            {t('bangkok.subheading')}
          </p>
        </div>
      </div>

      {/* District Story: Nue District Rama 9 */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-xs space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9D7C38]">
            Curated District
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#042F61]">
            {t('location.heading')}
          </h2>
          <p className="text-sm text-[#5E574E] leading-relaxed">
            {t('location.description')}
          </p>
        </div>

        {/* Residences in Bangkok Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {PROPERTIES.filter((p) => p.city === 'Bangkok').map((prop) => (
            <div
              key={prop.id}
              className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E6E0D8] flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9D7C38]">
                    {prop.tower} · {prop.floor}
                  </span>
                  <span className="text-xs font-semibold bg-[#EDE8E1] px-2.5 py-0.5 rounded-md text-[#042F61]">
                    {Math.ceil(prop.sizeSqm)} sqm
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#042F61]">
                  {prop.name}
                </h3>
                <p className="text-xs text-[#5E574E] mt-2 leading-relaxed line-clamp-2">
                  {prop.overview[language] || prop.overview.en}
                </p>
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-[#4A453E] pt-3 border-t border-[#E6E0D8]">
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{prop.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{prop.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{Math.ceil(prop.sizeSqm)} m²</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate(`/properties/${prop.slug}` as PageRoute)}
                className="w-full bg-[#042F61] hover:bg-[#021B38] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View {prop.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
