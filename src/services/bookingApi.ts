import { 
  BookingService, 
  BookingSlot, 
  BookingRecord, 
  CreateBookingPayload, 
  BookingResponse 
} from '../types';

// Client-side single source of truth for the Booking API (Section 16)
export async function getServices(): Promise<BookingService[]> {
  try {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.services)) {
      return data.services;
    }
  } catch (err) {
    console.warn('[BookingApi] Fallback services used:', err);
  }

  // Graceful fallback if API unavailable
  return [
    {
      id: 'svc-private-viewing',
      name: 'Private In-Person Viewing & Tour',
      description: 'Exclusive guided walkthrough of the residence, architectural finishes, tower facilities, and neighbourhood overview with a dedicated host.',
      duration: 45,
      active: true,
    },
    {
      id: 'svc-virtual-consultation',
      name: 'Virtual Walkthrough & Consultation',
      description: 'High-definition 1-on-1 live video walkthrough, floor plan review, and stay briefing for international and remote guests.',
      duration: 30,
      active: true,
    },
    {
      id: 'svc-vip-checkin',
      name: 'VIP Arrival & Residence Orientation',
      description: 'Personalized arrival meeting, digital access handover, suite appliance orientation, and curated local concierge briefing.',
      duration: 60,
      active: true,
    },
    {
      id: 'svc-longstay-leasing',
      name: 'Long-Stay & Corporate Leasing Advisory',
      description: 'Comprehensive discussion regarding multi-month leasing, corporate invoicing, bespoke housekeeping, and tailored stay packages.',
      duration: 45,
      active: true,
    },
  ];
}

export async function getAvailableSlots(
  propertyId: string, 
  date: string, 
  serviceId: string
): Promise<BookingSlot[]> {
  try {
    const params = new URLSearchParams({
      property_id: propertyId,
      date,
      service_id: serviceId,
    });
    const res = await fetch(`/api/availability?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.slots)) {
      return data.slots;
    }
  } catch (err) {
    console.warn('[BookingApi] Slots fetch fallback:', err);
  }

  // Fallback client-generated slots
  const baseTimes = [
    '09:00 AM',
    '09:45 AM',
    '10:30 AM',
    '11:15 AM',
    '01:30 PM',
    '02:15 PM',
    '03:00 PM',
    '03:45 PM',
    '04:30 PM',
    '05:15 PM',
  ];

  return baseTimes.map((time, idx) => ({
    id: `slot-${idx}`,
    time,
    available: true,
  }));
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('[BookingApi] Create booking error:', err);
    return {
      success: false,
      error: err?.message || 'Network error while processing your booking.',
    };
  }
}

// RFC-5545 standard .ics calendar generation
export function generateIcsFile(booking: BookingRecord): void {
  try {
    // Parse booking_date (YYYY-MM-DD) and start_time (e.g. 10:00 AM)
    const [yearStr, monthStr, dayStr] = booking.booking_date.split('-');
    const [timeStr, modifier] = booking.start_time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const startDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr), hours, minutes);
    
    let endDate: Date;
    if (booking.checkout_date) {
      const [endY, endM, endD] = booking.checkout_date.split('-');
      const [endT, endMod] = (booking.checkout_time || '12:00 PM').split(' ');
      let [endH, endMin] = endT.split(':').map(Number);
      if (endMod === 'PM' && endH < 12) endH += 12;
      if (endMod === 'AM' && endH === 12) endH = 0;
      endDate = new Date(Number(endY), Number(endM) - 1, Number(endD), endH, endMin);
    } else {
      endDate = new Date(startDate.getTime() + (booking.duration || 45) * 60 * 1000);
    }

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatIcsDate = (d: Date) => 
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const startFormatted = formatIcsDate(startDate);
    const endFormatted = formatIcsDate(endDate);
    const stampFormatted = formatIcsDate(new Date());

    const title = `CG Property: ${booking.service_name}`;
    const location = `${booking.property_name} (Ref: ${booking.booking_reference})`;
    const description = `Appointment for ${booking.service_name} at ${booking.property_name}. Reference: ${booking.booking_reference}. Host contact: concierge@cgproperty.com`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CG Property//Luxury Booking System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${booking.id}-${Date.now()}@cgproperty.com`,
      `DTSTAMP:${stampFormatted}`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `CG-Property-Booking-${booking.booking_reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to generate .ics file:', err);
  }
}
