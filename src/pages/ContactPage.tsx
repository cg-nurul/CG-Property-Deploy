import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ContactForm } from '../components/ContactForm';
import { BRAND_CONFIG } from '../data/properties';
import { Mail, Phone, MapPin, Building2, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest mb-3">
          <Mail className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>Inquiries</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#042F61] tracking-tight">
          {t('contact.title')}
        </h1>
        <p className="text-base sm:text-lg text-[#5E574E] mt-3 leading-relaxed">
          {t('contact.subheading')}
        </p>
      </div>

      {/* Main Grid: Form on Left, Contact Details & Booking Notice on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Container */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Contact Info & Location Side Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#042F61]">
              {t('contact.detailsTitle')}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EDE8E1] flex items-center justify-center shrink-0 text-[#042F61]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#042F61] block">Residences Location</span>
                  <p className="text-[#5E574E] mt-0.5">{BRAND_CONFIG.addressNotice}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EDE8E1] flex items-center justify-center shrink-0 text-[#042F61]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#042F61] block">Email Support</span>
                  <p className="text-[#5E574E] mt-0.5">{BRAND_CONFIG.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EDE8E1] flex items-center justify-center shrink-0 text-[#042F61]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#042F61] block">Telephone</span>
                  <p className="text-[#5E574E] mt-0.5">{BRAND_CONFIG.contactPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Airbnb Reservation Notice Card */}
          <div className="bg-[#042F61] text-white rounded-3xl p-6 sm:p-8 border border-[#021B38] shadow-md space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFB85A]">
              Booking Channel
            </span>
            <h4 className="text-lg font-bold text-white">
              Instant Airbnb Reservations
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              {t('booking.methodNotice')}
            </p>
            <a
              href={BRAND_CONFIG.airbnbGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer"
            >
              <span>Visit Airbnb Host Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
