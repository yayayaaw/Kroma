import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Image as ImageIcon,
  BookOpen,
  Coffee,
  Images,
  MessageSquare,
  BarChart3,
  Award,
  MapPin,
  Share2,
  Palette,
  Settings,
  ArrowUpRight,
  ExternalLink,
  X,
} from 'lucide-react';

export type CmsTabKey =
  | 'dashboard'
  | 'branding'
  | 'hero'
  | 'about'
  | 'menu'
  | 'gallery'
  | 'reviews'
  | 'analytics'
  | 'experience'
  | 'location'
  | 'social-footer'
  | 'theme'
  | 'settings';

interface CmsSidebarProps {
  activeTab: CmsTabKey;
  onSelectTab: (tab: CmsTabKey) => void;
  cafeName: string;
  onNavigateToPublic: () => void;
  onCloseMobileDrawer?: () => void;
}

export const CmsSidebar: React.FC<CmsSidebarProps> = ({
  activeTab,
  onSelectTab,
  cafeName,
  onNavigateToPublic,
  onCloseMobileDrawer,
}) => {
  const menuItems: { key: CmsTabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'branding', label: 'Branding', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'hero', label: 'Hero', icon: <ImageIcon className="w-4 h-4" /> },
    { key: 'about', label: 'Tentang Kami', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'menu', label: 'Menu', icon: <Coffee className="w-4 h-4" /> },
    { key: 'gallery', label: 'Galeri', icon: <Images className="w-4 h-4" /> },
    { key: 'reviews', label: 'Ulasan', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'experience', label: 'Keunggulan', icon: <Award className="w-4 h-4" /> },
    { key: 'location', label: 'Lokasi & Kontak', icon: <MapPin className="w-4 h-4" /> },
    { key: 'social-footer', label: 'Media Sosial', icon: <Share2 className="w-4 h-4" /> },
    { key: 'theme', label: 'Tema & Warna', icon: <Palette className="w-4 h-4" /> },
    { key: 'settings', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleItemClick = (key: CmsTabKey) => {
    onSelectTab(key);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  return (
    <aside className="w-64 bg-[#141416] text-[#FBFBF9] flex flex-col justify-between border-r border-[#27272A] shrink-0 h-full min-h-screen">
      <div className="overflow-y-auto">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-serif-display text-2xl tracking-[0.16em] text-[#FBFBF9]">
                {cafeName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 bg-[#27272A] text-[#D4D2CB] font-mono">
                CMS Studio
              </span>
              <span className="text-[10px] text-[#737373]">v1.2</span>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          {onCloseMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              aria-label="Tutup Menu Admin"
              className="md:hidden p-2 text-[#A1A1AA] hover:text-[#FBFBF9] bg-[#1E1E22] rounded-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item.key)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs tracking-wider transition-all duration-150 cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#FBFBF9] text-[#141416] font-semibold shadow-xs'
                    : 'text-[#A1A1AA] hover:text-[#FBFBF9] hover:bg-[#1E1E22]'
                }`}
              >
                <span className={isActive ? 'text-[#141416]' : 'text-[#737373]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action: Return to Public Site */}
      <div className="p-4 border-t border-[#27272A] space-y-2 shrink-0">
        <button
          type="button"
          onClick={onNavigateToPublic}
          className="w-full py-2.5 px-3 text-xs tracking-wider uppercase font-medium bg-[#1E1E22] text-[#FBFBF9] hover:bg-[#27272A] border border-[#27272A] transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>Lihat Website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 text-[11px] tracking-wider text-[#737373] hover:text-[#A1A1AA] transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>Buka di Tab Baru</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
