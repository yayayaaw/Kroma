export interface CafeBranding {
  name: string;
  tagline: string;
  fullName: string;
  logoUrl?: string;
  faviconUrl?: string;
  establishedYear: string;
}

export interface CafeHero {
  sublabel: string;
  headlinePart1: string;
  headlinePart2: string;
  subheadline: string;
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  bgImage: string;
  bottomBarText: string;
  openHoursLabel: string;
  locationLabel: string;
}

export interface AboutStat {
  id: string;
  number: string;
  label: string;
}

export interface CafeAbout {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  photo: string;
  photoCaption: string;
  photoLocation: string;
  stats: AboutStat[];
}

export interface MenuItemData {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  notes?: string;
  isSignature?: boolean;
}

export interface MenuCategoryData {
  key: string;
  label: string;
}

export interface CafeMenuConfig {
  sectionLabel: string;
  sectionTitle: string;
  categories: MenuCategoryData[];
  items: MenuItemData[];
  footnote: string;
  taxNote: string;
}

export interface CafeGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export interface CafeGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  items: CafeGalleryItem[];
}

export interface CafeExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'coffee' | 'compass' | 'utensils' | 'users' | 'award' | 'heart' | 'sparkles';
}

export interface CafeExperienceConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: CafeExperienceItem[];
}

export interface CafeLocationContact {
  sectionLabel: string;
  sectionTitle: string;
  address: string;
  shortAddress: string;
  areaCity: string;
  weekdayHours: string;
  weekendHours: string;
  phone: string;
  whatsappRaw: string;
  instagram: string;
  instagramUrl: string;
  mapsUrl: string;
  transitNote: string;
  parkingNote: string;
}

export interface CafeReservationConfig {
  buttonText: string;
  modalTitle: string;
  modalDescription: string;
  areas: string[];
  timeSlots: string[];
  guestOptions: string[];
}

export interface CafeFooterConfig {
  name: string;
  tagline: string;
  address: string;
  instagramUrl: string;
  whatsappUrl: string;
  copyrightText: string;
  designCredit: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number; // 1 - 5
  date: string;
  comment: string;
  roleOrVisit?: string;
}

export interface CafeReviewsConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  items: CustomerReview[];
}

export type ThemePresetId =
  | 'monochrome'
  | 'warm-cream'
  | 'coffee-earth'
  | 'navy-elegant'
  | 'forest-elegant'
  | 'burgundy-classic';

export interface CafeThemeColorPalette {
  id: ThemePresetId;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  bgMain: string;
  bgSurface: string;
  darkSurface: string;
  border: string;
  textMain: string;
  textMuted: string;
}

export interface CafeThemeConfig {
  mode: 'preset' | 'custom';
  activePresetId: ThemePresetId;
  customColors?: {
    primary: string;
    secondary: string;
  };
}

export interface CafeLegalConfig {
  businessLegalName: string;
  contactEmail: string;
  contactPhone: string;
  lastUpdatedDate: string;
}

export interface CafeFullData {
  branding: CafeBranding;
  hero: CafeHero;
  about: CafeAbout;
  menu: CafeMenuConfig;
  gallery: CafeGalleryConfig;
  reviews: CafeReviewsConfig;
  experience: CafeExperienceConfig;
  location: CafeLocationContact;
  reservation: CafeReservationConfig;
  footer: CafeFooterConfig;
  theme: CafeThemeConfig;
  legal?: CafeLegalConfig;
  lastUpdated: string;
}

