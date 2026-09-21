import type { IncomingMessage, ServerResponse } from 'http';
import servicesHandler from './services';
import availabilityHandler from './availability';
import bookingsHandler from './bookings';

export async function handleApiRequest(req: IncomingMessage & { body?: any; query?: any }, res: ServerResponse) {
  const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;
  
  // Parse query
  const query: Record<string, string> = {};
  urlObj.searchParams.forEach((val, key) => {
    query[key] = val;
  });
  req.query = query;

  // Add standard json and status helpers to res
  const wrappedRes = res as any;
  if (!wrappedRes.status) {
    wrappedRes.status = function(code: number) {
      this.statusCode = code;
      return this;
    };
  }
  if (!wrappedRes.json) {
    wrappedRes.json = function(data: any) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }

  // Parse JSON body for POST/PATCH
  if (['POST', 'PATCH', 'PUT'].includes(req.method || '')) {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
    });
    await new Promise<void>(resolve => {
      req.on('end', () => {
        try {
          req.body = bodyData ? JSON.parse(bodyData) : {};
        } catch {
          req.body = {};
        }
        resolve();
      });
    });
  }

  if (pathname === '/api/services') {
    return servicesHandler(req, wrappedRes);
  }
  if (pathname === '/api/availability') {
    return availabilityHandler(req, wrappedRes);
  }
  if (pathname === '/api/bookings') {
    return bookingsHandler(req, wrappedRes);
  }

  wrappedRes.status(404).json({ error: 'Endpoint not found' });
}
