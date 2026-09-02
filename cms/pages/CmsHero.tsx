import React, { useState } from 'react';
import { CafeHero } from '../types/cmsTypes';
import { ImageUploadField } from '../components/ImageUploadField';
import { Save, Check, RotateCcw } from 'lucide-react';

interface CmsHeroProps {
  initialData: CafeHero;
  onSave: (data: CafeHero) => void;
}

export const CmsHero: React.FC<CmsHeroProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeHero>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Kembalikan data form Hero ke versi tersimpan sebelumnya?')) {
      setFormData(initialData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Hero Section (Bagian Depan Utama)
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Bagian pertama yang dilihat oleh pengunjung saat membuka website.
          </p>
        </div>

        {/* Hero Background Photo */}
        <ImageUploadField
          label="Foto Background Hero Utama *"
          value={formData.bgImage}
          onChange={(url) => setFormData({ ...formData, bgImage: url })}
          helperText="Gunakan foto interior cafe, barista, atau suasana kopi beresolusi tinggi dengan nuansa hangat/gelap."
          aspectRatio="aspect-[16/9]"
        />

        {/* Headline Inputs */}
        <div className="space-y-4 pt-2 border-t border-[#E5E2DC]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Label Kecil di Atas Judul
            </label>
            <input
              type="text"
              value={formData.sublabel}
              onChange={(e) => setFormData({ ...formData, sublabel: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Contoh: Artisanal Coffee & Architecture"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Judul Utama Baris 1 *
              </label>
              <input
                type="text"
                required
                value={formData.headlinePart1}
                onChange={(e) => setFormData({ ...formData, headlinePart1: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Contoh: More Than Coffee,"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Judul Utama Baris 2 (Italic Aksen) *
              </label>
              <input
                type="text"
                required
                value={formData.headlinePart2}
                onChange={(e) => setFormData({ ...formData, headlinePart2: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Contoh: A Place To Stay."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Deskripsi Subheadline *
            </label>
            <textarea
              rows={3}
              required
              value={formData.subheadline}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
              placeholder="Tulis kalimat filosofi atau sambutan singkat cafe..."
            />
          </div>
        </div>

        {/* Buttons / CTA */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
            Tombol Aksi (Call To Action)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#F5F4F0] border border-[#E5E2DC] space-y-2">
              <span className="text-[11px] font-medium text-[#141416] block">
                Tombol 1 (Primer / Menu)
              </span>
              <input
                type="text"
                value={formData.btn1Text}
                onChange={(e) => setFormData({ ...formData, btn1Text: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                placeholder="Teks Tombol (mis: Lihat Menu)"
              />
              <input
                type="text"
                value={formData.btn1Link}
                onChange={(e) => setFormData({ ...formData, btn1Link: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                placeholder="Tautan (mis: #menu)"
              />
            </div>

            <div className="p-3 bg-[#F5F4F0] border border-[#E5E2DC] space-y-2">
              <span className="text-[11px] font-medium text-[#141416] block">
                Tombol 2 (Sekunder / Reservasi)
              </span>
              <input
                type="text"
                value={formData.btn2Text}
                onChange={(e) => setFormData({ ...formData, btn2Text: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                placeholder="Teks Tombol (mis: Reservasi Sekarang)"
              />
              <input
                type="text"
                value={formData.btn2Link}
                onChange={(e) => setFormData({ ...formData, btn2Link: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                placeholder="Tautan (mis: #reservasi)"
              />
            </div>
          </div>
        </div>

        {/* Highlight Ticker Text */}
        <div className="pt-4 border-t border-[#E5E2DC] space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Pilar Sorotan Bawah Hero
            </label>
            <input
              type="text"
              value={formData.bottomBarText}
              onChange={(e) => setFormData({ ...formData, bottomBarText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Contoh: Micro-Roastery • Slow Bar Experience • Artisanal Bakery"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Label Jam Buka Singkat (Hero Footer)
              </label>
              <input
                type="text"
                value={formData.openHoursLabel}
                onChange={(e) => setFormData({ ...formData, openHoursLabel: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="08.00 — 22.00 WIB"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Label Lokasi Singkat (Hero Footer)
              </label>
              <input
                type="text"
                value={formData.locationLabel}
                onChange={(e) => setFormData({ ...formData, locationLabel: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Senopati, Jakarta Selatan"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
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
              <span>Simpan Perubahan Hero</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
