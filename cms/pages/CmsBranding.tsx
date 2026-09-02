import React, { useState } from 'react';
import { CafeBranding } from '../types/cmsTypes';
import { ImageUploadField } from '../components/ImageUploadField';
import { Save, Check, RotateCcw } from 'lucide-react';

interface CmsBrandingProps {
  initialData: CafeBranding;
  onSave: (data: CafeBranding) => void;
}

export const CmsBranding: React.FC<CmsBrandingProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeBranding>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Kembalikan data form branding ke versi tersimpan sebelumnya?')) {
      setFormData(initialData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Identitas & Logo Cafe
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Pengaturan nama, slogan, dan logo yang tampil pada navbar, hero, dan footer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Nama Cafe Utama *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Contoh: KROMA"
            />
            <p className="text-[11px] text-[#737373] mt-1">
              Tampil menonjol sebagai logo tipografi utama pada navbar.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Tagline / Sub-Identitas *
            </label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Contoh: Coffee Atelier"
            />
            <p className="text-[11px] text-[#737373] mt-1">
              Deskriptor kecil di bawah nama cafe pada navbar.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
            Nama Lengkap Usaha *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
            placeholder="Contoh: KROMA Coffee Atelier"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Tahun Berdiri / Didirikan
            </label>
            <input
              type="text"
              value={formData.establishedYear}
              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Contoh: 2021"
            />
          </div>
        </div>

        {/* Custom Logo Image (Optional) */}
        <div className="pt-4 border-t border-[#E5E2DC]">
          <ImageUploadField
            label="Logo Gambar Kustom (Opsional)"
            value={formData.logoUrl || ''}
            onChange={(url) => setFormData({ ...formData, logoUrl: url })}
            helperText="Jika dikosongkan, website akan secara otomatis menggunakan logo tipografi minimalis eksklusif KROMA."
            aspectRatio="aspect-[3/1]"
          />
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
              <span>Simpan Perubahan Branding</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
