import React, { useState } from 'react';
import { CafeAbout, AboutStat } from '../types/cmsTypes';
import { ImageUploadField } from '../components/ImageUploadField';
import { Save, Check, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface CmsAboutProps {
  initialData: CafeAbout;
  onSave: (data: CafeAbout) => void;
}

export const CmsAbout: React.FC<CmsAboutProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeAbout>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Kembalikan data form Tentang Kami ke versi tersimpan sebelumnya?')) {
      setFormData(initialData);
    }
  };

  const handleAddStat = () => {
    const newStat: AboutStat = {
      id: `stat-${Date.now()}`,
      number: '99%',
      label: 'Indikator Baru',
    };
    setFormData({ ...formData, stats: [...formData.stats, newStat] });
  };

  const handleUpdateStat = (id: string, field: 'number' | 'label', val: string) => {
    setFormData({
      ...formData,
      stats: formData.stats.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    });
  };

  const handleDeleteStat = (id: string) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((s) => s.id !== id),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Section Tentang Kami (About Us)
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Ceritakan filosofi cafe, kurasi bahan, dan konsep ruang yang Anda bangun.
          </p>
        </div>

        {/* Section Title & Label */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Label Section
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Tentang Kami"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Judul Cerita Utama *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
              placeholder="Ruang Hening untuk Menikmati Setiap Tetes Rasa."
            />
          </div>
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 pt-2 border-t border-[#E5E2DC]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Paragraf 1 (Latar Belakang & Pembuka) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.paragraph1}
              onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Paragraf 2 (Estetika & Pendekatan Rasa) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.paragraph2}
              onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Paragraf 3 (Sentuhan Akhir & Sambutan) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.paragraph3}
              onChange={(e) => setFormData({ ...formData, paragraph3: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Photo & Caption */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <ImageUploadField
            label="Foto Interior / Slow Bar Cafe *"
            value={formData.photo}
            onChange={(url) => setFormData({ ...formData, photo: url })}
            helperText="Foto arsitektur bernuansa minimalis beresolusi tinggi dengan komposisi vertikal atau landscape."
            aspectRatio="aspect-[4/3]"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Keterangan Foto (Caption)
              </label>
              <input
                type="text"
                value={formData.photoCaption}
                onChange={(e) => setFormData({ ...formData, photoCaption: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="The Main Hall & Slow Bar"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                Keterangan Kota / Lokasi Foto
              </label>
              <input
                type="text"
                value={formData.photoLocation}
                onChange={(e) => setFormData({ ...formData, photoLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                placeholder="Jakarta Selatan"
              />
            </div>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-xs uppercase tracking-wider text-[#141416]">
              Angka Sorotan (Highlight Numbers)
            </h4>
            <button
              type="button"
              onClick={handleAddStat}
              className="text-xs text-[#141416] hover:underline flex items-center space-x-1 cursor-pointer font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Metrik</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="p-3 bg-[#F5F4F0] border border-[#E5E2DC] flex items-center gap-3"
              >
                <div className="w-8 text-center text-xs font-mono text-[#737373]">
                  0{idx + 1}
                </div>
                <div className="w-32">
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => handleUpdateStat(stat.id, 'number', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-serif-display font-medium bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                    placeholder="100%"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(stat.id, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-[#FBFBF9] border border-[#E5E2DC] text-[#141416]"
                    placeholder="Specialty Arabica"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteStat(stat.id)}
                  className="p-2 text-[#737373] hover:text-red-600 transition-colors cursor-pointer"
                  title="Hapus metrik ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
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
              <span>Simpan Perubahan Tentang Kami</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
