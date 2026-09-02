import { MenuItem, GalleryPhoto, ExperienceItem } from '../types';

export const CAFE_INFO = {
  name: 'KROMA',
  tagline: 'Coffee Atelier',
  fullName: 'KROMA Coffee Atelier',
  headline: 'More Than Coffee, A Place To Stay.',
  subheadline:
    'Sebuah ruang temu intim di mana racikan kopi artisanal berpadu dengan ketenangan arsitektur minimalis dan kenyamanan yang hangat.',
  address: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190',
  shortAddress: 'Senopati, Jakarta Selatan',
  operatingHours: {
    weekdays: 'Senin — Jumat: 08.00 — 22.00 WIB',
    weekends: 'Sabtu — Minggu: 07.30 — 23.00 WIB',
  },
  phone: '+62 812-8890-4200',
  whatsappRaw: '6281288904200',
  instagram: '@kroma.atelier',
  instagramUrl: 'https://instagram.com',
  mapsUrl: 'https://maps.google.com/?q=Senopati+Jakarta+Selatan',
  establishedYear: '2021',
};

export const SIGNATURE_MENUS: MenuItem[] = [
  {
    id: 'kroma-cold-brew',
    name: 'KROMA Cold Brew Reserve',
    category: 'coffee',
    description: 'Biji kopi single-origin diseduh dingin selama 18 jam dengan sentuhan aroma apricot kering dan dark cocoa.',
    price: 'Rp 45.000',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
    notes: 'Steeped 18 Jam • Single Origin',
    isSignature: true,
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    category: 'coffee',
    description: 'Double ristretto dipadukan dengan micro-textured fresh milk, menghasilkan tekstur selembut sutra dengan balance rasa cokelat kacang.',
    price: 'Rp 42.000',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80',
    notes: 'House Blend • Silky Microfoam',
    isSignature: true,
  },
  {
    id: 'geisha-v60',
    name: 'Geisha Pour-Over V60',
    category: 'coffee',
    description: 'Hand-brew presisi dari varietas Geisha pilihan. Profil rasa jernih dengan floral jasmine, bergamot segar, dan aftertaste madu liar.',
    price: 'Rp 65.000',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    notes: 'Artisanal Hand-Pour • Floral Notes',
    isSignature: true,
  },
  {
    id: 'noir-charcoal-latte',
    name: 'Noir Charcoal Botanical Latte',
    category: 'non-coffee',
    description: 'Kombinasi activated bamboo charcoal alami, ekstrak vanilla Madagascar, dan susu gandum lembut tanpa kafein.',
    price: 'Rp 48.000',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1000&q=80',
    notes: 'Signature Botanical • Caffeine Free',
    isSignature: true,
  },
  {
    id: 'almond-butter-croissant',
    name: 'Twice-Baked Almond Croissant',
    category: 'pastry',
    description: 'Pastry mentega murni berlapis renyah dipanggang dua kali dengan isian almond frangipane manis gurih dan taburan irisan almond panggang.',
    price: 'Rp 38.000',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
    notes: 'Freshly Baked Daily • French Butter',
    isSignature: true,
  },
  {
    id: 'wild-mushroom-brioche',
    name: 'Wild Mushroom Brioche Toast',
    category: 'brunch',
    description: 'Roti brioche mentega panggang lembut, tumisan jamur portobello & champignon berbumbu thyme, organic poached egg, dan parmigiano reggiano.',
    price: 'Rp 62.000',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
    notes: 'Savory Artisanal • Organic Eggs',
    isSignature: true,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'interior-main',
    title: 'Main Hall Architecture',
    category: 'Interior Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
    caption: 'Tata ruang terbuka dengan pencahayaan alami dan material kayu oak hangat.',
  },
  {
    id: 'coffee-extraction',
    title: 'Precision Espresso',
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    aspect: 'portrait',
    caption: 'Ekstraksi manual pour-over dengan parameter suhu dan rasio terkontrol.',
  },
  {
    id: 'patrons-gathering',
    title: 'Serene Afternoon',
    category: 'Suasana Pelanggan',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
    caption: 'Momen hening untuk membaca buku, bekerja fokus, atau berbincang santai.',
  },
  {
    id: 'pastry-craft',
    title: 'Morning Bake Craft',
    category: 'Makanan',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
    aspect: 'portrait',
    caption: 'Pastry artisanal yang dipanggang segar setiap pagi langsung di dapur kami.',
  },
  {
    id: 'detail-ceramic',
    title: 'Tactile Materials & Design',
    category: 'Detail Desain',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    aspect: 'landscape',
    caption: 'Set cangkir keramik handmade dan tekstur batu alam pada meja bar.',
  },
  {
    id: 'coffee-ritual',
    title: 'Specialty Beans Selection',
    category: 'Detail Desain',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
    aspect: 'square',
    caption: 'Kurasi biji kopi mikro-lot dari perkebunan dataran tinggi Nusantara.',
  },
];

export const EXPERIENCE_VALUES: ExperienceItem[] = [
  {
    id: 'quality-coffee',
    number: '01',
    title: 'Quality Coffee',
    subtitle: 'Kurasi Biji Terbaik',
    description:
      'Kami hanya menggunakan 100% biji kopi specialty Arabika dengan skor cupping di atas 85, disangrai dalam batch kecil untuk mempertahankan karakter rasa aslinya.',
  },
  {
    id: 'comfortable-space',
    number: '02',
    title: 'Comfortable Space',
    subtitle: 'Kenyamanan Akustik & Visual',
    description:
      'Dirancang dengan proporsi ruang lapang, pencahayaan alami yang lembut, serta penataan suara tenang tanpa polusi audio demi kenyamanan Anda.',
  },
  {
    id: 'freshly-made-food',
    number: '03',
    title: 'Freshly Made Food',
    subtitle: 'Bahan Alami & Higienis',
    description:
      'Setiap menu pendamping dibuat fresh harian dari dapur pastry kami menggunakan butter Perancis berkualitas tinggi dan bahan pangan organik lokal.',
  },
  {
    id: 'perfect-gather',
    number: '04',
    title: 'Perfect Place to Gather',
    subtitle: 'Ruang Temu yang Hangat',
    description:
      'Dari pertemuan bisnis santai hingga waktu sendiri bersama secangkir kopi favorit, kami menyediakan ruang yang menghargai setiap detik waktu Anda.',
  },
];
