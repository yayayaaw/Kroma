import { CafeFullData } from '../types/cmsTypes';

export const INITIAL_CAFE_DATA: CafeFullData = {
  branding: {
    name: 'KROMA',
    tagline: 'Coffee Atelier',
    fullName: 'KROMA Coffee Atelier',
    logoUrl: '',
    faviconUrl: '',
    establishedYear: '2021',
  },
  hero: {
    sublabel: 'Artisanal Coffee & Architecture',
    headlinePart1: 'More Than Coffee,',
    headlinePart2: 'A Place To Stay.',
    subheadline:
      'Sebuah ruang temu intim di mana racikan kopi artisanal berpadu dengan ketenangan arsitektur minimalis dan kenyamanan yang hangat.',
    btn1Text: 'Lihat Menu',
    btn1Link: '#menu',
    btn2Text: 'Reservasi Sekarang',
    btn2Link: '#reservasi',
    bgImage:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85',
    bottomBarText: 'Micro-Roastery • Slow Bar Experience • Artisanal Bakery',
    openHoursLabel: '08.00 — 22.00 WIB',
    locationLabel: 'Senopati, Jakarta Selatan',
  },
  about: {
    label: 'Tentang Kami',
    title: 'Ruang Hening untuk Menikmati Setiap Tetes Rasa.',
    paragraph1:
      'Lahir dari kecintaan mendalam pada budaya kopi artisanal, KROMA Coffee Atelier dirancang sebagai oase ketenangan di tengah laju kota metropolitan yang serba cepat.',
    paragraph2:
      'Kami menggabungkan prinsip estetika arsitektur minimalis dengan pendekatan sains dalam setiap proses penyeduhan. Tidak ada ornamen yang berlebihan — hanya material alami, pencahayaan matahari yang lembut, dan aroma biji kopi pilihan yang baru saja disangrai.',
    paragraph3:
      'Di sini, setiap cangkir kopi bukan sekadar minuman penahan kantuk, melainkan sebuah pengalaman indrawi dan undangan untuk sejenak melambat, bernapas, dan merasa betah.',
    photo:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85',
    photoCaption: 'The Main Hall & Slow Bar',
    photoLocation: 'Jakarta Selatan',
    stats: [
      { id: 'stat-1', number: '100%', label: 'Specialty Arabica' },
      { id: 'stat-2', number: '85+', label: 'SCA Cup Score' },
      { id: 'stat-3', number: 'Est. 21', label: 'Artisanal Craft' },
    ],
  },
  menu: {
    sectionLabel: 'Pilihan Barista',
    sectionTitle: 'Signature Menu',
    footnote: '*Tersedia pilihan susu oat alternatif (Oatly) dan biji kopi decaf atas permintaan Anda.',
    taxNote: 'Harga sudah termasuk pajak & servis',
    categories: [
      { key: 'all', label: 'Semua Signature' },
      { key: 'coffee', label: 'Kopi Artisanal' },
      { key: 'non-coffee', label: 'Botanical' },
      { key: 'pastry', label: 'Pastry' },
      { key: 'brunch', label: 'Brunch' },
    ],
    items: [
      {
        id: 'kroma-cold-brew',
        name: 'KROMA Cold Brew Reserve',
        category: 'coffee',
        description:
          'Biji kopi single-origin diseduh dingin selama 18 jam dengan sentuhan aroma apricot kering dan dark cocoa.',
        price: 'Rp 45.000',
        image:
          'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
        notes: 'Steeped 18 Jam • Single Origin',
        isSignature: true,
      },
      {
        id: 'velvet-flat-white',
        name: 'Velvet Flat White',
        category: 'coffee',
        description:
          'Double ristretto dipadukan dengan micro-textured fresh milk, menghasilkan tekstur selembut sutra dengan balance rasa cokelat kacang.',
        price: 'Rp 42.000',
        image:
          'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80',
        notes: 'House Blend • Silky Microfoam',
        isSignature: true,
      },
      {
        id: 'geisha-v60',
        name: 'Geisha Pour-Over V60',
        category: 'coffee',
        description:
          'Hand-brew presisi dari varietas Geisha pilihan. Profil rasa jernih dengan floral jasmine, bergamot segar, dan aftertaste madu liar.',
        price: 'Rp 65.000',
        image:
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
        notes: 'Artisanal Hand-Pour • Floral Notes',
        isSignature: true,
      },
      {
        id: 'noir-charcoal-latte',
        name: 'Noir Charcoal Botanical Latte',
        category: 'non-coffee',
        description:
          'Kombinasi activated bamboo charcoal alami, ekstrak vanilla Madagascar, dan susu gandum lembut tanpa kafein.',
        price: 'Rp 48.000',
        image:
          'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1000&q=80',
        notes: 'Signature Botanical • Caffeine Free',
        isSignature: true,
      },
      {
        id: 'almond-butter-croissant',
        name: 'Twice-Baked Almond Croissant',
        category: 'pastry',
        description:
          'Pastry mentega murni berlapis renyah dipanggang dua kali dengan isian almond frangipane manis gurih dan taburan irisan almond panggang.',
        price: 'Rp 38.000',
        image:
          'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
        notes: 'Freshly Baked Daily • French Butter',
        isSignature: true,
      },
      {
        id: 'wild-mushroom-brioche',
        name: 'Wild Mushroom Brioche Toast',
        category: 'brunch',
        description:
          'Roti brioche mentega panggang lembut, tumisan jamur portobello & champignon berbumbu thyme, organic poached egg, dan parmigiano reggiano.',
        price: 'Rp 62.000',
        image:
          'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
        notes: 'Savory Artisanal • Organic Eggs',
        isSignature: true,
      },
    ],
  },
  gallery: {
    sectionLabel: 'Dokumentasi Visual',
    sectionTitle: 'Sudut Ruang & Atmosfer',
    sectionDescription:
      'Menyelami detail arsitektur, kesibukan barista di balik meja slow bar, hingga ketenangan yang dihadirkan bagi setiap pengunjung.',
    items: [
      {
        id: 'interior-main',
        title: 'Main Hall Architecture',
        category: 'Interior Cafe',
        image:
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        aspect: 'landscape',
        caption: 'Tata ruang terbuka dengan pencahayaan alami dan material kayu oak hangat.',
      },
      {
        id: 'coffee-extraction',
        title: 'Precision Espresso',
        category: 'Minuman',
        image:
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
        aspect: 'portrait',
        caption: 'Ekstraksi manual pour-over dengan parameter suhu dan rasio terkontrol.',
      },
      {
        id: 'patrons-gathering',
        title: 'Serene Afternoon',
        category: 'Suasana Pelanggan',
        image:
          'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1000&q=80',
        aspect: 'square',
        caption: 'Momen hening untuk membaca buku, bekerja fokus, atau berbincang santai.',
      },
      {
        id: 'pastry-craft',
        title: 'Morning Bake Craft',
        category: 'Makanan',
        image:
          'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
        aspect: 'portrait',
        caption: 'Pastry artisanal yang dipanggang segar setiap pagi langsung di dapur kami.',
      },
      {
        id: 'detail-ceramic',
        title: 'Tactile Materials & Design',
        category: 'Detail Desain',
        image:
          'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
        aspect: 'landscape',
        caption: 'Set cangkir keramik handmade dan tekstur batu alam pada meja bar.',
      },
      {
        id: 'coffee-ritual',
        title: 'Specialty Beans Selection',
        category: 'Detail Desain',
        image:
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
        aspect: 'square',
        caption: 'Kurasi biji kopi mikro-lot dari perkebunan dataran tinggi Nusantara.',
      },
    ],
  },
  experience: {
    sectionLabel: 'Nilai & Komitmen',
    sectionTitle: 'Diciptakan dengan Perhatian pada Setiap Detail.',
    items: [
      {
        id: 'exp-1',
        number: '01',
        title: 'Quality Coffee',
        subtitle: 'Kurasi Biji Terbaik',
        description:
          'Kami hanya menggunakan 100% biji kopi specialty Arabika dengan skor cupping di atas 85, disangrai dalam batch kecil untuk mempertahankan karakter rasa aslinya.',
        iconType: 'coffee',
      },
      {
        id: 'exp-2',
        number: '02',
        title: 'Comfortable Space',
        subtitle: 'Kenyamanan Akustik & Visual',
        description:
          'Dirancang dengan proporsi ruang lapang, pencahayaan alami yang lembut, serta penataan suara tenang tanpa polusi audio demi kenyamanan Anda.',
        iconType: 'compass',
      },
      {
        id: 'exp-3',
        number: '03',
        title: 'Freshly Made Food',
        subtitle: 'Bahan Alami & Higienis',
        description:
          'Setiap menu pendamping dibuat fresh harian dari dapur pastry kami menggunakan butter Perancis berkualitas tinggi dan bahan pangan organik lokal.',
        iconType: 'utensils',
      },
      {
        id: 'exp-4',
        number: '04',
        title: 'Perfect Place to Gather',
        subtitle: 'Ruang Temu yang Hangat',
        description:
          'Dari pertemuan bisnis santai hingga waktu sendiri bersama secangkir kopi favorit, kami menyediakan ruang yang menghargai setiap detik waktu Anda.',
        iconType: 'users',
      },
    ],
  },
  location: {
    sectionLabel: 'Kunjungi Kami',
    sectionTitle: 'Lokasi & Kontak',
    address: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190',
    shortAddress: 'Senopati, Jakarta Selatan',
    areaCity: 'Jakarta Selatan',
    weekdayHours: 'Senin — Jumat: 08.00 — 22.00 WIB',
    weekendHours: 'Sabtu — Minggu: 07.30 — 23.00 WIB',
    phone: '+62 812-8890-4200',
    whatsappRaw: '6281288904200',
    instagram: '@kroma.atelier',
    instagramUrl: 'https://instagram.com',
    mapsUrl: 'https://maps.google.com/?q=Senopati+Jakarta+Selatan',
    transitNote: '5 menit berkendara dari Stasiun MRT Senayan & MRT Istora Mandiri.',
    parkingNote: 'Tersedia area parkir privat luas di bagian belakang dan layanan valet gratis.',
  },
  reservation: {
    buttonText: 'Reservasi Meja',
    modalTitle: 'Pesan Meja Anda',
    modalDescription:
      'Silakan lengkapi detail kunjungan. Kami akan mengonfirmasi via WhatsApp resmi dalam 15 menit.',
    areas: ['Indoor (Non-Smoking)', 'Slow Bar Counter', 'Semi-Outdoor Veranda'],
    timeSlots: [
      '09:00 WIB (Pagi)',
      '11:00 WIB (Siang)',
      '14:00 WIB (Sore)',
      '16:30 WIB (Senja)',
      '19:00 WIB (Malam)',
      '20:30 WIB (Malam)',
    ],
    guestOptions: [
      '1 Tamu (Solo Slow Bar)',
      '2 Tamu',
      '3 - 4 Tamu',
      '5 - 6 Tamu',
      '7+ Tamu (Private Event)',
    ],
  },
  footer: {
    name: 'KROMA',
    tagline: 'Coffee Atelier',
    address: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190',
    instagramUrl: 'https://instagram.com',
    whatsappUrl: 'https://wa.me/6281288904200',
    copyrightText: 'All Rights Reserved.',
    designCredit: 'Designed with architectural precision & editorial simplicity.',
  },
  reviews: {
    sectionLabel: 'Apa Kata Mereka',
    sectionTitle: 'Ulasan & Pengalaman Tamu',
    sectionSubtitle:
      'Refleksi kejujuran dari para penikmat kopi, praktisi kreatif, dan tamu setia yang telah meluangkan waktu di KROMA.',
    items: [
      {
        id: 'rev-1',
        name: 'Arga Prasetya',
        roleOrVisit: 'Specialty Coffee Enthusiast',
        rating: 5,
        date: '28 Agustus 2026',
        comment:
          'Salah satu spot pour-over terbaik di kawasan Senopati. Profil rasa Geisha V60 sangat jernih dan diekstraksi dengan parameter rasio suhu yang sangat presisi.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'rev-2',
        name: 'Clara Sasmita',
        roleOrVisit: 'Architect & Designer',
        rating: 5,
        date: '24 Agustus 2026',
        comment:
          'Atmosfer arsitektur ruangannya luar biasa tenang. Tidak ada distorsi visual atau kebisingan mengganggu, sangat ideal untuk fokus menyelesaikan rancangan kreatif.',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'rev-3',
        name: 'Dimas Wicaksono',
        roleOrVisit: 'Culinary Reviewer',
        rating: 5,
        date: '21 Agustus 2026',
        comment:
          'Twice-baked almond croissant-nya sempurna—flaky di luar, lembut di dalam dengan butter Perancis otentik. Velvet Flat White-nya berpadu harmonis.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'rev-4',
        name: 'Natasha Alamsyah',
        roleOrVisit: 'Creative Director',
        rating: 4,
        date: '17 Agustus 2026',
        comment:
          'Pelayanan barista di slow bar sangat edukatif dan hangat. Penjelasan tentang mikro-lot biji kopi disajikan dengan santun tanpa terkesan berjarak.',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'rev-5',
        name: 'Reza Aditya',
        roleOrVisit: 'Pengunjung Rutin',
        rating: 5,
        date: '12 Agustus 2026',
        comment:
          'KROMA Cold Brew Reserve terasa sangat bersih dengan aftertaste manis alami. Estetika minimalis dan kenyamanan duduknya sekelas atelier kopi di Shibuya.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
  theme: {
    mode: 'preset',
    activePresetId: 'monochrome',
  },
  legal: {
    businessLegalName: 'KROMA Coffee Atelier (PT Kroma Kuliner Nusantara)',
    contactEmail: 'legal@kromacafe.id',
    contactPhone: '+62 812-8890-4200',
    lastUpdatedDate: '2 September 2026',
  },
  lastUpdated: new Date().toISOString(),
};
