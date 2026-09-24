import React, { useState, useMemo } from 'react';
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
  FilledChevronDown,
  FilledBath,
  FilledLobby,
  FilledGamepad,
  FilledGolf,
  FilledCamera,
  FilledTrack,
  FilledLotus
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Featured universal amenities cards for all residences
  const featuredAmenities: FeaturedAmenity[] = [
    {
      id: 'sky-pool',
      category: 'building',
      title: {
        en: 'Sky Infinity Pool',
        zh: '云端无边际泳池',
        th: 'สระว่ายน้ำลอยฟ้าอินฟินิตี้',
      },
      tag: { en: 'Poolside Retreat', zh: '天际泳池', th: 'พักผ่อนริมสระ' },
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      icon: FilledPool,
    },
    {
      id: 'sky-fitness',
      category: 'building',
      title: {
        en: 'Panoramic Sky Fitness',
        zh: '高空全景健身中心',
        th: 'ฟิตเนสสตูดิโอลอยฟ้า',
      },
      tag: { en: 'Fitness & Wellness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      icon: FilledDumbbell,
    },
    {
      id: 'work-spaces',
      category: 'building',
      title: {
        en: 'Co-Working & Creative Hub',
        zh: '行政共享办公与创想空间',
        th: 'พื้นที่ทำงานและสกายเลานจ์',
      },
      tag: { en: 'Work Spaces', zh: '创想办公', th: 'พื้นที่ทำงาน' },
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      icon: FilledLaptop,
    },
    {
      id: 'rooftop-lounge',
      category: 'building',
      title: {
        en: 'Rooftop Sky Lounge',
        zh: '顶层天际酒廊与露台',
        th: 'สกายเลานจ์และจุดชมวิวเมือง',
      },
      tag: { en: 'Sky Leisure', zh: '天际沙龙', th: 'เลานจ์ลอยฟ้า' },
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      icon: FilledTv,
    },
    {
      id: 'green-spaces',
      category: 'building',
      title: {
        en: 'Landscaped Sky Gardens',
        zh: '立体景观花园与绿洲',
        th: 'สวนลอยฟ้าและพื้นที่สีเขียว',
      },
      tag: { en: 'Green Retreats', zh: '生态绿洲', th: 'พื้นที่สีเขียว' },
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      icon: FilledTree,
    },
    {
      id: 'arrival-spaces',
      category: 'building',
      title: {
        en: 'Grand Arrival Lobby',
        zh: '尊尚现代迎宾大堂',
        th: 'โถงต้อนรับและล็อบบี้รับรอง',
      },
      tag: { en: 'Arrival Spaces', zh: '迎宾大堂', th: 'โถงต้อนรับ' },
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      icon: FilledLobby,
    },
    {
      id: 'cuisine-spaces',
      category: 'building',
      title: {
        en: 'Social Gourmet Kitchen',
        zh: '社交美馔厨房与聚会空间',
        th: 'ครัวสังสรรค์และพื้นที่สังสรรค์',
      },
      tag: { en: 'Dining Spaces', zh: '烹饪聚会', th: 'พื้นที่สำหรับงานครัว' },
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      icon: FilledUtensils,
    },
    {
      id: 'curated-residence',
      category: 'residence',
      title: {
        en: 'Curated Designer Living',
        zh: '私享定制高雅居境',
        th: 'พื้นที่อยู่อาศัยตกแต่งครบครัน',
      },
      tag: { en: 'In-Residence', zh: '套内空间', th: 'ในห้องพัก' },
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      icon: FilledArmchair,
    }
  ];

  // Comprehensive Universal Amenities List organized for the Accordion (applicable across all properties)
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
      id: 'detail-bath',
      category: 'residence',
      categoryLabel: { en: 'In-Residence', zh: '套内配置', th: 'ในห้องพัก' },
      title: { en: 'En-Suite Bathroom & Rain Shower', zh: '独立卫浴与步入式淋浴间', th: 'ห้องน้ำในตัวพร้อมฝักบัว' },
      desc: { 
        en: 'Modern private bathroom featuring a walk-in glass shower, continuous hot water supply, fresh plush towels, vanity mirror, in-room hairdryer, and essential toiletries.', 
        zh: '现代舒适卫浴空间，配有玻璃步入式淋浴间、充沛恒温热水、洁净洗浴毛巾、梳妆镜、电吹风及基础洗护备品。', 
        th: 'ห้องน้ำโมเดิร์นพร้อมฝักบัววอล์กอิน ระบบน้ำอุ่นสม่ำเสมอ ผ้าขนหนูสะอาด กระจกเงา ไดร์เป่าผม และของใช้จำเป็น' 
      },
      icon: FilledBath,
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
      id: 'detail-sky-pool',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Sky Infinity Pool & Sun Deck', zh: '云端无边际泳池与日光甲板', th: 'สระว่ายน้ำลอยฟ้าอินฟินิตี้และเดคชมวิว' },
      desc: { 
        en: 'Elevated outdoor swimming pool perched high above the city with sweeping panoramic Bangkok skyline views, poolside loungers, and shaded relaxation zones.', 
        zh: '高空开阔户外泳池，俯瞰曼谷壮丽城市天际线，配有舒适池畔躺椅与遮阳休憩区。', 
        th: 'สระว่ายน้ำลอยฟ้ากลางแจ้งชมวิวเมืองกรุงเทพฯ แบบพาโนรามา พร้อมเก้าอี้ริมสระและมุมพักผ่อน' 
      },
      icon: FilledPool,
    },
    {
      id: 'detail-sky-gym',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Panoramic Sky Fitness Studio', zh: '高空全景健身中心', th: 'ฟิตเนสสตูดิโอลอยฟ้าครบวงจร' },
      desc: { 
        en: 'State-of-the-art strength & cardio center with panoramic skyline views, free weights, resistance equipment, and open yoga/stretching areas.', 
        zh: '配备专业力量训练器械、有氧跑步机与拉伸活动区，在开阔城市美景中保持充沛活力。', 
        th: 'สตูดิโอออกกำลังกายพร้อมอุปกรณ์คาร์ดิโอ ดัมเบล เวทเทรนนิ่ง และพื้นที่ยืดเหยียดพร้อมวิวเมือง' 
      },
      icon: FilledDumbbell,
    },
    {
      id: 'detail-coworking',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Co-Working & Executive Lounge', zh: '行政共享办公与商务酒廊', th: 'สกายเลานจ์และพื้นที่ทำงานส่วนกลาง' },
      desc: { 
        en: 'Dedicated collaborative spaces with high-speed internet, ergonomic seating, quiet work zones, and panoramic natural lighting for productive work away from home.', 
        zh: '专属共享办公空间，配备高速网络、人体工学座椅与静音办公区，采光极佳，办公会客皆宜。', 
        th: 'พื้นที่ทำงานร่วมกันพร้อมอินเทอร์เน็ตความเร็วสูง ที่นั่งทำงานสะดวกสบาย และมุมทำงานที่เงียบสงบ' 
      },
      icon: FilledLaptop,
    },
    {
      id: 'detail-gardens',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Landscaped Sky Gardens & Open Terraces', zh: '空中园林花园与景观露台', th: 'สวนลอยฟ้าและพื้นที่สีเขียวกลางแจ้ง' },
      desc: { 
        en: 'Artfully designed elevated outdoor green spaces, tranquil contemplation paths, and open-air sunset viewing decks offering a peaceful retreat above the city.', 
        zh: '精心设计的空中绿洲园林，设有散步休闲步道与落日观景台，提供远离喧嚣的静谧休憩之所。', 
        th: 'สวนลอยฟ้าที่ได้รับการออกแบบอย่างประณีต ทางเดินพักผ่อน และจุดชมวิวพระอาทิตย์ตกอันเงียบสงบ' 
      },
      icon: FilledTree,
    },
    {
      id: 'detail-lobby',
      category: 'building',
      categoryLabel: { en: 'Building', zh: '公共设施', th: 'ส่วนกลางอาคาร' },
      title: { en: 'Grand Arrival Lobby & Concierge Welcome', zh: '现代尊尚迎宾大堂与礼宾接待', th: 'โถงต้อนรับและล็อบบี้รับรอง' },
      desc: { 
        en: 'Welcoming air-conditioned architectural lobby lounge with high ceilings, dedicated reception zones, and comfortable courier and parcel collection areas.', 
        zh: '高挑空现代迎宾大堂，配备舒适等候沙发区与专属接待动线，尽显私享格调。', 
        th: 'ล็อบบี้ต้อนรับโอ่โถงตกแต่งอย่างหรูหรา พร้อมพื้นที่พักผ่อนปรับอากาศและบริการต้อนรับ' 
      },
      icon: FilledLobby,
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
      title: { en: 'Prime MRT Transit & Central Connectivity', zh: '核心地铁捷运与都会商圈直达', th: 'เดินทางสะดวกใกล้ MRT และศูนย์การค้าชั้นนำ' },
      desc: { 
        en: 'Strategic central Bangkok positioning moments from MRT stations, expressways, premier lifestyle shopping malls, and cultural dining hubs.', 
        zh: '坐拥曼谷核心便捷地段，步行数分钟即达 MRT 地铁站，轻松连接城市高速、大型购物中心与特色美食商圈。', 
        th: 'ทำเลศักยภาพใจกลางเมือง เดินทางสะดวกใกล้สถานีรถไฟฟ้าใต้ดิน MRT ทางด่วน ห้างสรรพสินค้าชั้นนำ และย่านอาหารยอดนิยม' 
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
            ? '无论是在云端眺望曼谷天际线的无边际泳池，还是套内贴心配备的居家办公空间，每一处细节皆为您精心准备。'
            : language === 'th'
            ? 'สัมผัสสิ่งอำนวยความสะดวกครบครัน ทั้งสระว่ายน้ำลอยฟ้า ฟิตเนส สกายเลานจ์ และความสะดวกสบายระดับพรีเมียมภายในที่พัก'
            : 'From panoramic sky facilities perched high above the city to meticulously appointed in-residence comforts, discover everything provided for your stay.'}
        </p>
      </div>

      {/* Featured Visual Photographic Cards - 3D Gradient Carousel with isolated horizontal scroll */}
      <div className="relative z-10 mb-10 sm:mb-12">
        <GradientCarousel
          items={allCarouselCards}
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
