import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GradientCarousel, CarouselCardItem } from './ui/GradientCarousel';
import { 
  FilledPool, 
  FilledDumbbell, 
  FilledLaptop, 
  FilledTree, 
  FilledArmchair, 
  FilledWifi, 
  FilledUtensils, 
  FilledLock, 
  FilledWind, 
  FilledShirt, 
  FilledTv, 
  FilledShield, 
  FilledCard, 
  FilledTrain, 
  FilledCar, 
  FilledSparkles, 
  FilledCheckCircleBlueBg,
  FilledChevronDown
} from './ui/FilledIcons';

const FACILITIES_BG_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23dfb85a' fill-opacity='0.65'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E")`;

interface LocalizedText {
  en: string;
  zh: string;
  th: string;
}

interface FeaturedAmenity {
  id: string;
  category: 'building' | 'residence' | 'access';
  title: LocalizedText;
  tag: LocalizedText;
  image: string;
  icon: React.FC<{ className?: string }>;
}

interface AmenityDetail {
  id: string;
  category: 'building' | 'residence' | 'access';
  categoryLabel: LocalizedText;
  title: LocalizedText;
  desc: LocalizedText;
  icon: React.FC<{ className?: string }>;
}

export const AmenitiesSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'building' | 'residence' | 'access'>('all');
  const [targetCarouselRequest, setTargetCarouselRequest] = useState<{ index: number; timestamp: number } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: { en: 'All Amenities', zh: '全部设施', th: 'สิ่งอำนวยความสะดวกทั้งหมด' } },
    { id: 'building', label: { en: 'Building & Sky Leisure', zh: '楼宇与云端休闲', th: 'สิ่งอำนวยความสะดวกในอาคาร' } },
    { id: 'residence', label: { en: 'In-Residence Comforts', zh: '室内生活配置', th: 'สิ่งอำนวยความสะดวกในห้องพัก' } },
    { id: 'access', label: { en: 'Security & Transit', zh: '安保与交通出行', th: 'ความปลอดภัยและการเดินทาง' } },
  ];

  // Evenly distributed featured cards: 4 cards per category
  const featuredAmenities: FeaturedAmenity[] = [
    // Building (4 cards)
    {
      id: 'sky-pool',
      category: 'building',
      title: {
        en: 'Sky Infinity Pool & Sun Deck',
        zh: '云端无边际泳池与日光甲板',
        th: 'สระว่ายน้ำลอยฟ้าแบบอินฟินิตี้และระเบียงอาบแดด',
      },
      tag: { en: 'Sky Facility', zh: '云端设施', th: 'สิ่งอำนวยความสะดวกชั้นสูง' },
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      icon: FilledPool,
    },
    {
      id: 'sky-gym',
      category: 'building',
      title: {
        en: 'Panoramic Sky Fitness Studio',
        zh: '高空全景健身中心',
        th: 'ฟิตเนสสตูดิโอลอยฟ้าพร้อมวิวเมือง',
      },
      tag: { en: 'Wellness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      icon: FilledDumbbell,
    },
    {
      id: 'sky-lounge',
      category: 'building',
      title: {
        en: 'Co-Working & Executive Sky Lounge',
        zh: '云端行政共享办公酒廊',
        th: 'สกายเลานจ์และพื้นที่ทำงานร่วมกัน',
      },
      tag: { en: 'Work & Leisure', zh: '商务休闲', th: 'ทำงานและพักผ่อน' },
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      icon: FilledLaptop,
    },
    {
      id: 'sky-garden',
      category: 'building',
      title: {
        en: 'Rooftop Botanical Sky Garden',
        zh: '顶层空中生态花园',
        th: 'สวนลอยฟ้าบนชั้นดาดฟ้า',
      },
      tag: { en: 'Rooftop Oasis', zh: '顶层绿洲', th: 'โอเอซิสดาดฟ้า' },
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      icon: FilledTree,
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

    // Security & Transit (4 cards)
    {
      id: 'acc-security',
      category: 'access',
      title: {
        en: '24/7 Security & CCTV Monitoring',
        zh: '24小时安保与全景监控',
        th: 'ระบบรักษาความปลอดภัย 24 ชม.',
      },
      tag: { en: 'Safety', zh: '安全保障', th: 'ความปลอดภัย' },
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
      icon: FilledShield,
    },
    {
      id: 'acc-keycard',
      category: 'access',
      title: {
        en: 'Direct Keycard Lift Access',
        zh: '专属门禁卡私密梯控直达',
        th: 'ลิฟต์ล็อคชั้นด้วยคีย์การ์ดส่วนตัว',
      },
      tag: { en: 'Privacy', zh: '私密保障', th: 'ความเป็นส่วนตัว' },
      image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
      icon: FilledCard,
    },
    {
      id: 'acc-mrt',
      category: 'access',
      title: {
        en: '5-Minute Walk to MRT Rama 9',
        zh: '步行5分钟直达地铁站与商圈',
        th: 'เดินเพียง 5 นาทีถึง MRT พระราม 9',
      },
      tag: { en: 'Transit', zh: '核心交通', th: 'การเดินทาง' },
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
      icon: FilledTrain,
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

  // Comprehensive Amenities List organized for the Accordion
  const accordionAmenities: AmenityDetail[] = [
    {
      id: 'detail-furnished',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'Fully Furnished Living Space', zh: '全套定制精装家俬', th: 'ตกแต่งครบครันพร้อมเข้าอยู่' },
      desc: { 
        en: 'Curated architectural furnishings, plush master bedding, custom wardrobes, coffee table, and dedicated dining set designed for refined long or short stays.', 
        zh: '精选高品质家具、舒适星级床品与定制衣柜，配有咖啡桌与就餐长桌，满足长短期精致旅居需求。', 
        th: 'เฟอร์นิเจอร์สั่งทำพิเศษ เตียงนอนพรีเมียม ตู้เสื้อผ้าบิลท์อิน โต๊ะกาแฟ และชุดโต๊ะอาหาร ออกแบบเพื่อการพักผ่อนอย่างมีระดับ' 
      },
      icon: FilledArmchair,
    },
    {
      id: 'detail-wifi',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'High-Speed Fiber Wi-Fi', zh: '千兆高速光纤网络', th: 'อินเทอร์เน็ตไร้สายความเร็วสูง' },
      desc: { 
        en: 'Dedicated high-speed wireless internet with robust coverage throughout the apartment, optimal for 4K video streaming and international video calls.', 
        zh: '公寓内全覆盖独立千兆高速无线网络，稳定高速，支持4K超清流媒体与国际视频会议。', 
        th: 'อินเทอร์เน็ตไร้สายความเร็วสูงครอบคลุมทั่วห้อง รองรับการสตรีมวิดีโอ 4K และการประชุมออนไลน์ที่ราบรื่น' 
      },
      icon: FilledWifi,
    },
    {
      id: 'detail-kitchen',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'Modern Induction Kitchenette', zh: '完备现代小厨房', th: 'ครัวพร้อมอุปกรณ์ครบชุด' },
      desc: { 
        en: 'Integrated induction cooktop, large refrigerator, microwave, electric kettle, cookware sets, glassware, and dinnerware for convenient in-home dining.', 
        zh: '配备嵌入式电磁炉、双门冰箱、微波炉、电热水壶及全套烹饪餐具与酒杯，随时享受私密料理时光。', 
        th: 'เตาไฟฟ้า ตู้เย็นขนาดใหญ่ ไมโครเวฟ กาต้มน้ำไฟฟ้า เครื่องครัว และชุดจานชามครบครันสำหรับทำอาหาร' 
      },
      icon: FilledUtensils,
    },
    {
      id: 'detail-lock',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'Smart Digital Keyless Lock', zh: '智能电子密码门锁', th: 'ประตูดิจิทัลล็อคอัจฉริยะ' },
      desc: { 
        en: 'Keyless contactless door entry system with personalized secure PIN codes generated for your stay, ensuring seamless self check-in anytime.', 
        zh: '安全无钥匙电子密码锁，为您生成专属入住密码，支持全天候随时便捷自助入住。', 
        th: 'เข้า-ออกสะดวกปลอดภัยด้วยระบบรหัสผ่านดิจิทัลส่วนตัว รองรับการเช็คอินด้วยตนเองได้ตลอดเวลา' 
      },
      icon: FilledLock,
    },
    {
      id: 'detail-climate',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'Multi-Zone Whisper Air Conditioning', zh: '多联分体静音变频空调', th: 'เครื่องปรับอากาศแยกส่วน' },
      desc: { 
        en: 'Independent silent inverter air conditioning units in each bedroom and the living lounge, ensuring custom personalized temperature control.', 
        zh: '起居室与每间卧室皆配置独立静音变频空调，随时调节心仪温度，畅享宁静睡眠。', 
        th: 'ระบบปรับอากาศแยกอิสระในห้องนั่งเล่นและทุกห้องนอน ควบคุมอุณหภูมิได้อย่างแม่นยำและเงียบสงบ' 
      },
      icon: FilledWind,
    },
    {
      id: 'detail-laundry',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'In-Unit Washer & Garment Care', zh: '套内全自动洗衣护理', th: 'เครื่องซักผ้าและอุปกรณ์ซักรีด' },
      desc: { 
        en: 'Private automatic front-load washing machine, steam iron, compact ironing board, and drying rack inside your residence for effortless extended stays.', 
        zh: '套内配备全自动滚筒洗衣机、蒸汽熨斗、折叠熨衣板与晾衣架，长住随心无忧。', 
        th: 'เครื่องซักผ้าฝาหน้าส่วนตัว เตารีดไอน้ำ โต๊ะรีดผ้า และราวตากผ้าภายในห้องพัก' 
      },
      icon: FilledShirt,
    },
    {
      id: 'detail-tv',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'Smart TV & Entertainment Hub', zh: '高清智能大屏电视', th: 'สมาร์ททีวีพร้อมความบันเทิง' },
      desc: { 
        en: 'High-definition smart screen equipped with global streaming applications, screen casting support, and international channels.', 
        zh: '高清智能电视，内置主流国际流媒体应用程序，支持手机无线投屏播放精彩影视。', 
        th: 'สมาร์ททีวีความคมชัดสูง รองรับแอพพลิเคชันสตรีมมิ่งระดับโลกและเชื่อมต่อหน้าจอจากสมาร์ทโฟน' 
      },
      icon: FilledTv,
    },
    {
      id: 'detail-security',
      category: 'access',
      categoryLabel: { en: 'Access & Safety', zh: '安防交通', th: 'ความปลอดภัย' },
      title: { en: '24/7 Security Personnel & CCTV', zh: '24小时安保团队与全方位监控', th: 'ระบบรักษาความปลอดภัย 24 ชม.' },
      desc: { 
        en: 'Gated entrance with round-the-clock on-site security guards, barrier control, and comprehensive high-definition CCTV coverage.', 
        zh: '园区封闭式出入管理，全天候24小时安保人员值守巡逻与高清监控无死角覆盖。', 
        th: 'ทางเข้าโครงการมีเจ้าหน้าที่รักษาความปลอดภัยตลอด 24 ชั่วโมง และระบบกล้องวงจรปิดครอบคลุมทุกจุด' 
      },
      icon: FilledShield,
    },
    {
      id: 'detail-lift',
      category: 'access',
      categoryLabel: { en: 'Access & Safety', zh: '安防交通', th: 'ความปลอดภัย' },
      title: { en: 'Private Keycard Floor-Locked Lifts', zh: '智能专属门禁梯控系统', th: 'ลิฟต์ล็อคชั้นด้วยคีย์การ์ด' },
      desc: { 
        en: 'Secured smart elevators programmed to stop only at your designated residence level and common sky amenity floors for maximum privacy.', 
        zh: '智能梯控系统仅允许刷卡前往所住指定楼层及公共高空设施层，严格保障私人领地隐私。', 
        th: 'ลิฟต์โดยสารระบบล็อคชั้น เข้าถึงเฉพาะชั้นห้องพักของท่านและชั้นสิ่งอำนวยความสะดวกส่วนกลางเพื่อความเป็นส่วนตัว' 
      },
      icon: FilledCard,
    },
    {
      id: 'detail-transit',
      category: 'access',
      categoryLabel: { en: 'Access & Safety', zh: '安防交通', th: 'ความปลอดภัย' },
      title: { en: '5-Minute Walk to MRT Rama 9', zh: '步行5分钟即达地铁蓝线与商圈', th: '5 นาทีถึง MRT พระราม 9' },
      desc: { 
        en: 'Sheltered walkway minutes to MRT Phra Ram 9 station, Central Rama 9 lifestyle mall, Fortune Town IT mall, and Rama 9 CBD office towers.', 
        zh: '步行几分钟即可到达 MRT Phra Ram 9 地铁站、Central Rama 9 购物中心与 Fortune IT 数码城。', 
        th: 'เดินเพียงไม่กี่นาทีถึงสถานีรถไฟฟ้าใต้ดิน MRT พระราม 9, ห้างเซ็นทรัลพระราม 9 และฟอร์จูนทาวน์' 
      },
      icon: FilledTrain,
    },
    {
      id: 'detail-parking',
      category: 'access',
      categoryLabel: { en: 'Access & Safety', zh: '安防交通', th: 'ความปลอดภัย' },
      title: { en: 'Covered Multi-Level Parking & EV', zh: '多层室内停车场与电动汽车充电桩', th: 'ที่จอดรถในร่มและจุดชาร์จ EV' },
      desc: { 
        en: 'Secure weather-protected multi-level parking building with on-site EV fast-charging stations for residents and guests.', 
        zh: '室内全天候安全多层停车大楼，配有住客便捷电动汽车快速充电桩设施。', 
        th: 'อาคารจอดรถในร่มปลอดภัยจากสภาพอากาศ พร้อมจุดชาร์จรถยนต์ไฟฟ้าสำหรับผู้พักอาศัย' 
      },
      icon: FilledCar,
    },
    {
      id: 'detail-sky-facilities',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Sky Infinity Pool & Fitness Complex', zh: '云端无边泳池与全景健身会所', th: 'สระว่ายน้ำลอยฟ้าและฟิตเนสครบวงจร' },
      desc: { 
        en: 'Panoramic outdoor swimming pool, sunset loungers, state-of-the-art strength & cardio center, and high-altitude yoga studio located on the 40th floor.', 
        zh: '40层高空无边际泳池、落日日光躺椅、高端力量与有氧健身中心及全景瑜伽拉伸馆。', 
        th: 'สระว่ายน้ำลอยฟ้าชมพระอาทิตย์ตก ฟิตเนสสตูดิโอพร้อมอุปกรณ์ครบครัน และห้องโยคะวิวเมืองบนชั้น 40' 
      },
      icon: FilledPool,
    },
  ];

  // All cards from all filters are always present in the scrolling array (12 cards total)
  const allCarouselCards: CarouselCardItem[] = useMemo(() => {
    return featuredAmenities.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title[language] || item.title.en,
      tag: item.tag[language] || item.tag.en,
      image: item.image,
      icon: item.icon,
    }));
  }, [language]);

  // When clicking a category pill, update category and smoothly glide carousel to that section
  const handleCategoryClick = (catId: 'all' | 'building' | 'residence' | 'access') => {
    setActiveCategory(catId);
    setExpandedId(null);

    if (catId === 'building') {
      setTargetCarouselRequest({ index: 0, timestamp: Date.now() });
    } else if (catId === 'residence') {
      setTargetCarouselRequest({ index: 4, timestamp: Date.now() });
    } else if (catId === 'access') {
      setTargetCarouselRequest({ index: 8, timestamp: Date.now() });
    } else if (catId === 'all') {
      setTargetCarouselRequest({ index: 0, timestamp: Date.now() });
    }
  };

  // When scrolling through the cards, dynamically switch the active filter pill to match current active card
  const handleActiveCardChange = useCallback((_index: number, item: CarouselCardItem) => {
    if (item.category && item.category !== activeCategory) {
      setActiveCategory(item.category as 'building' | 'residence' | 'access');
    }
  }, [activeCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="amenities-section" 
      className="relative pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 px-[14px] w-full max-w-7xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <FilledSparkles className="w-3.5 h-3.5 text-[#9D7C38] fill-current" />
          <span>
            {language === 'zh' ? '尊享设施与服务' : language === 'th' ? 'สิ่งอำนวยความสะดวกระดับพรีเมียม' : 'Building & Residence Amenities'}
          </span>
        </div>
        <h2 
          className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#042F61] tracking-tight leading-tight"
        >
          {language === 'zh' 
            ? <>为<span className="italic">现代高品质生活</span>精心配置</>
            : language === 'th' 
            ? <>ออกแบบเพื่อ<span className="italic">การใช้ชีวิตที่เหนือระดับ</span></> 
            : <>Curated for <span className="italic">Modern Living</span> in Bangkok</>}
        </h2>
        <p className="text-[#5E574E] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed max-w-2xl mx-auto">
          {language === 'zh'
            ? '无论是在40层云端眺望曼谷天际线的无边际泳池，还是套内贴心配备的居家办公空间，每一处细节皆为您精心准备。'
            : language === 'th'
            ? 'สัมผัสสิ่งอำนวยความสะดวกครบครัน ทั้งสระว่ายน้ำลอยฟ้า ฟิตเนส สกายเลานจ์ และความสะดวกสบายระดับพรีเมียมภายในที่พัก'
            : 'From panoramic sky facilities perched high above Rama 9 to meticulously appointed in-residence comforts, discover everything provided for your stay.'}
        </p>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`amenity-tab-${cat.id}`}
                onClick={() => handleCategoryClick(cat.id as any)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#042F61] text-white shadow-xs'
                    : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61] hover:bg-[#E3DCD3]'
                }`}
              >
                {cat.label[language] || cat.label.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Visual Photographic Cards - 3D Gradient Carousel with isolated horizontal scroll */}
      <div className="relative z-10 mb-10 sm:mb-12">
        <GradientCarousel
          items={allCarouselCards}
          targetIndex={targetCarouselRequest}
          onActiveIndexChange={handleActiveCardChange}
        />
      </div>

      {/* Interactive Accordion Amenities Section to Reduce Text Heaviness */}
      <div 
        className="relative z-10 bg-[#FAF8F5] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-9 border border-[#E6E0D8] overflow-hidden w-full"
      >
        {/* Top-Right Corner Pattern (0.3 opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: FACILITIES_BG_PATTERN,
            backgroundSize: '24px 24px',
            opacity: 0.3,
            WebkitMaskImage: 'radial-gradient(circle at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 80%)',
            maskImage: 'radial-gradient(circle at 100% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 80%)',
          }}
        />

        {/* Bottom-Left Corner Pattern (0.2 opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: FACILITIES_BG_PATTERN,
            backgroundSize: '24px 24px',
            opacity: 0.2,
            WebkitMaskImage: 'radial-gradient(circle at 0% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(circle at 0% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* Bottom-Right Corner Pattern (0.2 opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: FACILITIES_BG_PATTERN,
            backgroundSize: '24px 24px',
            opacity: 0.2,
            WebkitMaskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* Top-Left Corner Pattern (0.1 opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: FACILITIES_BG_PATTERN,
            backgroundSize: '24px 24px',
            opacity: 0.1,
            WebkitMaskImage: 'radial-gradient(circle at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(circle at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* Middle Radial Low-Opacity Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: FACILITIES_BG_PATTERN,
            backgroundSize: '24px 24px',
            opacity: 0.05,
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 80%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 80%)',
          }}
        />

        {/* Top-Left Blur Overlay for heading legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: 'rgba(250, 248, 245, 0.65)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            WebkitMaskImage: 'radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 65%)',
            maskImage: 'radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 65%)',
          }}
        />

        {/* Middle Radial Blur Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: 'rgba(250, 248, 245, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 75%)',
          }}
        />

        <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FilledCheckCircleBlueBg className="w-7 h-7 shrink-0 shadow-xs" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#042F61]">
                {language === 'zh' 
                  ? '全部配套与便利设施清单' 
                  : language === 'th' 
                  ? 'สิ่งอำนวยความสะดวกและบริการครบวงจร' 
                  : 'Complete In-Residence & Building Facilities'}
              </h3>
              <p className="text-xs text-[#8A8175] mt-0.5">
                {language === 'zh'
                  ? '点击任意项展开查看详细规格与配备'
                  : language === 'th'
                  ? 'คลิกเพื่อดูรายละเอียดของสิ่งอำนวยความสะดวก'
                  : 'Click any option to expand and view detailed specifications'}
              </p>
            </div>
          </div>
        </div>

        {/* Accordion Grid - Even 2-column or 3-column layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {accordionAmenities.map((amenity) => {
            const Icon = amenity.icon;
            const isExpanded = expandedId === amenity.id;

            return (
              <div
                key={amenity.id}
                id={`accordion-${amenity.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-[#042F61]/40 shadow-sm ring-1 ring-[#042F61]/15'
                    : 'bg-white/90 border-[#E6E0D8] hover:border-[#588BC7]/50 hover:bg-white'
                }`}
              >
                {/* Accordion Header (Clickable) */}
                <button
                  onClick={() => toggleAccordion(amenity.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isExpanded
                        ? 'bg-[#042F61] text-white'
                        : 'bg-[#FAF8F5] border border-[#E6E0D8] text-[#042F61]'
                    }`}>
                      <Icon className="w-4.5 h-4.5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9D7C38] block">
                        {amenity.categoryLabel[language] || amenity.categoryLabel.en}
                      </span>
                      <h4 className="text-sm font-bold text-[#042F61] truncate">
                        {amenity.title[language] || amenity.title.en}
                      </h4>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 bg-[#EDE8E1] text-[#042F61]' : 'text-[#8A8175]'
                  }`}>
                    <FilledChevronDown className="w-3.5 h-3.5 fill-current" />
                  </div>
                </button>

                {/* Accordion Body (Collapsible) */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 border-t border-[#F0EBE4] bg-[#FAF8F5]/60">
                    <p className="text-xs text-[#5E574E] leading-relaxed">
                      {amenity.desc[language] || amenity.desc.en}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
