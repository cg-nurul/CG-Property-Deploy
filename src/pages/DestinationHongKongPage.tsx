import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { PROPERTIES } from '../data/properties';
import { MapPin, Building2, ChevronLeft, ArrowRight, BedDouble, Bath, Maximize2, Sparkles } from 'lucide-react';
import { AirbnbIcon } from '../components/ui/FilledIcons';

interface DestinationHongKongPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const DestinationHongKongPage: React.FC<DestinationHongKongPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const hkProperties = PROPERTIES.filter((p) => p.city === 'Hong Kong');

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Back Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/destinations"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/destinations');
          }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] hover:text-[#042F61] hover:border-[#DFB85A] hover:bg-[#FAF8F5] transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-[#9D7C38] transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{language === 'zh' ? '返回目的地列表' : language === 'th' ? 'กลับสู่จุดหมายปลายทาง' : 'Back to Destinations'}</span>
        </a>

        <div className="flex items-center gap-1.5 text-xs text-[#8A8175]">
          <a
            href="/destinations"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/destinations');
            }}
            className="hover:text-[#042F61] hover:underline transition-colors"
          >
            Destinations
          </a>
          <span>/</span>
          <span className="font-semibold text-[#042F61]">Hong Kong SAR</span>
          <span>/</span>
          <span>Quintara</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[380px] bg-[#14171A] text-white flex flex-col justify-end p-6 sm:p-10 border border-[#2B2E33] shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=80"
          alt="Hong Kong Skyline & Victoria Harbour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#DFB85A] text-xs font-semibold uppercase tracking-widest border border-white/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Hong Kong SAR Destination</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Hong Kong
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            {language === 'zh'
              ? '体验亚洲国际都会的高品位居停，在 Quintara 尽览维多利亚港璀璨天际线。'
              : language === 'th'
              ? 'สัมผัสการใช้ชีวิตเหนือระดับในมหานครฮ่องกง ณ Quintara เรสซิเดนซ์หรูพร้อมวิวขอบฟ้าเมืองอันโดดเด่น'
              : 'Experience elevated urban living in Asia’s world city at Quintara, our curated luxury residence framing the iconic Hong Kong skyline.'}
          </p>
        </div>
      </div>

      {/* District Story: Mid-Levels & Central Enclave */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-xs space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9D7C38]">
            Curated Enclave
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#042F61]">
            {language === 'zh' ? '中西区与半山核心圈' : language === 'th' ? 'ย่านมิดเลเวลส์และเซ็นทรัล' : 'Mid-Levels & Central Enclave'}
          </h2>
          <p className="text-sm text-[#5E574E] leading-relaxed">
            {language === 'zh'
              ? '坐落于香港备受瞩目的半山与中环交汇圈，Quintara 将宁谧尊贵的山景绿意与繁华都会景观完美平衡。便捷通达国际金融中心（IFC）、中环半山扶手电梯、SoHo 苏豪美食街区以及大馆艺术古迹，尽享卓越不凡的高效商务与文化生活圈。'
              : language === 'th'
              ? 'ตั้งอยู่บนทำเลพรีเมียมรอยต่อระหว่างมิดเลเวลส์และเซ็นทรัล ฮ่องกง มอบความสงบเป็นส่วนตัวพร้อมการเชื่อมต่อสู่ศูนย์กลางการเงิน IFC, บันไดเลื่อนเซ็นทรัล-มิดเลเวลส์, ร้านอาหารชั้นนำใน SoHo และสถานีรถไฟใต้ดิน MTR ได้อย่างง่ายดาย'
              : 'Positioned within Hong Kong’s distinguished Mid-Levels and Central district, Quintara balances tranquil hillside privacy with dynamic metropolitan access. Located within easy reach of the International Finance Centre (IFC), the Central-Mid-Levels Escalator, SoHo dining, and key MTR stations, it provides seamless executive convenience.'}
          </p>
        </div>

        {/* Hong Kong Residences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {hkProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E6E0D8] flex flex-col justify-between space-y-5 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9D7C38]">
                    {prop.tower} · {prop.floor}
                  </span>
                  <span className="text-xs font-semibold bg-[#EDE8E1] px-2.5 py-0.5 rounded-md text-[#042F61]">
                    {Math.ceil(prop.sizeSqm)} sqm
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#042F61]">
                  {prop.name}
                </h3>
                <p className="text-xs text-[#8A8175] font-medium mt-0.5">
                  {prop.district}, {prop.city}, {prop.country}
                </p>
                <p className="text-xs text-[#5E574E] mt-3 leading-relaxed line-clamp-3">
                  {prop.overview[language] || prop.overview.en}
                </p>
                <div className="grid grid-cols-3 gap-2 mt-5 text-xs text-[#4A453E] pt-4 border-t border-[#E6E0D8]">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{prop.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{prop.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#9D7C38]" />
                    <span>{Math.ceil(prop.sizeSqm)} m²</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onNavigate(`/properties/${prop.slug}` as PageRoute)}
                  className="flex-1 bg-[#042F61] hover:bg-[#021B38] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>View {prop.name} Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
                <a
                  href={prop.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EDE8E1] hover:bg-[#E3DCD3] text-[#042F61] px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Book on Airbnb</span>
                  <AirbnbIcon className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Brand Promise Banner */}
      <div className="bg-[#042F61] rounded-3xl p-8 sm:p-12 border border-[#021B38] text-center max-w-3xl mx-auto space-y-4 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFB85A] text-xs font-semibold uppercase tracking-widest border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>Curated Stays</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
          {language === 'zh' ? '以品质居停，连结亚洲核心都会。' : language === 'th' ? 'เชื่อมโยงสู่เมืองชั้นนำแห่งเอเชียด้วยการพักอาศัยระดับพรีเมียม' : 'Connecting Asia’s Premier Metropolises with Exceptional Living.'}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed">
          {language === 'zh' 
            ? '从曼谷至香港，CG Property 悉心甄选每一处住宅，为您呈献安心托付的尊崇旅居时光。' 
            : language === 'th'
            ? 'จากกรุงเทพฯ สู่ฮ่องกง CG Property คัดสรรทุกเรสซิเดนซ์อย่างพิถีพิถันเพื่อมอบประสบการณ์การเข้าพักที่น่าจดจำ'
            : 'From Bangkok to Hong Kong, CG Property meticulously curates every furnished residence to deliver an uncompromising hospitality standard.'}
        </p>
      </div>

    </div>
  );
};
