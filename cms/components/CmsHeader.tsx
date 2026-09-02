import React from 'react';
import { Menu, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface CmsHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  onNavigateToPublic: () => void;
}

export const CmsHeader: React.FC<CmsHeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
  onNavigateToPublic,
}) => {
  return (
    <header className="bg-[#FBFBF9] border-b border-[#E5E2DC] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-[#141416] hover:bg-[#EFECE6] cursor-pointer"
          aria-label="Buka Menu CMS"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#141416] font-normal leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#737373] mt-1 font-light tracking-wide">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Real-time sync badge */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F4F0] border border-[#E5E2DC] text-[11px] text-[#4A4A4F]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tersinkronisasi Otomatis</span>
        </div>

        {/* View Public Website */}
        <button
          type="button"
          onClick={onNavigateToPublic}
          className="px-4 py-2 text-xs uppercase tracking-wider font-medium bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
        >
          <span>Website Publik</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
