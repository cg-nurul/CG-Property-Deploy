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
    'hero.subheadline': 'Discover our first collection of furnished residences at the heart of Bangkok, Thailand.',
    'hero.cta.explore': 'Explore Residences',
    'hero.cta.location': 'Discover the Location',
    'hero.badge.location': 'Bangkok, Thailand',
    'hero.badge.collection': 'The Rama 9 Collection · 2 Units',
    'hero.badge.preview': 'Featured Residence',
    'hero.viewDetails': 'View Residence',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'THE CG PROPERTY DIFFERENCE',
    'why.heading': 'Why CG Property',
    'why.subheading': 'A premium, professionally managed stay — from the moment you book to the moment you leave.',
    'why.feature1.title': 'Carefully Selected',
    'why.feature1.desc': 'Every property is personally vetted for quality, character and comfort.',
    'why.feature2.title': 'Quality Accommodation',
    'why.feature2.desc': 'Thoughtfully furnished spaces designed for memorable stays.',
    'why.feature3.title': 'Trusted Management',
    'why.feature3.desc': 'On-the-ground teams look after every detail of your stay.',
    'why.feature4.title': 'Memorable Locations',
    'why.feature4.desc': "Handpicked destinations across Thailand's most beautiful places.",
    'why.feature5.title': 'Professional Service',
    'why.feature5.desc': 'Responsive, attentive service from enquiry to checkout.',
    'why.feature6.title': 'Easy Booking',
    'why.feature6.desc': 'Simple, secure booking through Airbnb, with more ways to book coming soon.',

    // Brand Introduction (Legacy keys fallback)
    'intro.eyebrow': 'About CG Property',
    'intro.heading': 'Thoughtfully selected residences, beginning in Thailand.',
    'intro.body': 'CG Property brings together carefully selected places to stay, beginning with a collection of furnished residences in Bangkok.',

    // The Rama 9 Collection
    'collection.heading': 'The Rama 9 Collection',
    'collection.subheading': 'Two distinct furnished residences with tailored layouts and panoramic city views.',
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
    'spec.typeValue': 'Furnished Condominium Unit',
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
    'location.subheading': 'Our first residences are located within Nue District Rama 9 in Bangkok.',
    'location.description': 'Nue District Rama 9 provides a central urban setting within Bangkok, hosting our initial collection across Tower R and Tower N.',
    'location.mapNotice': 'Location within Bangkok metropolis. Address: Nue District Rama 9, Rama 9 Road, Huai Khwang, Bangkok.',
    'location.towerR': 'Tower R — 16th Floor (The Tower R Suite)',
    'location.towerN': 'Tower N — 40th Floor (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': 'Bangkok',
    'bangkok.subheading': 'Discover a place to stay in one of Thailand’s most dynamic cities.',
    'bangkok.exploreDestination': 'Explore Bangkok',

    // Future Expansion
    'future.heading': 'Thailand is where our collection begins.',
    'future.subheading': 'More destinations will follow as the CG Property collection grows.',

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
    'property.backToProperties': 'Back to The Rama 9 Collection',
    'property.viewGallery': 'View all photos',

    // Destinations Page
    'destinations.title': 'Destinations',
    'destinations.subheading': 'Explore the global destinations and districts where CG Property residences are located.',
    'destinations.activeDestinations': 'Current Destination',
    'destinations.thailandTitle': 'Thailand',
    'destinations.thailandDescription': 'Our initial destination in Southeast Asia, hosting our premier residences in Bangkok.',
    'destinations.bangkokTitle': 'Bangkok',
    'destinations.viewDistrict': 'View Residences in Bangkok',

    // About Page
    'about.title': 'About CG Property',
    'about.statement': 'CG Property is building a carefully selected collection of residences, beginning in Thailand.',
    'about.philosophyTitle': 'Our Focus',
    'about.philosophyText': 'We focus on high-quality furnished residences in key urban districts, designed to offer consistent, thoughtfully configured spaces for modern living.',
    'about.collectionTitle': 'The Rama 9 Collection',
    'about.collectionText': 'Our inaugural collection comprises two distinct furnished residences within Nue District Rama 9 in Bangkok.',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subheading': 'For inquiries regarding our residences, partnerships, or general questions, please get in touch.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.type': 'Enquiry Type',
    'contact.form.typeProperty': 'Property enquiry',
    'contact.form.typeBooking': 'Booking enquiry',
    'contact.form.typeGeneral': 'General enquiry',
    'contact.form.typePartnership': 'Partnership',
    'contact.form.property': 'Property of Interest (Optional)',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Enquiry',
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
    'hero.subheadline': '探索我们位于泰国曼谷核心地段的首发精装住宅系列。',
    'hero.cta.explore': '探索住宅',
    'hero.cta.location': '了解区位',
    'hero.badge.location': '泰国 · 曼谷',
    'hero.badge.collection': '首发系列 · 2套精装住宅',
    'hero.badge.preview': '精选呈现',
    'hero.viewDetails': '查看住宅',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'CG PROPERTY 卓越品质',
    'why.heading': '为何选择 CG Property',
    'why.subheading': '从预订的那一刻到退房启程，为您提供高品质、专业管理的精致旅居体验。',
    'why.feature1.title': '严格甄选',
    'why.feature1.desc': '每一套物业均经过严苛评估，确保卓越品质、独特性格与非凡舒适。',
    'why.feature2.title': '高品质居停',
    'why.feature2.desc': '精心雕琢的家居软装设计，只为打造令人难忘的美好居停。',
    'why.feature3.title': '值得信赖的在地管理',
    'why.feature3.desc': '本地专属服务团队悉心照料您入住期间的每一个细节。',
    'why.feature4.title': '优越黄金地段',
    'why.feature4.desc': '精选泰国极具吸引力与活力的绝佳位置。',
    'why.feature5.title': '专业贴心服务',
    'why.feature5.desc': '从最初咨询到最终离店，全程提供敏捷、体贴的高标准服务。',
    'why.feature6.title': '便捷安全预订',
    'why.feature6.desc': '通过 Airbnb 轻松安全预订，更多直订渠道即将推出。',

    // Brand Introduction (Legacy)
    'intro.eyebrow': '关于 CG Property',
    'intro.heading': '精选品质住宅，始于泰国。',
    'intro.body': 'CG Property 汇聚悉心甄选的居停之所，以曼谷的一系列精装公寓作为起点。',

    // The Rama 9 Collection
    'collection.heading': '拉玛九臻选系列',
    'collection.subheading': '两套独具格局与视野的精装现代住宅。',
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
    'spec.typeValue': '精装公寓单元',
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
    'location.subheading': '我们的首发住宅位于曼谷 Nue District Rama 9。',
    'location.description': 'Nue District Rama 9 坐落于曼谷核心都会区，首批住宅分别位于 R 栋与 N 栋。',
    'location.mapNotice': '曼谷都会区地理位置。地址：Nue District Rama 9, Rama 9 Road, Huai Khwang, Bangkok.',
    'location.towerR': 'R栋 — 16层 (The Tower R Suite)',
    'location.towerN': 'N栋 — 40层 (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': '曼谷',
    'bangkok.subheading': '在泰国最具活力的都会之城，发现品质居住体验。',
    'bangkok.exploreDestination': '探索曼谷目的地',

    // Future Expansion
    'future.heading': '泰国是我们系列的起点。',
    'future.subheading': '随着 CG Property 臻选系列的拓展，我们将进驻更多全球目的地。',

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
    'property.backToProperties': '返回拉玛九臻选系列',
    'property.viewGallery': '查看所有照片',

    // Destinations Page
    'destinations.title': '目的地',
    'destinations.subheading': '探索 CG Property 住宅所在的全球目的地与城市街区。',
    'destinations.activeDestinations': '当前目的地',
    'destinations.thailandTitle': '泰国',
    'destinations.thailandDescription': '我们在东南亚的首个目的地，于曼谷核心区域呈现首发住宅。',
    'destinations.bangkokTitle': '曼谷',
    'destinations.viewDistrict': '查看曼谷房源',

    // About Page
    'about.title': '关于 CG Property',
    'about.statement': 'CG Property 致力于打造精心甄选的品质住宅系列，始于泰国。',
    'about.philosophyTitle': '我们的核心理念',
    'about.philosophyText': '我们专注于核心城市区域的高品质精装公寓，为现代生活打造考究、从容的居住空间。',
    'about.collectionTitle': '曼谷拉玛九首发系列',
    'about.collectionText': '首发系列由位于曼谷 Nue District Rama 9 的两套特色精装公寓组成。',

    // Contact Page
    'contact.title': '取得联系',
    'contact.subheading': '如需咨询住宅、商务合作或一般事宜，欢迎随时与我们取得联系。',
    'contact.form.name': '您的姓名',
    'contact.form.email': '电子邮箱',
    'contact.form.phone': '联系电话',
    'contact.form.type': '咨询类型',
    'contact.form.typeProperty': '住宅详情咨询',
    'contact.form.typeBooking': '预订相关咨询',
    'contact.form.typeGeneral': '一般事项咨询',
    'contact.form.typePartnership': '商务合作',
    'contact.form.property': '意向住宅 (可选)',
    'contact.form.message': '留言内容',
    'contact.form.submit': '发送咨询',
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
    'hero.subheadline': 'ค้นพบคอลเลกชันเรซิเดนซ์ตกแต่งครบครันชุดแรกของเรา ณ ใจกลางกรุงเทพมหานคร ประเทศไทย',
    'hero.cta.explore': 'สำรวจที่พัก',
    'hero.cta.location': 'สำรวจทำเล',
    'hero.badge.location': 'กรุงเทพฯ ประเทศไทย',
    'hero.badge.collection': 'เดอะ พระราม 9 คอลเลกชัน · 2 ยูนิต',
    'hero.badge.preview': 'เรซิเดนซ์แนะนำ',
    'hero.viewDetails': 'ดูรายละเอียด',

    // Why CG Property (The CG Property Difference)
    'why.eyebrow': 'THE CG PROPERTY DIFFERENCE',
    'why.heading': 'ทำไมต้องเลือก CG Property',
    'why.subheading': 'ประสบการณ์การเข้าพักระดับพรีเมียมที่ได้รับการดูแลอย่างมืออาชีพ ตั้งแต่วินาทีที่คุณจองจนถึงวันเดินทางกลับ',
    'why.feature1.title': 'คัดสรรอย่างประณีต',
    'why.feature1.desc': 'ทุกยูนิตผ่านการตรวจสอบและคัดสรรคุณภาพ ความโดดเด่น และความสะดวกสบายด้วยตนเอง',
    'why.feature2.title': 'ที่พักมาตรฐานสูง',
    'why.feature2.desc': 'พื้นที่ตกแต่งอย่างพิถีพิถันเพื่อการพักผ่อนที่น่าประทับใจ',
    'why.feature3.title': 'การดูแลโดยทีมงานในพื้นที่',
    'why.feature3.desc': 'ทีมงานในพื้นที่พร้อมดูแลและใส่ใจทุกรายละเอียดของการเข้าพักของคุณ',
    'why.feature4.title': 'ทำเลที่น่าจดจำ',
    'why.feature4.desc': 'คัดสรรจุดหมายปลายทางยอดนิยมในย่านที่ดีที่สุดของประเทศไทย',
    'why.feature5.title': 'การบริการระดับมืออาชีพ',
    'why.feature5.desc': 'บริการที่รวดเร็วและใส่ใจตั้งแต่ขั้นตอนการสอบถามจนถึงการเช็คเอาท์',
    'why.feature6.title': 'จองง่าย สะดวกสบาย',
    'why.feature6.desc': 'จองง่าย ปลอดภัยผ่าน Airbnb พร้อมช่องทางอื่นๆ ที่จะเปิดให้บริการเร็วๆ นี้',

    // Brand Introduction (Legacy)
    'intro.eyebrow': 'เกี่ยวกับ CG Property',
    'intro.heading': 'เรซิเดนซ์ที่คัดสรรอย่างพิถีพิถัน เริ่มต้นที่ประเทศไทย',
    'intro.body': 'CG Property รวบรวมที่พักที่ได้รับการคัดเลือกอย่างประณีต เริ่มต้นด้วยคอลเลกชันเรซิเดนซ์ตกแต่งครบครันในกรุงเทพมหานคร',

    // The Rama 9 Collection
    'collection.heading': 'เดอะ พระราม 9 คอลเลกชัน',
    'collection.subheading': 'เรซิเดนซ์ตกแต่งครบครัน 2 ยูนิต พร้อมรูปแบบเฉพาะตัวและทัศนียภาพเมืองอันงดงาม',
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
    'spec.typeValue': 'คอนโดมิเนียมตกแต่งครบ',
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
    'location.subheading': 'เรซิเดนซ์ชุดแรกของเราตั้งอยู่ในโครงการ Nue District Rama 9 กรุงเทพฯ',
    'location.description': 'Nue District Rama 9 ตั้งอยู่ใจกลางย่านธุรกิจและไลฟ์สไตล์ของกรุงเทพฯ โดยมียูนิตแรกของเราตั้งอยู่ในอาคาร R และอาคาร N',
    'location.mapNotice': 'ทำเลที่ตั้งในกรุงเทพมหานคร ที่อยู่: Nue District Rama 9 ถนนพระราม 9 แขวงห้วยขวาง กรุงเทพฯ',
    'location.towerR': 'อาคาร R — ชั้น 16 (The Tower R Suite)',
    'location.towerN': 'อาคาร N — ชั้น 40 (The Tower N Sky Suite)',

    // Bangkok Destination
    'bangkok.heading': 'กรุงเทพมหานคร',
    'bangkok.subheading': 'สัมผัสประสบการณ์การอยู่อาศัยในเมืองหลวงที่มีชีวิตชีวาที่สุดแห่งหนึ่งของประเทศไทย',
    'bangkok.exploreDestination': 'สำรวจกรุงเทพฯ',

    // Future Expansion
    'future.heading': 'ประเทศไทยคือจุดเริ่มต้นของคอลเลกชันของเรา',
    'future.subheading': 'จุดหมายปลายทางใหม่จะตามมาเมื่อคอลเลกชันของ CG Property เติบโตขึ้น',

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
    'property.backToProperties': 'กลับสู่ เดอะ พระราม 9 คอลเลกชัน',
    'property.viewGallery': 'ดูภาพทั้งหมด',

    // Destinations Page
    'destinations.title': 'จุดหมายปลายทาง',
    'destinations.subheading': 'สำรวจจุดหมายปลายทางและทำเลที่ตั้งของเรซิเดนซ์ในเครือ CG Property',
    'destinations.activeDestinations': 'จุดหมายปลายทางปัจจุบัน',
    'destinations.thailandTitle': 'ประเทศไทย',
    'destinations.thailandDescription': 'จุดหมายแรกของเราในเอเชียตะวันออกเฉียงใต้ พร้อมเรซิเดนซ์ระดับพรีเมียมในกรุงเทพมหานคร',
    'destinations.bangkokTitle': 'กรุงเทพมหานคร',
    'destinations.viewDistrict': 'ดูเรซิเดนซ์ในกรุงเทพฯ',

    // About Page
    'about.title': 'เกี่ยวกับ CG Property',
    'about.statement': 'CG Property มุ่งมั่นสร้างสรรค์คอลเลกชันที่พักที่ได้รับการคัดสรรอย่างประณีต โดยเริ่มต้นที่ประเทศไทย',
    'about.philosophyTitle': 'วิสัยทัศน์ของเรา',
    'about.philosophyText': 'เรามุ่งเน้นที่พักพร้อมอยู่อันทรงคุณค่าในทำเลเมืองสำคัญ ออกแบบมาเพื่อมอบพื้นที่อยู่อาศัยที่ลงตัวและตอบโจทย์วิถีชีวิตสมัยใหม่',
    'about.collectionTitle': 'เดอะ พระราม 9 คอลเลกชัน',
    'about.collectionText': 'คอลเลกชันแรกของเราประกอบด้วยเรซิเดนซ์ตกแต่งครบครัน 2 ยูนิตในโครงการ Nue District Rama 9 กรุงเทพฯ',

    // Contact Page
    'contact.title': 'ติดต่อเรา',
    'contact.subheading': 'สำหรับข้อมูลเพิ่มเติมเกี่ยวกับเรซิเดนซ์ ความร่วมมือทางธุรกิจ หรือข้อซักถามทั่วไป โปรดติดต่อเรา',
    'contact.form.name': 'ชื่อ-นามสกุล',
    'contact.form.email': 'อีเมล',
    'contact.form.phone': 'เบอร์โทรศัพท์',
    'contact.form.type': 'ประเภทการติดต่อ',
    'contact.form.typeProperty': 'สอบถามเกี่ยวกับเรซิเดนซ์',
    'contact.form.typeBooking': 'สอบถามเกี่ยวกับการจอง',
    'contact.form.typeGeneral': 'สอบถามข้อมูลทั่วไป',
    'contact.form.typePartnership': 'ความร่วมมือทางธุรกิจ',
    'contact.form.property': 'เรซิเดนซ์ที่สนใจ (ไม่บังคับ)',
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
