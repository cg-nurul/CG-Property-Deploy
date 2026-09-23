import { Property, BrandConfig, Destination } from '../types';

export const BRAND_CONFIG: BrandConfig = {
  brandName: 'CG Property',
  primaryLocation: 'Bangkok, Thailand',
  contactEmail: 'contact@cgproperty.com', // Configurable placeholder
  contactPhone: '+66 (0) 2 000 0000',     // Configurable placeholder
  addressNotice: 'Directly managed residences in Bangkok',
  airbnbGeneralUrl: 'https://www.airbnb.com/users/show/cg-property-bangkok', // Configurable
};

export const PROPERTIES: Property[] = [
  {
    id: 'residence-01',
    slug: 'residence-01',
    name: 'NUE District R9',
    location: '185/241 · 185 Rama IX Rd, Huai Khwang, Bangkok 10310, Thailand',
    district: 'Huai Khwang',
    city: 'Bangkok',
    country: 'Thailand',
    tower: '',
    floor: '16th Floor',
    sizeSqm: Math.ceil(45.68), // 46 sqm
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    type: 'Furnished condominium unit',
    roomNumberInternal: '185/241',
    coverImage: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/nue%20ext%203.webp',
    heroImage: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/nue%20ext%203.webp',
    gallery: [
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room.webp',
        category: 'living',
        caption: {
          en: '16th floor living room with natural light and contemporary Scandinavian styling',
          zh: '16层采光起居室与当代北欧温馨格调',
          th: 'ห้องนั่งเล่นชั้น 16 รับแสงธรรมชาติพร้อมการตกแต่งสไตล์สแกนดิเนเวียนร่วมสมัย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room%20Close%20up.webp',
        category: 'living',
        caption: {
          en: 'Close-up perspective of living area showcasing bespoke furnishings and finishes',
          zh: '起居室特写视角，展现定制家具与精细材质',
          th: 'มุมมองระยะใกล้ของห้องนั่งเล่นแสดงเฟอร์นิเจอร์สั่งทำและการตกแต่งประณีต',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room%20Far.webp',
        category: 'living',
        caption: {
          en: 'Expansive wide-angle view across the living room lounge',
          zh: '起居室休闲沙龙区开阔全景',
          th: 'มุมมองกว้างของห้องนั่งเล่นและมุมพักผ่อน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room%20Sideways.webp',
        category: 'living',
        caption: {
          en: 'Side profile view across the open-plan living room',
          zh: '开放式起居室侧向通透视角',
          th: 'มุมมองด้านข้างเปิดโล่งของห้องนั่งเล่น',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room%20Sideways%202.webp',
        category: 'living',
        caption: {
          en: 'Alternative architectural angle highlighting living room ambiance',
          zh: '起居室多元空间层次与采光视角',
          th: 'มุมมองสถาปัตยกรรมด้านข้างของห้องนั่งเล่น',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room%20With%20Kitchen.webp',
        category: 'living',
        caption: {
          en: 'Seamless open flow connecting living salon and modern fitted kitchen',
          zh: '起居客厅与现代一体化厨房的通透贯通动线',
          th: 'พื้นที่เชื่อมต่อระหว่างห้องนั่งเล่นและครัวโมเดิร์นแบบเปิดโล่ง',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Kitchen.webp',
        category: 'kitchen',
        caption: {
          en: 'Fully equipped gourmet kitchen featuring integrated cooktop and custom cabinetry',
          zh: '配置完备的品质厨房，配备嵌入式炉灶与定制橱柜',
          th: 'ห้องครัวสไตล์กูร์เมต์พร้อมอุปกรณ์ครบครันและตู้บิลท์อิน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Full%20View.webp',
        category: 'bedroom',
        caption: {
          en: 'Full architectural view of master bedroom suite with plush queen bedding',
          zh: '主卧套房全景，配置奢适大床与定制床头软包',
          th: 'ภาพรวมห้องนอนใหญ่พร้อมเตียงนอนหนานุ่มและหัวเตียงสั่งทำ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Wide.webp',
        category: 'bedroom',
        caption: {
          en: 'Wide-angle panoramic perspective of primary bedroom suite',
          zh: '主卧套房宽幅全景视角，明亮采光与舒适布局',
          th: 'มุมมองกว้างของห้องนอนใหญ่ รับแสงสว่างและจัดวางอย่างลงตัว',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Close.webp',
        category: 'bedroom',
        caption: {
          en: 'Refined close-up of master suite bedding and warm bedside illumination',
          zh: '主卧床品细节与温馨床头暖光氛围',
          th: 'รายละเอียดชุดเครื่องนอนห้องนอนใหญ่และแสงไฟหัวเตียงอบอุ่น',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Window.webp',
        category: 'bedroom',
        caption: {
          en: 'Expansive master bedroom glazing framing open skyline outlook',
          zh: '主卧采光大窗与城市开阔天际线景观',
          th: 'หน้าต่างบานกว้างในห้องนอนใหญ่เปิดรับวิวเมืองโปร่งสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bed%20Extended.webp',
        category: 'bedroom',
        caption: {
          en: 'Extended perspective across the primary bedroom suite and lounging zone',
          zh: '主卧套间延展视角，营造惬意通透起居生活',
          th: 'มุมมองพื้นที่ห้องนอนใหญ่พร้อมมุมพักผ่อนแสนสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%202.webp',
        category: 'bedroom',
        caption: {
          en: 'Dedicated second bedroom appointed with comfortable mattress suite',
          zh: '雅致次卧空间，配备舒适软床与多功能布局',
          th: 'ห้องนอนที่สองจัดวางอย่างลงตัวพร้อมเตียงนอนแสนสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Washroom.webp',
        category: 'bathroom',
        caption: {
          en: 'Primary ensuite bathroom featuring glazed walk-in shower and contemporary vanity',
          zh: '主卫干湿分离步入式淋浴间与现代面盆台面',
          th: 'ห้องน้ำหลักพร้อมฉากกั้นอาบน้ำกระจกและอ่างล้างหน้าทันสมัย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Washroom%202.webp',
        category: 'bathroom',
        caption: {
          en: 'Secondary guest bathroom complete with modern ceramic fixtures and shower',
          zh: '次卫客用洗手间，配备高品质陶瓷洁具与独立淋浴',
          th: 'ห้องน้ำสำหรับแขกพร้อมสุขภัณฑ์คุณภาพและฝักบัว',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Towels.webp',
        category: 'bathroom',
        caption: {
          en: 'Fresh boutique bath linens and tailored vanity essentials',
          zh: '高品质洁净洗浴毛巾与精选卫浴洗护备品',
          th: 'ผ้าขนหนูสะอาดนุ่มและของใช้ในห้องน้ำที่คัดสรรอย่างดี',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Random%20Shot.webp',
        category: 'details',
        caption: {
          en: 'Curated architectural vignette and boutique interior design accents',
          zh: '精选室内空间美学细节与精品软装设计',
          th: 'มุมมองรายละเอียดการตกแต่งและงานดีไซน์ภายในเรสซิเดนซ์',
        },
      },
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/cg-residence-01-nue-district-rama9',
    tagline: {
      en: '2 Bedrooms · 2 Bathrooms · 46 sqm · 16th Floor',
      zh: '2房2卫 · 46平方米 · 16层',
      th: '2 ห้องนอน 2 ห้องน้ำ · 46 ตร.ม. · ชั้น 16',
    },
    overview: {
      en: 'NUE District R9 is a 46 sqm furnished two-bedroom, two-bathroom condominium positioned on the 16th floor at 185/241 · 185 Rama IX Rd, Huai Khwang, Bangkok 10310, Thailand.',
      zh: 'NUE District R9 是一套位于曼谷拉玛九路 185 号（185/241 · 185 Rama IX Rd, Huai Khwang, Bangkok 10310, Thailand）16 层的带全套家具两居室双卫公寓，使用面积为 46 平方米。',
      th: 'NUE District R9 เป็นคอนโดมิเนียมตกแต่งพร้อมอยู่ ขนาด 46 ตร.ม. รูปแบบ 2 ห้องนอน 2 ห้องน้ำ ตั้งอยู่บนชั้น 16 ณ เลขที่ 185/241 · 185 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310 ประเทศไทย',
    },
  },
  {
    id: 'quintara',
    slug: 'quintara',
    name: 'Quintara',
    location: '176 Soi Ratchadaphisek 12, Huai Khwang, Bangkok 10310, Thailand',
    district: 'Huai Khwang',
    city: 'Bangkok',
    country: 'Thailand',
    tower: 'Quintara',
    floor: 'Curated Residence',
    sizeSqm: 58,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    type: 'Furnished luxury residence',
    roomNumberInternal: '176/R12',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=85',
    gallery: [
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Living%20Room%201.webp',
        category: 'living',
        caption: {
          en: 'Quintara living salon with metropolitan natural light and curated furnishings',
          zh: 'Quintara 起居厅，充沛自然采光与雅致精选家私',
          th: 'ห้องนั่งเล่น Quintara รับแสงธรรมชาติของเมืองใหญ่พร้อมเฟอร์นิเจอร์คัดสรร',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Living%20Room%202.webp',
        category: 'living',
        caption: {
          en: 'Contemporary architectural perspective of lounge and reception space',
          zh: '沙龙会客区的当代空间层次与考究陈设',
          th: 'มุมมองสถาปัตยกรรมร่วมสมัยของห้องนั่งเล่นและมุมต้อนรับ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/TV%20with%20Working%20Desk.webp',
        category: 'living',
        caption: {
          en: 'Integrated executive work desk with high-speed media display',
          zh: '商务办公书桌与多功能影音中心一体化配置',
          th: 'โต๊ะทำงานผู้บริหารพร้อมจอแสดงผลความเร็วสูง',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Kitchen%201.webp',
        category: 'kitchen',
        caption: {
          en: 'Minimalist fitted kitchen with precision induction and concealed cabinetry',
          zh: '极简品质厨房，配备精致电磁炉台与隐蔽式储物柜',
          th: 'ห้องครัวแบบมินิมอลพร้อมเตาแม่เหล็กไฟฟ้าและตู้เก็บของบิลท์อิน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bedroom%20Full.webp',
        category: 'bedroom',
        caption: {
          en: 'Generous primary suite featuring bespoke headboard and panoramic glazing',
          zh: '通透主卧套房，配备定制床头与宽幅采光大窗',
          th: 'ห้องนอนใหญ่โอ่โถงพร้อมหัวเตียงสั่งทำและหน้าต่างบานกว้าง',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bed%201.webp',
        category: 'bedroom',
        caption: {
          en: 'Master bedding dressed in premium boutique linens and soft lighting',
          zh: '主卧甄选精品高织床品与惬意柔光氛围',
          th: 'ชุดเครื่องนอนพรีเมียมในห้องนอนหลักพร้อมแสงไฟนุ่มนวล',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bed%202.webp',
        category: 'bedroom',
        caption: {
          en: 'Secondary suite appointed with executive comfort and versatile layout',
          zh: '次卧套间，为差旅与家庭居住提供舒适灵动的空间体验',
          th: 'ห้องนอนที่สองจัดวางอย่างยืดหยุ่นเหมาะแก่การพักผ่อน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Washroom%201.webp',
        category: 'bathroom',
        caption: {
          en: 'Designer bathroom with glass-enclosed shower and refined stone finishes',
          zh: '高标准卫浴空间，配置玻璃淋浴房与精工石材饰面',
          th: 'ห้องน้ำดีไซเนอร์พร้อมตู้อาบน้ำกระจกและงานหินอ่อนประณีต',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/In%20between%20rooms.webp',
        category: 'details',
        caption: {
          en: 'Architectural threshold and curated gallery hallway',
          zh: '走廊过道与建筑动线层次',
          th: 'โถงทางเดินเชื่อมระหว่างห้องดีไซน์โปร่งสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Decoration.webp',
        category: 'details',
        caption: {
          en: 'Artisan ceramic vessels and bespoke decorative details',
          zh: '手工陶艺器皿与定制艺术美学软装细节',
          th: 'งานเซรามิกและรายละเอียดของตกแต่งสั่งทำ',
        },
      },
    ],
    airbnbUrl: 'https://www.airbnb.com/users/show/cg-property-bangkok',
    tagline: {
      en: '2 Bedrooms · 2 Bathrooms · 58 sqm · Huai Khwang, Bangkok',
      zh: '2房2卫 · 58平方米 · 曼谷辉煌区',
      th: '2 ห้องนอน 2 ห้องน้ำ · 58 ตร.ม. · ห้วยขวาง กรุงเทพฯ',
    },
    overview: {
      en: 'Quintara is a curated luxury residence positioned at 176 Soi Ratchadaphisek 12, Huai Khwang, Bangkok 10310, Thailand. Combining refined modern minimalism with exceptional privacy, this residence offers an elevated urban haven with seamless proximity to MRT Huai Khwang, Ratchada lifestyle enclaves, and central Bangkok.',
      zh: 'Quintara 是一套位于曼谷辉煌区（176 Soi Ratchadaphisek 12, Huai Khwang, Bangkok 10310, Thailand）的精选奢雅精装寓所。将优雅内敛的现代极简主义与私密居住体验相融，便捷通达 MRT 辉煌站、拉差达繁华商圈及曼谷市中心。',
      th: 'Quintara เป็นเรสซิเดนซ์หรูตกแต่งพร้อมอยู่ ตั้งอยู่ ณ เลขที่ 176 ซอยรัชดาภิเษก 12 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310 ประเทศไทย ผสานความเรียบหรูสไตล์มินิมอลร่วมสมัยเข้ากับความเป็นส่วนตัวสูง ใกล้ MRT ห้วยขวาง และย่านไลฟ์สไตล์รัชดา-พระราม 9',
    },
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'thailand-bangkok',
    slug: 'thailand/bangkok',
    name: {
      en: 'Bangkok',
      zh: '曼谷',
      th: 'กรุงเทพมหานคร',
    },
    country: {
      en: 'Thailand',
      zh: '泰国',
      th: 'ประเทศไทย',
    },
    description: {
      en: 'Discover our collection of furnished luxury residences in Bangkok across NUE District R9 and Quintara Ratchada.',
      zh: '探索我们位于曼谷 NUE District R9 与 Quintara Ratchada 的精选精装住宅系列。',
      th: 'สัมผัสคอลเลกชันที่พักพร้อมอยู่ของเราในกรุงเทพฯ ณ โครงการ NUE District R9 และ Quintara Ratchada',
    },
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=80',
    propertyCount: 2,
  },
];
