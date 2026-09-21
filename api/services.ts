import { getServices } from './bookingService.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const services = await getServices();
    return res.status(200).json({ success: true, services });
  } catch (error: any) {
    console.error('[API /services] error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to load services' });
  }
}
