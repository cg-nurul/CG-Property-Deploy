import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { DESTINATIONS, PROPERTIES } from '../data/properties';
import { Globe2, MapPin, Building2, ArrowRight, Sparkles } from 'lucide-react';

interface DestinationsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <Globe2 className="w-3.5 h-3.5 text-[#9D7C38]" />
          <span>Global Presence</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#042F61] tracking-tight">
          {t('destinations.title')}
        </h1>
        <p className="text-base sm:text-lg text-[#5E574E] mt-3 leading-relaxed">
          {t('destinations.subheading')}
        </p>
      </div>

      {/* Destinations List */}
      <div className="space-y-12">
        {DESTINATIONS.map((dest, idx) => {
          const destProperties = PROPERTIES.filter((p) => 
            dest.id === 'hong-kong' ? p.city === 'Hong Kong' : p.city === 'Bangkok'
          );
          const isHK = dest.id === 'hong-kong';
          const destinationUrl: PageRoute = isHK ? '/destinations/hong-kong' : '/destinations/thailand/bangkok';

          return (
            <div 
              key={dest.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div 
                  className="relative rounded-2xl overflow-hidden aspect-16/10 cursor-pointer group"
                  onClick={() => onNavigate(destinationUrl)}
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.name.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#DFB85A] font-semibold">Active Destination</span>
                    <h3 className="text-2xl font-bold">{dest.name[language] || dest.name.en}, {dest.country[language] || dest.country.en}</h3>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9D7C38]">
                    {isHK ? 'East Asia' : 'Southeast Asia'}
                  </span>
                  <h2 className="text-3xl font-bold text-[#042F61] mt-1">
                    {dest.name[language] || dest.name.en}
                  </h2>
                  <p className="text-xs text-[#8A8175] font-semibold mt-0.5">
                    {isHK ? 'Mid-Levels & Central · 1 Furnished Residence' : 'Nue District Rama 9 · 2 Furnished Residences'}
                  </p>
                </div>

                <p className="text-sm text-[#5E574E] leading-relaxed">
                  {dest.description[language] || dest.description.en}
                </p>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8] space-y-2 text-xs">
                  <div className="font-bold text-[#042F61] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#9D7C38]" />
                    <span>Residences in {dest.name[language] || dest.name.en}:</span>
                  </div>
                  <ul className="space-y-1.5 text-[#5E574E] pl-5 list-disc">
                    {destProperties.map((p) => (
                      <li key={p.id}>
                        <span className="font-medium text-[#042F61]">{p.name}</span> — {p.tower}, {p.floor} ({Math.ceil(p.sizeSqm)} sqm, {p.bedrooms} Bed / {p.bathrooms} Bath)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate(destinationUrl)}
                    className="bg-[#042F61] hover:bg-[#021B38] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Explore {dest.name[language] || dest.name.en}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => onNavigate('/properties')}
                    className="bg-[#EDE8E1] hover:bg-[#E3DCD3] text-[#042F61] px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                  >
                    View Residences
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Future Scalability Framework Card */}
      <div className="bg-[#042F61] rounded-3xl p-8 sm:p-12 border border-[#021B38] text-center max-w-3xl mx-auto space-y-4 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFB85A] text-xs font-semibold uppercase tracking-widest border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>Future Expansion</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
          {t('future.heading')}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed">
          {t('future.subheading')}
        </p>
      </div>

    </div>
  );
};
