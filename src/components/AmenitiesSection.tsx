import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Waves, 
  Dumbbell, 
  Laptop, 
  Trees, 
  Wifi, 
  UtensilsCrossed, 
  Lock, 
  Wind, 
  Tv, 
  ShieldCheck, 
  CreditCard, 
  Train, 
  Car, 
  Sparkles,
  Check,
  CheckCircle2,
  Armchair,
  Shirt
} from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'building' | 'residence' | 'access'>('all');

  const categories = [
    { id: 'all', label: { en: 'All Amenities', zh: '全部设施', th: 'สิ่งอำนวยความสะดวกทั้งหมด' } },
    { id: 'building', label: { en: 'Building & Sky Leisure', zh: '楼宇与云端休闲', th: 'สิ่งอำนวยความสะดวกในอาคาร' } },
    { id: 'residence', label: { en: 'In-Residence Comforts', zh: '室内生活配置', th: 'สิ่งอำนวยความสะดวกในห้องพัก' } },
    { id: 'access', label: { en: 'Security & Transit', zh: '安保与交通出行', th: 'ความปลอดภัยและการเดินทาง' } },
  ];

  // Visual Featured Sky/Building Facilities with Architectural Photography
  const featuredAmenities = [
    {
      id: 'sky-pool',
      category: 'building',
      title: {
        en: 'Sky Infinity Pool & Sun Deck',
        zh: '云端无边际泳池与日光甲板',
        th: 'สระว่ายน้ำลอยฟ้าแบบอินฟินิตี้และระเบียงอาบแดด',
      },
      description: {
        en: 'Expansive elevated swimming pool offering panoramic skyline views over Rama 9 with luxury poolside lounge cabanas.',
        zh: '高空无边际视野泳池，尽览拉玛九都市天际线全景，配备尊享休闲日光躺椅。',
        th: 'สระว่ายน้ำลอยฟ้าชมวิวพาโนรามาเส้นขอบฟ้าพระราม 9 พร้อมที่นั่งพักผ่อนริมสระ',
      },
      tag: { en: 'Sky Facility', zh: '云端设施', th: 'สิ่งอำนวยความสะดวกชั้นสูง' },
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      icon: Waves,
    },
    {
      id: 'sky-gym',
      category: 'building',
      title: {
        en: 'Panoramic Sky Fitness Studio',
        zh: '高空全景健身中心',
        th: 'ฟิตเนสสตูดิโอลอยฟ้าพร้อมวิวเมือง',
      },
      description: {
        en: 'State-of-the-art cardio machines, weight stations, and yoga studio overlooking the Bangkok cityscape.',
        zh: '配备高端有氧与力量训练器械、瑜伽拉伸空间，俯瞰曼谷城市壮阔景观。',
        th: 'อุปกรณ์คาร์ดิโอและเวทเทรนนิ่งระดับพรีเมียม พร้อมพื้นที่โยคะชมวิวเมืองกรุงเทพฯ',
      },
      tag: { en: 'Wellness', zh: '康体健身', th: 'สุขภาพและฟิตเนส' },
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      icon: Dumbbell,
    },
    {
      id: 'sky-lounge',
      category: 'building',
      title: {
        en: 'Co-Working & Executive Sky Lounge',
        zh: '云端行政共享办公酒廊',
        th: 'สกายเลานจ์และพื้นที่ทำงานร่วมกัน',
      },
      description: {
        en: 'Quiet work pods, meeting tables, ergonomic seating, and high-speed Wi-Fi designed for modern remote professionals.',
        zh: '安静独立的办公隔间、会议长桌、符合人体工学的座椅与高速无线网络，专为商务人士打造。',
        th: 'มุมทำงานส่วนตัว โต๊ะประชุม ที่นั่งตามหลักสรีรศาสตร์ และอินเทอร์เน็ตความเร็วสูงสำหรับคนทำงานยุคใหม่',
      },
      tag: { en: 'Work & Leisure', zh: '商务休闲', th: 'ทำงานและพักผ่อน' },
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      icon: Laptop,
    },
    {
      id: 'sky-garden',
      category: 'building',
      title: {
        en: 'Rooftop Botanical Sky Garden',
        zh: '顶层空中生态花园',
        th: 'สวนลอยฟ้าบนชั้นดาดฟ้า',
      },
      description: {
        en: 'Curated lush green urban oasis and walking paths perched above the city for tranquil morning walks and sunset views.',
        zh: '高空精心打造的热带绿意花园与漫步小径，供住客享受宁静清晨与落日时光。',
        th: 'พื้นที่สีเขียวลอยฟ้าใจกลางเมือง เหมาะสำหรับการพักผ่อนหย่อนใจและชมพระอาทิตย์ตก',
      },
      tag: { en: 'Rooftop Oasis', zh: '顶层绿洲', th: 'โอเอซิสดาดฟ้า' },
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      icon: Trees,
    },
  ];

  // Grid of In-Residence and Convenience Amenities
  const allAmenitiesList = [
    {
      category: 'residence',
      title: { en: 'Fully Furnished Living', zh: '全套定制精装家俬', th: 'ตกแต่งครบครันพร้อมเข้าอยู่' },
      desc: { en: 'Curated architectural furnishings, plush bedding, and integrated wardrobes in both residences.', zh: '精选高品质家具、舒适床品与定制衣柜。', th: 'เฟอร์นิเจอร์สั่งทำพิเศษ เตียงนอนพรีเมียม และตู้เสื้อผ้าบิลท์อิน' },
      icon: Armchair,
    },
    {
      category: 'residence',
      title: { en: 'High-Speed Fiber Wi-Fi', zh: '千兆高速光纤网络', th: 'อินเทอร์เน็ตไร้สายความเร็วสูง' },
      desc: { en: 'Dedicated seamless high-speed internet suited for 4K streaming and remote work conferencing.', zh: '独立高速网络，支持超清视频流媒体与无缝远程会议。', th: 'อินเทอร์เน็ตความเร็วสูงรองรับการทำงานและการสตรีม 4K' },
      icon: Wifi,
    },
    {
      category: 'residence',
      title: { en: 'Fully Equipped Kitchenette', zh: '完备现代小厨房', th: 'ครัวพร้อมอุปกรณ์ครบชุด' },
      desc: { en: 'Induction cooktop, refrigerator, microwave, electric kettle, cookware, and dishware.', zh: '配备电磁炉、冰箱、微波炉、电热水壶及全套烹饪餐具。', th: 'เตาไฟฟ้า ตู้เย็น ไมโครเวฟ กาต้มน้ำไฟฟ้า และอุปกรณ์ครัวครบครัน' },
      icon: UtensilsCrossed,
    },
    {
      category: 'residence',
      title: { en: 'Smart Digital Door Lock', zh: '智能电子密码门锁', th: 'ประตูดิจิทัลล็อคอัจฉริยะ' },
      desc: { en: 'Secure keyless contactless entry with individual automated guest codes for hassle-free check-in.', zh: '安全无钥匙密码门锁，提供独立专属入住密码。', th: 'เข้า-ออกสะดวกปลอดภัยด้วยระบบรหัสผ่านดิจิทัลส่วนตัว' },
      icon: Lock,
    },
    {
      category: 'residence',
      title: { en: 'Multi-Zone Air Conditioning', zh: '多联分体静音变频空调', th: 'เครื่องปรับอากาศแยกส่วน' },
      desc: { en: 'Independent climate control systems in living areas and bedrooms for optimal temperature comfort.', zh: '起居室与每间卧室均配备独立温控空调，静音舒适。', th: 'ระบบปรับอากาศแยกอิสระในห้องนั่งเล่นและห้องนอน' },
      icon: Wind,
    },
    {
      category: 'residence',
      title: { en: 'In-Unit Washer & Laundry', zh: '套内独立洗衣护理', th: 'เครื่องซักผ้าและอุปกรณ์ซักรีด' },
      desc: { en: 'Private automatic washing machine, iron, ironing board, and drying rack inside the residence.', zh: '配备套内全自动洗衣机、熨斗、烫衣板及晾衣架。', th: 'เครื่องซักผ้าส่วนตัว เตารีด โต๊ะรีดผ้า และราวตากผ้าภายในห้อง' },
      icon: Shirt,
    },
    {
      category: 'residence',
      title: { en: 'Smart TV Entertainment', zh: '智能高清大屏电视', th: 'สมาร์ททีวีพร้อมความบันเทิง' },
      desc: { en: 'High-definition smart screen with pre-installed streaming apps and casting capabilities.', zh: '高清智能电视，支持主流流媒体应用及投屏功能。', th: 'สมาร์ททีวีความคมชัดสูง รองรับแอพพลิเคชันสตรีมมิ่ง' },
      icon: Tv,
    },
    {
      category: 'access',
      title: { en: '24/7 Security & CCTV', zh: '24小时安保与监控系统', th: 'ระบบรักษาความปลอดภัย 24 ชม.' },
      desc: { en: 'Gated development access, 24-hour security personnel, and comprehensive CCTV monitoring.', zh: '封闭式园区管理，24小时安保团队值守及全方位监控。', th: 'เจ้าหน้าที่รักษาความปลอดภัย 24 ชั่วโมง และกล้องวงจรปิดครอบคลุม' },
      icon: ShieldCheck,
    },
    {
      category: 'access',
      title: { en: 'Keycard Lift Access', zh: '门禁梯控专属楼层系统', th: 'ลิฟต์ล็อคชั้นด้วยคีย์การ์ด' },
      desc: { en: 'Direct access to your designated residential floor and shared sky amenity levels only.', zh: '专属门禁卡仅限到达所住楼层及公共云端设施层，保障私密。', th: 'เข้าถึงเฉพาะชั้นที่พักอาศัยและชั้นสิ่งอำนวยความสะดวกเพื่อความเป็นส่วนตัว' },
      icon: CreditCard,
    },
    {
      category: 'access',
      title: { en: '5-Min to MRT Rama 9', zh: '步行5分钟直达地铁站', th: '5 นาทีถึง MRT พระราม 9' },
      desc: { en: 'Effortless walk to MRT Phra Ram 9 station, Central Rama 9 mall, and Fortune Town.', zh: '轻松步行直达 MRT Phra Ram 9 地铁站、Central Rama 9 购物中心与 Fortune Town。', th: 'เดินเพียง 5 นาทีถึงสถานี MRT พระราม 9, เซ็นทรัลพระราม 9 และฟอร์จูนทาวน์' },
      icon: Train,
    },
    {
      category: 'access',
      title: { en: 'Covered Parking & EV Points', zh: '室内停车场与充电桩', th: 'ที่จอดรถในร่มและจุดชาร์จ EV' },
      desc: { en: 'Protected multi-level parking structure with dedicated EV charging stations on-site.', zh: '多层室内安全停车场，并配有便捷的电动汽车充电桩。', th: 'อาคารจอดรถในร่มที่ปลอดภัย พร้อมจุดชาร์จรถยนต์ไฟฟ้าภายในโครงการ' },
      icon: Car,
    },
  ];

  // Filter list based on tab
  const filteredFeatured = activeCategory === 'all' 
    ? featuredAmenities 
    : featuredAmenities.filter(item => item.category === activeCategory);

  const filteredList = activeCategory === 'all'
    ? allAmenitiesList
    : allAmenitiesList.filter(item => item.category === activeCategory);

  return (
    <section id="amenities-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>
            {language === 'zh' ? '尊享设施与服务' : language === 'th' ? 'สิ่งอำนวยความสะดวกระดับพรีเมียม' : 'Building & Residence Amenities'}
          </span>
        </div>
        <h2 
          className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#042F61] tracking-tight whitespace-nowrap overflow-x-auto"
          style={{ lineHeight: '60px' }}
        >
          {language === 'zh' 
            ? <>为<span className="italic">现代高品质生活</span>精心配置</>
            : language === 'th' 
            ? <>ออกแบบเพื่อ<span className="italic">การใช้ชีวิตที่เหนือระดับ</span></> 
            : <>Curated for <span className="italic">Modern Living</span> in Bangkok</>}
        </h2>
        <p className="text-[#5E574E] text-sm sm:text-base mt-3 leading-relaxed">
          {language === 'zh'
            ? '无论是在40层云端眺望曼谷天际线的无边际泳池，还是套内贴心配备的居家办公空间，每一处细节皆为您精心准备。'
            : language === 'th'
            ? 'สัมผัสสิ่งอำนวยความสะดวกครบครัน ทั้งสระว่ายน้ำลอยฟ้า ฟิตเนส สกายเลานจ์ และความสะดวกสบายระดับพรีเมียมภายในที่พัก'
            : 'From panoramic sky facilities perched high above Rama 9 to meticulously appointed in-residence comforts, discover everything provided for your stay.'}
        </p>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`amenity-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#042F61] text-white shadow-xs scale-102'
                    : 'bg-[#EDE8E1] text-[#5E574E] hover:text-[#042F61] hover:bg-[#E3DCD3]'
                }`}
              >
                {cat.label[language] || cat.label.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Visual Photographic Cards (Building Sky Highlights) */}
      {filteredFeatured.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatured.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={`featured-amenity-${item.id}`}
                  className="bg-white rounded-3xl border border-[#E6E0D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Container with Top Badge */}
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title[language] || item.title.en}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20">
                      <Icon className="w-3.5 h-3.5 text-[#DFB85A]" />
                      <span>{item.tag[language] || item.tag.en}</span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#042F61] leading-snug">
                        {item.title[language] || item.title.en}
                      </h3>
                      <p className="text-xs text-[#5E574E] mt-2 leading-relaxed">
                        {item.description[language] || item.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comprehensive Amenities Grid */}
      <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E6E0D8]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#042F61] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-[#042F61]">
              {language === 'zh' 
                ? '全部配套与便利设施一览' 
                : language === 'th' 
                ? 'สิ่งอำนวยความสะดวกและบริการครบวงจร' 
                : 'Complete In-Residence & Building Facilities'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((amenity, idx) => {
            const Icon = amenity.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E0D8]/80 hover:border-[#DFB85A]/50 transition-colors shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-[#042F61] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#042F61] leading-snug">
                    {amenity.title[language] || amenity.title.en}
                  </h4>
                  <p className="text-xs text-[#6B645A] leading-relaxed">
                    {amenity.desc[language] || amenity.desc.en}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
