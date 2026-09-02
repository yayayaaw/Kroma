import React, { useState } from 'react';
import { ArrowUp, Instagram, MessageSquare, ShieldCheck, FileText } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const { data } = useCmsData();
  const { branding, location, footer, legal } = data;

  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms';
  }>({
    isOpen: false,
    type: 'privacy',
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegal = (type: 'privacy' | 'terms') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegal = () => {
    setLegalModal((prev) => ({ ...prev, isOpen: false }));
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

        {/* Bottom Credits, Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#737373] gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {new Date().getFullYear()} {branding.fullName}. {footer.copyrightText}
            </span>
            <span className="text-[#333336] hidden sm:inline">•</span>
            {/* Minimalist Legal Links */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                id="footer-link-privacy"
                onClick={() => openLegal('privacy')}
                className="hover:text-[#FBFBF9] transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center space-x-1"
              >
                <ShieldCheck className="w-3 h-3 text-[#52525B]" />
                <span>Privacy Policy</span>
              </button>
              <span className="text-[#333336]">•</span>
              <button
                type="button"
                id="footer-link-terms"
                onClick={() => openLegal('terms')}
                className="hover:text-[#FBFBF9] transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center space-x-1"
              >
                <FileText className="w-3 h-3 text-[#52525B]" />
                <span>Terms of Service</span>
              </button>
            </div>
          </div>
          <div className="font-light tracking-wide">
            {footer.designCredit}
          </div>
        </div>
      </div>

      {/* Clean & Solid Legal Modal Overlay */}
      <LegalModal
        isOpen={legalModal.isOpen}
        activeTab={legalModal.type}
        onClose={closeLegal}
        legal={legal}
        brandingName={branding.name}
      />
    </footer>
  );
};
