import React, { useState, useMemo } from 'react';
import { BookingRecord } from '../../types';
import { generateIcsFile } from '../../services/bookingApi';
import { CheckCircle2, Calendar, Clock, Copy, Check, Download, ArrowRight, LogIn, LogOut, Moon } from 'lucide-react';

interface BookingConfirmationStepProps {
  booking: BookingRecord;
  onReset: () => void;
}

export const BookingConfirmationStep: React.FC<BookingConfirmationStepProps> = ({
  booking,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(booking.booking_reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    generateIcsFile(booking);
  };

  // Calculate nights
  const nightsCount = useMemo(() => {
    if (!booking.booking_date || !booking.checkout_date) return 1;
    try {
      const [y1, m1, d1] = booking.booking_date.split('-').map(Number);
      const [y2, m2, d2] = booking.checkout_date.split('-').map(Number);
      const t1 = new Date(y1, m1 - 1, d1).getTime();
      const t2 = new Date(y2, m2 - 1, d2).getTime();
      const diff = Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [booking.booking_date, booking.checkout_date]);

  return (
    <div className="space-y-6 text-center py-2 animate-fadeIn">
      {/* Success Icon Badge */}
      <div className="w-14 h-14 rounded-full bg-[#EBF4E5] border border-[#38761D]/30 flex items-center justify-center mx-auto text-[#38761D]">
        <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#9D7C38]">
          Confirmed Reservation
        </span>
        <h3 className="text-2xl font-bold text-[#042F61]">
          You're All Set!
        </h3>
        <p className="text-xs text-[#5E574E] max-w-sm mx-auto leading-relaxed">
          We have confirmed your reservation details with our property host. A confirmation email has been dispatched to <span className="font-semibold text-[#042F61]">{booking.customer_email}</span>.
        </p>
      </div>

      {/* Booking Reference Pill with Copy */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#DFB85A] shadow-2xs">
        <span className="text-xs text-[#8A8175]">Reference:</span>
        <span className="font-mono font-bold text-sm text-[#042F61]">
          {booking.booking_reference}
        </span>
        <button
          type="button"
          onClick={handleCopyReference}
          title="Copy Reference"
          className="p-1 rounded-lg text-[#8A8175] hover:text-[#042F61] hover:bg-white transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#38761D]" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Appointment Summary Box */}
      <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#E6E0D8] text-left text-xs space-y-3.5">
        <div className="border-b border-[#E6E0D8] pb-2.5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9D7C38] tracking-wider block">
              Direct Residence Booking
            </span>
            <h4 className="font-bold text-[#042F61] text-sm mt-0.5">
              {booking.property_name}
            </h4>
          </div>
          {booking.checkout_date && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#DFB85A] text-[10px] font-bold text-[#042F61]">
              <Moon className="w-2.5 h-2.5 text-[#9D7C38]" />
              <span>{nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}</span>
            </span>
          )}
        </div>

        {/* Check-In & Check-Out Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-white border border-[#E6E0D8]">
            <div className="flex items-center gap-1.5 text-[#8A8175] text-[10px] font-bold uppercase mb-1">
              <LogIn className="w-3 h-3 text-[#042F61]" />
              <span>Check-In</span>
            </div>
            <p className="font-bold text-[#042F61] text-xs">{booking.booking_date}</p>
            <p className="text-[11px] text-[#5E574E]">{booking.start_time}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E6E0D8]">
            <div className="flex items-center gap-1.5 text-[#8A8175] text-[10px] font-bold uppercase mb-1">
              <LogOut className="w-3 h-3 text-[#9D7C38]" />
              <span>Check-Out</span>
            </div>
            <p className="font-bold text-[#042F61] text-xs">{booking.checkout_date || 'Following Day'}</p>
            <p className="text-[11px] text-[#5E574E]">{booking.checkout_time || '12:00 PM'}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E6E0D8]/60 text-[11px] text-[#8A8175]">
          Guest: <span className="text-[#14171A] font-semibold">{booking.customer_name}</span> · {booking.customer_phone}
        </div>
      </div>

      {/* Action Buttons: Add to Calendar & Book Another */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="btn-gold-shine w-full py-3 px-4 rounded-xl text-xs font-bold text-[#042F61] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Add to Calendar (.ics)</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#5E574E] hover:text-[#042F61] hover:bg-[#FAF8F5] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Make Another Booking</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

