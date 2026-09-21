import { getAvailableSlots } from './bookingService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { property_id, date, service_id } = req.query || {};

  if (!property_id || !date) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required query parameters: property_id, date' 
    });
  }

  try {
    const slots = await getAvailableSlots(
      String(property_id), 
      String(date), 
      String(service_id || 'svc-private-viewing')
    );
    return res.status(200).json({ success: true, slots, date, property_id });
  } catch (error: any) {
    console.error('[API /availability] error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to load availability' });
  }
}
