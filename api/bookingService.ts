import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';
import type { 
  BookingService, 
  BookingSlot, 
  BookingRecord, 
  CreateBookingPayload, 
  BookingResponse 
} from '../src/types.js';

// Default Curated Services for CG Property Luxury Residences
export const DEFAULT_SERVICES: BookingService[] = [
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

// Standard working day slot schedule
const BASE_TIME_SLOTS = [
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

// In-Memory/Local Storage Store for Dev and Fallback when Neon is not yet connected
let localBookings: BookingRecord[] = [
  {
    id: 'bkg-demo-1',
    booking_reference: 'CG-2026-N9R1',
    property_id: 'residence-01',
    property_name: 'The Tower R Suite',
    service_id: 'svc-private-viewing',
    service_name: 'Private In-Person Viewing & Tour',
    customer_name: 'Alexander Wright',
    customer_email: 'alexander@example.com',
    customer_phone: '+44 7700 900077',
    customer_whatsapp: '+44 7700 900077',
    booking_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    start_time: '10:30 AM',
    end_time: '11:15 AM',
    duration: 45,
    status: 'confirmed',
    notes: 'Interested in a 3-month executive stay.',
    email_status: 'sent',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Calculate end time based on start time string and duration minutes
export function calculateEndTime(startTimeStr: string, durationMinutes: number): string {
  try {
    const [timePart, modifier] = startTimeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes + durationMinutes, 0, 0);

    let endHours = date.getHours();
    const endMinutes = date.getMinutes();
    const endModifier = endHours >= 12 ? 'PM' : 'AM';
    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;

    const formattedMinutes = endMinutes < 10 ? `0${endMinutes}` : `${endMinutes}`;
    const formattedHours = endHours < 10 ? `0${endHours}` : `${endHours}`;

    return `${formattedHours}:${formattedMinutes} ${endModifier}`;
  } catch {
    return startTimeStr;
  }
}

// Generate unique booking reference e.g., CG-2026-X8K9
export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `CG-${year}-${rand}`;
}

// Lazy Resend Client Helper
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 'your_resend_api_key') {
    return null;
  }
  return new Resend(apiKey);
}

// Neon Database Helper (Graceful with schema check)
async function getNeonSql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl === 'your_neon_database_url') {
    return null;
  }
  try {
    const sql = neon(dbUrl);
    // Ensure tables exist
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        booking_reference TEXT NOT NULL UNIQUE,
        property_id TEXT NOT NULL,
        property_name TEXT NOT NULL,
        service_id TEXT NOT NULL,
        service_name TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_whatsapp TEXT NOT NULL,
        booking_date TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        duration INTEGER NOT NULL,
        status TEXT NOT NULL,
        notes TEXT,
        email_status TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    return sql;
  } catch (err) {
    console.warn('[Neon DB] Unable to connect or initialize, using fallback store:', err);
    return null;
  }
}

// ==========================================
// Modular Core Booking Functions (Section 16)
// ==========================================

export async function getServices(): Promise<BookingService[]> {
  return DEFAULT_SERVICES.filter(s => s.active);
}

export async function getAvailability(propertyId?: string, month?: string): Promise<{ blockedDates: string[] }> {
  // Return blocked or booked dates (e.g. past dates are blocked client-side)
  return {
    blockedDates: [],
  };
}

export async function getAvailableSlots(
  propertyId: string, 
  date: string, 
  serviceId: string
): Promise<BookingSlot[]> {
  const sql = await getNeonSql();
  let bookedTimes: string[] = [];

  if (sql) {
    try {
      const rows = await sql`
        SELECT start_time FROM bookings 
        WHERE property_id = ${propertyId} 
          AND booking_date = ${date} 
          AND status != 'cancelled'
      `;
      bookedTimes = rows.map(r => r.start_time as string);
    } catch (err) {
      console.error('[Neon DB] Error querying slots:', err);
      bookedTimes = localBookings
        .filter(b => b.property_id === propertyId && b.booking_date === date && b.status !== 'cancelled')
        .map(b => b.start_time);
    }
  } else {
    bookedTimes = localBookings
      .filter(b => b.property_id === propertyId && b.booking_date === date && b.status !== 'cancelled')
      .map(b => b.start_time);
  }

  // Generate slots
  return BASE_TIME_SLOTS.map((time, index) => {
    // Check if booked
    const isBooked = bookedTimes.includes(time);
    return {
      id: `slot-${index}`,
      time,
      available: !isBooked,
    };
  });
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
  const service = DEFAULT_SERVICES.find(s => s.id === payload.service_id) || DEFAULT_SERVICES[0];
  const duration = service.duration;
  const endTime = calculateEndTime(payload.start_time, duration);
  const bookingReference = generateBookingReference();
  const id = `bkg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // Check double booking
  const existingSlots = await getAvailableSlots(payload.property_id, payload.booking_date, payload.service_id);
  const requestedSlot = existingSlots.find(s => s.time === payload.start_time);
  if (requestedSlot && !requestedSlot.available) {
    return {
      success: false,
      error: 'The requested time slot has just been booked. Please select an alternate time.',
    };
  }

  const booking: BookingRecord = {
    id,
    booking_reference: bookingReference,
    property_id: payload.property_id,
    property_name: payload.property_name,
    service_id: payload.service_id,
    service_name: service.name,
    customer_name: payload.customer_name.trim(),
    customer_email: payload.customer_email.trim().toLowerCase(),
    customer_phone: payload.customer_phone.trim(),
    customer_whatsapp: payload.customer_whatsapp.trim() || payload.customer_phone.trim(),
    booking_date: payload.booking_date,
    start_time: payload.start_time,
    end_time: payload.checkout_time || endTime,
    checkout_date: payload.checkout_date,
    checkout_time: payload.checkout_time || '12:00 PM',
    duration,
    status: 'confirmed',
    notes: payload.notes?.trim() || '',
    email_status: 'pending',
    created_at: now,
    updated_at: now,
  };

  // 1. Save booking to Neon or local repository
  const sql = await getNeonSql();
  if (sql) {
    try {
      await sql`
        INSERT INTO bookings (
          id, booking_reference, property_id, property_name, service_id, service_name,
          customer_name, customer_email, customer_phone, customer_whatsapp,
          booking_date, start_time, end_time, duration, status, notes, email_status,
          created_at, updated_at
        ) VALUES (
          ${booking.id}, ${booking.booking_reference}, ${booking.property_id}, ${booking.property_name},
          ${booking.service_id}, ${booking.service_name}, ${booking.customer_name}, ${booking.customer_email},
          ${booking.customer_phone}, ${booking.customer_whatsapp}, ${booking.booking_date}, ${booking.start_time},
          ${booking.end_time}, ${booking.duration}, ${booking.status}, ${booking.notes}, ${booking.email_status},
          ${booking.created_at}, ${booking.updated_at}
        )
      `;
    } catch (dbErr) {
      console.error('[Neon DB] Insert error, saving to local store:', dbErr);
      localBookings.push(booking);
    }
  } else {
    localBookings.push(booking);
  }

  // 2. Dispatch Email Notifications via Resend (Section 9, 10, 15)
  let emailDeliverySuccess = false;
  try {
    const [customerEmailResult, adminEmailResult] = await Promise.allSettled([
      sendBookingConfirmationEmail(booking),
      sendAdminBookingEmail(booking),
    ]);

    if (customerEmailResult.status === 'fulfilled' && customerEmailResult.value.success) {
      emailDeliverySuccess = true;
    }
    if (adminEmailResult.status === 'rejected') {
      console.warn('[Email] Admin notification error:', adminEmailResult.reason);
    }
  } catch (emailErr) {
    console.warn('[Email] Notification dispatch encountered error:', emailErr);
  }

  // Update email_status
  booking.email_status = emailDeliverySuccess ? 'sent' : 'failed';
  if (sql) {
    try {
      await sql`UPDATE bookings SET email_status = ${booking.email_status} WHERE id = ${booking.id}`;
    } catch (e) {
      // Non-critical
    }
  }

  return {
    success: true,
    booking,
    notificationStatus: booking.email_status,
  };
}

// Send Customer Confirmation Email (Section 9)
export async function sendBookingConfirmationEmail(booking: BookingRecord): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const adminEmail = process.env.BOOKING_ADMIN_EMAIL || 'n.islam@chelsongordon.com';

  if (!resend) {
    console.log(`[Resend Mock Email to Customer: ${booking.customer_email}] Reference: ${booking.booking_reference}`);
    return { success: true };
  }

  // Resend Sandbox Restriction Handling:
  // When using 'onboarding@resend.dev', Resend only allows sending to the account owner's email address.
  // To allow testing without domain verification, route preview to the verified owner address.
  const isSandbox = fromEmail.toLowerCase().includes('resend.dev');
  const isSameRecipient = booking.customer_email.toLowerCase() === adminEmail.toLowerCase();
  const targetRecipient = (!isSandbox || isSameRecipient) ? booking.customer_email : adminEmail;
  const isSandboxPreview = isSandbox && !isSameRecipient;

  try {
    const sandboxBanner = isSandboxPreview ? `
      <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 12px; color: #92400E; line-height: 1.5;">
        <strong>Resend Sandbox Notice:</strong> This confirmation email was generated for <strong>${booking.customer_email}</strong>. Because sending is currently configured from <code>onboarding@resend.dev</code>, it was routed to your verified developer address (${adminEmail}). To deliver directly to external guests, verify your custom domain in Resend.
      </div>
    ` : '';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>CG Property Booking Confirmation</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #14171A; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E6E0D8; padding: 36px 32px; }
          .header { text-align: center; border-bottom: 1px solid #E6E0D8; padding-bottom: 24px; margin-bottom: 24px; }
          .logo { font-size: 22px; font-weight: 700; color: #042F61; letter-spacing: 0.05em; }
          .sublogo { font-size: 11px; text-transform: uppercase; color: #9D7C38; letter-spacing: 0.15em; margin-top: 4px; }
          .ref-badge { display: inline-block; background: #FAF8F5; border: 1px solid #DFB85A; color: #042F61; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 13px; margin: 16px 0; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
          .details-table td { padding: 10px 12px; border-bottom: 1px solid #F0ECE6; }
          .label { color: #8A8175; font-weight: 500; width: 35%; }
          .val { color: #14171A; font-weight: 600; }
          .notes-box { background: #FAF8F5; border-left: 3px solid #DFB85A; padding: 12px 16px; font-size: 13px; color: #5E574E; margin: 16px 0; border-radius: 0 8px 8px 0; }
          .footer { text-align: center; font-size: 12px; color: #8A8175; margin-top: 32px; border-top: 1px solid #E6E0D8; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          ${sandboxBanner}
          <div class="header">
            <div class="logo">CG PROPERTY</div>
            <div class="sublogo">Curated Luxury Residences</div>
            <h2 style="color: #042F61; margin: 18px 0 6px 0;">Booking Confirmed</h2>
            <p style="margin: 0; color: #5E574E; font-size: 14px;">Dear ${booking.customer_name}, your appointment has been scheduled successfully.</p>
            <div>
              <span class="ref-badge">Reference: ${booking.booking_reference}</span>
            </div>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Residence</td>
              <td class="val">${booking.property_name}</td>
            </tr>
            <tr>
              <td class="label">Reservation</td>
              <td class="val">${booking.service_name}</td>
            </tr>
            <tr>
              <td class="label">Check-In</td>
              <td class="val">${booking.booking_date} at ${booking.start_time}</td>
            </tr>
            <tr>
              <td class="label">Check-Out</td>
              <td class="val">${booking.checkout_date || 'Following Day'} at ${booking.checkout_time || '12:00 PM'}</td>
            </tr>
            <tr>
              <td class="label">Contact Phone</td>
              <td class="val">${booking.customer_phone}</td>
            </tr>
            <tr>
              <td class="label">WhatsApp</td>
              <td class="val">${booking.customer_whatsapp}</td>
            </tr>
          </table>

          ${booking.notes ? `
            <div class="notes-box">
              <strong>Your Notes:</strong><br />
              ${booking.notes}
            </div>
          ` : ''}

          <p style="font-size: 13px; color: #5E574E; line-height: 1.6;">
            Our concierge team will meet you at the scheduled time. Should you need to reschedule or have questions before arrival, please reply directly to this email or message us via WhatsApp.
          </p>

          <div class="footer">
            <p style="margin: 0 0 6px 0; font-weight: 600; color: #042F61;">CG Property Concierge & Management</p>
            <p style="margin: 0;">Bangkok · Hong Kong · Global Hubs</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const subjectPrefix = isSandboxPreview ? `[Sandbox Preview for ${booking.customer_email}] ` : '';

    const { error } = await resend.emails.send({
      from: `CG Property <${fromEmail}>`,
      to: [targetRecipient],
      subject: `${subjectPrefix}Booking Confirmation: ${booking.service_name} (${booking.booking_reference})`,
      html,
    });

    if (error) {
      console.warn('[Resend Customer Email Notice]:', error.message || error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Resend Customer Email Notice]:', err?.message || err);
    return { success: false, error: err?.message || 'Email delivery failed' };
  }
}

// Send Admin Notification Email (Section 10)
export async function sendAdminBookingEmail(booking: BookingRecord): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const adminEmail = process.env.BOOKING_ADMIN_EMAIL || 'n.islam@chelsongordon.com';

  if (!resend) {
    console.log(`[Resend Mock Admin Email to ${adminEmail}] New Booking ${booking.booking_reference} for ${booking.customer_name}`);
    return { success: true };
  }

  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; color: #14171A; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 24px; border: 1px solid #E6E0D8; border-radius: 12px;">
          <h2 style="color: #042F61; margin-top: 0;">New Residence Booking Alert</h2>
          <p>A new appointment has been confirmed on the CG Property platform.</p>
          
          <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #E6E0D8; margin: 16px 0;">
            <p><strong>Reference:</strong> ${booking.booking_reference}</p>
            <p><strong>Property:</strong> ${booking.property_name} (${booking.property_id})</p>
            <p><strong>Reservation:</strong> ${booking.service_name}</p>
            <p><strong>Check-In:</strong> ${booking.booking_date} at ${booking.start_time}</p>
            <p><strong>Check-Out:</strong> ${booking.checkout_date || 'Following Day'} at ${booking.checkout_time || '12:00 PM'}</p>
            <hr style="border: none; border-top: 1px solid #E6E0D8; margin: 12px 0;" />
            <p><strong>Customer Name:</strong> ${booking.customer_name}</p>
            <p><strong>Customer Email:</strong> <a href="mailto:${booking.customer_email}">${booking.customer_email}</a></p>
            <p><strong>Phone:</strong> ${booking.customer_phone}</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/${booking.customer_whatsapp.replace(/[^0-9]/g, '')}">${booking.customer_whatsapp}</a></p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <p style="font-size: 12px; color: #8A8175;">Timestamp: ${booking.created_at}</p>
        </div>
      </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: `CG Property Booking System <${fromEmail}>`,
      to: [adminEmail],
      subject: `[New Booking] ${booking.service_name} - ${booking.customer_name} (${booking.booking_reference})`,
      html,
    });

    if (error) {
      console.warn('[Resend Admin Email Notice]:', error.message || error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Resend Admin Email Notice]:', err?.message || err);
    return { success: false, error: err?.message || 'Admin email failed' };
  }
}

export async function cancelBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
  const sql = await getNeonSql();
  if (sql) {
    try {
      await sql`UPDATE bookings SET status = 'cancelled', updated_at = NOW() WHERE id = ${bookingId}`;
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }
  const idx = localBookings.findIndex(b => b.id === bookingId);
  if (idx >= 0) {
    localBookings[idx].status = 'cancelled';
    localBookings[idx].updated_at = new Date().toISOString();
    return { success: true };
  }
  return { success: false, error: 'Booking not found' };
}

export async function rescheduleBooking(
  bookingId: string, 
  newDate: string, 
  newTime: string
): Promise<{ success: boolean; booking?: BookingRecord; error?: string }> {
  const sql = await getNeonSql();
  let booking: BookingRecord | undefined;

  if (sql) {
    const rows = await sql`SELECT * FROM bookings WHERE id = ${bookingId}`;
    if (rows.length > 0) {
      booking = rows[0] as unknown as BookingRecord;
    }
  } else {
    booking = localBookings.find(b => b.id === bookingId);
  }

  if (!booking) {
    return { success: false, error: 'Booking not found' };
  }

  const endTime = calculateEndTime(newTime, booking.duration);
  booking.booking_date = newDate;
  booking.start_time = newTime;
  booking.end_time = endTime;
  booking.updated_at = new Date().toISOString();

  if (sql) {
    await sql`
      UPDATE bookings 
      SET booking_date = ${newDate}, start_time = ${newTime}, end_time = ${endTime}, updated_at = NOW()
      WHERE id = ${bookingId}
    `;
  }

  return { success: true, booking };
}
