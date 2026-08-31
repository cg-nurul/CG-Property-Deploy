import React from 'react';
import { Hero } from '../components/Hero';
import { BrandIntro } from '../components/BrandIntro';
import { TheCollection } from '../components/TheCollection';
import { AmenitiesSection } from '../components/AmenitiesSection';
import { LocationSection } from '../components/LocationSection';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { Mail, MessageSquare } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Hero Component with Visual Reference Aesthetic */}
      <Hero onNavigate={onNavigate} />

      {/* Brand Introduction Section */}
      <BrandIntro />

      {/* The Rama 9 Collection Editorial Presentation (The Tower R Suite & The Tower N Sky Suite) */}
      <TheCollection onNavigate={onNavigate} />

      {/* Visual Building and In-Residence Amenities Showcase */}
      <AmenitiesSection />

      {/* Location (Nue District Rama 9 & Bangkok) and Expansion */}
      <LocationSection onNavigate={onNavigate} />

      {/* Direct Contact Section on Homepage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5 text-[#DFB85A]" />
              <span>
                {language === 'zh' ? '联系我们' : language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#042F61]">
              {t('contact.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed">
              {t('contact.subheading')}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
