import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Waves, 
  Dumbbell, 
  Wifi, 
  UtensilsCrossed, 
  Lock, 
  Wind, 
  Tv, 
  ShieldCheck, 
  CreditCard, 
  Shirt,
  Laptop,
  Trees,
  Car,
  Sofa,
  Plug,
  BedDouble,
  Moon,
  Package,
  Baby,
  Bath,
  Droplets,
  Flame,
  CheckCircle,
  CircleDot,
  Layers,
  Minus,
  Smile,
  Microwave,
  Refrigerator,
  WashingMachine,
  Utensils,
  Archive
} from 'lucide-react';

interface AmenitiesNoticeProps {
  locationName?: string;
  isHongKong?: boolean;
  propertySlug?: string;
}

export const AmenitiesNotice: React.FC<AmenitiesNoticeProps> = ({ 
  locationName,
  isHongKong = false,
  propertySlug
}) => {
  const { t, language } = useLanguage();

  const isQuintara = propertySlug === 'quintara' || locationName?.toLowerCase().includes('quintara');
  const isNueDistrict = propertySlug === 'residence-01' || locationName?.toLowerCase().includes('nue district');

  // Professional normalized amenities for NUE District R9 Residence
  const nueDistrictAmenities = [
    { 
      icon: Sofa, 
      label: { 
        en: 'Comfortable Living Sofa', 
        zh: '舒适客厅沙发', 
        th: 'โซฟาห้องนั่งเล่นแสนสบาย' 
      } 
    },
    { 
      icon: Moon, 
      label: { 
        en: 'Blackout & Privacy Curtains', 
        zh: '全遮光与私密窗帘', 
        th: 'ผ้าม่านกันแสงและเพิ่มความเป็นส่วนตัว' 
      } 
    },
    { 
      icon: Utensils, 
      label: { 
        en: 'Dining Table & Seating', 
        zh: '雅致餐桌与餐椅配套', 
        th: 'โต๊ะรับประทานอาหารพร้อมเก้าอี้' 
      } 
    },
    { 
      icon: Plug, 
      label: { 
        en: 'Accessible Power Outlets', 
        zh: '便捷多功能电源插座', 
        th: 'เต้ารับไฟฟ้าใช้งานสะดวก' 
      } 
    },
    { 
      icon: Wind, 
      label: { 
        en: 'Climate-Controlled Air Conditioning', 
        zh: '舒适静音分体变频空调', 
        th: 'เครื่องปรับอากาศควบคุมอุณหภูมิ' 
      } 
    },
    { 
      icon: Tv, 
      label: { 
        en: 'Smart TV with Remote Control', 
        zh: '智能高清电视（配专属遥控器）', 
        th: 'สมาร์ททีวีพร้อมรีโมทคอนโทรล' 
      } 
    },
    { 
      icon: Flame, 
      label: { 
        en: 'Induction Cooktop', 
        zh: '现代微烹电磁炉台', 
        th: 'เตาแม่เหล็กไฟฟ้าสำหรับการปรุงอาหาร' 
      } 
    },
    { 
      icon: Microwave, 
      label: { 
        en: 'Multi-Function 3-in-1 Microwave', 
        zh: '三合一多功能微波炉', 
        th: 'ไมโครเวฟมัลติฟังก์ชั่น 3-in-1' 
      } 
    },
    { 
      icon: Archive, 
      label: { 
        en: 'Kitchen Storage Cabinetry', 
        zh: '厨房专属储物吊柜与橱柜', 
        th: 'ตู้เก็บของและอุปกรณ์ครัว' 
      } 
    },
    { 
      icon: Refrigerator, 
      label: { 
        en: 'In-Unit Refrigerator & Freezer', 
        zh: '套内大容量保鲜冰箱', 
        th: 'ตู้เย็นสำหรับเก็บรักษาอาหาร' 
      } 
    },
    { 
      icon: WashingMachine, 
      label: { 
        en: '2-in-1 In-Unit Washer & Dryer', 
        zh: '套内一体式洗烘洗衣机', 
        th: 'เครื่องซักผ้าและอบผ้าแบบ 2-in-1 ในห้อง' 
      } 
    },
    { 
      icon: BedDouble, 
      label: { 
        en: 'Comfortable Bed with Linens & Pillows', 
        zh: '舒适大床与高品质床品枕头', 
        th: 'เตียงนอนสบายพร้อมชุดเครื่องนอนและหมอน' 
      } 
    },
    { 
      icon: Package, 
      label: { 
        en: 'Wardrobe & Extra Storage Space', 
        zh: '宽敞衣橱与充裕收纳空间', 
        th: 'ตู้เสื้อผ้าและพื้นที่เก็บของเพิ่มเติม' 
      } 
    },
    { 
      icon: Shirt, 
      label: { 
        en: 'Clothes Hangers', 
        zh: '专用衣物衣架', 
        th: 'ไม้แขวนเสื้อ' 
      } 
    },
    { 
      icon: Sparkles, 
      label: { 
        en: 'Mirror & Dressing Area', 
        zh: '独立更衣镜与梳妆区', 
        th: 'กระจกและมุมแต่งตัว' 
      } 
    },
    { 
      icon: Droplets, 
      label: { 
        en: 'Walk-In Shower', 
        zh: '步入式独立淋浴间', 
        th: 'ห้องอาบน้ำแบบวอล์กอิน' 
      } 
    },
    { 
      icon: Flame, 
      label: { 
        en: 'Continuous Hot Water Supply', 
        zh: '恒温充沛热水系统', 
        th: 'ระบบน้ำอุ่นสม่ำเสมอ' 
      } 
    },
    { 
      icon: CheckCircle, 
      label: { 
        en: 'Sanitary Toilet', 
        zh: '独立洁净马桶洁具', 
        th: 'สุขภัณฑ์ชักโครกมาตรฐาน' 
      } 
    },
    { 
      icon: CircleDot, 
      label: { 
        en: 'Wash Basin & Vanity Mirror', 
        zh: '洗手台盆及浴室梳妆镜', 
        th: 'อ่างล้างหน้าพร้อมกระจกเงา' 
      } 
    },
    { 
      icon: Layers, 
      label: { 
        en: 'Fresh Bath & Hand Towels', 
        zh: '高品质洁净洗浴毛巾', 
        th: 'ผ้าขนหนูสะอาดนุ่ม' 
      } 
    },
    { 
      icon: Minus, 
      label: { 
        en: 'Dedicated Towel Rail', 
        zh: '浴室专属毛巾架', 
        th: 'ราวแขวนผ้าขนหนู' 
      } 
    },
    { 
      icon: Wind, 
      label: { 
        en: 'In-Room Hairdryer', 
        zh: '客房专属电吹风', 
        th: 'ไดร์เป่าผมในห้องพัก' 
      } 
    },
    { 
      icon: Smile, 
      label: { 
        en: 'Essential Toiletries', 
        zh: '基础洗护备品', 
        th: 'ของใช้ในห้องน้ำที่จำเป็น' 
      } 
    },
    { 
      icon: Baby, 
      label: { 
        en: 'Baby Cot (Available Upon Request)', 
        zh: '婴儿床（按需提供）', 
        th: 'เตียงเด็กอ่อน (ตามคำขอ)' 
      } 
    },
    { 
      icon: Bath, 
      label: { 
        en: 'Baby Bath Tub (Available Upon Request)', 
        zh: '婴儿浴盆（按需提供）', 
        th: 'อ่างอาบน้ำเด็ก (ตามคำขอ)' 
      } 
    },
  ];

  // Professional normalized amenities for Quintara Residence
  const quintaraAmenities = [
    { 
      icon: Sofa, 
      label: { 
        en: 'Comfortable Convertible Sofa', 
        zh: '舒适多功能沙发床', 
        th: 'โซฟาปรับนอนแสนสบาย' 
      } 
    },
    { 
      icon: Plug, 
      label: { 
        en: 'Accessible Power Outlets', 
        zh: '便捷多功能电源插座', 
        th: 'เต้ารับไฟฟ้าใช้งานสะดวก' 
      } 
    },
    { 
      icon: Wind, 
      label: { 
        en: 'Climate-Controlled Air Conditioning', 
        zh: '舒适分体静音空调', 
        th: 'เครื่องปรับอากาศปรับอุณหภูมิได้' 
      } 
    },
    { 
      icon: UtensilsCrossed, 
      label: { 
        en: 'Complete Kitchen Essentials', 
        zh: '齐备厨房烹饪基本用具', 
        th: 'อุปกรณ์ครัวพื้นฐานครบครัน' 
      } 
    },
    { 
      icon: Tv, 
      label: { 
        en: 'Smart TV & Entertainment', 
        zh: '智能高清电视与影音娱乐', 
        th: 'สมาร์ททีวีและความบันเทิง' 
      } 
    },
    { 
      icon: BedDouble, 
      label: { 
        en: 'Comfortable Bed with Linens & Pillows', 
        zh: '舒适大床与高品质床品枕头', 
        th: 'เตียงนอนสบายพร้อมชุดเครื่องนอนและหมอน' 
      } 
    },
    { 
      icon: Moon, 
      label: { 
        en: 'Blackout-Style Window Curtains', 
        zh: '遮光隐私窗帘', 
        th: 'ผ้าม่านกันแสงสไตล์แบล็คเอาท์' 
      } 
    },
    { 
      icon: Package, 
      label: { 
        en: 'Wardrobe & Extra Storage Space', 
        zh: '宽敞衣橱与充裕收纳空间', 
        th: 'ตู้เสื้อผ้าและพื้นที่เก็บของเพิ่มเติม' 
      } 
    },
    { 
      icon: Shirt, 
      label: { 
        en: 'Clothes Hangers', 
        zh: '专用衣物衣架', 
        th: 'ไม้แขวนเสื้อ' 
      } 
    },
    { 
      icon: Sparkles, 
      label: { 
        en: 'Mirror & Dressing Area', 
        zh: '独立更衣镜与梳妆区', 
        th: 'กระจกและมุมแต่งตัว' 
      } 
    },
    { 
      icon: Droplets, 
      label: { 
        en: 'Walk-In Shower', 
        zh: '步入式独立淋浴间', 
        th: 'ห้องอาบน้ำแบบวอล์กอิน' 
      } 
    },
    { 
      icon: Flame, 
      label: { 
        en: 'Continuous Hot Water Supply', 
        zh: '恒温充沛热水系统', 
        th: 'ระบบน้ำอุ่นสม่ำเสมอ' 
      } 
    },
    { 
      icon: CheckCircle, 
      label: { 
        en: 'Sanitary Toilet', 
        zh: '独立洁净马桶洁具', 
        th: 'สุขภัณฑ์ชักโครกมาตรฐาน' 
      } 
    },
    { 
      icon: CircleDot, 
      label: { 
        en: 'Wash Basin & Vanity Mirror', 
        zh: '洗手台盆及浴室梳妆镜', 
        th: 'อ่างล้างหน้าพร้อมกระจกเงา' 
      } 
    },
    { 
      icon: Layers, 
      label: { 
        en: 'Fresh Bath & Hand Towels', 
        zh: '高品质洁净洗浴毛巾', 
        th: 'ผ้าขนหนูสะอาดนุ่ม' 
      } 
    },
    { 
      icon: Minus, 
      label: { 
        en: 'Dedicated Towel Rail', 
        zh: '浴室专属毛巾架', 
        th: 'ราวแขวนผ้าขนหนู' 
      } 
    },
    { 
      icon: Wind, 
      label: { 
        en: 'In-Room Hairdryer', 
        zh: '客房专属电吹风', 
        th: 'ไดร์เป่าผมในห้องพัก' 
      } 
    },
    { 
      icon: Smile, 
      label: { 
        en: 'Essential Toiletries', 
        zh: '基础洗护备品', 
        th: 'ของใช้ในห้องน้ำที่จำเป็น' 
      } 
    },
    { 
      icon: Baby, 
      label: { 
        en: 'Baby Cot (Available Upon Request)', 
        zh: '婴儿床（按需提供）', 
        th: 'เตียงเด็กอ่อน (ตามคำขอ)' 
      } 
    },
    { 
      icon: Bath, 
      label: { 
        en: 'Baby Bath Tub (Available Upon Request)', 
        zh: '婴儿浴盆（按需提供）', 
        th: 'อ่างอาบน้ำเด็ก (ตามคำขอ)' 
      } 
    },
  ];

  const bangkokAmenities = [
    { icon: Waves, label: { en: 'Sky Infinity Pool & Sundeck', zh: '云端无边际泳池及日光甲板', th: 'สระว่ายน้ำลอยฟ้าอินฟินิตี้' } },
    { icon: Dumbbell, label: { en: 'Panoramic Sky Fitness Studio', zh: '高空全景健身中心', th: 'ฟิตเนสสตูดิโอลอยฟ้า' } },
    { icon: Laptop, label: { en: 'Co-Working & Sky Lounge', zh: '行政共享办公酒廊', th: 'สกายเลานจ์และพื้นที่ทำงาน' } },
    { icon: Trees, label: { en: 'Rooftop Sky Garden', zh: '顶层空中生态花园', th: 'สวนลอยฟ้าบนดาดฟ้า' } },
    { icon: Wifi, label: { en: 'Dedicated High-Speed Wi-Fi', zh: '专属高速光纤无线网络', th: 'อินเทอร์เน็ตความเร็วสูง' } },
    { icon: UtensilsCrossed, label: { en: 'Chef-Ready Kitchenette & Appliances', zh: '完备现代小厨房与家电', th: 'ครัวพร้อมอุปกรณ์ครบชุด' } },
    { icon: Lock, label: { en: 'Smart Keyless Digital Door Lock', zh: '智能无钥匙电子密码锁', th: 'ประตูดิจิทัลล็อคอัจฉริยะ' } },
    { icon: Wind, label: { en: 'Multi-Zone Inverter Air Conditioning', zh: '多联分体静音变频空调', th: 'เครื่องปรับอากาศแยกส่วน' } },
    { icon: Shirt, label: { en: 'In-Unit Washer & Ironing Set', zh: '套内独立洗衣机与熨烫设备', th: 'เครื่องซักผ้าและอุปกรณ์รีดผ้า' } },
    { icon: Tv, label: { en: 'Smart TV with Streaming Apps', zh: '智能高清电视与流媒体', th: 'สมาร์ททีวีพร้อมแอพสตรีมมิ่ง' } },
    { icon: ShieldCheck, label: { en: '24/7 Security & CCTV Monitoring', zh: '24小时专业安保与监控', th: 'รปภ. 24 ชั่วโมงและกล้องวงจรปิด' } },
    { icon: CreditCard, label: { en: 'Floor-Secured Keycard Lift Access', zh: '梯控专属门禁电梯系统', th: 'ลิฟต์ล็อคชั้นด้วยคีย์การ์ด' } },
  ];

  const hongKongAmenities = [
    { icon: Waves, label: { en: 'Skyline Wellness & Horizon Lounge', zh: '天际观景酒廊与健康生活空间', th: 'ฮอไรซันเลานจ์และสเปซดูแลสุขภาพ' } },
    { icon: Dumbbell, label: { en: 'Technogym Executive Fitness Studio', zh: '全套泰诺健高阶健身中心', th: 'ฟิตเนสสตูดิโอระดับไฮเอนด์' } },
    { icon: Laptop, label: { en: 'Private Meeting Pods & Workspaces', zh: '私密行政会议舱与静音办公区', th: 'ห้องประชุมส่วนตัวและพื้นที่ทำงาน' } },
    { icon: Wifi, label: { en: 'Gigabit Ultra-Fast Fiber Internet', zh: '千兆超高速光纤专线网络', th: 'อินเทอร์เน็ตไฟเบอร์ระดับกิกะบิต' } },
    { icon: UtensilsCrossed, label: { en: 'Designer Kitchen with Premium Appliances', zh: '进口大理石开放式高端厨电厨房', th: 'ครัวดีไซเนอร์พร้อมเครื่องใช้ไฟฟ้าระดับพรีเมียม' } },
    { icon: Lock, label: { en: 'Biometric & Smart Keyless Entry', zh: '生物指纹与智能数字无钥匙门禁', th: 'ระบบสแกนลายนิ้วมือและดิจิทัลล็อค' } },
    { icon: Wind, label: { en: 'Acoustic Soundproofing & Air Purification', zh: '双层静音隔音玻璃与空气净化系统', th: 'กระจกกันเสียงสองชั้นและระบบฟอกอากาศ' } },
    { icon: Shirt, label: { en: 'In-Suite Washer & Dryer Care Unit', zh: '套内洗烘一体机及衣物护理设备', th: 'เครื่องซักผ้าและอบผ้าในตัว' } },
    { icon: Tv, label: { en: 'Ultra HD 4K Cinema Display', zh: '超高清4K巨幕智能影音屏', th: 'จอภาพ 4K ความละเอียดสูง' } },
    { icon: ShieldCheck, label: { en: '24/7 Concierge & Multi-Tier Security', zh: '24小时礼宾服务与多重严密安防', th: 'บริการเจ้าหน้าที่อำนวยความสะดวก 24 ชม.' } },
    { icon: CreditCard, label: { en: 'Private High-Speed Secure Lift Access', zh: '专属高保密高速门禁电梯', th: 'ลิฟต์ความเร็วสูงระบบรักษาความปลอดภัยส่วนตัว' } },
    { icon: Trees, label: { en: 'Landscaped Outdoor Courtyard Garden', zh: '雅致园林景观户外休憩庭院', th: 'สวนคอร์ทยาร์ดกลางแจ้งร่มรื่น' } },
  ];

  const keyAmenities = isQuintara
    ? quintaraAmenities
    : isNueDistrict
    ? nueDistrictAmenities
    : isHongKong
    ? hongKongAmenities
    : bangkokAmenities;

  return (
    <div id="property-amenities-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D8]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9D7C38]" />
          <h3 className="text-xl font-bold text-[#042F61]">
            {t('property.amenities')}
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#8A8175] uppercase tracking-wider">
          {locationName || (isHongKong ? 'Hong Kong Residence' : 'Nue District Rama 9')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {keyAmenities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E6E0D8]/80 flex items-center gap-3 hover:border-[#DFB85A]/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-[#E6E0D8] text-[#042F61] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#14171A]">
                {item.label[language] || item.label.en}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
