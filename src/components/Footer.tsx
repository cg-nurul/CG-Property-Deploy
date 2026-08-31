import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG, PROPERTIES } from '../data/properties';
import { PageRoute, Language } from '../types';
import { BRAND_ASSETS } from '../constants/brand';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English (EN)' },
    { code: 'zh', label: '中文 (ZH)' },
    { code: 'th', label: 'ไทย (TH)' },
  ];

  return (
    <footer id="main-footer" className="bg-[#042F61] text-white pt-16 pb-12 border-t border-[#021B38]">
      <div className="max-w-[2560px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <img
                  src={BRAND_ASSETS.logoLandscapeFooterWhite}
                  alt="CG Property"
                  className="h-[100px] w-auto object-contain"
                  style={{ height: '100px' }}
                />
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              {t('intro.heading')}
            </p>
            <div className="pt-2 text-xs text-white/60 space-y-1">
              <p>Primary Location: {BRAND_CONFIG.primaryLocation}</p>
              <p>{BRAND_CONFIG.addressNotice}</p>
            </div>
          </div>

          {/* Properties Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
              {t('collection.heading')}
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              {PROPERTIES.map((prop) => (
                <li key={prop.id}>
                  <button
                    onClick={() => {
                      onNavigate(`/properties/${prop.slug}` as PageRoute);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
                  >
                    <span>{prop.name} · {prop.tower}</span>
                    <span className="text-[10px] text-white/50 group-hover:text-[#DFB85A]">{prop.floor}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('/properties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#DFB85A] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>{t('nav.exploreResidences')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations & Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
              {t('nav.destinations')}
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/destinations/thailand/bangkok');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bangkok, Thailand
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/destinations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Destinations
                </button>
              </li>
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    onNavigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Booking & Language */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
              Reservations &amp; Language
            </h4>
            
            {/* Airbnb Partner Badge */}
            <a
              href={BRAND_CONFIG.airbnbGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors group text-xs"
            >
              <div>
                <span className="font-semibold text-white block">Airbnb Host Profile</span>
                <span className="text-[11px] text-white/70">Verified Rama 9 Collection</span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#DFB85A] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Language Selector */}
            <div className="pt-2">
              <label className="text-[11px] text-white/70 block mb-1.5 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#DFB85A]" />
                <span>Select Language</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-[#DFB85A] text-[#042F61] font-bold shadow-xs'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} CG Property. {t('footer.rights')}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('legal.privacy')}
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('legal.terms')}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
