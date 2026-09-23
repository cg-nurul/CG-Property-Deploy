import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GradientCarousel, CarouselCardItem } from './ui/GradientCarousel';
import { 
  FilledPool, 
  FilledDumbbell, 
  FilledLaptop, 
  FilledTree, 
  FilledArmchair, 
  FilledUtensils, 
  FilledLock, 
  FilledShirt, 
  FilledTv, 
  FilledShield, 
  FilledCar, 
  FilledSparkles, 
  FilledBath,
  FilledLobby,
  FilledGamepad,
  FilledGolf,
  FilledCamera
} from './ui/FilledIcons';
import { Sparkles } from 'lucide-react';

interface LocalizedText {
  en: string;
  zh: string;
  th: string;
}

export interface NueAmenityItem {
  id: string;
  category: 'building' | 'residence' | 'access';
  title: LocalizedText;
  tag: LocalizedText;
  image: string;
  icon: React.FC<{ className?: string }>;
}

export const NUE_DISTRICT_AMENITIES: NueAmenityItem[] = [
  // Building & Sky Leisure
  {
    id: 'arrival-spaces',
    category: 'building',
    title: {
      en: 'Moon Lobby Tower R & Cloud Lobby Tower 9',
      zh: 'Moon 大堂 (Tower R) 与 Cloud 大堂 (Tower 9)',
      th: 'Moon ล็อบบี้ อาคาร R และ Cloud ล็อบบี้ อาคาร 9',
    },
    tag: { en: 'Arrival Spaces', zh: '迎宾大堂', th: 'โถงต้อนรับ' },
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLobby,
  },
  {
    id: 'outdoor-spaces',
    category: 'building',
    title: {
      en: 'Landscaped Gardens & Open Spaces',
      zh: '景观花园与开阔绿意空间',
      th: 'สวนหย่อมธรรมชาติและพื้นที่เปิดโล่ง',
    },
    tag: { en: 'Outdoor Spaces', zh: '户外绿洲', th: 'พื้นที่กลางแจ้ง' },
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    icon: FilledTree,
  },
  {
    id: 'rising-pool',
    category: 'building',
    title: {
      en: 'Rising Pool – Tower R',
      zh: 'Rising 无边际泳池 – Tower R',
      th: 'สระว่ายน้ำ Rising Pool – อาคาร R',
    },
    tag: { en: 'Sky Facility', zh: '云端设施', th: 'สิ่งอำนวยความสะดวกชั้นสูง' },
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    icon: FilledPool,
  },
  {
    id: 'twilight-pool',
    category: 'building',
    title: {
      en: 'Twilight Pool – Tower 9',
      zh: 'Twilight 暮光泳池 – Tower 9',
      th: 'สระว่ายน้ำ Twilight Pool – อาคาร 9',
    },
    tag: { en: 'Sky Facility', zh: '云端设施', th: 'สิ่งอำนวยความสะดวกชั้นสูง' },
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    icon: FilledPool,
  },
  {
    id: 'main-gym',
    category: 'building',
    title: {
      en: 'Sky Fitness - Tower R',
      zh: '云端健身中心 – Tower R',
      th: 'ฟิตเนสลอยฟ้า Sky Fitness – อาคาร R',
    },
    tag: { en: 'Fitness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    icon: FilledDumbbell,
  },
  {
    id: 'yoga-gym',
    category: 'building',
    title: {
      en: 'Urban Yoga & Pilates',
      zh: '城市瑜伽与普拉提工作室',
      th: 'สตูดิโอโยคะและพิลาทิสในเมือง',
    },
    tag: { en: 'Fitness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    icon: FilledDumbbell,
  },
  {
    id: 'more-options',
    category: 'building',
    title: {
      en: 'Surf Studio, Energy Club & Live Training Studio - Tower R',
      zh: '冲浪工作室、活力俱乐部与实况训练室 – Tower R',
      th: 'สตูดิโอเซิร์ฟ เอนเนอร์จีคลับ และสตูดิโอเทรนนิ่ง – อาคาร R',
    },
    tag: { en: 'Fitness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    icon: FilledDumbbell,
  },
  {
    id: 'lounge-ivory-indigo',
    category: 'building',
    title: {
      en: 'Ivory Lounge & Indigo Lounge',
      zh: 'Ivory 象牙酒廊与 Indigo 靛蓝酒廊',
      th: 'ไอวอรีเลานจ์และอินดิโกเลานจ์',
    },
    tag: { en: 'Work & Lounge', zh: '商务休闲', th: 'ทำงานและพักผ่อน' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLaptop,
  },
  {
    id: 'lounge-coworking',
    category: 'building',
    title: {
      en: 'Co-Working, Synergy Space & Library',
      zh: '共享协同办公空间与阅览室',
      th: 'พื้นที่ทำงานร่วมกัน โคเวิร์กกิ้งสเปซ และห้องสมุด',
    },
    tag: { en: 'Work & Lounge', zh: '商务休闲', th: 'ทำงานและพักผ่อน' },
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLaptop,
  },
  {
    id: 'kitchen',
    category: 'building',
    title: {
      en: 'Mellow Co-Kitchen',
      zh: 'Mellow 共享美馔厨房',
      th: 'ห้องครัวส่วนกลาง Mellow Co-Kitchen',
    },
    tag: { en: 'Social & Leisure', zh: '社交美馔', th: 'พื้นที่สังสรรค์' },
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    icon: FilledUtensils,
  },
  {
    id: 'indoor-entertainment',
    category: 'building',
    title: {
      en: 'Mingle Games Room, VR & E-Sports',
      zh: 'Mingle 娱乐游戏室、VR 与电竞室',
      th: 'ห้องเกม Mingle ห้อง VR และอีสปอร์ต',
    },
    tag: { en: 'Social & Leisure', zh: '休闲娱乐', th: 'ความบันเทิง' },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    icon: FilledGamepad,
  },
  {
    id: 'golf',
    category: 'building',
    title: {
      en: 'Golf Simulator',
      zh: '高尔夫模拟室',
      th: 'ห้องจำลองกอล์ฟเสมือนจริง',
    },
    tag: { en: 'Social & Leisure', zh: '运动休闲', th: 'กีฬาและสันทนาการ' },
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    icon: FilledGolf,
  },
  {
    id: 'creative-spaces',
    category: 'building',
    title: {
      en: 'Photography Studio, Recording Studio & Art Hub',
      zh: '摄影工作室、录音棚与艺术创想空间',
      th: 'สตูดิโอถ่ายภาพ ห้องอัดเสียง และอาร์ตฮับ',
    },
    tag: { en: 'Play & Create', zh: '创意空间', th: 'พื้นที่สร้างสรรค์' },
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    icon: FilledCamera,
  },
  {
    id: 'kids-spaces',
    category: 'building',
    title: {
      en: 'Kids Club',
      zh: '儿童趣味俱乐部',
      th: 'คิดส์คลับสำหรับเด็ก',
    },
    tag: { en: 'Play & Create', zh: '亲子时光', th: 'สำหรับครอบครัว' },
    image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=1200&q=80',
    icon: FilledSparkles,
  },
  {
    id: 'wellness-spaces',
    category: 'building',
    title: {
      en: 'Private Spa, Steam Room & Styling Salon',
      zh: '私享水疗SPA、蒸汽室与美发造型沙龙',
      th: 'สปาส่วนตัว ห้องอบไอน้ำ และซาลอนเสริมสวย',
    },
    tag: { en: 'Wellness', zh: '康体水疗', th: 'สปาและสุขภาพ' },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    icon: FilledBath,
  },

  // Residence (4 cards)
  {
    id: 'res-furnish',
    category: 'residence',
    title: {
      en: 'Architectural Furnished Living',
      zh: '全套定制精装奢阔起居',
      th: 'ห้องนั่งเล่นตกแต่งสไตล์สถาปัตยกรรม',
    },
    tag: { en: 'Living Space', zh: '舒适起居', th: 'พื้นที่อยู่อาศัย' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    icon: FilledArmchair,
  },
  {
    id: 'res-bed',
    category: 'residence',
    title: {
      en: 'Master King Bedroom Suites',
      zh: '奢享主卧套间与品质床品',
      th: 'ห้องนอนใหญ่พร้อมเครื่องนอนพรีเมียม',
    },
    tag: { en: 'Bedrooms', zh: '静谧寝居', th: 'ห้องนอนสุดหรู' },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    icon: FilledArmchair,
  },
  {
    id: 'res-kitchen',
    category: 'residence',
    title: {
      en: 'Fully Equipped Kitchenette',
      zh: '完备现代微烹小厨房',
      th: 'ครัวพร้อมอุปกรณ์ครบครัน',
    },
    tag: { en: 'Kitchenette', zh: '现代小厨', th: 'ครัวพร้อมอุปกรณ์' },
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    icon: FilledUtensils,
  },
  {
    id: 'res-smart',
    category: 'residence',
    title: {
      en: 'Smart TV & Seamless Wi-Fi',
      zh: '智能高清大屏与高速网络',
      th: 'สมาร์ททีวีและอินเทอร์เน็ตความเร็วสูง',
    },
    tag: { en: 'Entertainment', zh: '智能影音', th: 'ความบันเทิง' },
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
    icon: FilledTv,
  },

  // Security & Transit (5 cards)
  {
    id: 'acc-security',
    category: 'access',
    title: {
      en: 'Controlled Access & CCTV Monitoring',
      zh: '门禁管控与24小时全景监控',
      th: 'ระบบควบคุมการเข้าออกและกล้องวงจรปิด CCTV 24 ชม.',
    },
    tag: { en: 'Safety', zh: '安全保障', th: 'ความปลอดภัย' },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    icon: FilledShield,
  },
  {
    id: 'acc-keycard',
    category: 'access',
    title: {
      en: 'Mail Room & Smart Lockers',
      zh: '邮件收发室与智能快递柜',
      th: 'ห้องรับจดหมายและสมาร์ทล็อกเกอร์',
    },
    tag: { en: 'Convenience', zh: '便民服务', th: 'ความสะดวกสบาย' },
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLock,
  },
  {
    id: 'laundry',
    category: 'access',
    title: {
      en: 'Laundry Pick-Up Room',
      zh: '专属洗衣收发取送室',
      th: 'ห้องบริการรับ-ส่งซักรีด',
    },
    tag: { en: 'Services', zh: '生活服务', th: 'บริการซักรีด' },
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
    icon: FilledShirt,
  },
  {
    id: 'meeting-room',
    category: 'access',
    title: {
      en: 'Meeting & Focus Rooms',
      zh: '商务会议室与专注工作室',
      th: 'ห้องประชุมและห้องทำงานส่วนตัว',
    },
    tag: { en: 'Work & Business', zh: '商务办公', th: 'พื้นที่ทำงาน' },
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    icon: FilledLaptop,
  },
  {
    id: 'acc-parking',
    category: 'access',
    title: {
      en: 'Covered Parking & EV Charging',
      zh: '室内专属车位与充电桩设施',
      th: 'ที่จอดรถในร่มและจุดชาร์จ EV',
    },
    tag: { en: 'Parking', zh: '车位设施', th: 'ที่จอดรถ' },
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    icon: FilledCar,
  },
];

export const NueDistrictAmenitiesCarousel: React.FC = () => {
  const { language } = useLanguage();

  const allCarouselCards: CarouselCardItem[] = useMemo(() => {
    return NUE_DISTRICT_AMENITIES.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title[language] || item.title.en,
      tag: item.tag[language] || item.tag.en,
      image: item.image,
      icon: item.icon,
    }));
  }, [language]);

  return (
    <div id="nue-district-amenities-gallery" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#E6E0D8]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9D7C38]" />
            <h3 className="text-xl font-bold text-[#042F61]">
              {language === 'zh' 
                ? 'NUE District 社区设施与套内配套' 
                : language === 'th' 
                ? 'สิ่งอำนวยความสะดวกโครงการ NUE District' 
                : 'NUE District Facilities & Amenities Gallery'}
            </h3>
          </div>
          <p className="text-xs text-[#8A8175] mt-1">
            {language === 'zh'
              ? '全方位探索拉玛九高空无边际泳池、健身运动俱乐部、行政共享办公与奢适套内起居配置'
              : language === 'th'
              ? 'สัมผัสสิ่งอำนวยความสะดวกครบครัน สระว่ายน้ำลอยฟ้า สตูดิโอออกกำลังกาย เลานจ์ และความสะดวกสบายในที่พัก'
              : 'Explore panoramic sky pools, athletics clubs, creative lounges, and refined in-residence comforts.'}
          </p>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9D7C38] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E6E0D8] self-start sm:self-auto shrink-0">
          24 Curated Spaces
        </span>
      </div>

      <div className="relative w-full -mx-2 sm:-mx-4 px-2 sm:px-4">
        <GradientCarousel items={allCarouselCards} />
      </div>
    </div>
  );
};
