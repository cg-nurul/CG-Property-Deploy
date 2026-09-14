import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute, Language } from '../types';
import { BRAND_ASSETS } from '../constants/brand';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Dock } from './ui/Dock';
import { 
  GoogleTranslateIcon, 
  FilledHome, 
  FilledBuilding, 
  FilledMapPin, 
  FilledInfo, 
  FilledPhone 
} from './ui/FilledIcons';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: PageRoute; active: boolean }[] = [
    { label: t('nav.home'), route: '/', active: currentRoute === '/' },
    { 
      label: t('nav.properties'), 
      route: '/properties', 
      active: currentRoute.startsWith('/properties') 
    },
    { 
      label: t('nav.destinations'), 
      route: '/destinations', 
      active: currentRoute.startsWith('/destinations') 
    },
    { label: t('nav.about'), route: '/about', active: currentRoute === '/about' },
    { label: t('nav.contact'), route: '/contact', active: currentRoute === '/contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
    { code: 'th', label: 'ไทย' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md py-1 shadow-xs border-b border-[#E6E0D8]'
          : 'bg-transparent py-1 sm:py-2'
      }`}
    >
      <div className="max-w-[2560px] w-full mx-auto px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="pointer-events-auto flex items-center text-left group cursor-pointer focus:outline-hidden py-0.5"
          >
            <img
              src={BRAND_ASSETS.logoLandscapeColor}
              alt="CG Property"
              className="min-h-[100px] h-[100px] w-auto object-contain transition-transform group-hover:scale-102"
              style={{ minHeight: '100px' }}
            />
          </button>

          {/* Desktop Navigation Dock (ReactBits Dock with fluid cursor magnification) */}
          <Dock items={navItems} onSelect={handleNavClick} />

          {/* Right Header Actions: Language */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div
              id="language-switcher"
              className="pointer-events-auto flex items-center gap-[5px] bg-[#EDE8E1]/80 backdrop-blur-md p-1 rounded-full border border-[#DFD8CE]"
            >
              <span className="text-[#5E574E] ml-2 mr-0.5 flex items-center shrink-0">
                <GoogleTranslateIcon className="w-4 h-4 fill-current" />
              </span>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#042F61] text-white shadow-xs'
                      : 'text-[#5E574E] hover:text-[#042F61] hover:bg-[#E3DCD3]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Actions: Language & Hamburger */}
          <div className="relative pointer-events-auto flex md:hidden items-center gap-2">
            {/* Mobile Translate Pill - Height matched with menu button */}
            <div className="h-[38px] flex items-center gap-1 bg-[#EDE8E1] px-2 rounded-full border border-[#DFD8CE] box-border">
              <span className="text-[#5E574E] mr-0.5 flex items-center shrink-0">
                <GoogleTranslateIcon className="w-3.5 h-3.5 fill-current" />
              </span>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`h-[28px] px-2 flex items-center justify-center rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#042F61] text-white shadow-xs'
                      : 'text-[#5E574E] hover:text-[#042F61]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('nav.menu')}
              aria-expanded={mobileMenuOpen}
              className="h-[38px] w-[38px] flex items-center justify-center rounded-xl bg-[#EDE8E1] text-[#042F61] border border-[#DFD8CE] focus:outline-hidden cursor-pointer transition-colors hover:bg-[#E3DCD3]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Dropdown Menu: Positioned directly beneath button without gap, animated with AnimatePresence */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  {/* Click-away backdrop */}
                  <div
                    className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
                    onClick={() => setMobileMenuOpen(false)}
                  />

                  {/* Animated Dropdown Card */}
                  <motion.div
                    id="mobile-nav-drawer"
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-1.5 w-[min(300px,calc(100vw-24px))] z-50 bg-[#FAF8F5] rounded-2xl border border-[#E6E0D8] p-2.5 shadow-2xl origin-top-right overflow-hidden"
                  >
                    <div className="flex flex-col gap-1.5">
                      {navItems.map((item) => {
                        const getMobileIcon = (route: PageRoute) => {
                          if (route === '/') return <FilledHome className="w-4 h-4 shrink-0 fill-current" />;
                          if (route.startsWith('/properties')) return <FilledBuilding className="w-4 h-4 shrink-0 fill-current" />;
                          if (route.startsWith('/destinations')) return <FilledMapPin className="w-4 h-4 shrink-0 fill-current" />;
                          if (route === '/about') return <FilledInfo className="w-4 h-4 shrink-0 fill-current" />;
                          if (route === '/contact') return <FilledPhone className="w-4 h-4 shrink-0 fill-current" />;
                          return null;
                        };

                        return (
                          <button
                            key={item.route}
                            onClick={() => handleNavClick(item.route)}
                            className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                              item.active
                                ? 'bg-[#042F61] text-white shadow-xs'
                                : 'text-[#2D2A26] hover:bg-[#EDE8E1]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="shrink-0 flex items-center text-current">
                                {getMobileIcon(item.route)}
                              </span>
                              <span>{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-70" />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
