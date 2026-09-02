import React, { useState } from 'react';
import { CafeExperienceConfig, CafeExperienceItem } from '../types/cmsTypes';
import { Save, Check, RotateCcw, Plus, Trash2, Edit2, X, Award } from 'lucide-react';

interface CmsExperienceProps {
  initialData: CafeExperienceConfig;
  onSave: (data: CafeExperienceConfig) => void;
}

export const CmsExperience: React.FC<CmsExperienceProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeExperienceConfig>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editor Modal
  const [editingItem, setEditingItem] = useState<CafeExperienceItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleOpenAdd = () => {
    const nextNum = (formData.items.length + 1).toString().padStart(2, '0');
    const newItem: CafeExperienceItem = {
      id: `exp-${Date.now()}`,
      number: nextNum,
      title: 'Pilar Nilai Baru',
      subtitle: 'Komitmen Layanan',
      description: 'Jelaskan standar kualitas dan perhatian detail yang membedakan cafe Anda.',
      iconType: 'sparkles',
    };
    setEditingItem(newItem);
    setIsCreatingNew(true);
  };

  const handleSaveItem = (itemToSave: CafeExperienceItem) => {
    if (!itemToSave.title.trim()) {
      alert('Judul pilar wajib diisi.');
      return;
    }

    let updatedItems: CafeExperienceItem[];
    if (isCreatingNew) {
      updatedItems = [...formData.items, itemToSave];
    } else {
      updatedItems = formData.items.map((it) => (it.id === itemToSave.id ? itemToSave : it));
    }

    const updatedConfig: CafeExperienceConfig = {
      ...formData,
      items: updatedItems,
    };

    setFormData(updatedConfig);
    onSave(updatedConfig);
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleDeleteItem = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      const updatedConfig: CafeExperienceConfig = {
        ...formData,
        items: formData.items.filter((it) => it.id !== id),
      };
      setFormData(updatedConfig);
      onSave(updatedConfig);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header Settings Form */}
      <form onSubmit={handleSubmitHeader} className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Pengaturan Judul Section Keunggulan
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Teks pengantar untuk 4 pilar filosofi dan nilai pengalaman pelanggan.
            </p>
          </div>
          <button
            type="submit"
            className="self-start sm:self-auto px-4 py-2 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Teks</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E5E2DC]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Label Section
            </label>
            <input
              type="text"
              value={formData.sectionLabel}
              onChange={(e) => setFormData({ ...formData, sectionLabel: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
              placeholder="Nilai & Komitmen"
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
              className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
              placeholder="Diciptakan dengan Perhatian pada Setiap Detail."
            />
          </div>
        </div>
      </form>

      {/* Items List */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Daftar Pilar Nilai ({formData.items.length})
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Pilar yang ditampilkan dengan nomor urut, ikon minimalis, dan deskripsi mendalam.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pilar Baru</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {formData.items.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E2DC] bg-[#FDFDFB] p-5 flex flex-col justify-between hover:border-[#141416] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif-display text-2xl text-[#A1A1AA] font-light">
                    {item.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F5F4F0] text-[#737373] font-mono">
                    Ikon: {item.iconType}
                  </span>
                </div>

                <h4 className="font-serif-display text-lg text-[#141416] font-normal mb-0.5">
                  {item.title}
                </h4>
                <div className="text-[11px] uppercase tracking-wider text-[#737373] mb-2 font-medium">
                  {item.subtitle}
                </div>
                <p className="text-xs text-[#4A4A4F] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#EFECE6] mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(item);
                    setIsCreatingNew(false);
                  }}
                  className="p-1 text-xs text-[#141416] hover:underline flex items-center space-x-1 cursor-pointer font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id, item.title)}
                  className="p-1 text-xs text-red-600 hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Modal Popup */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBFBF9] border border-[#141416] w-full max-w-lg p-6 shadow-2xl relative space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
              <h4 className="font-serif-display text-xl text-[#141416] font-normal">
                {isCreatingNew ? 'Tambah Pilar Nilai Baru' : `Edit Pilar: ${editingItem.title}`}
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-[#737373] hover:text-[#141416] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Nomor Urut
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.number}
                    onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
                    placeholder="01"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Pilihan Ikon
                  </label>
                  <select
                    value={editingItem.iconType}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        iconType: e.target.value as CafeExperienceItem['iconType'],
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
                  >
                    <option value="coffee">Cangkir Kopi (coffee)</option>
                    <option value="compass">Kompas & Akustik Ruang (compass)</option>
                    <option value="utensils">Dapur Pastry & Makanan (utensils)</option>
                    <option value="users">Temu & Komunitas (users)</option>
                    <option value="award">Penghargaan / Kurasi (award)</option>
                    <option value="heart">Pelayanan Hangat (heart)</option>
                    <option value="sparkles">Sentuhan Istimewa (sparkles)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Judul Pilar *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
                  placeholder="Contoh: Quality Coffee"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Sub-Judul / Keterangan Singkat
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
                  placeholder="Contoh: Kurasi Biji Terbaik"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Penjelasan Mendalam *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] leading-relaxed"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E2DC]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#737373] hover:text-[#141416] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSaveItem(editingItem)}
                className="px-6 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pilar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
