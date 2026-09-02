import React from 'react';
import { MapPin, Clock, MessageSquare, Instagram, ExternalLink, Navigation } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';

interface LocationContactProps {
  onOpenReservation: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenReservation }) => {
  const { data } = useCmsData();
  const { location, branding, reservation } = data;

  const whatsappUrl = `https://wa.me/${location.whatsappRaw}?text=${encodeURIComponent(
    `Halo ${branding.fullName}, saya ingin menanyakan informasi meja dan menu.`
  )}`;

  return (
    <section id="lokasi" className="py-28 md:py-36 bg-[#141416] text-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#E5E2DC]/40"></span>
            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#A1A1AA] font-medium">
              {location.sectionLabel || 'Kunjungi Kami'}
            </span>
          </div>
          <h2
            id="location-title"
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#FBFBF9] tracking-[-0.01em] max-w-2xl leading-[1.15]"
          >
            {location.sectionTitle || 'Lokasi & Kontak'}
          </h2>
        </div>

        {/* Two-Column Location & Visual Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-10">
            {/* Address */}
            <div className="border-b border-[#27272A] pb-8">
              <div className="flex items-center space-x-3 text-xs tracking-widest uppercase text-[#737373] mb-3">
                <MapPin className="w-4 h-4 text-[#E5E2DC]" />
                <span>Alamat Lengkap</span>
              </div>
              <p className="font-serif-display text-2xl md:text-3xl text-[#FBFBF9] font-normal leading-snug">
                {location.address}
              </p>
              <p className="text-sm text-[#A1A1AA] font-light mt-2">
                Kawasan {location.shortAddress}
              </p>
            </div>

            {/* Operating Hours */}
            <div className="border-b border-[#27272A] pb-8">
              <div className="flex items-center space-x-3 text-xs tracking-widest uppercase text-[#737373] mb-3">
                <Clock className="w-4 h-4 text-[#E5E2DC]" />
                <span>Jam Operasional</span>
              </div>
              <div className="space-y-1.5 text-base text-[#D4D2CB]">
                <p className="flex justify-between max-w-md">
                  <span className="text-[#A1A1AA]">Senin — Jumat</span>
                  <span className="font-medium text-[#FBFBF9]">{location.weekdayHours.split(':')[1]?.trim() || location.weekdayHours}</span>
                </p>
                <p className="flex justify-between max-w-md">
                  <span className="text-[#A1A1AA]">Sabtu — Minggu</span>
                  <span className="font-medium text-[#FBFBF9]">{location.weekendHours.split(':')[1]?.trim() || location.weekendHours}</span>
                </p>
              </div>
            </div>

            {/* Direct Connect & Socials */}
            <div className="space-y-4">
              <div className="text-xs tracking-widest uppercase text-[#737373]">
                <span>Saluran Komunikasi Resmi</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-whatsapp-chat"
                  className="cursor-pointer px-6 py-3.5 bg-[#27272A] text-[#FBFBF9] hover:bg-[#323238] transition-all text-xs tracking-wider uppercase font-medium flex items-center space-x-3"
                >
                  <MessageSquare className="w-4 h-4 text-[#E5E2DC]" />
                  <span>WhatsApp: {location.phone}</span>
                </a>

                <a
                  href={location.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-instagram-profile"
                  className="cursor-pointer px-6 py-3.5 bg-transparent border border-[#27272A] text-[#E5E2DC] hover:border-[#E5E2DC] hover:text-[#FBFBF9] transition-all text-xs tracking-wider uppercase font-medium flex items-center space-x-3"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{location.instagram}</span>
                </a>
              </div>
            </div>

            {/* In-Page Quick Reservation Banner */}
            <div className="p-6 bg-[#1A1A1D] border border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif-display text-lg text-[#FBFBF9] font-normal">
                  Rencanakan Pertemuan Anda
                </h4>
                <p className="text-xs text-[#A1A1AA] font-light mt-1">
                  Pemesanan meja untuk pertemuan bisnis atau momen santai.
                </p>
              </div>
              <button
                type="button"
                id="btn-location-reserve"
                onClick={onOpenReservation}
                className="cursor-pointer px-5 py-2.5 bg-[#FBFBF9] text-[#141416] text-xs uppercase tracking-widest font-medium hover:bg-[#E5E2DC] transition-colors whitespace-nowrap"
              >
                {reservation.buttonText || 'Reservasi Meja'}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Styled Map Preview Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[420px] bg-[#1E1E22] border border-[#27272A] overflow-hidden group">
              {/* Monochromatic Styled Map Representation */}
              <div className="absolute inset-0 bg-[#161618] flex items-center justify-center p-8">
                {/* Architectural Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(#E5E2DC 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Conceptual Map Graphic */}
                <div className="relative z-10 max-w-sm w-full text-center space-y-6">
                  <div className="inline-flex p-4 rounded-full bg-[#27272A] border border-[#3E3E44] text-[#FBFBF9] shadow-xl animate-pulse">
                    <MapPin className="w-8 h-8 text-[#FBFBF9]" />
                  </div>

                  <div>
                    <h4 className="font-serif-display text-2xl text-[#FBFBF9] font-normal">
                      {branding.fullName}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] mt-2 font-light leading-relaxed">
                      {location.shortAddress}
                    </p>
                    <p className="text-[11px] text-[#737373] mt-1">
                      Kawasan tenang & strategis di Jakarta Selatan
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="btn-google-maps-external"
                      className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 bg-[#FBFBF9] text-[#141416] text-xs font-medium uppercase tracking-wider hover:bg-[#E5E2DC] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Bar on Map Container */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs px-6 py-3 border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#A1A1AA]">
                <span>Tersedia Parkir Privat & Valet</span>
                <span className="font-mono text-[#737373]">MRT Senayan ±5 Menit</span>
              </div>
            </div>

            {/* Note on Parking & Transit */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#737373] font-light">
              <p>• {location.transitNote}</p>
              <p>• {location.parkingNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
