import { Property, BrandConfig, Destination } from '../types';

export const BRAND_CONFIG: BrandConfig = {
  brandName: 'CG Property',
  primaryLocation: 'Nue District Rama 9, Bangkok, Thailand',
  contactEmail: 'contact@cgproperty.com', // Configurable placeholder
  contactPhone: '+66 (0) 2 000 0000',     // Configurable placeholder
  addressNotice: 'Nue District Rama 9, Rama 9 Road, Huai Khwang, Bangkok 10310, Thailand',
  airbnbGeneralUrl: 'https://www.airbnb.com/users/show/cg-property-bangkok', // Configurable
};

export const PROPERTIES: Property[] = [
  {
    id: 'residence-01',
    slug: 'residence-01',
    name: 'The Tower R Suite',
    location: 'Nue District Rama 9',
    district: 'Rama 9',
    city: 'Bangkok',
    country: 'Thailand',
    tower: 'Tower R',
    floor: '16th Floor',
    sizeSqm: Math.ceil(45.68), // 46 sqm
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    type: 'Furnished condominium unit',
    roomNumberInternal: '185/241',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
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
          en: 'Wide perspective of primary bedroom highlighting spatial openness',
          zh: '主卧广角视野，彰显通透舒适的空间尺度',
          th: 'มุมมองกว้างของห้องนอนหลักเผยให้เห็นความโปร่งสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Window.webp',
        category: 'bedroom',
        caption: {
          en: 'Master bedroom window aperture framing Bangkok cityscape',
          zh: '主卧宽幅观景窗，俯瞰曼谷都会城景',
          th: 'หน้าต่างบานใหญ่ในห้องนอนหลักเปิดรับวิวเมืองกรุงเทพฯ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%20Close.webp',
        category: 'bedroom',
        caption: {
          en: 'Refined textures and bespoke joinery details in master bedroom',
          zh: '主卧细腻木质材质与雅致设计细节',
          th: 'รายละเอียดที่ประณีตและวัสดุสัมผัสระดับพรีเมียมในห้องนอนใหญ่',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bed%20Extended.webp',
        category: 'bedroom',
        caption: {
          en: 'Extended architectural perspective of bedroom suite and sleeping quarters',
          zh: '卧室套房延伸透视与静谧休憩空间',
          th: 'มุมมองมุมกว้างของห้องนอนใหญ่และพื้นที่พักผ่อนอันเงียบสงบ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Bedroom%202.webp',
        category: 'bedroom',
        caption: {
          en: 'Secondary bedroom tailored with dedicated workstation desk',
          zh: '第二卧室，配置有专属书桌与明亮采光',
          th: 'ห้องนอนที่สองพร้อมโต๊ะทำงานส่วนตัวและบรรยากาศโปร่งสบาย',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Washroom.webp',
        category: 'bathroom',
        caption: {
          en: 'Primary bathroom with glass walk-in rain shower and porcelain stone vanity',
          zh: '主卫浴空间，配备玻璃步入式淋浴间与精制台盆',
          th: 'ห้องน้ำหลักพร้อมชาวเวอร์วอล์กอินกระจกและเคาน์เตอร์หินเรียบหรู',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Washroom%202.webp',
        category: 'bathroom',
        caption: {
          en: 'Second bathroom complete with modern sanitaries and clean chrome fixtures',
          zh: '次卫浴空间，配齐现代卫浴设施与精致镀铬五金',
          th: 'ห้องน้ำที่สองพร้อมสุขภัณฑ์ทันสมัยและอุปกรณ์โครเมียมอย่างดี',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Towels.webp',
        category: 'details',
        caption: {
          en: 'Complimentary luxury hotel-grade linens and bath amenities',
          zh: '酒店级亲肤高支纯棉毛巾与高品质卫浴备品',
          th: 'ผ้าขนหนูเกรดโรงแรมและสิ่งอำนวยความสะดวกในห้องน้ำครบครัน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Random%20Shot.webp',
        category: 'details',
        caption: {
          en: 'Curated interior art accents and boutique decorative styling',
          zh: '精心甄选的艺术软装陈设与精品空间美学',
          th: 'การตกแต่งสไตล์บูทีคและรายละเอียดงานศิลปะในเรสซิเดนซ์',
        },
      },
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/cg-residence-01-nue-district-rama9',
    tagline: {
      en: '2 Bedrooms · 2 Bathrooms · 46 sqm · 16th Floor, Tower R',
      zh: '2房2卫 · 46平方米 · R栋16层',
      th: '2 ห้องนอน 2 ห้องน้ำ · 46 ตร.ม. · ชั้น 16 อาคาร R',
    },
    overview: {
      en: 'The Tower R Suite is a 46 sqm furnished two-bedroom, two-bathroom condominium positioned on the 16th floor of Tower R within Nue District Rama 9, Bangkok.',
      zh: 'The Tower R Suite 是一套位于曼谷 Nue District Rama 9 项目 R 栋 16 层的带全套家具两居室双卫公寓，使用面积为 46 平方米。',
      th: 'The Tower R Suite เป็นคอนโดมิเนียมตกแต่งพร้อมอยู่ ขนาด 46 ตร.ม. รูปแบบ 2 ห้องนอน 2 ห้องน้ำ ตั้งอยู่บนชั้น 16 ของอาคาร R ในโครงการ Nue District Rama 9 กรุงเทพฯ',
    },
  },
  {
    id: 'residence-02',
    slug: 'residence-02',
    name: 'The Tower N Sky Suite',
    location: 'Nue District Rama 9',
    district: 'Rama 9',
    city: 'Bangkok',
    country: 'Thailand',
    tower: 'Tower N',
    floor: '40th Floor',
    sizeSqm: Math.ceil(40.74), // 41 sqm
    bedrooms: 2,
    bathrooms: 1,
    furnished: true,
    type: 'Furnished condominium unit',
    roomNumberInternal: '185/1427',
    coverImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=2000&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: '40th floor sky-zone living room with expansive horizon views',
          zh: '40层云端高区起居室与开阔全景视野',
          th: 'ห้องนั่งเล่นชั้น 40 โซนลอยฟ้าพร้อมวิวขอบฟ้าแบบพาโนรามา',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'High-elevation architectural lounge overlooking Bangkok skyline',
          zh: '俯瞰曼谷城市天际线的高层休闲空间',
          th: 'มุมพักผ่อนชั้นสูงชมทัศนียภาพเส้นขอบฟ้ากรุงเทพฯ',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Sky suite primary bedroom with tailored modern aesthetic',
          zh: '现代雅致风格的高层主卧',
          th: 'ห้องนอนหลักสกายสูทสไตล์โมเดิร์นสวยงาม',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Compact architectural dining space and kitchenette',
          zh: '精致就餐空间与开放式厨区',
          th: 'พื้นที่รับประทานอาหารและครัวขนาดกะทัดรัด',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Sleek bathroom with minimalist fixtures',
          zh: '极简线条卫浴间',
          th: 'ห้องน้ำดีไซน์มินิมอลทันสมัย',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Secondary bedroom with flexible modular arrangement',
          zh: '灵活多功能布局的次卧',
          th: 'ห้องนอนที่สองจัดวางอย่างยืดหยุ่น',
        },
      },
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/cg-residence-02-nue-district-rama9',
    tagline: {
      en: '2 Bedrooms · 1 Bathroom · 41 sqm · 40th Floor, Tower N',
      zh: '2房1卫 · 41平方米 · N栋40层',
      th: '2 ห้องนอน 1 ห้องน้ำ · 41 ตร.ม. · ชั้น 40 อาคาร N',
    },
    overview: {
      en: 'The Tower N Sky Suite is a 41 sqm furnished two-bedroom, one-bathroom condominium situated on the 40th floor of Tower N within Nue District Rama 9, Bangkok.',
      zh: 'The Tower N Sky Suite 是一套位于曼谷 Nue District Rama 9 项目 N 栋 40 层的带全套家具两居室单卫公寓，使用面积为 41 平方米。',
      th: 'The Tower N Sky Suite เป็นคอนโดมิเนียมตกแต่งพร้อมอยู่ ขนาด 41 ตร.ม. รูปแบบ 2 ห้องนอน 1 ห้องน้ำ ตั้งอยู่บนชั้น 40 ของอาคาร N ในโครงการ Nue District Rama 9 กรุงเทพฯ',
    },
  },
  {
    id: 'quintara',
    slug: 'quintara',
    name: 'Quintara',
    location: 'Quintara',
    district: 'Mid-Levels, Central',
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    tower: 'Tower 1',
    floor: '28th Floor',
    sizeSqm: 58,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    type: 'Furnished luxury residence',
    roomNumberInternal: 'Suite 28B',
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
          en: 'Expansive living lounge arranged for serene relaxation and entertaining',
          zh: '宽敞起居休闲沙龙，兼顾从容休憩与私密待客',
          th: 'ห้องรับแขกกว้างขวางจัดวางอย่างลงตัวเพื่อการพักผ่อนและการต้อนรับ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/TV%20with%20Working%20Desk.webp',
        category: 'living',
        caption: {
          en: 'Media entertainment wall and integrated executive workstation',
          zh: '高清影音电视墙与一体化行政办公桌',
          th: 'โซนทีวีมัลติมีเดียพร้อมมุมโต๊ะทำงานสำหรับผู้บริหาร',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Kitchen%201.webp',
        category: 'kitchen',
        caption: {
          en: 'Gourmet open-concept kitchen fitted with premium appliances and bespoke cabinetry',
          zh: '开放式高端配置厨房，配齐品牌厨电与定制储物柜',
          th: 'ครัวเปิดสไตล์กูร์เมต์พร้อมเครื่องใช้ไฟฟ้าและตู้เก็บของระดับพรีเมียม',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bedroom%20Full.webp',
        category: 'bedroom',
        caption: {
          en: 'Master bedroom full architectural composition with designer king bed',
          zh: '主卧全景空间设计，配置设计师款奢适特大床',
          th: 'ภาพรวมห้องนอนใหญ่ดีไซน์เนอร์พร้อมเตียงคิงไซส์',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bed%201.webp',
        category: 'bedroom',
        caption: {
          en: 'Master bedroom sleeping suite featuring acoustic wall panelling and plush linens',
          zh: '主卧套房睡眠区，配置静音护墙板与高密织品质床品',
          th: 'เตียงนอนห้องนอนใหญ่พร้อมผนังซับเสียงและชุดเครื่องนอนคุณภาพสูง',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Bed%202.webp',
        category: 'bedroom',
        caption: {
          en: 'Secondary guest bedroom arranged for restful sleep and privacy',
          zh: '第二客卧套房，兼顾静谧睡眠与独立私密性',
          th: 'ห้องนอนที่สองจัดวางเพื่อการนอนหลับพักผ่อนอย่างเงียบสงบ',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Washroom%201.webp',
        category: 'bathroom',
        caption: {
          en: 'Contemporary ensuite bathroom featuring rain shower and brushed bronze hardware',
          zh: '现代套内卫浴，配备清爽雨淋花洒与拉丝青铜考究五金',
          th: 'ห้องน้ำในตัวสไตล์โมเดิร์นพร้อมเรนชาวเวอร์และฟิตติ้งสีบรอนซ์หรูหรา',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/In%20between%20rooms.webp',
        category: 'details',
        caption: {
          en: 'Harmonious transitional gallery hallway connecting living and private quarters',
          zh: '贯通动静分区的雅致走廊与过渡艺术空间',
          th: 'โถงทางเดินเชื่อมต่อระหว่างห้องนั่งเล่นและพื้นที่ห้องนอนอย่างกลมกลืน',
        },
      },
      {
        url: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Decoration.webp',
        category: 'details',
        caption: {
          en: 'Bespoke decorative styling and artistic accent pieces',
          zh: '专属定制艺术装饰摆件与空间美学点缀',
          th: 'ของตกแต่งและงานศิลปะสั่งทำพิเศษสะท้อนรสนิยมอันโดดเด่น',
        },
      },
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/cg-quintara-hong-kong',
    tagline: {
      en: '2 Bedrooms · 2 Bathrooms · 58 sqm · 28th Floor, Tower 1',
      zh: '2房2卫 · 58平方米 · 1栋28层',
      th: '2 ห้องนอน 2 ห้องน้ำ · 58 ตร.ม. · ชั้น 28 ทาวเวอร์ 1',
    },
    overview: {
      en: 'Quintara is a 58 sqm curated two-bedroom, two-bathroom luxury residence situated on the 28th floor in Hong Kong. Combining refined modern minimalism with breathtaking vistas of Victoria Harbour and the metropolitan skyline, this residence offers an elevated urban haven with seamless proximity to Central, premier fine dining, and cultural landmarks.',
      zh: 'Quintara 是一套位于中国香港 28 层的 58 平方米两室双卫奢雅精装寓所。将优雅内敛的现代极简主义与维多利亚港及都会天际线全景相融，为跨国差旅、高阶家庭与全球宾客提供尊崇居停体验，便捷通达中环金融商业核心、顶级餐饮及人文地标。',
      th: 'Quintara เป็นเรสซิเดนซ์หรูตกแต่งพร้อมอยู่ขนาด 58 ตร.ม. รูปแบบ 2 ห้องนอน 2 ห้องน้ำ ตั้งอยู่บนชั้น 28 ในฮ่องกง ผสานความเรียบหรูสไตล์มินิมอลร่วมสมัยเข้ากับวิวอ่าววิคตอเรียและเส้นขอบฟ้าเมืองอันตระการตา มอบการพักอาศัยระดับพรีเมียมที่เชื่อมต่อสู่ย่านเซ็นทรัล แหล่งช้อปปิ้ง และร้านอาหารชั้นนำอย่างสะดวกรวดเร็ว',
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
      en: 'Discover our collection of furnished residences in Bangkok at Nue District Rama 9.',
      zh: '探索我们位于曼谷 Nue District Rama 9 的首发精装住宅系列。',
      th: 'สัมผัสคอลเลกชันที่พักพร้อมอยู่ของเราในกรุงเทพฯ ณ โครงการ Nue District Rama 9',
    },
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=80',
    propertyCount: 2,
  },
  {
    id: 'hong-kong',
    slug: 'hong-kong',
    name: {
      en: 'Hong Kong',
      zh: '香港',
      th: 'ฮ่องกง',
    },
    country: {
      en: 'Hong Kong SAR',
      zh: '中国香港',
      th: 'ฮ่องกง',
    },
    description: {
      en: 'Experience elevated urban living at Quintara, our curated luxury residence overlooking the vibrant Hong Kong skyline.',
      zh: '在 Quintara 体验高品位都市生活，尽览充满活力的香港天际线全景。',
      th: 'สัมผัสการใช้ชีวิตในเมืองระดับพรีเมียมที่ Quintara เรสซิเดนซ์หรูพร้อมวิวขอบฟ้าฮ่องกงอันงดงาม',
    },
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1800&q=80',
    propertyCount: 1,
  },
];
