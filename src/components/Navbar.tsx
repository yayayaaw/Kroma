import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';
import { recordSectionClick } from '../../cms/data/analyticsStore';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const { data } = useCmsData();
  const { branding, reservation } = data;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background bleed and scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Tentang Kami', href: '#tentang', id: 'tentang' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Galeri', href: '#galeri', id: 'galeri' },
    { label: 'Ulasan', href: '#ulasan', id: 'ulasan' },
    { label: 'Lokasi', href: '#lokasi', id: 'lokasi' },
  ];

  const handleNavClick = (href: string, sectionId: string) => {
    setMobileMenuOpen(false);
    recordSectionClick(sectionId);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E5E2DC] py-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-6'
        }`}
        style={
          isScrolled
            ? {
                backgroundColor: 'var(--color-bg-main, #FBFBF9)',
                borderColor: 'var(--color-border, #E5E2DC)',
              }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo / Cafe Name */}
          <a
            href="#home"
            id="nav-brand-logo"
            onClick={() => recordSectionClick('home')}
            className="group flex flex-col items-start focus:outline-none"
          >
            {branding.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={branding.name}
                referrerPolicy="no-referrer"
                className="h-8 md:h-9 object-contain"
              />
            ) : (
              <>
                <span
                  className={`font-serif-display text-2xl md:text-3xl font-normal tracking-[0.18em] transition-colors duration-300 ${
                    isScrolled ? 'text-[#141416]' : 'text-[#FBFBF9]'
                  }`}
                  style={isScrolled ? { color: 'var(--color-text-main, #141416)' } : undefined}
                >
                  {branding.name}
                </span>
                <span
                  className={`text-[9px] tracking-[0.3em] uppercase -mt-1 font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-[#737373]' : 'text-[#E5E2DC]/80'
                  }`}
                  style={isScrolled ? { color: 'var(--color-text-muted, #737373)' } : undefined}
                >
                  {branding.tagline}
                </span>
              </>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8 lg:space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => recordSectionClick(link.id)}
                className={`text-sm tracking-[0.08em] transition-colors duration-200 hover:opacity-100 ${
                  isScrolled
                    ? 'text-[#4A4A4F] hover:text-[#141416]'
                    : 'text-[#E5E2DC]/90 hover:text-[#FBFBF9]'
                }`}
                style={isScrolled ? { color: 'var(--color-text-main, #141416)' } : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button: Reservasi */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              id="nav-reservation-btn"
              onClick={() => {
                recordSectionClick('reservasi');
                onOpenReservation();
              }}
              className={`cursor-pointer px-6 py-2.5 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 border ${
                isScrolled
                  ? 'bg-[#141416] text-[#FBFBF9] border-[#141416] hover:bg-[#27272A]'
                  : 'bg-transparent text-[#FBFBF9] border-[#FBFBF9]/40 hover:bg-[#FBFBF9] hover:text-[#141416]'
              }`}
              style={
                isScrolled
                  ? {
                      backgroundColor: 'var(--color-primary, #141416)',
                      color: 'var(--color-secondary, #FBFBF9)',
                      borderColor: 'var(--color-primary, #141416)',
                    }
                  : undefined
              }
            >
              {reservation.buttonText || 'Reservasi'}
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka Menu Navigasi"
            className={`md:hidden min-h-[44px] min-w-[44px] p-2.5 flex items-center justify-center transition-colors cursor-pointer rounded-xs ${
              isScrolled ? 'text-[#141416]' : 'text-[#FBFBF9]'
            }`}
            style={isScrolled ? { color: 'var(--color-text-main, #141416)' } : undefined}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* FULL-SCREEN SOLID MOBILE OVERLAY NAVIGATION */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-fullscreen-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi Menu Mobile"
          className="fixed inset-0 z-[9999] bg-[#141416] text-[#FBFBF9] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
          style={{
            backgroundColor: 'var(--color-dark-surface, #141416)',
            color: 'var(--color-secondary, #FBFBF9)',
          }}
        >
          {/* Top Bar with Brand & Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#27272A] shrink-0">
            <div className="flex flex-col">
              <span className="font-serif-display text-2xl tracking-[0.16em] text-[#FBFBF9]">
                {branding.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A1A1AA]">
                {branding.tagline}
              </span>
            </div>

            {/* High-Contrast Explicit Close Button */}
            <button
              type="button"
              id="mobile-nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup Menu"
              className="min-h-[44px] min-w-[44px] p-2.5 bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#FBFBF9] rounded-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 px-6 py-8 flex flex-col justify-center space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.id);
                }}
                className="group flex items-center justify-between py-3 border-b border-[#27272A]/80 active:bg-[#1F1F23] transition-colors"
              >
                <div className="flex items-baseline space-x-4">
                  <span className="text-xs font-mono text-[#71717A] tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="font-serif-display text-2xl sm:text-3xl tracking-wide text-[#FBFBF9] group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#71717A] group-hover:text-[#FBFBF9] group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </nav>

          {/* Bottom Action Section */}
          <div className="p-6 border-t border-[#27272A] bg-[#0E0E10] shrink-0 space-y-4">
            <button
              type="button"
              id="mobile-nav-reservation-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                recordSectionClick('reservasi');
                onOpenReservation();
              }}
              className="w-full min-h-[48px] py-3.5 px-6 bg-[#FBFBF9] hover:bg-[#EDEAE4] text-[#141416] text-xs font-medium tracking-[0.18em] uppercase text-center flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <span>{reservation.buttonText || 'Reservasi Meja'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Micro details */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A1A1AA] pt-1">
              <div className="flex items-center space-x-1.5 truncate">
                <Clock className="w-3.5 h-3.5 shrink-0 text-[#71717A]" />
                <span className="truncate">{data.hero.openHoursLabel}</span>
              </div>
              <div className="flex items-center space-x-1.5 truncate justify-end">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#71717A]" />
                <span className="truncate">{data.location.shortAddress}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

