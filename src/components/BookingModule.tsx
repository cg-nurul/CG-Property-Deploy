import React, { useState, useEffect, useMemo } from 'react';
import { Property, BookingService, BookingSlot, BookingRecord, PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BookingCalendar } from './booking/BookingCalendar';
import { TimeSlotPicker } from './booking/TimeSlotPicker';
import { CheckOutMenu } from './booking/CheckOutMenu';
import { CustomerDetailsForm, CustomerFormData } from './booking/CustomerDetailsForm';
import { BookingSummaryStep } from './booking/BookingSummaryStep';
import { BookingConfirmationStep } from './booking/BookingConfirmationStep';
import { getAvailableSlots, createBooking } from '../services/bookingApi';
import { ShieldCheck, Calendar, Clock, User, ArrowRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { AirbnbIcon } from './ui/FilledIcons';

interface BookingModuleProps {
  property: Property;
  onEnquire?: () => void;
}

type BookingStep = 'schedule' | 'details' | 'summary' | 'confirmed';

// Direct viewing appointment configuration
const DEFAULT_BOOKING_SERVICE: BookingService = {
  id: 'svc-private-viewing',
  name: 'Private Residence Viewing',
  description: 'Exclusive guided walkthrough of the residence and facilities with a dedicated host.',
  duration: 45,
  active: true,
};

export const BookingModule: React.FC<BookingModuleProps> = ({ property, onEnquire }) => {
  const { t } = useLanguage();

  // Booking Flow State
  const [step, setStep] = useState<BookingStep>('schedule');

  // Tomorrow's date as default check-in
  const tomorrowFormatted = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  // 2 days from now as default check-out
  const defaultCheckoutFormatted = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrowFormatted);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCheckoutDate, setSelectedCheckoutDate] = useState<string>(defaultCheckoutFormatted);
  const [selectedCheckoutTime, setSelectedCheckoutTime] = useState<string>('12:00 PM');

  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // When check-in date changes, ensure checkout is at least 1 day later
  const handleSelectDate = (newDate: string) => {
    setSelectedDate(newDate);
    try {
      const [y, m, d] = newDate.split('-').map(Number);
      const target = new Date(y, m - 1, d);
      target.setDate(target.getDate() + 1);
      const minCheckout = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(target.getDate()).padStart(2, '0')}`;
      if (!selectedCheckoutDate || selectedCheckoutDate <= newDate) {
        setSelectedCheckoutDate(minCheckout);
      }
    } catch {
      // fallback
    }
  };

  // Customer Details Form State
  const [customerData, setCustomerData] = useState<CustomerFormData>({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Load available time slots when date changes
  useEffect(() => {
    if (!selectedDate || !property.id) return;
    let isMounted = true;
    setLoadingSlots(true);
    setSelectedTime(''); // reset selection

    async function loadSlots() {
      const slots = await getAvailableSlots(
        property.id,
        selectedDate,
        DEFAULT_BOOKING_SERVICE.id
      );
      if (isMounted) {
        setAvailableSlots(slots);
        setLoadingSlots(false);
      }
    }

    loadSlots();
    return () => { isMounted = false; };
  }, [property.id, selectedDate]);

  // Validation before going to Summary
  const validateCustomerDetails = (): boolean => {
    const errors: Partial<Record<keyof CustomerFormData, string>> = {};

    if (!customerData.fullName.trim() || customerData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email.trim() || !emailRegex.test(customerData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = customerData.phone.replace(/[^0-9]/g, '');
    if (!customerData.phone.trim() || phoneDigits.length < 6) {
      errors.phone = 'Please enter a valid contact phone number.';
    }

    const whatsappDigits = customerData.whatsapp.replace(/[^0-9]/g, '');
    if (!customerData.whatsapp.trim() || whatsappDigits.length < 6) {
      errors.whatsapp = 'Please enter a valid WhatsApp number.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToDetails = () => {
    if (!selectedDate || !selectedTime) return;
    setStep('details');
  };

  const handleNextToSummary = () => {
    if (validateCustomerDetails()) {
      setStep('summary');
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      property_id: property.id,
      property_name: `${property.name} (${property.tower})`,
      service_id: DEFAULT_BOOKING_SERVICE.id,
      service_name: DEFAULT_BOOKING_SERVICE.name,
      booking_date: selectedDate,
      start_time: selectedTime,
      checkout_date: selectedCheckoutDate,
      checkout_time: selectedCheckoutTime,
      customer_name: customerData.fullName,
      customer_email: customerData.email,
      customer_phone: customerData.phone,
      customer_whatsapp: customerData.whatsapp,
      notes: customerData.notes,
    };

    const res = await createBooking(payload);

    setIsSubmitting(false);
    if (res.success && res.booking) {
      setConfirmedBooking(res.booking);
      setStep('confirmed');
    } else {
      setSubmitError(res.error || 'Failed to confirm appointment. Please check availability.');
    }
  };

  const handleReset = () => {
    setStep('schedule');
    setSelectedTime('');
    setSelectedCheckoutDate(defaultCheckoutFormatted);
    setSelectedCheckoutTime('12:00 PM');
    setConfirmedBooking(null);
    setSubmitError(null);
  };

  // Formatted date string for label
  const formattedSelectedDate = useMemo(() => {
    try {
      const [y, m, d] = selectedDate.split('-').map(Number);
      return new Date(y, m - 1, d).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  return (
    <div 
      id="booking-action-card" 
      className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E6E0D8] shadow-md sticky top-28 space-y-5 transition-all"
    >
      {/* Top Header & Residence Info */}
      <div className="flex items-start justify-between gap-2 border-b border-[#E6E0D8] pb-4">
        <div>
          <h3 className="text-xl font-bold text-[#042F61] tracking-tight">
            Check in Details
          </h3>
          <p className="text-xs text-[#8A8175] mt-0.5">
            {property.name} · {property.tower} · {property.floor}
          </p>
        </div>

        {/* Overnight stay badge linking to Airbnb */}
        <a
          href={property.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Looking for overnight stay? Book directly on Airbnb"
          className="shrink-0 p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EDE8E1] border border-[#E6E0D8] text-[#042F61] transition-colors cursor-pointer group flex items-center gap-1.5 text-[11px] font-semibold"
        >
          <AirbnbIcon className="w-3.5 h-3.5 text-[#042F61]" />
          <span className="hidden sm:inline">Airbnb Stay</span>
          <ExternalLink className="w-3 h-3 text-[#8A8175] group-hover:text-[#042F61]" />
        </a>
      </div>

      {/* Step Indicator (when not in confirmation) */}
      {step !== 'confirmed' && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#8A8175] border-b border-[#FAF8F5] pb-2">
          <div className={`flex items-center gap-1.5 ${step === 'schedule' ? 'text-[#042F61]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
              step === 'schedule' ? 'bg-[#042F61] text-white' : 'bg-[#EDE8E1] text-[#5E574E]'
            }`}>
              1
            </span>
            <span className="hidden xs:inline">Check In / Out</span>
          </div>

          <div className="w-6 h-[1px] bg-[#E6E0D8]" />

          <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-[#042F61]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
              step === 'details' ? 'bg-[#042F61] text-white' : 'bg-[#EDE8E1] text-[#5E574E]'
            }`}>
              2
            </span>
            <span className="hidden xs:inline">Details</span>
          </div>

          <div className="w-6 h-[1px] bg-[#E6E0D8]" />

          <div className={`flex items-center gap-1.5 ${step === 'summary' ? 'text-[#042F61]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
              step === 'summary' ? 'bg-[#042F61] text-white' : 'bg-[#EDE8E1] text-[#5E574E]'
            }`}>
              3
            </span>
            <span className="hidden xs:inline">Confirm</span>
          </div>
        </div>
      )}

      {/* ================= STEP 1: CHECK IN & CHECK OUT DATES & TIMES ================= */}
      {step === 'schedule' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Interactive Built-in Calendar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#042F61]">
                Select Check-in Date
              </label>
              <span className="text-[11px] font-medium text-[#9D7C38]">
                {formattedSelectedDate}
              </span>
            </div>
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>

          {/* Check-in Time Slot Picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#042F61]">
              Select Check-in Time
            </label>
            <TimeSlotPicker
              slots={availableSlots}
              selectedSlot={selectedTime}
              onSelectSlot={(t) => setSelectedTime(t)}
              isLoading={loadingSlots}
              dateFormatted={formattedSelectedDate}
            />
          </div>

          {/* Check-out Menu UI (Replaces Duration) */}
          <CheckOutMenu
            checkInDate={selectedDate}
            checkOutDate={selectedCheckoutDate}
            onSelectCheckOutDate={setSelectedCheckoutDate}
            checkOutTime={selectedCheckoutTime}
            onSelectCheckOutTime={setSelectedCheckoutTime}
          />

          {/* Next Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!selectedTime}
              onClick={handleNextToDetails}
              className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                selectedTime
                  ? 'btn-gold-shine text-[#042F61] active:scale-98'
                  : 'bg-[#EDE8E1] text-[#8A8175] cursor-not-allowed opacity-60'
              }`}
            >
              <span>Continue to Guest Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {!selectedTime && (
              <p className="text-center text-[11px] text-[#8A8175] mt-2">
                Please pick a check-in time slot above to continue.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 2: CUSTOMER DETAILS ================= */}
      {step === 'details' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('schedule')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A8175] hover:text-[#042F61] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Calendar</span>
            </button>
            <span className="text-[11px] text-[#9D7C38] font-bold">
              {formattedSelectedDate} · {selectedTime}
            </span>
          </div>

          <CustomerDetailsForm
            data={customerData}
            onChange={(d) => setCustomerData(d)}
            errors={formErrors}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep('schedule')}
              className="w-1/3 py-3 px-4 rounded-xl text-xs font-semibold text-[#5E574E] bg-white border border-[#E6E0D8] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNextToSummary}
              className="w-2/3 btn-gold-shine py-3 px-5 rounded-xl text-xs font-bold text-[#042F61] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>Review Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: BOOKING SUMMARY ================= */}
      {step === 'summary' && (
        <div className="animate-fadeIn">
          <BookingSummaryStep
            propertyName={property.name}
            propertyLocation={`${property.location} (${property.tower})`}
            service={DEFAULT_BOOKING_SERVICE}
            date={selectedDate}
            time={selectedTime}
            checkoutDate={selectedCheckoutDate}
            checkoutTime={selectedCheckoutTime}
            customer={customerData}
            onConfirm={handleConfirmBooking}
            onBack={() => setStep('details')}
            isLoading={isSubmitting}
            error={submitError}
          />
        </div>
      )}

      {/* ================= STEP 4: CONFIRMATION SCREEN ================= */}
      {step === 'confirmed' && confirmedBooking && (
        <BookingConfirmationStep
          booking={confirmedBooking}
          onReset={handleReset}
        />
      )}

      {/* Direct Airbnb Stay Link Notice (Preserving Overnight Stays) */}
      <div className="pt-3 border-t border-[#E6E0D8] flex items-center justify-between text-[11px] text-[#8A8175]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38761D]" />
          <span>Verified Superhost Management</span>
        </div>
        <a
          href={property.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#042F61] hover:underline font-semibold inline-flex items-center gap-1"
        >
          <span>Airbnb Listing</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
};
