import React, { useState } from 'react';
import { useCmsData } from '../data/cmsStore';
import { CmsSidebar, CmsTabKey } from '../components/CmsSidebar';
import { CmsHeader } from '../components/CmsHeader';
import { CmsDashboard } from './CmsDashboard';
import { CmsBranding } from './CmsBranding';
import { CmsHero } from './CmsHero';
import { CmsAbout } from './CmsAbout';
import { CmsMenu } from './CmsMenu';
import { CmsGallery } from './CmsGallery';
import { CmsReviewsPage } from './CmsReviewsPage';
import { CmsAnalyticsPage } from './CmsAnalyticsPage';
import { CmsExperience } from './CmsExperience';
import { CmsLocation } from './CmsLocation';
import { CmsSocialFooter } from './CmsSocialFooter';
import { CmsThemePage } from './CmsThemePage';
import { CmsSettings } from './CmsSettings';
import { X } from 'lucide-react';

interface CmsAppProps {
  onNavigateToPublic: () => void;
}

export const CmsApp: React.FC<CmsAppProps> = ({ onNavigateToPublic }) => {
  const { data, updateSection, resetData } = useCmsData();
  const [activeTab, setActiveTab] = useState<CmsTabKey>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTabTitle = (tab: CmsTabKey): { title: string; subtitle: string } => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard Manajemen',
          subtitle: 'Ringkasan performa dan kontrol terpadu konten website KROMA.',
        };
      case 'branding':
        return {
          title: 'Branding & Identitas',
          subtitle: 'Nama cafe, sub-tagline, dan logo kustom.',
        };
      case 'hero':
        return {
          title: 'Hero Section',
          subtitle: 'Pintu gerbang visual dan kalimat pembuka utama.',
        };
      case 'about':
        return {
          title: 'Tentang Kami',
          subtitle: 'Filosofi racikan kopi, arsitektur ruang, dan kurasi bahan.',
        };
      case 'menu':
        return {
          title: 'Katalog Menu & Harga',
          subtitle: 'Kelola sajian kopi artisanal, pastry, brunch, dan deskripsi rasa.',
        };
      case 'gallery':
        return {
          title: 'Galeri Foto Visual',
          subtitle: 'Dokumentasi estetika sudut interior, barista bar, dan suasana cafe.',
        };
      case 'reviews':
        return {
          title: 'Ulasan Pelanggan',
          subtitle: 'Testimoni tamu, evaluasi kepuasan, dan ulasan publik.',
        };
      case 'analytics':
        return {
          title: 'Visitor Analytics & Data',
          subtitle: 'Laporan arus kunjungan pengunjung, perangkat, dan tren minat menu.',
        };
      case 'experience':
        return {
          title: 'Pilar Keunggulan',
          subtitle: 'Nilai dan komitmen kualitas layanan KROMA kepada pengunjung.',
        };
      case 'location':
        return {
          title: 'Lokasi & Jam Operasional',
          subtitle: 'Alamat fisik, jam buka, Google Maps, dan nomor kontak resmi.',
        };
      case 'social-footer':
        return {
          title: 'Media Sosial & Footer',
          subtitle: 'Akun Instagram, WhatsApp, dan opsi reservasi.',
        };
      case 'theme':
        return {
          title: 'Tema & Warna Website',
          subtitle: 'Kustomisasi palet warna dan 6 preset tema elegan.',
        };
      case 'settings':
        return {
          title: 'Pengaturan & Backup Data',
          subtitle: 'Penyimpanan lokal, unduh arsip JSON, dan reset pabrik.',
        };
    }
  };

  const { title, subtitle } = getTabTitle(activeTab);

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex font-sans text-[#141416]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <CmsSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          cafeName={data.branding.name}
          onNavigateToPublic={onNavigateToPublic}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 bg-[#141416] flex flex-col justify-between h-full shadow-2xl">
            <div className="flex-1 overflow-y-auto">
              <CmsSidebar
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                cafeName={data.branding.name}
                onNavigateToPublic={onNavigateToPublic}
                onCloseMobileDrawer={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <CmsHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onNavigateToPublic={onNavigateToPublic}
        />

        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <CmsDashboard
              data={data}
              onSelectTab={setActiveTab}
              onNavigateToPublic={onNavigateToPublic}
            />
          )}

          {activeTab === 'branding' && (
            <CmsBranding
              initialData={data.branding}
              onSave={(updated) => updateSection('branding', updated)}
            />
          )}

          {activeTab === 'hero' && (
            <CmsHero
              initialData={data.hero}
              onSave={(updated) => updateSection('hero', updated)}
            />
          )}

          {activeTab === 'about' && (
            <CmsAbout
              initialData={data.about}
              onSave={(updated) => updateSection('about', updated)}
            />
          )}

          {activeTab === 'menu' && (
            <CmsMenu
              initialData={data.menu}
              onSave={(updated) => updateSection('menu', updated)}
            />
          )}

          {activeTab === 'gallery' && (
            <CmsGallery
              initialData={data.gallery}
              onSave={(updated) => updateSection('gallery', updated)}
            />
          )}

          {activeTab === 'reviews' && (
            <CmsReviewsPage />
          )}

          {activeTab === 'analytics' && (
            <CmsAnalyticsPage />
          )}

          {activeTab === 'experience' && (
            <CmsExperience
              initialData={data.experience}
              onSave={(updated) => updateSection('experience', updated)}
            />
          )}

          {activeTab === 'location' && (
            <CmsLocation
              initialData={data.location}
              onSave={(updated) => updateSection('location', updated)}
            />
          )}

          {activeTab === 'social-footer' && (
            <CmsSocialFooter
              initialLocation={data.location}
              initialReservation={data.reservation}
              initialFooter={data.footer}
              onSave={({ location, reservation, footer }) => {
                updateSection('location', location);
                updateSection('reservation', reservation);
                updateSection('footer', footer);
              }}
            />
          )}

          {activeTab === 'theme' && (
            <CmsThemePage />
          )}

          {activeTab === 'settings' && (
            <CmsSettings data={data} onRefreshData={resetData} />
          )}
        </main>
      </div>
    </div>
  );
};
