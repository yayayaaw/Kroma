import React, { useState } from 'react';
import { CafeLocationContact } from '../types/cmsTypes';
import { Save, Check, RotateCcw } from 'lucide-react';

interface CmsLocationProps {
  initialData: CafeLocationContact;
  onSave: (data: CafeLocationContact) => void;
}

export const CmsLocation: React.FC<CmsLocationProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeLocationContact>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Kembalikan data Lokasi & Kontak ke versi tersimpan sebelumnya?')) {
      setFormData(initialData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Lokasi, Jam Operasional & Kontak
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Informasi alamat fisik, jam berkunjung, tautan peta digital, dan nomor kontak resmi.
          </p>
        </div>

        {/* Section Title & Label */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Label Section
            </label>
            <input
              type="text"
              value={formData.sectionLabel}
              onChange={(e) => setFormData({ ...formData, sectionLabel: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Kunjungi Kami"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Judul Utama Section
            </label>
            <input
              type="text"
              value={formData.sectionTitle}
              onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Lokasi & Kontak"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4 pt-2 border-t border-[#E5E2DC]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Alamat Lengkap *
            </label>
            <textarea
              rows={2}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
              placeholder="Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Alamat Singkat (Navbar / Footer) *
              </label>
              <input
                type="text"
                required
                value={formData.shortAddress}
                onChange={(e) => setFormData({ ...formData, shortAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Senopati, Jakarta Selatan"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Tautan Google Maps URL *
              </label>
              <input
                type="url"
                required
                value={formData.mapsUrl}
                onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
            Jam Operasional
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Senin — Jumat (Weekdays) *
              </label>
              <input
                type="text"
                required
                value={formData.weekdayHours}
                onChange={(e) => setFormData({ ...formData, weekdayHours: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Senin — Jumat: 08.00 — 22.00 WIB"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Sabtu — Minggu (Weekends) *
              </label>
              <input
                type="text"
                required
                value={formData.weekendHours}
                onChange={(e) => setFormData({ ...formData, weekendHours: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Sabtu — Minggu: 07.30 — 23.00 WIB"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
            Telepon & WhatsApp
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Nomor Telepon Tampil *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="+62 812-8890-4200"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Nomor WhatsApp Mentah (Angka Saja) *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappRaw}
                onChange={(e) => setFormData({ ...formData, whatsappRaw: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="6281288904200"
              />
              <p className="text-[11px] text-[#737373] mt-1">
                Gunakan format internasional tanpa tanda plus atau spasi untuk link klik WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Transit & Parking Notes */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
            Petunjuk Transportasi & Parkir
          </h4>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Catatan Akses Transportasi Publik
            </label>
            <input
              type="text"
              value={formData.transitNote}
              onChange={(e) => setFormData({ ...formData, transitNote: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="5 menit berkendara dari Stasiun MRT Senayan & MRT Istora Mandiri."
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Catatan Fasilitas Parkir & Valet
            </label>
            <input
              type="text"
              value={formData.parkingNote}
              onChange={(e) => setFormData({ ...formData, parkingNote: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Tersedia area parkir privat luas di bagian belakang dan layanan valet gratis."
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#737373] hover:text-[#141416] flex items-center space-x-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Batal Perubahan</span>
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer shadow-xs"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tersimpan!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Lokasi & Kontak</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
