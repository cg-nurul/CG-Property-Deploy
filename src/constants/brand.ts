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

  // Shades of Primary (from darkest to light ambient wash)
  shadesOfPrimary: {
    base: '#042F61',
    navyMid: '#235894',
    steelBlue: '#588BC7',
    skyGlow: '#A0CAFA',
    iceWash: '#D6E9FF',
  },

  // Shades of Accent (from radiant gold to deep espresso bronze)
  shadesOfAccent: {
    radiantGold: '#DFB85A',
    richGold: '#BA994A',
    antiqueBronze: '#91773A',
    deepOchre: '#69562A',
    espressoBronze: '#40341A',
  },

  // Analogous of Primary (harmonic hues bordering navy for depth & rich atmosphere)
  analogousOfPrimary: {
    midnight: '#042861',
    oceanTeal: '#044561',
    abyssalIndigo: '#040A61',
    pineTeal: '#04615F',
    royalViolet: '#1C0461',
  },

  // Analogous of Accent (harmonic warm gold, citrine, amber, and terracotta tones)
  analogousOfAccent: {
    champagneGold: '#DFB85A',
    amberTopaz: '#DEA659',
    citrine: '#DEC659',
    terracotta: '#DE8E59',
    warmBrass: '#DED659',
  },

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
   * Custom architectural footer graphic SVG URL
   */
  footerGraphicSvg: 'https://storage.googleapis.com/chelsongordon/CG%20Property/assets/CG%20Property%20Footer%20Graphic.svg',

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
