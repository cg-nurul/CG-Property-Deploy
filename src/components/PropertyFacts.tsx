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

  const splitLocation = (loc: string) => {
    if (!loc) return { primary: '', secondary: '' };
    const commaIdx = loc.indexOf(',');
    if (commaIdx !== -1) {
      return {
        primary: loc.slice(0, commaIdx).trim(),
        secondary: loc.slice(commaIdx + 1).trim(),
      };
    }
    return { primary: loc, secondary: '' };
  };

  const locationParts = splitLocation(property.location);

  // 1. Compact Spec Items (Numbers / Core Metrics)
  const compactSpecs = [
    {
      id: 'bedrooms',
      label: t('spec.bedrooms'),
      value: `${property.bedrooms} ${property.bedrooms > 1 ? t('spec.bedrooms') : t('spec.bedroom')}`,
      icon: BedDouble,
    },
    {
      id: 'bathrooms',
      label: t('spec.bathrooms'),
      value: `${property.bathrooms} ${property.bathrooms > 1 ? t('spec.bathrooms') : t('spec.bathroom')}`,
      icon: Bath,
    },
    {
      id: 'size',
      label: t('spec.size'),
      value: `${Math.ceil(property.sizeSqm)} ${t('spec.sqm')}`,
      icon: Maximize2,
    },
    {
      id: 'floor',
      label: t('spec.floor'),
      value: property.floor,
      icon: Layers,
    },
  ];

  // 2. Medium Feature Attributes (Furnishing, Type, and optional Tower)
  const mediumFeatures = [
    ...(property.tower ? [{
      id: 'tower',
      label: t('spec.tower'),
      value: property.tower,
      icon: Building2,
    }] : []),
    {
      id: 'furnished',
      label: t('spec.furnished'),
      value: t('spec.furnishedStatus'),
      icon: Check,
    },
    {
      id: 'type',
      label: t('spec.type'),
      value: t('spec.typeValue'),
      icon: Sparkles,
    },
  ];

  // If 2 items (no tower): 6 cols each on desktop (50% / 50%)
  // If 3 items (with tower): 4 cols each on desktop (33.3% / 33.3% / 33.3%)
  const mediumColSpan = mediumFeatures.length === 2 ? 'sm:col-span-6' : 'sm:col-span-4';

  return (
    <div id="property-facts-grid" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6E0D8]">
        <h3 className="text-xl font-bold text-[#042F61]">
          {t('property.keyFacts')}
        </h3>
        <span className="text-xs text-[#8A8175] font-medium uppercase tracking-wider">
          {property.name}{property.tower ? ` · ${property.tower}` : ''}
        </span>
      </div>

      {/* Grid: 2 columns on mobile, 12 columns on sm/md/lg */}
      <div className="grid grid-cols-2 sm:grid-cols-12 gap-3.5 sm:gap-4">
        {/* Compact Core Metrics (Each takes 1 col on mobile, 3 cols / 25% on desktop) */}
        {compactSpecs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div
              key={spec.id}
              className="col-span-1 sm:col-span-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8]/80 flex flex-col justify-between min-h-[84px] transition-colors hover:border-[#9D7C38]/40"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A8175] uppercase tracking-wider mb-2">
                <Icon className="w-3.5 h-3.5 text-[#9D7C38] shrink-0" />
                <span className="truncate">{spec.label}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#042F61] leading-tight">
                {spec.value}
              </div>
            </div>
          );
        })}

        {/* Medium Attributes (Takes 1 col on mobile, 6 cols / 50% on desktop) */}
        {mediumFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className={`col-span-1 ${mediumColSpan} bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E6E0D8]/80 flex flex-col justify-between min-h-[84px] transition-colors hover:border-[#9D7C38]/40`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A8175] uppercase tracking-wider mb-2">
                <Icon className="w-3.5 h-3.5 text-[#9D7C38] shrink-0" />
                <span className="truncate">{feat.label}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#042F61] leading-tight">
                {feat.value}
              </div>
            </div>
          );
        })}

        {/* Wide Location Pill (Takes full width: col-span-2 on mobile, col-span-12 on desktop) */}
        <div
          className="col-span-2 sm:col-span-12 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E6E0D8]/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 min-h-[84px] transition-colors hover:border-[#9D7C38]/40"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A8175] uppercase tracking-wider mb-1.5 sm:mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#9D7C38] shrink-0" />
              <span>{t('spec.location')}</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-[#042F61] leading-snug">
              <div>{locationParts.primary}</div>
              {locationParts.secondary && (
                <div className="text-xs sm:text-[13px] font-medium text-[#5E574E] mt-0.5 sm:mt-1 leading-normal">
                  {locationParts.secondary}
                </div>
              )}
            </div>
          </div>

          {property.city && property.country && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] shadow-2xs shrink-0 self-start sm:self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D7C38]" />
              <span>{property.district ? `${property.district}, ` : ''}{property.city}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
