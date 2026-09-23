import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GradientCarousel, CarouselCardItem } from './ui/GradientCarousel';
import { 
  FilledPool, 
  FilledDumbbell, 
  FilledLaptop, 
  FilledUtensils, 
  FilledTv, 
  FilledTrack,
  FilledLotus
} from './ui/FilledIcons';
import { Sparkles } from 'lucide-react';

interface LocalizedText {
  en: string;
  zh: string;
  th: string;
}

export interface QuintaraAmenityItem {
  id: string;
  category: 'building' | 'residence' | 'access';
  title: LocalizedText;
  tag: LocalizedText;
  image: string;
  icon: React.FC<{ className?: string }>;
}

export const QUINTARA_AMENITIES: QuintaraAmenityItem[] = [
  {
    id: 'work-spaces',
    category: 'building',
    title: {
      en: 'Idea Gen',
      zh: 'Idea Gen 灵感创想空间',
      th: 'Idea Gen พื้นที่ระดมความคิด',
    },
    tag: { en: 'Work Spaces', zh: '创想办公', th: 'พื้นที่ทำงาน' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLaptop,
  },
  {
    id: 'cuisine-spaces',
    category: 'building',
    title: {
      en: 'MHy’ Cuisine',
      zh: 'MHy’ Cuisine 私享美馔厨房',
      th: 'MHy’ Cuisine ครัวส่วนกลางสำหรับสังสรรค์',
    },
    tag: { en: 'Cuisine Spaces', zh: '烹饪空间', th: 'พื้นที่สำหรับงานครัว' },
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    icon: FilledUtensils,
  },
  {
    id: 'rooftop-theatre',
    category: 'building',
    title: {
      en: 'Airy Theatre',
      zh: 'Airy Theatre 空中露天影院',
      th: 'Airy Theatre โรงภาพยนตร์ลอยฟ้า',
    },
    tag: { en: 'Rooftop Theatre', zh: '天台影院', th: 'โรงภาพยนตร์ดาดฟ้า' },
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    icon: FilledTv,
  },
  {
    id: 'sky-track',
    category: 'building',
    title: {
      en: 'Sky Track',
      zh: 'Sky Track 云端天际慢跑道',
      th: 'Sky Track ลู่วิ่งลอยฟ้าชมวิวเมือง',
    },
    tag: { en: 'Sky Track', zh: '空中跑道', th: 'ลู่วิ่งลอยฟ้า' },
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    icon: FilledTrack,
  },
  {
    id: 'pool-spaces',
    category: 'building',
    title: {
      en: 'Seamless Pool',
      zh: 'Seamless Pool 无边际天际泳池',
      th: 'Seamless Pool สระว่ายน้ำไร้ขอบวิวเมือง',
    },
    tag: { en: 'Poolside Retreat', zh: '天际泳池', th: 'พักผ่อนริมสระ' },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    icon: FilledPool,
  },
  {
    id: 'zen-space',
    category: 'building',
    title: {
      en: 'Sanctuary Space',
      zh: 'Sanctuary Space 禅意养心之境',
      th: 'Sanctuary Space พื้นที่พักผ่อนเพื่อความสงบ',
    },
    tag: { en: 'Zen Space', zh: '禅意静修', th: 'พื้นที่แห่งความสงบ' },
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLotus,
  },
  {
    id: 'main-gym',
    category: 'building',
    title: {
      en: '24/7 Active Gym',
      zh: '24/7 全天候活力健身房',
      th: '24/7 Active ฟิตเนสเปิดตลอด 24 ชั่วโมง',
    },
    tag: { en: 'Fitness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    icon: FilledDumbbell,
  },
];

export const QuintaraAmenitiesCarousel: React.FC = () => {
  const { language } = useLanguage();

  const allCarouselCards: CarouselCardItem[] = useMemo(() => {
    return QUINTARA_AMENITIES.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title[language] || item.title.en,
      tag: item.tag[language] || item.tag.en,
      image: item.image,
      icon: item.icon,
    }));
  }, [language]);

  return (
    <div id="quintara-amenities-gallery" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#E6E0D8]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9D7C38]" />
            <h3 className="text-xl font-bold text-[#042F61]">
              {language === 'zh' 
                ? 'Quintara 社区设施与生活空间' 
                : language === 'th' 
                ? 'สิ่งอำนวยความสะดวกโครงการ Quintara' 
                : 'Quintara Facilities & Amenities Gallery'}
            </h3>
          </div>
          <p className="text-xs text-[#8A8175] mt-1">
            {language === 'zh'
              ? '探索天际无边泳池、高空慢跑道、24/7活力健身房、创意办公与禅意养心休闲空间'
              : language === 'th'
              ? 'สัมผัสสระว่ายน้ำไร้ขอบ ลู่วิ่งลอยฟ้า ฟิตเนส 24 ชม. และพื้นที่ทำงานสร้างสรรค์'
              : 'Discover the seamless rooftop pool, sky running track, 24/7 active gym, and serene sanctuary spaces.'}
          </p>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9D7C38] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E6E0D8] self-start sm:self-auto shrink-0">
          7 Curated Spaces
        </span>
      </div>

      <div className="relative w-full -mx-2 sm:-mx-4 px-2 sm:px-4">
        <GradientCarousel items={allCarouselCards} />
      </div>
    </div>
  );
};
