import React from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Layers, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Check, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface PropertyFactsProps {
  property: Property;
}

export const PropertyFacts: React.FC<PropertyFactsProps> = ({ property }) => {
  const { t } = useLanguage();

  const facts = [
    {
      label: t('spec.bedrooms'),
      value: `${property.bedrooms} ${property.bedrooms > 1 ? t('spec.bedrooms') : t('spec.bedroom')}`,
      icon: BedDouble,
    },
    {
      label: t('spec.bathrooms'),
      value: `${property.bathrooms} ${property.bathrooms > 1 ? t('spec.bathrooms') : t('spec.bathroom')}`,
      icon: Bath,
    },
    {
      label: t('spec.size'),
      value: `${Math.ceil(property.sizeSqm)} ${t('spec.sqm')}`,
      icon: Maximize2,
    },
    {
      label: t('spec.floor'),
      value: property.floor,
      icon: Layers,
    },
    {
      label: t('spec.tower'),
      value: property.tower,
      icon: Building2,
    },
    {
      label: t('spec.furnished'),
      value: t('spec.furnishedStatus'),
      icon: Check,
    },
    {
      label: t('spec.location'),
      value: property.location,
      icon: MapPin,
    },
    {
      label: t('spec.type'),
      value: t('spec.typeValue'),
      icon: Sparkles,
    },
  ];

  return (
    <div id="property-facts-grid" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6E0D8]">
        <h3 className="text-xl font-bold text-[#042F61]">
          {t('property.keyFacts')}
        </h3>
        <span className="text-xs text-[#8A8175] font-medium uppercase tracking-wider">
          {property.name} · {property.tower}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {facts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div
              key={index}
              className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8]/80 flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A8175] uppercase tracking-wider mb-2">
                <Icon className="w-3.5 h-3.5 text-[#DFB85A]" />
                <span>{fact.label}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#042F61]">
                {fact.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
