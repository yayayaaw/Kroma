import React from 'react';
import { CafeFullData } from '../types/cmsTypes';
import { CmsTabKey } from '../components/CmsSidebar';
import {
  Sparkles,
  Coffee,
  Images,
  Award,
  ArrowRight,
  ExternalLink,
  Clock,
  MapPin,
  Smartphone,
  MessageSquare,
  BarChart3,
  Palette,
} from 'lucide-react';

interface CmsDashboardProps {
  data: CafeFullData;
  onSelectTab: (tab: CmsTabKey) => void;
  onNavigateToPublic: () => void;
}

export const CmsDashboard: React.FC<CmsDashboardProps> = ({
  data,
  onSelectTab,
  onNavigateToPublic,
}) => {
  const reviewsCount = data.reviews?.items?.length || 0;
  const quickStats = [
    {
      label: 'Menu Signature',
      count: data.menu.items.length,
      detail: `${data.menu.categories.length - 1} Kategori`,
      tab: 'menu' as CmsTabKey,
      icon: <Coffee className="w-5 h-5 text-[#141416]" />,
    },
    {
      label: 'Ulasan Tamu',
      count: reviewsCount,
      detail: '4.9 Rata-rata Skor',
      tab: 'reviews' as CmsTabKey,
      icon: <MessageSquare className="w-5 h-5 text-[#141416]" />,
    },
    {
      label: 'Foto Galeri',
      count: data.gallery.items.length,
      detail: 'Arsitektur & Suasana',
      tab: 'gallery' as CmsTabKey,
      icon: <Images className="w-5 h-5 text-[#141416]" />,
    },
    {
      label: 'Pengunjung Online',
      count: '2.450+',
      detail: 'Tracking Real-time',
      tab: 'analytics' as CmsTabKey,
      icon: <BarChart3 className="w-5 h-5 text-[#141416]" />,
    },
  ];

  const quickSections = [
    {
      title: 'Ulasan Pelanggan',
      description: 'Tinjau testimoni tamu, rating bintang kepuasan, dan moderasi ulasan.',
      tab: 'reviews' as CmsTabKey,
      icon: <MessageSquare className="w-4 h-4 text-[#737373]" />,
    },
    {
      title: 'Statistik & Analytics',
      description: 'Lihat jumlah pengunjung harian, total page views, dan section paling populer.',
      tab: 'analytics' as CmsTabKey,
      icon: <BarChart3 className="w-4 h-4 text-[#737373]" />,
    },
    {
      title: 'Tema & Warna Website',
      description: 'Pilih dari 6 preset warna elegan (Monochrome, Warm Cream, Coffee Earth, dll.).',
      tab: 'theme' as CmsTabKey,
      icon: <Palette className="w-4 h-4 text-[#737373]" />,
    },
    {
      title: 'Daftar Menu & Harga',
      description: 'Tambah minuman baru, ubah harga, upload foto sajian, dan edit deskripsi rasa.',
      tab: 'menu' as CmsTabKey,
      icon: <Coffee className="w-4 h-4 text-[#737373]" />,
    },
    {
      title: 'Dokumentasi Galeri',
      description: 'Kelola foto interior, barista slow-bar, dan suasana pengunjung.',
      tab: 'gallery' as CmsTabKey,
      icon: <Images className="w-4 h-4 text-[#737373]" />,
    },
    {
      title: 'Lokasi, Jam & WhatsApp',
      description: 'Perbarui alamat, tautan Google Maps, jam operasional, dan nomor WhatsApp.',
      tab: 'location' as CmsTabKey,
      icon: <MapPin className="w-4 h-4 text-[#737373]" />,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Welcome Hero Banner */}
      <div className="bg-[#141416] text-[#FBFBF9] p-8 sm:p-10 border border-[#27272A] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4D2CB] font-mono block">
            Selamat Datang di Portal Manajemen
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#FBFBF9] font-normal leading-tight">
            Kelola Konten {data.branding.fullName} dengan Mudah.
          </h2>
          <p className="text-xs sm:text-sm text-[#D4D2CB]/90 font-light leading-relaxed">
            Semua perubahan teks, foto, daftar menu, galeri, dan kontak yang Anda simpan di CMS ini
            akan langsung diperbarui dan terlihat secara instan pada website publik tanpa perlu
            menulis kode.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToPublic}
              className="px-5 py-2.5 bg-[#FBFBF9] text-[#141416] text-xs uppercase tracking-wider font-medium hover:bg-[#E5E2DC] transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>Lihat Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('menu')}
              className="px-5 py-2.5 bg-transparent border border-[#FBFBF9]/30 text-[#FBFBF9] text-xs uppercase tracking-wider font-medium hover:bg-[#FBFBF9]/10 transition-colors cursor-pointer"
            >
              Kelola Menu Cafe
            </button>
          </div>
        </div>

        {/* Subtle decorative background detail */}
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-[#27272A]/30 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((st) => (
          <div
            key={st.label}
            onClick={() => onSelectTab(st.tab)}
            className="p-5 bg-[#FBFBF9] border border-[#E5E2DC] hover:border-[#141416] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#737373]">{st.label}</span>
              <div className="p-2 bg-[#F5F4F0]">{st.icon}</div>
            </div>
            <div>
              <div className="font-serif-display text-3xl font-normal text-[#141416]">
                {st.count}
              </div>
              <div className="text-[11px] text-[#737373] mt-1 flex items-center justify-between">
                <span>{st.detail}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Menu Cards */}
      <div className="space-y-4">
        <h3 className="font-serif-display text-xl text-[#141416] font-normal">
          Menu Pengaturan Konten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickSections.map((sec) => (
            <button
              key={sec.title}
              type="button"
              onClick={() => onSelectTab(sec.tab)}
              className="text-left p-5 bg-[#FBFBF9] border border-[#E5E2DC] hover:border-[#141416] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center space-x-2 mb-2 text-[#737373] group-hover:text-[#141416] transition-colors">
                  {sec.icon}
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
                    {sec.title}
                  </h4>
                </div>
                <p className="text-xs text-[#737373] font-light leading-relaxed">
                  {sec.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFECE6] flex items-center justify-between text-[11px] text-[#141416] font-medium">
                <span>Buka Pengaturan</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Realtime Guide Note */}
      <div className="p-5 bg-[#F5F4F0] border border-[#E5E2DC] text-xs text-[#4A4A4F] leading-relaxed space-y-2">
        <div className="font-medium text-[#141416] uppercase tracking-wider text-[11px]">
          Panduan Penggunaan
        </div>
        <p>
          1. <strong>Tanpa Perlu Coding</strong>: Cukup ubah teks atau pilih gambar pada masing-masing formulir, lalu klik tombol Simpan.
        </p>
        <p>
          2. <strong>Upload Gambar Cepat</strong>: Anda dapat langsung memilih file gambar dari komputer atau handphone Anda, atau menempelkan tautan link gambar web.
        </p>
        <p>
          3. <strong>Privasi Halaman CMS</strong>: Halaman CMS ini tidak menampilkan tautan publik apa pun pada landing page utama agar tampilan cafe Anda tetap rapi, profesional, dan eksklusif.
        </p>
      </div>
    </div>
  );
};
