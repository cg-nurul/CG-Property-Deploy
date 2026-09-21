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
    <footer id="main-footer" className="relative bg-[#042F61] text-white pt-16 pb-0 border-t border-[#021B38] overflow-hidden">
      {/* Background Architectural Pattern (Most Back Layer) */}
      <div 
        className="absolute inset-0 pointer-events-none footer-pattern-bg -z-0" 
        style={{ opacity: 'var(--footer-pattern-opacity, 0.4)' }}
        aria-hidden="true" 
      />

      <div 
        className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#DFB85A]/10 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-[2560px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Main Footer Grid Container */}
        <div className="relative" style={{ paddingBottom: '30px' }}>
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 relative z-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <img
                  src={BRAND_ASSETS.logoLandscapeFooterWhite}
                  alt="CG Property"
                  className="footer-brand-logo w-auto object-contain"
                  style={{
                    height: '120px',
                    marginTop: '-50px',
                    marginLeft: '-30px',
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-white/95 leading-relaxed max-w-sm">
              {t('intro.heading')}
            </p>
            <div className="pt-2 text-xs text-white/85 space-y-1">
              <p><span className="text-white font-medium">Global Hubs:</span> Bangkok, Thailand · Hong Kong SAR</p>
              <p className="text-white/80">Directly serviced residences across premier international destinations</p>
            </div>
          </div>

          {/* Properties Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5D278]">
              {t('collection.heading')}
            </h4>
            <ul className="space-y-2 text-xs text-white/90">
              {PROPERTIES.map((prop) => (
                <li key={prop.id}>
                  <button
                    onClick={() => {
                      onNavigate(`/properties/${prop.slug}` as PageRoute);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
                  >
                    <span className="text-white/95 group-hover:text-white font-normal">{prop.name} · {prop.tower}</span>
                    <span className="text-[10px] text-white/75 group-hover:text-[#F5D278] transition-colors">{prop.floor}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('/properties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F5D278] hover:text-white hover:underline inline-flex items-center gap-1 cursor-pointer font-semibold transition-colors"
                >
                  <span>{t('nav.exploreResidences')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations & Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5D278]">
              {t('nav.destinations')}
            </h4>
            <ul className="space-y-2 text-xs text-white/90">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/destinations/thailand/bangkok');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/95 hover:text-[#F5D278] transition-colors cursor-pointer"
                >
                  Bangkok, Thailand
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/destinations/hong-kong');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/95 hover:text-[#F5D278] transition-colors cursor-pointer"
                >
                  Hong Kong SAR
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/destinations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/95 hover:text-[#F5D278] transition-colors cursor-pointer"
                >
                  All Destinations
                </button>
              </li>
              <li className="pt-2 border-t border-white/20">
                <button
                  onClick={() => {
                    onNavigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/95 hover:text-[#F5D278] transition-colors cursor-pointer"
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
                  className="text-white/95 hover:text-[#F5D278] transition-colors cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Booking & Language */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5D278]">
              Reservations &amp; Language
            </h4>
            
            {/* Airbnb Partner Badge */}
            <a
              href={BRAND_CONFIG.airbnbGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors group text-xs"
            >
              <div>
                <span className="font-semibold text-white block">Airbnb Host Profile</span>
                <span className="text-[11px] text-white/90">Verified Rama 9 Collection</span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#F5D278] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Language Selector */}
            <div className="pt-2">
              <label className="text-[11px] text-white/90 font-medium block mb-1.5 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#F5D278]" />
                <span>Select Language</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-[#F5D278] text-[#042F61] font-bold shadow-xs'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          </div>

          {/* Divider Line (Positioned behind the bottom center graphic layer) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-px bg-white/20 pointer-events-none z-[1]" 
            aria-hidden="true" 
          />
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90 relative z-10">
          <div>
            © {new Date().getFullYear()} CG Property. {t('footer.rights')}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              {t('legal.privacy')}
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              {t('legal.terms')}
            </button>
          </div>
        </div>

      </div>

      {/* Layered Architectural Skyline Graphic (In front of divider line, behind text content) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[1152px] pointer-events-none z-[2] flex justify-center items-end select-none"
        aria-hidden="true"
      >
        <img
          src={BRAND_ASSETS.footerGraphicSvg}
          alt="CG Property Skyline Silhouette"
          className="w-full h-auto object-contain object-bottom block"
          loading="lazy"
        />
      </div>
    </footer>
  );
};
