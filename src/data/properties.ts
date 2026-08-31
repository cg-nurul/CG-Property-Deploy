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
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: '16th floor living room with natural light and mid-rise city view',
          zh: '16层采光充沛的起居室及城市景观',
          th: 'ห้องนั่งเล่นชั้น 16 รับแสงธรรมชาติพร้อมวิวเมืองระดับกลาง',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Primary bedroom with warm Scandinavian-inspired wood finishes',
          zh: '带有温馨北欧木质调的主卧空间',
          th: 'ห้องนอนหลักตกแต่งด้วยโทนไม้อบอุ่นสไตล์สแกนดิเนเวียน',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Dining area and custom integrated cabinetry',
          zh: '就餐区与定制一体式橱柜',
          th: 'พื้นที่รับประทานอาหารและตู้บิลท์อิน',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Ensuite bathroom with contemporary stone finishes',
          zh: '现代石材风格的独立卫浴',
          th: 'ห้องน้ำในตัวพร้อมวัสดุหินร่วมสมัย',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
        caption: {
          en: 'Secondary bedroom with dedicated workspace setup',
          zh: '配置有专属办公区域的第二卧室',
          th: 'ห้องนอนที่สองพร้อมมุมโต๊ะทำงานเป็นสัดส่วน',
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
      en: 'Discover our first collection of furnished residences in Bangkok at Nue District Rama 9.',
      zh: '探索我们位于曼谷 Nue District Rama 9 的首发精装住宅系列。',
      th: 'สัมผัสคอลเลกชันที่พักพร้อมอยู่แห่งแรกของเราในกรุงเทพฯ ณ โครงการ Nue District Rama 9',
    },
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=80',
    propertyCount: 2,
  },
];
