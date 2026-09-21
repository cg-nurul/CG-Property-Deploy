import React from 'react';
import { BookingService } from '../../types';
import { CustomerFormData } from './CustomerDetailsForm';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, AlertCircle, LogIn, LogOut, Moon } from 'lucide-react';

interface BookingSummaryStepProps {
  propertyName: string;
  propertyLocation: string;
  service?: BookingService;
  date: string; // Check-in date: YYYY-MM-DD
  time: string; // Check-in time: e.g. 02:00 PM
  checkoutDate?: string; // Check-out date: YYYY-MM-DD
  checkoutTime?: string; // Check-out time: e.g. 12:00 PM
  customer: CustomerFormData;
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const BookingSummaryStep: React.FC<BookingSummaryStepProps> = ({
  propertyName,
  propertyLocation,
  service,
  date,
  time,
  checkoutDate,
  checkoutTime = '12:00 PM',
  customer,
  onConfirm,
  onBack,
  isLoading,
  error,
}) => {
  // Format check-in date nicely: "Fri, Oct 2, 2026"
  const formattedCheckInDate = React.useMemo(() => {
    try {
      const [y, m, d] = date.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  }, [date]);

  // Format check-out date nicely: "Sun, Oct 4, 2026"
  const formattedCheckOutDate = React.useMemo(() => {
    if (!checkoutDate) return '';
    try {
      const [y, m, d] = checkoutDate.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return checkoutDate;
    }
  }, [checkoutDate]);

  // Calculate nights
  const nightsCount = React.useMemo(() => {
    if (!date || !checkoutDate) return 1;
    try {
      const [y1, m1, d1] = date.split('-').map(Number);
      const [y2, m2, d2] = checkoutDate.split('-').map(Number);
      const t1 = new Date(y1, m1 - 1, d1).getTime();
      const t2 = new Date(y2, m2 - 1, d2).getTime();
      const diff = Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [date, checkoutDate]);

  return (
    <div className="space-y-5">
      <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#E6E0D8] space-y-4">
        {/* Residence & Appointment Header */}
        <div className="border-b border-[#E6E0D8] pb-3 flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-[#9D7C38] uppercase tracking-wider block">
              Luxury Residence Reservation
            </span>
            <h4 className="text-base font-bold text-[#042F61] mt-0.5">
              {propertyName}
            </h4>
            <p className="text-xs text-[#8A8175] mt-0.5">
              {propertyLocation}
            </p>
          </div>
          {checkoutDate && (
            <div className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-[#DFB85A] text-[10px] font-bold text-[#042F61] flex items-center gap-1">
              <Moon className="w-3 h-3 text-[#9D7C38]" />
              <span>{nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}</span>
            </div>
          )}
        </div>

        {/* Check-In & Check-Out Block (Replaces Duration) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Check-In */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E6E0D8]">
            <div className="w-6 h-6 rounded-lg bg-[#042F61]/10 flex items-center justify-center shrink-0 mt-0.5">
              <LogIn className="w-3.5 h-3.5 text-[#042F61]" />
            </div>
            <div>
              <span className="text-[#8A8175] text-[10px] font-bold uppercase tracking-wider block">
                Check-In
              </span>
              <span className="font-bold text-[#042F61] block">{formattedCheckInDate}</span>
              <span className="text-[11px] text-[#5E574E] font-medium">{time}</span>
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E6E0D8]">
            <div className="w-6 h-6 rounded-lg bg-[#9D7C38]/15 flex items-center justify-center shrink-0 mt-0.5">
              <LogOut className="w-3.5 h-3.5 text-[#9D7C38]" />
            </div>
            <div>
              <span className="text-[#8A8175] text-[10px] font-bold uppercase tracking-wider block">
                Check-Out
              </span>
              <span className="font-bold text-[#042F61] block">
                {formattedCheckOutDate || 'Next Day'}
              </span>
              <span className="text-[11px] text-[#5E574E] font-medium">{checkoutTime}</span>
            </div>
          </div>
        </div>

        {/* Customer Information Block */}
        <div className="space-y-2 pt-1 border-t border-[#E6E0D8]/60 text-xs">
          <span className="text-[11px] font-bold text-[#8A8175] uppercase tracking-wider">
            Guest Details
          </span>

          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-[#E6E0D8]">
            <div className="flex items-center gap-2 text-[#14171A]">
              <User className="w-3.5 h-3.5 text-[#8A8175]" />
              <span className="font-semibold">{customer.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5E574E]">
              <Mail className="w-3.5 h-3.5 text-[#8A8175]" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5E574E]">
              <Phone className="w-3.5 h-3.5 text-[#8A8175]" />
              <span>{customer.phone}</span>
              {customer.whatsapp && customer.whatsapp !== customer.phone && (
                <span className="text-[10px] text-[#8A8175]">(WhatsApp: {customer.whatsapp})</span>
              )}
            </div>
            {customer.notes && (
              <div className="pt-2 mt-2 border-t border-[#F0ECE6] flex items-start gap-2 text-[#5E574E]">
                <MessageSquare className="w-3.5 h-3.5 text-[#8A8175] shrink-0 mt-0.5" />
                <span className="italic leading-relaxed">{customer.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-start gap-2.5 text-xs text-[#991B1B]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Buttons: Back & Confirm */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-1/3 py-3 px-4 rounded-xl text-xs font-semibold text-[#5E574E] bg-white border border-[#E6E0D8] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="w-2/3 btn-gold-shine py-3 px-5 rounded-xl text-xs font-bold text-[#042F61] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Clock className="w-4 h-4 animate-spin text-[#042F61]" />
              <span>Confirming Booking...</span>
            </>
          ) : (
            <span>Confirm Booking</span>
          )}
        </button>
      </div>
    </div>
  );
};
