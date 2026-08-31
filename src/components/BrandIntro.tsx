import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  MapPin, 
  Award, 
  CalendarCheck 
} from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      id: 'carefully-selected',
      icon: ShieldCheck,
      highlight: 'Carefully',
      rest: 'Selected',
      title: t('why.feature1.title'),
      desc: t('why.feature1.desc'),
    },
    {
      id: 'quality-accommodation',
      icon: Building2,
      highlight: 'Quality',
      rest: 'Accommodation',
      title: t('why.feature2.title'),
      desc: t('why.feature2.desc'),
    },
    {
      id: 'trusted-management',
      icon: Users,
      highlight: 'Trusted',
      rest: 'Management',
      title: t('why.feature3.title'),
      desc: t('why.feature3.desc'),
    },
    {
      id: 'memorable-locations',
      icon: MapPin,
      highlight: 'Memorable',
      rest: 'Locations',
      title: t('why.feature4.title'),
      desc: t('why.feature4.desc'),
    },
    {
      id: 'professional-service',
      icon: Award,
      highlight: 'Professional',
      rest: 'Service',
      title: t('why.feature5.title'),
      desc: t('why.feature5.desc'),
    },
    {
      id: 'easy-booking',
      icon: CalendarCheck,
      highlight: 'Easy',
      rest: 'Booking',
      title: t('why.feature6.title'),
      desc: t('why.feature6.desc'),
    },
  ];

  return (
    <section id="why-cg-property-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span 
          className="text-[11px] sm:text-xs uppercase font-bold text-[#9D7C38] block mb-3"
          style={{ wordSpacing: '20px', letterSpacing: '5px' }}
        >
          {t('why.eyebrow')}
        </span>

        <h2 
          className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#042F61] tracking-tight mb-5"
          style={{ wordSpacing: '10px' }}
        >
          {t('why.heading')}
        </h2>

        <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed font-normal max-w-2xl mx-auto">
          {t('why.subheading')}
        </p>
      </div>

      {/* 6 Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 sm:gap-y-16 gap-x-8 lg:gap-x-12 mt-16 sm:mt-20">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="text-center flex flex-col items-center">
              {/* Clean Sized Icon without background container */}
              <div className="mb-4 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-[#042F61]" strokeWidth={1.5} />
              </div>

              {/* Title with Editorial Italic Highlight + Editorial Rest */}
              <h3 
                className="text-xl sm:text-2xl text-[#042F61] mb-2.5 font-normal tracking-tight"
                style={{ wordSpacing: '5px' }}
              >
                {language === 'en' ? (
                  <>
                    <span className="font-editorial italic">{item.highlight}</span>{' '}
                    <span className="font-editorial">{item.rest}</span>
                  </>
                ) : (
                  <span className="font-bold">{item.title}</span>
                )}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6B645A] leading-relaxed max-w-xs font-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
