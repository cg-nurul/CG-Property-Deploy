import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { BRAND_CONFIG } from '../data/properties';
import { Building2, Sparkles, MapPin, Compass, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>Brand Profile</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#042F61] tracking-tight">
          {t('about.title')}
        </h1>
        <p className="text-lg sm:text-xl text-[#5E574E] mt-4 leading-relaxed font-normal">
          {t('about.statement')}
        </p>
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Our Focus */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0D8] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDE8E1] flex items-center justify-center text-[#042F61]">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#042F61]">
              {t('about.philosophyTitle')}
            </h2>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {t('about.philosophyText')}
            </p>
          </div>
          <div className="pt-4 border-t border-[#E6E0D8] text-xs text-[#8A8175]">
            Curated hospitality experience built around verified quality.
          </div>
        </div>

        {/* The Bangkok Collection */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0D8] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDE8E1] flex items-center justify-center text-[#042F61]">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="font-editorial text-2xl font-normal text-[#042F61]">
              {t('about.collectionTitle')}
            </h2>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {t('about.collectionText')}
            </p>
          </div>
          <div className="pt-4 border-t border-[#E6E0D8]">
            <button
              onClick={() => onNavigate('/properties')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#042F61] hover:text-[#9D7C38] transition-colors cursor-pointer"
            >
              <span>Explore the 2 residences</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#042F61]" />
            </button>
          </div>
        </div>

      </div>

      {/* Brand Commitment Banner */}
      <div className="bg-[#042F61] text-white rounded-3xl p-8 sm:p-12 border border-[#021B38] shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
            Forward Perspective
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
            {t('future.heading')}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-normal">
            {t('future.subheading')}
          </p>
        </div>
      </div>

    </div>
  );
};
