import React from 'react';
import { ArrowUp, Instagram, MessageSquare } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';

export const Footer: React.FC = () => {
  const { data } = useCmsData();
  const { branding, location, footer } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${location.whatsappRaw}?text=${encodeURIComponent(
    `Halo ${branding.fullName}, saya ingin informasi lebih lanjut.`
  )}`;

  return (
    <footer id="footer" className="bg-[#0D0D0E] text-[#FBFBF9] pt-20 pb-12 border-t border-[#222225]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 border-b border-[#222225]">
          {/* Brand & Address */}
          <div className="space-y-4 max-w-sm">
            <div>
              <span className="font-serif-display text-3xl tracking-[0.16em] block">
                {branding.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#737373] block mt-1">
                {branding.tagline}
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
              {location.address}
            </p>
          </div>

          {/* Socials & Quick Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-14">
            <div className="flex items-center space-x-6 text-xs tracking-wider text-[#A1A1AA]">
              <a
                href={location.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram"
                className="hover:text-[#FBFBF9] transition-colors flex items-center space-x-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp"
                className="hover:text-[#FBFBF9] transition-colors flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Back to Top */}
            <button
              type="button"
              id="btn-back-to-top"
              onClick={scrollToTop}
              className="cursor-pointer group flex items-center space-x-2 text-xs tracking-widest uppercase text-[#737373] hover:text-[#FBFBF9] transition-colors"
            >
              <span>Kembali ke Atas</span>
              <div className="p-2 rounded-full border border-[#222225] group-hover:border-[#FBFBF9] transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#737373] gap-4">
          <div>
            © {new Date().getFullYear()} {branding.fullName}. {footer.copyrightText}
          </div>
          <div className="font-light tracking-wide">
            {footer.designCredit}
          </div>
        </div>
      </div>
    </footer>
  );
};
