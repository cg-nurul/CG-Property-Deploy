/**
 * CG Property Brand Constants & Design Tokens
 * 
 * Stored reference for brand colors, typography, logos, and UI guidelines.
 */

export const BRAND_COLORS = {
  // Primary brand identity deep navy blue
  primary: '#042F61',
  // Warm golden accent color
  accent: '#DFB85A',
  // Darker rich shade of accent color (for borders, hover states, and contrast)
  accentDark: '#9D7C38',

  // Supporting neutral & structural palette
  navyDark: '#021B38',
  navyLight: '#0A4284',
  backgroundLight: '#FAF8F5',
  backgroundDark: '#0D1013',
  surfaceDark: '#14171A',
  textPrimary: '#14171A',
  textMuted: '#64748B',
  borderLight: '#E2E8F0',
  borderDark: '#2B2E33',
} as const;

export const BRAND_FONTS = {
  /**
   * Editorial font: Libre Bodoni
   * Usage guideline: Only to be used sparingly for styled headings and to emphasize UI highlights.
   * Do NOT use heavily or often.
   */
  editorial: "'Libre Bodoni', Georgia, serif",

  /**
   * Body text font: IBM Plex Sans
   * Usage guideline: Primary font for all reading copy, descriptions, body paragraphs, and general UI text.
   */
  body: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  /**
   * UI button font: IBM Plex Sans
   * Usage guideline: Used across buttons, tabs, interactive pills, form inputs, and navigation links.
   */
  button: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  /**
   * Localized fallback fonts
   */
  thai: "'Noto Sans Thai', 'IBM Plex Sans', sans-serif",
  chinese: "'Noto Sans SC', 'IBM Plex Sans', sans-serif",
} as const;

export const BRAND_ASSETS = {
  /**
   * Primary landscape colored brand logo URL
   */
  logoLandscapeColor: 'https://storage.googleapis.com/chelsongordon/CG%20Property/assets/CG%20Property%20landscape%20color.svg',
  
  /**
   * White variant landscape brand logo URL for dark footers
   */
  logoLandscapeFooterWhite: 'https://storage.googleapis.com/chelsongordon/CG%20Property/assets/CG%20Property%20landscape%20footer.svg',

  /**
   * Brand name
   */
  brandName: 'CG Property',
} as const;

export const BRAND = {
  colors: BRAND_COLORS,
  fonts: BRAND_FONTS,
  assets: BRAND_ASSETS,
} as const;

export default BRAND;
