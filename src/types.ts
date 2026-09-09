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
  | '/destinations'
  | '/destinations/thailand'
  | '/destinations/thailand/bangkok'
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
