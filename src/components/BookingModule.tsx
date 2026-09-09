import React from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, ShieldCheck, Calendar, Info, MessageSquare } from 'lucide-react';

interface BookingModuleProps {
  property: Property;
  onEnquire?: () => void;
}

export const BookingModule: React.FC<BookingModuleProps> = ({ property, onEnquire }) => {
  const { t } = useLanguage();

  return (
    <div id="booking-action-card" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D8] shadow-md sticky top-28 space-y-6">
      
      {/* Card Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#9D7C38]">
          {t('booking.title')}
        </span>
        <h3 className="text-2xl font-bold text-[#042F61] mt-1">
          {property.name}
        </h3>
        <p className="text-xs text-[#8A8175] mt-0.5">
          {property.location} · {property.tower} · {property.floor}
        </p>
      </div>

      {/* Booking Method Notice */}
      <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E0D8] space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#14171A]">
          <ShieldCheck className="w-4 h-4 text-[#38761D]" />
          <span>Airbnb Verified Listing</span>
        </div>
        <p className="text-xs text-[#5E574E] leading-relaxed">
          {t('booking.methodNotice')}
        </p>
      </div>

      {/* Primary Action: Book on Airbnb */}
      <div className="space-y-3">
        <a
          id={`airbnb-book-${property.slug}`}
          href={property.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-shine w-full py-3.5 px-6 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>{t('booking.airbnbCta')}</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        {onEnquire && (
          <button
            onClick={onEnquire}
            className="w-full bg-[#FAF8F5] hover:bg-[#EDE8E1] text-[#2D2A26] py-3 px-6 rounded-2xl text-xs font-semibold border border-[#E6E0D8] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8A8175]" />
            <span>{t('booking.inquiryCta')}</span>
          </button>
        )}
      </div>

      {/* Modular Architecture Note for Future Extension */}
      <div className="pt-4 border-t border-[#E6E0D8] flex items-start gap-2.5 text-[11px] text-[#8A8175]">
        <Info className="w-3.5 h-3.5 text-[#8A8175] shrink-0 mt-0.5" />
        <span>{t('booking.futureNotice')}</span>
      </div>

    </div>
  );
};
