export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'pastry' | 'brunch';
  description: string;
  price: string;
  image: string;
  notes?: string;
  isSignature?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  caption: string;
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  area: 'Indoor (Non-Smoking)' | 'Slow Bar Counter' | 'Semi-Outdoor Veranda';
  notes: string;
}
