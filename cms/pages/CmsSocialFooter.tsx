import React, { useState } from 'react';
import { CafeFullData } from '../types/cmsTypes';
import { Save, Check, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface CmsSocialFooterProps {
  initialLocation: CafeFullData['location'];
  initialReservation: CafeFullData['reservation'];
  initialFooter: CafeFullData['footer'];
  onSave: (data: {
    location: CafeFullData['location'];
    reservation: CafeFullData['reservation'];
    footer: CafeFullData['footer'];
  }) => void;
}

export const CmsSocialFooter: React.FC<CmsSocialFooterProps> = ({
  initialLocation,
  initialReservation,
  initialFooter,
  onSave,
}) => {
  const [locationData, setLocationData] = useState(initialLocation);
  const [reservationData, setReservationData] = useState(initialReservation);
  const [footerData, setFooterData] = useState(initialFooter);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      location: locationData,
      reservation: reservationData,
      footer: footerData,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Kembalikan data ke versi tersimpan sebelumnya?')) {
      setLocationData(initialLocation);
      setReservationData(initialReservation);
      setFooterData(initialFooter);
    }
  };

  // Add Area Option
  const handleAddArea = () => {
    const newArea = prompt('Masukkan nama area tempat duduk baru:');
    if (newArea && newArea.trim()) {
      setReservationData({
        ...reservationData,
        areas: [...reservationData.areas, newArea.trim()],
      });
    }
  };

  const handleRemoveArea = (index: number) => {
    setReservationData({
      ...reservationData,
      areas: reservationData.areas.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {/* Social Media Section */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Media Sosial & WhatsApp Resmi
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Pengaturan akun Instagram dan nomor kontak cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Username Instagram *
            </label>
            <input
              type="text"
              required
              value={locationData.instagram}
              onChange={(e) => setLocationData({ ...locationData, instagram: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="@kroma.atelier"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              URL Profil Instagram *
            </label>
            <input
              type="url"
              required
              value={locationData.instagramUrl}
              onChange={(e) => {
                setLocationData({ ...locationData, instagramUrl: e.target.value });
                setFooterData({ ...footerData, instagramUrl: e.target.value });
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="https://instagram.com/kroma.atelier"
            />
          </div>
        </div>
      </div>

      {/* Reservation System Settings */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Pengaturan Modal Reservasi
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Teks tombol, judul formulir, serta opsi pilihan area dan waktu kunjungan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Teks Tombol Reservasi (Navbar) *
            </label>
            <input
              type="text"
              required
              value={reservationData.buttonText}
              onChange={(e) =>
                setReservationData({ ...reservationData, buttonText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Reservasi Meja"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Judul Modal Reservasi *
            </label>
            <input
              type="text"
              required
              value={reservationData.modalTitle}
              onChange={(e) =>
                setReservationData({ ...reservationData, modalTitle: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Pesan Meja Anda"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
            Deskripsi Keterangan Modal
          </label>
          <textarea
            rows={2}
            value={reservationData.modalDescription}
            onChange={(e) =>
              setReservationData({ ...reservationData, modalDescription: e.target.value })
            }
            className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
          />
        </div>

        {/* Areas List */}
        <div className="pt-2 border-t border-[#E5E2DC]">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373]">
              Pilihan Area Duduk ({reservationData.areas.length})
            </label>
            <button
              type="button"
              onClick={handleAddArea}
              className="text-xs text-[#141416] font-medium hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Area</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {reservationData.areas.map((area, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-[#F5F4F0] border border-[#E5E2DC] text-xs text-[#141416] flex items-center space-x-2"
              >
                <span>{area}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveArea(idx)}
                  className="text-[#737373] hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Footer Website
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Pengaturan teks penutup di bagian paling bawah halaman website publik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Teks Hak Cipta (Copyright) *
            </label>
            <input
              type="text"
              required
              value={footerData.copyrightText}
              onChange={(e) => setFooterData({ ...footerData, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="All Rights Reserved."
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Kredit Filosofi Desain
            </label>
            <input
              type="text"
              value={footerData.designCredit}
              onChange={(e) => setFooterData({ ...footerData, designCredit: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Designed with architectural precision & editorial simplicity."
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
              <span>Simpan Media Sosial & Footer</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
