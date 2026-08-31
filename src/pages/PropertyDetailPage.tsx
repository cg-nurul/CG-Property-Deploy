import React, { useRef } from 'react';
import { Property, PageRoute } from '../types';
import { PROPERTIES } from '../data/properties';
import { useLanguage } from '../context/LanguageContext';
import { PropertyGallery } from '../components/PropertyGallery';
import { PropertyFacts } from '../components/PropertyFacts';
import { AmenitiesNotice } from '../components/AmenitiesNotice';
import { BookingModule } from '../components/BookingModule';
import { ContactForm } from '../components/ContactForm';
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
  Bath
} from 'lucide-react';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ slug, onNavigate }) => {
  const { t, language } = useLanguage();
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];
  const otherProperty = PROPERTIES.find((p) => p.slug !== property.slug) || PROPERTIES[1];

  const handleScrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Top Breadcrumbs & Back Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/properties')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E574E] hover:text-[#14171A] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('property.backToProperties')}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#8A8175]">
          <span>{property.location}</span>
          <span>/</span>
          <span className="font-semibold text-[#14171A]">{property.name}</span>
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
                <span>{property.location}, Bangkok</span>
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

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shine px-8 py-4 rounded-2xl text-sm font-bold tracking-wide flex items-center gap-2.5 cursor-pointer"
            >
              <span>{t('booking.airbnbCta')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-white/70 mt-2 font-medium">
              Hosted via official Airbnb listing
            </span>
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
              <p>• Building: Nue District Rama 9 ({property.tower})</p>
              <p>• Vertical Zone: {property.floor}</p>
              <p>• Interior Space: {Math.ceil(property.sizeSqm)} square meters</p>
              <p>• Arrangement: {property.bedrooms} Bedrooms, {property.bathrooms} {property.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</p>
              <p>• Handover State: Fully Furnished condominium unit</p>
            </div>
          </div>

          {/* Amenities (CMS-Ready graceful placeholder) */}
          <AmenitiesNotice />

          {/* Location & Tower Context */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#DFB85A]" />
              <h3 className="text-xl font-bold text-[#042F61]">
                {t('location.heading')}
              </h3>
            </div>
            <p className="text-sm text-[#5E574E] leading-relaxed">
              {t('location.description')}
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8] text-xs text-[#6B645A] space-y-1">
              <p className="font-semibold text-[#042F61]">{property.location}</p>
              <p>Rama 9 Road, Huai Khwang, Bangkok 10310, Thailand</p>
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

          {/* Compare with Other Residence */}
          {otherProperty && (
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9D7C38]">
                  {t('property.otherResidence')}
                </span>
                <h4 className="text-xl font-bold text-[#042F61]">
                  {otherProperty.name} ({otherProperty.tower} · {otherProperty.floor})
                </h4>
                <p className="text-xs text-[#6B645A]">
                  {Math.ceil(otherProperty.sizeSqm)} sqm · {otherProperty.bedrooms} Bed · {otherProperty.bathrooms} Bath
                </p>
              </div>
              <button
                onClick={() => {
                  onNavigate(`/properties/${otherProperty.slug}` as PageRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#042F61] hover:bg-[#021B38] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <span>View {otherProperty.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
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
