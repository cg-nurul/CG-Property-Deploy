import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.name': 'CG Property',
    'brand.tagline': 'Stay Somewhere Exceptional',
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.destinations': 'Destinations',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.exploreResidences': 'Explore Residences',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    // Hero
    'hero.headline': 'Stay Somewhere Exceptional.',
    'hero.subheadline': 'Discover our curated collection of furnished luxury residences across premier global destinations.',
    'hero.cta.explore': 'Explore Residences',
    'hero.cta.location': 'Discover the Location',
    'hero.badge.location': 'Global Portfolio',
    'hero.badge.collection': 'Curated Collection · Bangkok & Hong Kong',
    'hero.badge.preview': 'Featured Residence',
    'hero.viewDetails': 'View Property',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'THE CG PROPERTY DIFFERENCE',
    'why.heading': 'Why CG Property?',
    'why.subheading': 'A premium, professionally managed stay — from the moment you book to the moment you leave.',
    'why.feature1.title': 'Carefully Selected',
    'why.feature1.desc': 'Every property is personally vetted for quality, character and comfort.',
    'why.feature2.title': 'Quality Accommodation',
    'why.feature2.desc': 'Thoughtfully furnished spaces designed for memorable stays.',
    'why.feature3.title': 'Trusted Management',
    'why.feature3.desc': 'On-the-ground teams look after every detail of your stay.',
    'why.feature4.title': 'Memorable Locations',
    'why.feature4.desc': 'Handpicked destinations across premier international metropolises and sought-after locations.',
    'why.feature5.title': 'Professional Service',
    'why.feature5.desc': 'Responsive, attentive service from enquiry to checkout.',
    'why.feature6.title': 'Easy Booking',
    'why.feature6.desc': 'Simple, secure booking through Airbnb, with more ways to book coming soon.',

    // Brand Introduction (Legacy keys fallback)
    'intro.eyebrow': 'About CG Property',
    'intro.heading': 'Thoughtfully curated residences across global destinations.',
    'intro.body': 'CG Property brings together carefully selected places to stay across key global cities, featuring meticulously furnished residences in Bangkok, Hong Kong, and premier destinations worldwide.',

    // The Collection
    'collection.heading': 'The Collection',
    'collection.subheading': 'Distinct furnished residences with tailored layouts, bespoke interiors, and panoramic city views.',
    'collection.residence1.title': 'The Tower R Suite',
    'collection.residence2.title': 'The Tower N Sky Suite',
    'collection.viewProperty': 'View Property',
    'collection.viewResidence': 'View Property',
    'collection.bookNow': 'Book Now',

    // Property specs & labels
    'spec.bedrooms': 'Bedrooms',
    'spec.bedroom': 'Bedroom',
    'spec.bathrooms': 'Bathrooms',
    'spec.bathroom': 'Bathroom',
    'spec.size': 'Size',
    'spec.floor': 'Floor',
    'spec.tower': 'Tower',
    'spec.interior': 'Interior',
    'spec.furnished': 'Interior',
    'spec.furnishedStatus': 'Fully Furnished',
    'spec.type': 'Property Type',
    'spec.typeValue': 'Condominium Residence',
    'spec.location': 'Location',
    'spec.city': 'City',
    'spec.country': 'Country',
    'spec.sqm': 'sqm',

    // Comparison
    'comparison.heading': 'Compare the Residences',
    'comparison.subheading': 'Review the key architectural specifications of our two furnished residences at Nue District Rama 9.',
    'comparison.feature': 'Specification',
    'comparison.selectResidence': 'View Details',

    // Location: Nue District Rama 9
    'location.heading': 'Nue District Rama 9',
    'location.subheading': 'Our Bangkok residences are located within Nue District Rama 9.',
    'location.description': 'Nue District Rama 9 provides a central urban setting within Bangkok, hosting our premier residences across Tower R and Tower N.',
    'location.mapNotice': 'Location within Bangkok metropolis. Address: Nue District Rama 9, Rama 9 Road, Huai Khwang, Bangkok.',
    'location.towerR': 'Tower R — 16th Floor (The Tower R Suite)',
    'location.towerN': 'Tower N — 40th Floor (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': 'Bangkok',
    'bangkok.subheading': 'Discover a place to stay in one of Thailand’s most dynamic cities.',
    'bangkok.exploreDestination': 'Explore Bangkok',

    // Future Expansion
    'future.heading': 'A Growing Global Portfolio of Exceptional Stays.',
    'future.subheading': 'New premier metropolises and curated retreats are continually joining the CG Property collection.',

    // Booking & Airbnb
    'booking.title': 'Reserve Your Stay',
    'booking.methodNotice': 'Current reservations are arranged securely through Airbnb.',
    'booking.airbnbCta': 'Book on Airbnb',
    'booking.futureNotice': 'Direct booking and availability inquiries will be introduced in future phases.',
    'booking.inquiryCta': 'Enquire Directly',

    // Property Detail Page
    'property.keyFacts': 'Key Facts',
    'property.gallery': 'Gallery',
    'property.overview': 'Overview',
    'property.amenities': 'Amenities',
    'property.amenitiesEmpty': 'Property amenities will be added soon.',
    'property.stayInfo': 'Stay Information',
    'property.stayInfoNotice': 'Complete stay policies and guidelines are provided upon booking through Airbnb.',
    'property.otherResidence': 'Explore The Other Residence',
    'property.backToProperties': 'Back to Properties',
    'property.viewGallery': 'View all photos',
    'gallery.scrollToExplore': 'Scroll to see how it looks from inside',

    // Destinations Page
    'destinations.title': 'Destinations',
    'destinations.subheading': 'Explore the global destinations and districts where CG Property residences are located.',
    'destinations.activeDestinations': 'Active Destinations',
    'destinations.thailandTitle': 'Thailand',
    'destinations.thailandDescription': 'A vibrant Southeast Asian metropolis, hosting our premier residences in Bangkok’s central Rama 9 district.',
    'destinations.bangkokTitle': 'Bangkok',
    'destinations.viewDistrict': 'View Residences in Bangkok',

    // About Page
    'about.eyebrow': 'About CG Property',
    'about.title': 'Curating Exceptional Stays Worldwide',
    'about.statement': 'CG Property is a boutique hospitality and property company curating a global collection of handpicked residences across premier international destinations. We provide a worldwide network of homes defined by architectural distinction, refined elegance, and uncompromising end-to-end direct management.',
    'about.visionTitle': 'Our Vision',
    'about.visionSubtitle': 'A Worldwide Collection of Distinctive Stays',
    'about.visionDesc': 'To establish a trusted global portfolio of premier rental residences across the world’s most iconic cities and destinations, uniting architectural excellence with elevated comfort.',
    'about.missionTitle': 'Our Mission',
    'about.missionSubtitle': 'Uncompromising Quality & Flawless Servicing',
    'about.missionDesc': 'To deliver consistently memorable stays by directly managing, maintaining, and servicing every single property in our portfolio with exacting hospitality standards.',
    'about.collectionTitle': 'Curated Global Residences',
    'about.collectionDesc': 'Our portfolio brings together exceptional residences in the world’s most dynamic metropolises. From high-floor skyline sanctuaries at Nue District Rama 9 in Bangkok to curated residences in Hong Kong SAR, each home combines bespoke interior craftsmanship, hotel-grade servicing, and panoramic city views.',
    'about.standardsTitle': 'The CG Property Management Standard',
    'about.standardsSubtitle': 'We do not simply list properties — every residence is directly managed, serviced, and maintained by our dedicated team.',
    'about.pillar1.title': 'Direct Property Management',
    'about.pillar1.desc': 'Complete in-house operational control ensuring pristine unit condition, verified amenities, and strict maintenance protocols.',
    'about.pillar2.title': 'Hotel-Grade Servicing',
    'about.pillar2.desc': 'Professional housekeeping, sanitized premium linens, luxury bath amenities, and routine quality inspections before every arrival.',
    'about.pillar3.title': 'Attentive Guest Support',
    'about.pillar3.desc': 'Smooth digital and in-person check-in support, dedicated concierge communication, and prompt assistance throughout your stay.',
    'about.pillar4.title': 'Global Expansion Vision',
    'about.pillar4.desc': 'Thoughtfully scouting top international destinations to bring our signature hospitality model to prime global locations.',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subheading': 'For inquiries regarding our residences, partnerships, or general questions, please get in touch.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.type': 'Reason for Contact',
    'contact.form.typeProperty': 'Property inquiry',
    'contact.form.typeBooking': 'Booking inquiry',
    'contact.form.typeGeneral': 'General inquiry',
    'contact.form.typePartnership': 'Partnership',
    'contact.form.property': 'Property of Interest',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Inquiry',
    'contact.form.success': 'Thank you. Your message has been submitted. We will be in touch shortly.',
    'contact.detailsTitle': 'Direct Contact',

    // Legal
    'legal.privacy': 'Privacy Policy',
    'legal.terms': 'Terms & Conditions',
    'legal.notice': 'Legal policies and documentation will be updated according to jurisdiction and regulatory requirements.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.disclaimer': 'CG Property showcases curated furnished residences. Current reservations are hosted via Airbnb.',
  },
  zh: {
    // Brand & Header
    'brand.name': 'CG Property',
    'brand.tagline': '非凡居所，惬意栖心',
    'nav.home': '首页',
    'nav.properties': '精选住宅',
    'nav.destinations': '目的地',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.exploreResidences': '探索住宅',
    'nav.menu': '菜单',
    'nav.close': '关闭',

    // Hero
    'hero.headline': '非凡居所，惬意栖心。',
    'hero.subheadline': '探索我们分布于全球核心都市的高端精装住宅系列。',
    'hero.cta.explore': '探索住宅',
    'hero.cta.location': '了解区位',
    'hero.badge.location': '全球都会网络',
    'hero.badge.collection': '全球臻选系列 · 曼谷与中国香港',
    'hero.badge.preview': '精选呈现',
    'hero.viewDetails': '查看物业',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'CG PROPERTY 卓越品质',
    'why.heading': '为何选择 CG Property？',
    'why.subheading': '从预订的那一刻到退房启程，为您提供高品质、专业管理的精致旅居体验。',
    'why.feature1.title': '严格甄选',
    'why.feature1.desc': '每一套物业均经过严苛评估，确保卓越品质、独特性格与非凡舒适。',
    'why.feature2.title': '高品质居停',
    'why.feature2.desc': '精心雕琢的家居软装设计，只为打造令人难忘的美好居停。',
    'why.feature3.title': '值得信赖的在地管理',
    'why.feature3.desc': '本地专属服务团队悉心照料您入住期间的每一个细节。',
    'why.feature4.title': '优越黄金地段',
    'why.feature4.desc': '精选全球极具活力与吸引力的国际都会核心地段。',
    'why.feature5.title': '专业贴心服务',
    'why.feature5.desc': '从最初咨询到最终离店，全程提供敏捷、体贴的高标准服务。',
    'why.feature6.title': '便捷安全预订',
    'why.feature6.desc': '通过 Airbnb 轻松安全预订，更多直订渠道即将推出。',

    // Brand Introduction (Legacy)
    'intro.eyebrow': '关于 CG Property',
    'intro.heading': '甄选全球卓越居所，呈献非凡旅居。',
    'intro.body': 'CG Property 汇聚悉心甄选的全球品质居停之所，包含位于曼谷与中国香港等国际都会的系列精装公寓，并在全球范围持续拓展。',

    // The Collection
    'collection.heading': '全球臻选住宅系列',
    'collection.subheading': '独具考究格局、精致内饰与全景都会视野的臻选精装住宅。',
    'collection.residence1.title': 'The Tower R Suite (R栋臻选套房)',
    'collection.residence2.title': 'The Tower N Sky Suite (N栋云端套房)',
    'collection.viewProperty': '查看房源',
    'collection.viewResidence': '查看房源',
    'collection.bookNow': '立即预订',

    // Property specs & labels
    'spec.bedrooms': '卧室',
    'spec.bedroom': '卧室',
    'spec.bathrooms': '卫浴',
    'spec.bathroom': '卫浴',
    'spec.size': '面积',
    'spec.floor': '楼层',
    'spec.tower': '楼栋',
    'spec.interior': '室内配置',
    'spec.furnished': '室内配置',
    'spec.furnishedStatus': '全套家俬配置',
    'spec.type': '物业类型',
    'spec.typeValue': '高级公寓住宅',
    'spec.location': '地理位置',
    'spec.city': '城市',
    'spec.country': '国家',
    'spec.sqm': '平方米',

    // Comparison
    'comparison.heading': '住宅参数对比',
    'comparison.subheading': '对比我们位于 Nue District Rama 9 的两套精装住宅核心建筑参数。',
    'comparison.feature': '参数项',
    'comparison.selectResidence': '查看详情',

    // Location: Nue District Rama 9
    'location.heading': 'Nue District Rama 9',
    'location.subheading': '我们的曼谷精选住宅位于 Nue District Rama 9。',
    'location.description': 'Nue District Rama 9 坐落于曼谷核心都会区，精选住宅分别位于 R 栋与 N 栋。',
    'location.mapNotice': '曼谷都会区地理位置。地址：Nue District Rama 9, Rama 9 Road, Huai Khwang, Bangkok.',
    'location.towerR': 'R栋 — 16层 (The Tower R Suite)',
    'location.towerN': 'N栋 — 40层 (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': '曼谷',
    'bangkok.subheading': '在泰国最具活力的都会之城，发现品质居住体验。',
    'bangkok.exploreDestination': '探索曼谷目的地',

    // Future Expansion
    'future.heading': '持续拓展的全球卓越居所版图。',
    'future.subheading': '随着 CG Property 臻选系列的拓展，更多国际都市与度假胜地将持续加入我们的全球版图。',

    // Booking & Airbnb
    'booking.title': '预订您的入住',
    'booking.methodNotice': '当前房源预订均通过 Airbnb 官方平台安全处理。',
    'booking.airbnbCta': '在 Airbnb 上预订',
    'booking.futureNotice': '直客预订与即时房态系统将在未来阶段上线。',
    'booking.inquiryCta': '直接咨询',

    // Property Detail Page
    'property.keyFacts': '核心数据',
    'property.gallery': '实景相册',
    'property.overview': '房源概述',
    'property.amenities': '配套设施',
    'property.amenitiesEmpty': '物业配套设施信息即将更新。',
    'property.stayInfo': '入住须知',
    'property.stayInfoNotice': '完整的入住守则与指南将在通过 Airbnb 预订时提供。',
    'property.otherResidence': '探索其他精选套房',
    'property.backToProperties': '返回所有精选房源',
    'property.viewGallery': '查看所有照片',
    'gallery.scrollToExplore': '滑动浏览室内实景',

    // Destinations Page
    'destinations.title': '目的地',
    'destinations.subheading': '探索 CG Property 住宅所在的全球目的地与城市街区。',
    'destinations.activeDestinations': '已上线目的地',
    'destinations.thailandTitle': '泰国',
    'destinations.thailandDescription': '东南亚充满活力的标志性都市，在曼谷核心拉玛九区呈现高品质精装住宅。',
    'destinations.bangkokTitle': '曼谷',
    'destinations.viewDistrict': '查看曼谷房源',

    // About Page
    'about.eyebrow': '关于 CG Property',
    'about.title': '打造全球卓越旅居品质',
    'about.statement': 'CG Property 是一家专注于全球精选住宅的精品房产与高端旅居品牌。我们致力于在世界主要标志性都市打造品质居停网络，始终坚持全程直营管理、星级客房维护与考究空间美学。',
    'about.visionTitle': '我们的愿景',
    'about.visionSubtitle': '遍布全球的卓越居所网络',
    'about.visionDesc': '在全球最具活力的国际都市与热门目的地打造备受信赖的高品质租赁住宅矩阵，融合建筑美学与非凡居住体验。',
    'about.missionTitle': '我们的使命',
    'about.missionSubtitle': '严苛品质把控与全程精细化服务',
    'about.missionDesc': '通过对旗下所有房源进行全程直营管理、维护与高标准保洁服务，确保每一位客人的入住体验都无可挑剔。',
    'about.collectionTitle': '全球甄选都会系列',
    'about.collectionDesc': '我们的全球物业矩阵汇聚世界顶级都市的卓越居所。从曼谷拉玛九核心地段的高空天际套房，到中国香港核心街区的精选公寓，每一套寓所均兼备定制空间工艺、星级服务标准与全景都市天际线。',
    'about.standardsTitle': 'CG Property 专属管理标准',
    'about.standardsSubtitle': '我们不仅是房源管理者，更亲自打理并维护每一套居所，确保全流程品质如一。',
    'about.pillar1.title': '全程直营管理',
    'about.pillar1.desc': '团队自主运营，严格把控房屋状况、设施功能与全方位安全规范。',
    'about.pillar2.title': '星级服务标准',
    'about.pillar2.desc': '专业保洁、高品质洗护布草配备及每次入住前的严苛质检验收。',
    'about.pillar3.title': '贴心管家响应',
    'about.pillar3.desc': '便捷高效的数字化入住体验、实时管家在线支持与专属在地指南。',
    'about.pillar4.title': '全球版图拓展',
    'about.pillar4.desc': '持续甄选全球核心目的地，将独具品质的旅居标准带向更多国际都市。',

    // Contact Page
    'contact.title': '取得联系',
    'contact.subheading': '如需咨询住宅、商务合作或一般事宜，欢迎随时与我们取得联系。',
    'contact.form.name': '姓名',
    'contact.form.email': '邮箱',
    'contact.form.phone': '电话',
    'contact.form.type': '咨询事由',
    'contact.form.typeProperty': '住宅详情咨询',
    'contact.form.typeBooking': '预订相关咨询',
    'contact.form.typeGeneral': '一般事项咨询',
    'contact.form.typePartnership': '商务合作',
    'contact.form.property': '意向住宅',
    'contact.form.message': '留言内容',
    'contact.form.submit': '发送留言',
    'contact.form.success': '感谢您的留言。我们已收到您的信息，将尽快与您联系。',
    'contact.detailsTitle': '联系方式',

    // Legal
    'legal.privacy': '隐私政策',
    'legal.terms': '服务条款',
    'legal.notice': '法律政策与相关文档将根据当地法律法规持续更新。',

    // Footer
    'footer.rights': '版权所有。',
    'footer.disclaimer': 'CG Property 呈献精选品质公寓。当前所有预订均由 Airbnb 托管。',
  },
  th: {
    // Brand & Header
    'brand.name': 'CG Property',
    'brand.tagline': 'สัมผัสประสบการณ์การพักผ่อนเหนือระดับ',
    'nav.home': 'หน้าแรก',
    'nav.properties': 'คอลเลกชันที่พัก',
    'nav.destinations': 'จุดหมายปลายทาง',
    'nav.about': 'เกี่ยวกับเรา',
    'nav.contact': 'ติดต่อเรา',
    'nav.exploreResidences': 'สำรวจที่พัก',
    'nav.menu': 'เมนู',
    'nav.close': 'ปิด',

    // Hero
    'hero.headline': 'สัมผัสประสบการณ์การพักผ่อนเหนือระดับ',
    'hero.subheadline': 'ค้นพบคอลเลกชันเรซิเดนซ์ตกแต่งครบครันในมหานครชั้นนำระดับสากล',
    'hero.cta.explore': 'สำรวจที่พัก',
    'hero.cta.location': 'สำรวจทำเล',
    'hero.badge.location': 'พอร์ตฟอลิโอระดับสากล',
    'hero.badge.collection': 'คอลเลกชันที่คัดสรร · กรุงเทพฯ และฮ่องกง',
    'hero.badge.preview': 'เรซิเดนซ์แนะนำ',
    'hero.viewDetails': 'ดูข้อมูลที่พัก',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'THE CG PROPERTY DIFFERENCE',
    'why.heading': 'ทำไมต้องเลือก CG Property?',
    'why.subheading': 'ประสบการณ์การเข้าพักระดับพรีเมียมที่ได้รับการดูแลอย่างมืออาชีพ ตั้งแต่วินาทีที่คุณจองจนถึงวันเดินทางกลับ',
    'why.feature1.title': 'คัดสรรอย่างประณีต',
    'why.feature1.desc': 'ทุกยูนิตผ่านการตรวจสอบและคัดสรรคุณภาพ ความโดดเด่น และความสะดวกสบายด้วยตนเอง',
    'why.feature2.title': 'ที่พักมาตรฐานสูง',
    'why.feature2.desc': 'พื้นที่ตกแต่งอย่างพิถีพิถันเพื่อการพักผ่อนที่น่าประทับใจ',
    'why.feature3.title': 'การดูแลโดยทีมงานในพื้นที่',
    'why.feature3.desc': 'ทีมงานในพื้นที่พร้อมดูแลและใส่ใจทุกรายละเอียดของการเข้าพักของคุณ',
    'why.feature4.title': 'ทำเลที่น่าจดจำ',
    'why.feature4.desc': 'คัดสรรทำเลที่ดีที่สุดในมหานครสำคัญระดับโลก',
    'why.feature5.title': 'การบริการระดับมืออาชีพ',
    'why.feature5.desc': 'บริการที่รวดเร็วและใส่ใจตั้งแต่ขั้นตอนการสอบถามจนถึงการเช็คเอาท์',
    'why.feature6.title': 'จองง่าย สะดวกสบาย',
    'why.feature6.desc': 'จองง่าย ปลอดภัยผ่าน Airbnb พร้อมช่องทางอื่นๆ ที่จะเปิดให้บริการเร็วๆ นี้',

    // Brand Introduction (Legacy)
    'intro.eyebrow': 'เกี่ยวกับ CG Property',
    'intro.heading': 'เรซิเดนซ์ที่คัดสรรอย่างพิถีพิถันในจุดหมายปลายทางระดับสากล',
    'intro.body': 'CG Property รวบรวมที่พักที่ได้รับการคัดเลือกอย่างประณีตในมหานครระดับโลก ทั้งในกรุงเทพฯ ฮ่องกง และจุดหมายสำคัญระดับสากล',

    // The Collection
    'collection.heading': 'คอลเลกชันเรสซิเดนซ์',
    'collection.subheading': 'คอลเลกชันที่พักพร้อมอยู่คัดสรรพิเศษ พร้อมการตกแต่งประณีตและวิวเมืองแบบพาโนรามา',
    'collection.residence1.title': 'The Tower R Suite',
    'collection.residence2.title': 'The Tower N Sky Suite',
    'collection.viewProperty': 'ดูข้อมูลที่พัก',
    'collection.viewResidence': 'ดูข้อมูลที่พัก',
    'collection.bookNow': 'จองทันที',

    // Property specs & labels
    'spec.bedrooms': 'ห้องนอน',
    'spec.bedroom': 'ห้องนอน',
    'spec.bathrooms': 'ห้องน้ำ',
    'spec.bathroom': 'ห้องน้ำ',
    'spec.size': 'ขนาด',
    'spec.floor': 'ชั้น',
    'spec.tower': 'อาคาร',
    'spec.interior': 'การตกแต่งภายใน',
    'spec.furnished': 'การตกแต่งภายใน',
    'spec.furnishedStatus': 'ตกแต่งครบพร้อมอยู่',
    'spec.type': 'ประเภทอสังหาริมทรัพย์',
    'spec.typeValue': 'คอนโดมิเนียมเรซิเดนซ์',
    'spec.location': 'ทำเลที่ตั้ง',
    'spec.city': 'เมือง',
    'spec.country': 'ประเทศ',
    'spec.sqm': 'ตร.ม.',

    // Comparison
    'comparison.heading': 'เปรียบเทียบเรซิเดนซ์',
    'comparison.subheading': 'เปรียบเทียบข้อมูลจำเพาะทางสถาปัตยกรรมของเรซิเดนซ์ทั้งสองแห่ง ณ Nue District Rama 9',
    'comparison.feature': 'ข้อมูลจำเพาะ',
    'comparison.selectResidence': 'ดูรายละเอียด',

    // Location: Nue District Rama 9
    'location.heading': 'Nue District Rama 9',
    'location.subheading': 'เรซิเดนซ์ในกรุงเทพฯ ของเราตั้งอยู่ในโครงการ Nue District Rama 9',
    'location.description': 'Nue District Rama 9 ตั้งอยู่ใจกลางย่านธุรกิจและไลฟ์สไตล์ของกรุงเทพฯ โดยมีเรซิเดนซ์ของเราตั้งอยู่ในอาคาร R และอาคาร N',
    'location.mapNotice': 'ทำเลที่ตั้งในกรุงเทพมหานคร ที่อยู่: Nue District Rama 9 ถนนพระราม 9 แขวงห้วยขวาง กรุงเทพฯ',
    'location.towerR': 'อาคาร R — ชั้น 16 (The Tower R Suite)',
    'location.towerN': 'อาคาร N — ชั้น 40 (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': 'กรุงเทพมหานคร',
    'bangkok.subheading': 'สัมผัสประสบการณ์การอยู่อาศัยในเมืองหลวงที่มีชีวิตชีวาที่สุดแห่งหนึ่งของประเทศไทย',
    'bangkok.exploreDestination': 'สำรวจกรุงเทพฯ',

    // Future Expansion
    'future.heading': 'การขยายพอร์ตฟอลิโอที่พักระดับพรีเมียมสู่ระดับสากล',
    'future.subheading': 'จุดหมายปลายทางระดับโลกแห่งใหม่จะถูกเพิ่มเข้ามาอย่างต่อเนื่องในคอลเลกชันของ CG Property',

    // Booking & Airbnb
    'booking.title': 'จองการเข้าพัก',
    'booking.methodNotice': 'การจองห้องพักในปัจจุบันดำเนินการอย่างปลอดภัยผ่านแพลตฟอร์ม Airbnb',
    'booking.airbnbCta': 'จองผ่าน Airbnb',
    'booking.futureNotice': 'ระบบการจองโดยตรงและตรวจสอบสถานะห้องว่างจะเปิดให้บริการในระยะถัดไป',
    'booking.inquiryCta': 'สอบถามข้อมูลโดยตรง',

    // Property Detail Page
    'property.keyFacts': 'ข้อมูลสำคัญ',
    'property.gallery': 'ภาพถ่ายโครงการ',
    'property.overview': 'ภาพรวม',
    'property.amenities': 'สิ่งอำนวยความสะดวก',
    'property.amenitiesEmpty': 'ข้อมูลสิ่งอำนวยความสะดวกจะได้รับการอัปเดตเร็วๆ นี้',
    'property.stayInfo': 'ข้อมูลการเข้าพัก',
    'property.stayInfoNotice': 'ระเบียบและข้อกำหนดการเข้าพักจะได้รับเมื่อทำการจองผ่าน Airbnb',
    'property.otherResidence': 'สำรวจเรซิเดนซ์อื่นในคอลเลกชัน',
    'property.backToProperties': 'กลับสู่รายการเรสซิเดนซ์ทั้งหมด',
    'property.viewGallery': 'ดูภาพทั้งหมด',
    'gallery.scrollToExplore': 'เลื่อนเพื่อชมบรรยากาศภายใน',

    // Destinations Page
    'destinations.title': 'จุดหมายปลายทาง',
    'destinations.subheading': 'สำรวจจุดหมายปลายทางและทำเลที่ตั้งของเรซิเดนซ์ในเครือ CG Property',
    'destinations.activeDestinations': 'จุดหมายปลายทางที่เปิดให้บริการ',
    'destinations.thailandTitle': 'ประเทศไทย',
    'destinations.thailandDescription': 'มหานครอันเปี่ยมด้วยชีวิตชีวาในเอเชียตะวันออกเฉียงใต้ พร้อมเรซิเดนซ์ระดับพรีเมียมในย่านพระราม 9 กรุงเทพฯ',
    'destinations.bangkokTitle': 'กรุงเทพมหานคร',
    'destinations.viewDistrict': 'ดูเรซิเดนซ์ในกรุงเทพฯ',

    // About Page
    'about.eyebrow': 'เกี่ยวกับ CG Property',
    'about.title': 'รังสรรค์ประสบการณ์การพักผ่อนระดับพรีเมียมทั่วโลก',
    'about.statement': 'CG Property คือแบรนด์บริหารและให้เช่าที่พักระดับพรีเมียมที่คัดสรรเรซิเดนซ์ชั้นนำในมหานครระดับโลก พร้อมเครือข่ายที่พักที่โดดเด่นด้วยดีไซน์ คุณภาพ และการดูแลจัดการโดยตรงแบบครบวงจร',
    'about.visionTitle': 'วิสัยทัศน์ของเรา',
    'about.visionSubtitle': 'เครือข่ายเรซิเดนซ์ระดับพรีเมียมทั่วทุกมุมโลก',
    'about.visionDesc': 'สร้างสรรค์พอร์ตฟอลิโอที่พักให้เช่าที่ได้รับความไว้วางใจในเมืองหลวงและจุดหมายปลายทางชั้นนำระดับสากล ผสานความงดงามทางสถาปัตยกรรมเข้ากับความสะดวกสบายสูงสุด',
    'about.missionTitle': 'พันธกิจของเรา',
    'about.missionSubtitle': 'มาตรฐานคุณภาพอันเข้มงวดและการบริการที่ไร้รอยต่อ',
    'about.missionDesc': 'มอบประสบการณ์การเข้าพักที่น่าประทับใจอย่างสม่ำเสมอ ผ่านการบริหาร จัดการ และดูแลรักษาทุกยูนิตในคอลเลกชันโดยตรงด้วยมาตรฐานการบริการระดับสูง',
    'about.collectionTitle': 'คอลเลกชันเรซิเดนซ์ระดับสากล',
    'about.collectionDesc': 'พอร์ตฟอลิโอของเราผสานเรซิเดนซ์ที่โดดเด่นในมหานครชั้นนำของโลก ทั้งห้องพักวิวขอบฟ้า ณ Nue District Rama 9 ในกรุงเทพฯ ไปจนถึงเรซิเดนซ์ในฮ่องกง โดยทุกยูนิตผสานการตกแต่งอย่างพิถีพิถันเข้ากับบริการมาตรฐานระดับสากล',
    'about.standardsTitle': 'มาตรฐานการบริหารจัดการของ CG Property',
    'about.standardsSubtitle': 'เราไม่ได้เป็นเพียงตัวกลาง — ทุกเรซิเดนซ์ได้รับการดูแล บริหาร และซ่อมบำรุงโดยทีมงานมืออาชีพของเราโดยตรง',
    'about.pillar1.title': 'การบริหารจัดการโดยตรง',
    'about.pillar1.desc': 'ควบคุมการดำเนินงานภายในทั้งหมดเพื่อรักษาความสมบูรณ์ของที่พัก สิ่งอำนวยความสะดวก และความปลอดภัย',
    'about.pillar2.title': 'บริการมาตรฐานโรงแรม',
    'about.pillar2.desc': 'การทำความสะอาดระดับมืออาชีพ ชุดเครื่องนอนคุณภาพพรีเมียม และการตรวจสอบคุณภาพอย่างละเอียดก่อนทุกการเข้าพัก',
    'about.pillar3.title': 'การดูแลและต้อนรับอย่างใส่ใจ',
    'about.pillar3.desc': 'ระบบเช็คอินที่สะดวกสบาย พร้อมการสื่อสารและบริการช่วยเหลือที่รวดเร็วตลอดการเข้าพักของคุณ',
    'about.pillar4.title': 'การเติบโตสู่ระดับสากล',
    'about.pillar4.desc': 'คัดสรรทำเลชั้นนำระดับสากลอย่างต่อเนื่องเพื่อนำเสนอมาตรฐานการอยู่อาศัยอันเป็นเอกลักษณ์สู่เมืองสำคัญทั่วโลก',

    // Contact Page
    'contact.title': 'ติดต่อเรา',
    'contact.subheading': 'สำหรับข้อมูลเพิ่มเติมเกี่ยวกับเรซิเดนซ์ ความร่วมมือทางธุรกิจ หรือข้อซักถามทั่วไป โปรดติดต่อเรา',
    'contact.form.name': 'ชื่อ',
    'contact.form.email': 'อีเมล',
    'contact.form.phone': 'เบอร์โทร',
    'contact.form.type': 'หัวข้อการติดต่อ',
    'contact.form.typeProperty': 'สอบถามเกี่ยวกับเรซิเดนซ์',
    'contact.form.typeBooking': 'สอบถามเกี่ยวกับการจอง',
    'contact.form.typeGeneral': 'สอบถามข้อมูลทั่วไป',
    'contact.form.typePartnership': 'ความร่วมมือทางธุรกิจ',
    'contact.form.property': 'เรซิเดนซ์ที่สนใจ',
    'contact.form.message': 'ข้อความ',
    'contact.form.submit': 'ส่งข้อความ',
    'contact.form.success': 'ขอบคุณสำหรับข้อความ เราได้รับข้อมูลแล้วและจะติดต่อกลับโดยเร็วที่สุด',
    'contact.detailsTitle': 'ข้อมูลการติดต่อ',

    // Legal
    'legal.privacy': 'นโยบายความเป็นส่วนตัว',
    'legal.terms': 'ข้อกำหนดและเงื่อนไข',
    'legal.notice': 'นโยบายและเอกสารทางกฎหมายจะได้รับการอัปเดตตามข้อกำหนดและกฎหมายที่เกี่ยวข้อง',

    // Footer
    'footer.rights': 'สงวนลิขสิทธิ์ทั้งหมด',
    'footer.disclaimer': 'CG Property นำเสนอเรซิเดนซ์ตกแต่งครบครันที่ผ่านการคัดสรร การจองในปัจจุบันดำเนินการผ่าน Airbnb',
  },
};
