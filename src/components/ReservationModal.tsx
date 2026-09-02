import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, Clock, Users as UsersIcon, MapPin, Check } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { data } = useCmsData();
  const { reservation, location, branding } = data;

  const defaultArea = reservation.areas[0] || 'Indoor (Non-Smoking)';
  const defaultGuest = reservation.guestOptions[1] || '2 Tamu';

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    guests: defaultGuest,
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    area: defaultArea,
    notes: '',
  });

  const [isCopied, setIsCopied] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const generateMessage = () => {
    return (
      `*FORM RESERVASI MEJA — ${branding.fullName}*\n` +
      `------------------------------------\n` +
      `• *Nama*: ${formData.name || 'Tamu ' + branding.name}\n` +
      `• *No. WhatsApp*: ${formData.phone || '-'}\n` +
      `• *Jumlah Tamu*: ${formData.guests}\n` +
      `• *Tanggal*: ${formData.date}\n` +
      `• *Waktu*: ${formData.time} WIB\n` +
      `• *Pilihan Area*: ${formData.area}\n` +
      `• *Catatan*: ${formData.notes || 'Tidak ada'}\n\n` +
      `Mohon konfirmasi ketersediaan meja untuk waktu tersebut. Terima kasih!`
    );
  };

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generateMessage();
    const encoded = encodeURIComponent(msg);
    const targetUrl = `https://wa.me/${location.whatsappRaw}?text=${encoded}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleCopyMessage = () => {
    const msg = generateMessage();
    navigator.clipboard.writeText(msg).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      id="reservation-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="reservation-modal-content"
        className="relative w-full max-w-xl bg-[#FBFBF9] text-[#141416] p-8 md:p-10 shadow-2xl border border-[#141416] my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close button */}
        <div className="flex items-start justify-between pb-6 border-b border-[#E5E2DC]">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#737373] block mb-1">
              {branding.tagline}
            </span>
            <h3 className="font-serif-display text-2xl md:text-3xl font-normal text-[#141416]">
              {reservation.modalTitle || 'Pesan Meja Anda'}
            </h3>
            <p className="text-xs text-[#737373] mt-1 font-light leading-relaxed">
              {reservation.modalDescription ||
                'Silakan lengkapi detail kunjungan. Kami akan mengonfirmasi via WhatsApp resmi dalam 15 menit.'}
            </p>
          </div>

          <button
            type="button"
            id="btn-close-reservation"
            onClick={onClose}
            className="cursor-pointer p-2 text-[#737373] hover:text-[#141416] transition-colors -mr-2 -mt-2"
            aria-label="Tutup Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsapp} className="mt-6 space-y-5">
          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="res-name"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="res-name"
                required
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="res-phone"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Nomor WhatsApp *
              </label>
              <input
                type="tel"
                id="res-phone"
                required
                placeholder="0812xxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="res-date"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Tanggal Kunjungan *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="res-date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="res-time"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Pilihan Waktu *
              </label>
              <select
                id="res-time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
              >
                {reservation.timeSlots.map((slot) => (
                  <option key={slot} value={slot.split(' ')[0]}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Number of Guests & Area Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="res-guests"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Jumlah Tamu *
              </label>
              <select
                id="res-guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
              >
                {reservation.guestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="res-area"
                className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
              >
                Area Duduk Pilihan
              </label>
              <select
                id="res-area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
              >
                {reservation.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label
              htmlFor="res-notes"
              className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5"
            >
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="res-notes"
              rows={2}
              placeholder="Contoh: Alergi makanan tertentu, perayaan ulang tahun, request meja sudut..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              id="btn-submit-reservation"
              className="cursor-pointer w-full py-4 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs font-medium uppercase tracking-[0.16em] flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Reservasi via WhatsApp</span>
            </button>

            <button
              type="button"
              id="btn-copy-reservation-format"
              onClick={handleCopyMessage}
              className="cursor-pointer w-full py-3 bg-transparent border border-[#D4D2CB] text-[#737373] hover:text-[#141416] hover:bg-[#F5F4F0] text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#141416]" />
                  <span className="text-[#141416] font-medium">Format Pesan Tersalin!</span>
                </>
              ) : (
                <span>Salin Format Teks Manual</span>
              )}
            </button>

            <p className="text-center text-[11px] text-[#737373] font-light pt-1">
              WhatsApp Resmi {branding.name}: {location.phone}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
