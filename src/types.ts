export type Language = 'en' | 'zh' | 'th';

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  district: string;
  city: string;
  country: string;
  tower: string;
  floor: string;
  sizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  type: string;
  // Internal room number (kept internal, not prominently advertised on public views)
  roomNumberInternal: string;
  // Primary hero photo
  coverImage: string;
  // High quality gallery photos (architectural, living, dining, bedroom, view)
  gallery: {
    url: string;
    caption: {
      en: string;
      zh: string;
      th: string;
    };
    category?: 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'details';
  }[];
  // Airbnb direct link (configurable)
  airbnbUrl: string;
  // Localized descriptions & highlights based purely on factual data
  tagline: {
    en: string;
    zh: string;
    th: string;
  };
  overview: {
    en: string;
    zh: string;
    th: string;
  };
}

export interface Destination {
  id: string;
  slug: string;
  name: {
    en: string;
    zh: string;
    th: string;
  };
  country: {
    en: string;
    zh: string;
    th: string;
  };
  description: {
    en: string;
    zh: string;
    th: string;
  };
  heroImage: string;
  propertyCount: number;
}

export type PageRoute = 
  | '/'
  | '/properties'
  | '/properties/residence-01'
  | '/properties/residence-02'
  | '/properties/quintara'
  | '/destinations'
  | '/destinations/thailand'
  | '/destinations/thailand/bangkok'
  | '/destinations/hong-kong'
  | '/about'
  | '/contact'
  | '/privacy'
  | '/terms';

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  enquiryType: 'property' | 'booking' | 'general' | 'partnership';
  propertyInterest?: string;
  message: string;
}

export interface BrandConfig {
  brandName: string;
  primaryLocation: string;
  contactEmail: string;
  contactPhone: string;
  addressNotice: string;
  airbnbGeneralUrl: string;
}

// ==========================================
// Booking System Types (Section 1 & 4 Specs)
// ==========================================

export interface BookingService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  active: boolean;
}

export interface BookingAvailabilityRule {
  id: string;
  property_id?: string;
  day_rules?: string;
  start_time: string;
  end_time: string;
  active: boolean;
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
export type BookingEmailStatus = 'sent' | 'failed' | 'pending';

export interface BookingRecord {
  id: string;
  booking_reference: string;
  property_id: string;
  property_name: string;
  service_id: string;
  service_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_whatsapp: string;
  booking_date: string;   // Check-in date: YYYY-MM-DD
  start_time: string;     // Check-in time: e.g. "02:00 PM"
  end_time: string;       // e.g. "02:45 PM" or Check-out time
  checkout_date?: string; // Check-out date: YYYY-MM-DD
  checkout_time?: string; // Check-out time: e.g. "12:00 PM"
  duration: number;       // in minutes or hours
  status: BookingStatus;
  notes?: string;
  email_status?: BookingEmailStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingPayload {
  property_id: string;
  property_name: string;
  service_id: string;
  service_name?: string;
  booking_date: string;   // Check-in date: YYYY-MM-DD
  start_time: string;     // Check-in time: e.g. "02:00 PM"
  checkout_date?: string; // Check-out date: YYYY-MM-DD
  checkout_time?: string; // Check-out time: e.g. "12:00 PM"
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_whatsapp: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  booking?: BookingRecord;
  error?: string;
  notificationStatus?: BookingEmailStatus;
}
