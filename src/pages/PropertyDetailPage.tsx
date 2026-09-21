import React, { useRef } from 'react';
import { Property, PageRoute } from '../types';
import { PROPERTIES } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';
import { PropertyGallery } from '../components/PropertyGallery';
import { PropertyFacts } from '../components/PropertyFacts';
import { AmenitiesNotice } from '../components/AmenitiesNotice';
import { BookingModule } from '../components/BookingModule';
import { ContactForm } from '../components/ContactForm';
import { RippleButton } from '../components/ui/RippleButton';
import { AirbnbIcon } from '../components/ui/FilledIcons';
import { 
  Building2, 
  MapPin, 
  ChevronLeft, 
  ShieldCheck, 
  ExternalLink, 
  Info,
  ArrowRight,
  Sparkles,
  Layers,
  Maximize2,
  BedDouble,
  Bath,
  Calendar
} from 'lucide-react';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ slug, onNavigate }) => {
  const { t, language } = useLanguage();
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];
  const otherProperties = PROPERTIES.filter((p) => p.slug !== property.slug);
  const isHongKong = property.city === 'Hong Kong';

  const handleScrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const destinationRoute: PageRoute = isHongKong ? '/destinations/hong-kong' : '/destinations/thailand/bangkok';

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Breadcrumbs & Back Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/properties"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/properties');
          }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] hover:text-[#042F61] hover:border-[#DFB85A] hover:bg-[#FAF8F5] transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-[#9D7C38] transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{t('property.backToProperties')}</span>
        </a>

        <div className="flex items-center gap-2 text-xs text-[#8A8175]">
          <a 
            href={destinationRoute}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(destinationRoute);
            }}
            className="hover:text-[#042F61] hover:underline transition-colors"
          >
            {property.city}, {property.country}
          </a>
          <span>/</span>
          <span className="font-semibold text-[#042F61]">{property.name}</span>
        </div>
      </div>

      {/* Property Hero Banner */}
      <div className="bg-[#042F61] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[#021B38] shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#DFB85A]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#DFB85A] text-[#042F61] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {property.tower} · {property.floor}
              </span>
              <span className="bg-white/10 text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                <MapPin className="w-3 h-3 text-[#DFB85A]" />
                <span>{property.location}, {property.city}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {property.name}
            </h1>

            <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              {property.overview[language] || property.overview.en}
            </p>

            {/* Quick Hero Highlights */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/90">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <BedDouble className="w-4 h-4 text-[#DFB85A]" />
                <span>{property.bedrooms} {t('spec.bedrooms')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Bath className="w-4 h-4 text-[#DFB85A]" />
                <span>{property.bathrooms} {property.bathrooms > 1 ? t('spec.bathrooms') : t('spec.bathroom')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Maximize2 className="w-4 h-4 text-[#DFB85A]" />
                <span>{Math.ceil(property.sizeSqm)} sqm</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Sparkles className="w-4 h-4 text-[#DFB85A]" />
                <span>{t('spec.furnishedStatus')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-2.5">
            <button
              onClick={() => {
                const el = document.getElementById('booking-action-card');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold-shine px-8 py-3.5 rounded-2xl text-sm font-bold tracking-wide flex items-center gap-2.5 cursor-pointer text-[#042F61] shadow-md active:scale-98"
            >
              <Calendar className="w-4 h-4 text-[#042F61]" />
              <span>Book Now</span>
            </button>
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
            >
              <AirbnbIcon className="w-3.5 h-3.5" />
              <span>Book stay directly on Airbnb</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Gallery & Details on Left, Booking Sticky on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Gallery, Specs, Story, Amenities, Stay Info */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Gallery Component with Lightbox */}
          <PropertyGallery property={property} />

          {/* Key Facts Component */}
          <PropertyFacts property={property} />

          {/* Overview & Architectural Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-[#042F61]">
              {t('property.overview')}
            </h3>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {property.overview[language] || property.overview.en}
            </p>
            <div className="pt-2 text-xs text-[#8A8175] space-y-1">
              <p>• Residence: {property.location} ({property.tower})</p>
              <p>• Elevation / Floor: {property.floor}</p>
              <p>• Interior Space: {Math.ceil(property.sizeSqm)} square meters</p>
              <p>• Layout: {property.bedrooms} Bedrooms, {property.bathrooms} {property.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</p>
              <p>• Handover State: {property.type}</p>
            </div>
          </div>

          {/* Amenities */}
          <AmenitiesNotice 
            locationName={property.name} 
            isHongKong={isHongKong} 
          />

          {/* Location & Neighborhood Context */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#9D7C38]" />
              <h3 className="text-xl font-bold text-[#042F61]">
                {isHongKong 
                  ? (language === 'zh' ? '香港核心区位与周边' : language === 'th' ? 'ทำเลใจกลางฮ่องกงและสิ่งแวดล้อม' : 'Hong Kong Location & Neighborhood')
                  : t('location.heading')}
              </h3>
            </div>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {isHongKong
                ? (language === 'zh' 
                    ? 'Quintara 坐落于香港核心中西区／半山地段，兼具都会璀璨生机与宜人居住私密性。毗邻中环国际金融中心商圈、苏豪区（SoHo）精致餐饮及兰桂坊，步行快捷搭乘港铁及中环半山扶梯，尊享四通八达的国际化商务生活圈。'
                    : language === 'th'
                    ? 'Quintara ตั้งอยู่ในทำเลชั้นนำย่านมิดเลเวลส์ / เซ็นทรัล ฮ่องกง ผสานความมีชีวิตชีวาของเมืองหลวงระดับโลกเข้ากับความเป็นส่วนตัวสูง อยู่ใกล้ศูนย์กลางการเงิน IFC ร้านอาหารชั้นเลิศใน SoHo และสถานีรถไฟใต้ดิน MTR เพื่อการเดินทางที่ไร้รอยต่อ'
                    : 'Quintara is positioned within Hong Kong’s esteemed Mid-Levels and Central enclave, offering an enviable balance of metropolitan vibrancy and private residential seclusion. Situated moments from the Central International Finance Centre (IFC) district, SoHo dining, Lan Kwai Fong, and direct MTR transport links, it provides unmatched international connectivity.')
                : t('location.description')}
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8] text-xs text-[#6B645A] space-y-1">
              <p className="font-semibold text-[#042F61]">{property.location}</p>
              <p>{property.district}, {property.city}, {property.country}</p>
              <p className="text-[#8A8175]">Tower: {property.tower} · Level: {property.floor}</p>
            </div>
          </div>

          {/* Stay Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#38761D]" />
              <h3 className="text-xl font-bold text-[#042F61]">
                {t('property.stayInfo')}
              </h3>
            </div>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {t('property.stayInfoNotice')}
            </p>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E6E0D8] text-xs text-[#6B645A]">
              All check-in protocols, house rules, and access arrangements are coordinated securely via Airbnb for guest convenience and peace of mind.
            </div>
          </div>

          {/* Compare with Other Residences */}
          {otherProperties.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9D7C38]">
                {t('property.otherResidence')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherProperties.map((other) => (
                  <div 
                    key={other.id}
                    className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E6E0D8] flex flex-col justify-between gap-4 hover:border-[#DFB85A]/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9D7C38]">
                        {other.city} · {other.tower}
                      </span>
                      <h5 className="text-lg font-bold text-[#042F61]">
                        {other.name}
                      </h5>
                      <p className="text-xs text-[#6B645A]">
                        {Math.ceil(other.sizeSqm)} sqm · {other.bedrooms} Bed · {other.bathrooms} Bath · {other.floor}
                      </p>
                    </div>
                    <RippleButton
                      variant="primary"
                      onClick={() => {
                        onNavigate(`/properties/${other.slug}` as PageRoute);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide self-start"
                    >
                      <span>View {other.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </RippleButton>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Modular Booking Card */}
        <div className="lg:col-span-4">
          <BookingModule 
            property={property} 
            onEnquire={handleScrollToContact}
          />
        </div>

      </div>

      {/* Inquiry Form Section */}
      <div ref={contactSectionRef} className="pt-12 border-t border-[#E6E0D8]">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9D7C38]">
              Direct Inquiries
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#042F61] mt-1">
              Have Questions About {property.name}?
            </h3>
            <p className="text-xs sm:text-sm text-[#5E574E] mt-2">
              Send us a direct message regarding this residence or booking arrangements.
            </p>
          </div>

          <ContactForm 
            defaultProperty={property.name}
            defaultType="property"
          />
        </div>
      </div>

    </div>
  );
};
