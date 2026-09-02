import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const { data } = useCmsData();
  const { hero } = data;

  const scrollToMenu = () => {
    const menuElem = document.querySelector('#menu');
    if (menuElem) {
      menuElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondBtnClick = () => {
    if (hero.btn2Link === '#reservasi' || hero.btn2Link.includes('reservasi')) {
      onOpenReservation();
    } else if (hero.btn2Link.startsWith('#')) {
      const elem = document.querySelector(hero.btn2Link);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(hero.btn2Link, '_blank');
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between bg-[#0F0F10] text-[#FBFBF9] overflow-hidden"
      style={{
        backgroundColor: 'var(--color-dark-surface, #0F0F10)',
        color: 'var(--color-secondary, #FBFBF9)',
      }}
    >
      {/* Background Editorial Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImage}
          alt="Cafe Interior & Artisanal Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.03] opacity-40 mix-blend-luminosity filter brightness-[0.75] contrast-[1.1]"
        />
        {/* Subtle gradient vignette purely within charcoal tones */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/60 to-black/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle Monogram / Sub-label */}
          {hero.sublabel && (
            <div className="flex items-center space-x-3 mb-6">
              <span className="inline-block w-8 h-[1px] bg-[#E5E2DC]/60"></span>
              <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#D4D2CB]">
                {hero.sublabel}
              </span>
            </div>
          )}

          {/* Main Headline */}
          <h1
            id="hero-headline"
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FBFBF9] mb-8"
          >
            {hero.headlinePart1} <br />
            <span className="italic font-light text-[#E5E2DC]">{hero.headlinePart2}</span>
          </h1>

          {/* Subheadline */}
          <p
            id="hero-subheadline"
            className="text-base sm:text-lg md:text-xl text-[#D4D2CB]/90 font-light leading-relaxed max-w-xl mb-12 tracking-wide"
          >
            {hero.subheadline}
          </p>

          {/* Action CTAs: Dua tombol minimalis kontras tinggi */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <button
              type="button"
              id="hero-menu-cta"
              onClick={scrollToMenu}
              className="cursor-pointer px-8 py-4 bg-[#FBFBF9] text-[#141416] text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 hover:bg-[#E5E2DC] flex items-center justify-center space-x-3 group"
            >
              <span>{hero.btn1Text || 'Lihat Menu'}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              type="button"
              id="hero-reservation-cta"
              onClick={handleSecondBtnClick}
              className="cursor-pointer px-8 py-4 bg-transparent border border-[#FBFBF9]/30 text-[#FBFBF9] text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 hover:border-[#FBFBF9] hover:bg-white/5 flex items-center justify-center space-x-3 group"
            >
              <span>{hero.btn2Text || 'Reservasi Sekarang'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar with Information Snippets */}
      <div className="relative z-10 border-t border-[#27272A]/70 bg-black/40 backdrop-blur-xs py-5 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between text-xs tracking-widest uppercase text-[#A1A1AA] gap-4">
          <div className="flex items-center space-x-6">
            <span className="text-[#FBFBF9] font-medium">{hero.locationLabel}</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#737373]"></span>
            <span>{hero.openHoursLabel}</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-[#737373]">
            <span>{hero.bottomBarText}</span>
          </div>

          <div>
            <a
              href="#tentang"
              className="text-[#E5E2DC]/80 hover:text-[#FBFBF9] transition-colors flex items-center space-x-2"
            >
              <span>Eksplorasi</span>
              <ArrowDown className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
