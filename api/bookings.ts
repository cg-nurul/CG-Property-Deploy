import { createBooking, cancelBooking, rescheduleBooking } from './bookingService';
import { CreateBookingPayload } from '../src/types';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const {
        property_id,
        property_name,
        service_id,
        booking_date,
        start_time,
        customer_name,
        customer_email,
        customer_phone,
        customer_whatsapp,
        notes,
      } = body;

      // Validation
      if (!property_id || !service_id || !booking_date || !start_time || !customer_name || !customer_email || !customer_phone) {
        return res.status(400).json({
          success: false,
          error: 'Missing required booking fields: property_id, service_id, booking_date, start_time, customer_name, customer_email, customer_phone',
        });
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customer_email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      const payload: CreateBookingPayload = {
        property_id,
        property_name: property_name || 'CG Property Luxury Residence',
        service_id,
        booking_date,
        start_time,
        customer_name,
        customer_email,
        customer_phone,
        customer_whatsapp: customer_whatsapp || customer_phone,
        notes,
      };

      const result = await createBooking(payload);

      if (!result.success) {
        return res.status(409).json(result);
      }

      return res.status(201).json(result);
    } catch (err: any) {
      console.error('[API /bookings POST] error:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Server error while creating booking.',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { action, booking_id, new_date, new_time } = req.body || {};
      if (action === 'cancel' && booking_id) {
        const result = await cancelBooking(booking_id);
        return res.status(200).json(result);
      }
      if (action === 'reschedule' && booking_id && new_date && new_time) {
        const result = await rescheduleBooking(booking_id, new_date, new_time);
        return res.status(200).json(result);
      }
      return res.status(400).json({ success: false, error: 'Invalid action or missing parameters' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Server error' });
    }
  }

  res.setHeader('Allow', ['POST', 'PATCH']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
