import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArchitecturalEmblem } from './ui/ArchitecturalEmblem';
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
    <section id="why-cg-property-section" className="relative pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-10 sm:pb-12 md:pb-14 lg:pb-16 px-[14px] w-full max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <span 
          className="text-[11px] sm:text-xs uppercase font-bold text-[#9D7C38] block mb-2 sm:mb-3"
          style={{ wordSpacing: 'clamp(8px, 1.5vw, 18px)', letterSpacing: 'clamp(2px, 0.4vw, 4px)' }}
        >
          {t('why.eyebrow')}
        </span>

        <h2 
          className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#042F61] tracking-tight mb-3"
          style={{ wordSpacing: 'clamp(4px, 1vw, 8px)' }}
        >
          {t('why.heading')}
        </h2>

        <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed font-normal max-w-2xl mx-auto">
          {t('why.subheading')}
        </p>
      </motion.div>

      {/* 6 Features Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: (index % 3) * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative overflow-hidden text-center flex flex-col items-center group cursor-default p-5 sm:p-6 lg:p-7 rounded-3xl bg-white/60 hover:bg-white border border-[#E6E0D8]/80 hover:border-[#588BC7]/50 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Left-to-Right Animated Shine Highlight */}
              <div 
                className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none -z-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(223, 184, 90, 0.15) 35%, rgba(214, 233, 255, 0.45) 50%, rgba(88, 139, 199, 0.2) 65%, transparent 100%)',
                  transform: 'skewX(-20deg)'
                }}
              />

              {/* Clean Sized Icon with subtle reactive micro-ambient aura on hover */}
              <div className="relative z-10 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 w-12 h-12 -translate-x-1 -translate-y-1 rounded-full bg-[#D6E9FF]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-[#042F61] transition-colors duration-200 group-hover:text-[#235894]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title with Editorial Italic Highlight + Editorial Rest */}
              <h3 
                className="relative z-10 text-xl sm:text-2xl text-[#042F61] mb-2.5 font-normal tracking-tight transition-colors duration-200 group-hover:text-[#044561]"
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
              <p className="relative z-10 text-xs sm:text-sm text-[#6B645A] leading-relaxed max-w-xs font-normal">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

