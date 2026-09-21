import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Globe2, 
  ShieldCheck, 
  Sparkle, 
  Headphones, 
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-20">
      
      {/* Page Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest border border-[#DFD8CE]">
          <Sparkles className="w-3.5 h-3.5 text-[#9D7C38]" />
          <span>{t('about.eyebrow')}</span>
        </div>
        
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#042F61] tracking-tight leading-[1.12]">
          {t('about.title')}
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-[#5E574E] leading-relaxed font-normal max-w-3xl">
          {t('about.statement')}
        </p>

        {/* Quick Identity Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#9D7C38]" />
            {language === 'zh' ? '全球据点：曼谷与中国香港' : language === 'th' ? 'จุดหมายสำคัญ: กรุงเทพฯ และฮ่องกง' : 'Global Hubs: Bangkok & Hong Kong'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 text-[#9D7C38]" />
            {language === 'zh' ? '全球愿景：世界主要都会' : language === 'th' ? 'วิสัยทัศน์: ขยายสู่จุดหมายสำคัญทั่วโลก' : 'Global Scope: Worldwide Expansion'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9D7C38]" />
            {language === 'zh' ? '全流程直营管理与保洁' : language === 'th' ? 'การบริหารจัดการและดูแลโดยตรง 100%' : '100% Directly Serviced & Maintained'}
          </span>
        </div>
      </div>

      {/* Visually Engaging Our Vision & Our Mission Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Our Vision Card */}
        <div className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E0D8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#DFB85A] to-[#042F61]/40" />
          
          <div className="space-y-6">
            <div>
              <Globe2 className="w-8 h-8 text-[#042F61] transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="space-y-2">
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#042F61] tracking-tight">
                {t('about.visionTitle')}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#8A8175]">
                {t('about.visionSubtitle')}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed">
              {t('about.visionDesc')}
            </p>

            {/* Visual Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8]/60 text-xs font-medium text-[#14171A]">
                <CheckCircle2 className="w-4 h-4 text-[#9D7C38] shrink-0" />
                <span>{language === 'zh' ? '全球核心都会' : language === 'th' ? 'มหานครระดับโลก' : 'Prime Global Hubs'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8]/60 text-xs font-medium text-[#14171A]">
                <CheckCircle2 className="w-4 h-4 text-[#9D7C38] shrink-0" />
                <span>{language === 'zh' ? '标志性建筑审美' : language === 'th' ? 'สถาปัตยกรรมโดดเด่น' : 'Architectural Caliber'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8]/60 text-xs font-medium text-[#14171A]">
                <CheckCircle2 className="w-4 h-4 text-[#9D7C38] shrink-0" />
                <span>{language === 'zh' ? '高品质租赁生活' : language === 'th' ? 'การอยู่อาศัยที่เหนือระดับ' : 'Elevated Living'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8]/60 text-xs font-medium text-[#14171A]">
                <CheckCircle2 className="w-4 h-4 text-[#9D7C38] shrink-0" />
                <span>{language === 'zh' ? '多城市无缝体验' : language === 'th' ? 'มาตรฐานเดียวกันทั่วโลก' : 'Consistent Standard'}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E6E0D8] flex items-center justify-between text-xs text-[#8A8175]">
            <span>{language === 'zh' ? '始于曼谷 · 布局全球' : language === 'th' ? 'เริ่มต้นที่กรุงเทพฯ สู่ระดับสากล' : 'Bangkok Origin · Expanding Worldwide'}</span>
            <TrendingUp className="w-4 h-4 text-[#9D7C38]" />
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="group relative bg-[#042F61] text-white rounded-3xl p-8 sm:p-10 border border-[#021B38] shadow-md flex flex-col justify-between overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#DFB85A]" />
          
          <div className="space-y-6">
            <div>
              <Award className="w-8 h-8 text-[#DFB85A] transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="space-y-2">
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-white tracking-tight">
                {t('about.missionTitle')}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#DFB85A]">
                {t('about.missionSubtitle')}
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              {t('about.missionDesc')}
            </p>

            {/* Visual Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-[#DFB85A] shrink-0" />
                <span>{language === 'zh' ? '直营日常维护' : language === 'th' ? 'ดูแลรักษาโดยตรง' : 'Direct Oversight'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-[#DFB85A] shrink-0" />
                <span>{language === 'zh' ? '严苛保洁质检' : language === 'th' ? 'มาตรฐานความสะอาดสูง' : 'Hotel-Grade Housekeeping'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-[#DFB85A] shrink-0" />
                <span>{language === 'zh' ? '贴心管家支持' : language === 'th' ? 'บริการตอบรับทันใจ' : 'Responsive Concierge'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-[#DFB85A] shrink-0" />
                <span>{language === 'zh' ? '透明品质承诺' : language === 'th' ? 'คุณภาพที่เชื่อถือได้' : 'Verified Quality'}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
            <span>{language === 'zh' ? '全套精装 · 细致入微' : language === 'th' ? 'ตกแต่งครบครัน ใส่ใจทุกรายละเอียด' : 'Direct Servicing · Quality Maintained'}</span>
            <Sparkle className="w-4 h-4 text-[#DFB85A]" />
          </div>
        </div>

      </div>

      {/* The Global Portfolio & Worldwide Expansion Highlight Section */}
      <div className="bg-[#EDE8E1]/50 rounded-3xl p-8 sm:p-12 border border-[#DFD8CE] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#042F61] tracking-tight">
              {language === 'zh' ? '精选全球核心都会，呈献非凡居停体验' : language === 'th' ? 'คัดสรรเรซิเดนซ์ในมหานครชั้นนำระดับสากล' : 'Curated Residences in Premier Global Metropolises'}
            </h3>
            
            <p className="text-sm sm:text-base text-[#5E574E] leading-relaxed">
              {t('about.collectionDesc')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/properties"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/properties');
                }}
                className="btn-gold-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-xs cursor-pointer"
              >
                <span>{language === 'zh' ? '探索全系精选公寓' : language === 'th' ? 'สำรวจเรซิเดนซ์ทั้งหมด' : 'Explore All Residences'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/destinations"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/destinations');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] hover:border-[#DFB85A] hover:bg-[#FAF8F5] transition-all shadow-2xs cursor-pointer"
              >
                <span>{language === 'zh' ? '查看全球目的地' : language === 'th' ? 'ดูจุดหมายปลายทาง' : 'View Destinations'}</span>
              </a>
            </div>
          </div>

          {/* Quick Global Snapshot Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#9D7C38] uppercase tracking-wider block">
                  {language === 'zh' ? '当前服务城市' : language === 'th' ? 'จุดหมายปลายทางที่ให้บริการ' : 'Active Portfolios'}
                </span>
                <h4 className="text-base font-bold text-[#042F61]">
                  Bangkok & Hong Kong
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E6E0D8] text-xs font-bold text-[#042F61]">
                3 Residences
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#5E574E]">
              <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                <span className="text-[#8A8175]">Destinations</span>
                <span className="font-semibold text-[#14171A]">Bangkok, TH & Hong Kong SAR</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                <span className="text-[#8A8175]">Available Layouts</span>
                <span className="font-semibold text-[#14171A]">High-Floor Suites & Sky Residences</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                <span className="text-[#8A8175]">Management</span>
                <span className="font-semibold text-[#042F61]">100% Direct by CG Property</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8A8175]">Booking</span>
                <span className="font-semibold text-[#042F61]">Airbnb Verified Superhost Standard</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* The CG Property Management Standards (Quality Servicing & Upkeep) */}
      <div className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#042F61] tracking-tight">
            {t('about.standardsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#5E574E]">
            {t('about.standardsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#DFB85A]/50 transition-colors">
            <div className="space-y-3">
              <Building2 className="w-6 h-6 text-[#042F61]" />
              <h3 className="font-bold text-base text-[#042F61]">
                {t('about.pillar1.title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E574E] leading-relaxed">
                {t('about.pillar1.desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#E6E0D8]/60 text-[11px] font-semibold text-[#9D7C38] uppercase tracking-wider">
              {language === 'zh' ? '直营保障' : language === 'th' ? 'การดูแลโดยตรง' : 'Direct Quality Control'}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#DFB85A]/50 transition-colors">
            <div className="space-y-3">
              <Sparkles className="w-6 h-6 text-[#042F61]" />
              <h3 className="font-bold text-base text-[#042F61]">
                {t('about.pillar2.title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E574E] leading-relaxed">
                {t('about.pillar2.desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#E6E0D8]/60 text-[11px] font-semibold text-[#9D7C38] uppercase tracking-wider">
              {language === 'zh' ? '星级布草与清洁' : language === 'th' ? 'ความสะอาดมาตรฐานโรงแรม' : 'Hotel-Grade Housekeeping'}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#DFB85A]/50 transition-colors">
            <div className="space-y-3">
              <Headphones className="w-6 h-6 text-[#042F61]" />
              <h3 className="font-bold text-base text-[#042F61]">
                {t('about.pillar3.title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E574E] leading-relaxed">
                {t('about.pillar3.desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#E6E0D8]/60 text-[11px] font-semibold text-[#9D7C38] uppercase tracking-wider">
              {language === 'zh' ? '全程在线管家' : language === 'th' ? 'บริการตอบรับดูแล' : 'Dedicated Guest Care'}
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#DFB85A]/50 transition-colors">
            <div className="space-y-3">
              <Compass className="w-6 h-6 text-[#042F61]" />
              <h3 className="font-bold text-base text-[#042F61]">
                {t('about.pillar4.title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E574E] leading-relaxed">
                {t('about.pillar4.desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#E6E0D8]/60 text-[11px] font-semibold text-[#9D7C38] uppercase tracking-wider">
              {language === 'zh' ? '全球拓展步伐' : language === 'th' ? 'ก้าวสู่ระดับสากล' : 'Worldwide Expansion'}
            </div>
          </div>

        </div>
      </div>

      {/* Forward Perspective CTA Banner */}
      <div className="bg-[#042F61] text-white rounded-3xl p-8 sm:p-12 border border-[#021B38] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
            {language === 'zh' ? '前瞻布局' : language === 'th' ? 'ก้าวต่อไปของเรา' : 'Future Expansion'}
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
            {t('future.heading')}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-normal">
            {t('future.subheading')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href="/properties"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/properties');
            }}
            className="btn-gold-shine px-6 py-3 rounded-full text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm text-center"
          >
            <span>{language === 'zh' ? '查看现有精选房源' : language === 'th' ? 'สำรวจที่พักปัจจุบัน' : 'View Current Residences'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all text-center"
          >
            <span>{language === 'zh' ? '商业合作与咨询' : language === 'th' ? 'ติดต่อสอบถาม' : 'Contact Us'}</span>
          </a>
        </div>
      </div>

    </div>
  );
};
