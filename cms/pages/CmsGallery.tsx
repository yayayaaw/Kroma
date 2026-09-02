import React, { useState } from 'react';
import { CafeGalleryConfig, CafeGalleryItem } from '../types/cmsTypes';
import { ImageUploadField } from '../components/ImageUploadField';
import {
  Save,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  X,
  ArrowUp,
  ArrowDown,
  Images,
} from 'lucide-react';

interface CmsGalleryProps {
  initialData: CafeGalleryConfig;
  onSave: (data: CafeGalleryConfig) => void;
}

export const CmsGallery: React.FC<CmsGalleryProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeGalleryConfig>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editor Modal for Photo Item
  const [editingPhoto, setEditingPhoto] = useState<CafeGalleryItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleOpenAdd = () => {
    const newPhoto: CafeGalleryItem = {
      id: `gallery-${Date.now()}`,
      title: 'Sudut Ruang Baru',
      category: 'Interior Cafe',
      image:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      aspect: 'landscape',
      caption: 'Detail tata ruang dengan material alami dan pencahayaan lembut.',
    };
    setEditingPhoto(newPhoto);
    setIsCreatingNew(true);
  };

  const handleSavePhoto = (photoToSave: CafeGalleryItem) => {
    if (!photoToSave.title.trim()) {
      alert('Judul foto wajib diisi.');
      return;
    }

    let updatedItems: CafeGalleryItem[];
    if (isCreatingNew) {
      updatedItems = [photoToSave, ...formData.items];
    } else {
      updatedItems = formData.items.map((it) => (it.id === photoToSave.id ? photoToSave : it));
    }

    const updatedConfig: CafeGalleryConfig = {
      ...formData,
      items: updatedItems,
    };

    setFormData(updatedConfig);
    onSave(updatedConfig);
    setEditingPhoto(null);
    setIsCreatingNew(false);
  };

  const handleDeletePhoto = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus foto "${title}" dari galeri?`)) {
      const updatedConfig: CafeGalleryConfig = {
        ...formData,
        items: formData.items.filter((it) => it.id !== id),
      };
      setFormData(updatedConfig);
      onSave(updatedConfig);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...formData.items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedConfig = { ...formData, items: newItems };
    setFormData(updatedConfig);
    onSave(updatedConfig);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Section Header Settings */}
      <form onSubmit={handleSubmitHeader} className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Pengaturan Judul Galeri
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Teks heading dan narasi pembuka untuk album dokumentasi visual cafe.
            </p>
          </div>
          <button
            type="submit"
            className="self-start sm:self-auto px-4 py-2 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Teks Galeri</span>
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
              placeholder="Dokumentasi Visual"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Judul Utama Galeri
            </label>
            <input
              type="text"
              value={formData.sectionTitle}
              onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
              placeholder="Sudut Ruang & Atmosfer"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
            Deskripsi Pengantar Galeri
          </label>
          <textarea
            rows={2}
            value={formData.sectionDescription}
            onChange={(e) => setFormData({ ...formData, sectionDescription: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416]"
          />
        </div>
      </form>

      {/* Gallery Items List */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Koleksi Foto Galeri ({formData.items.length})
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Foto diatur dalam tata letak editorial dinamis (landscape, portrait, dan square).
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Upload / Tambah Foto</span>
          </button>
        </div>

        {/* Photos Grid Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {formData.items.map((photo, index) => (
            <div
              key={photo.id}
              className="border border-[#E5E2DC] bg-[#FDFDFB] flex flex-col justify-between overflow-hidden group hover:border-[#141416] transition-colors"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="aspect-[4/3] bg-[#EFECE6] relative overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#141416] text-[#FBFBF9] text-[9px] uppercase tracking-wider px-2 py-0.5">
                    {photo.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 text-[#141416] text-[9px] uppercase tracking-wider px-1.5 py-0.5 font-mono">
                    {photo.aspect}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 space-y-1">
                  <h4 className="font-serif-display text-base text-[#141416] font-normal leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-[#737373] line-clamp-2 leading-relaxed font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="p-3 bg-[#F5F4F0] border-t border-[#E5E2DC] flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-[#737373] hover:text-[#141416] disabled:opacity-30 cursor-pointer"
                    title="Geser ke atas"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === formData.items.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-[#737373] hover:text-[#141416] disabled:opacity-30 cursor-pointer"
                    title="Geser ke bawah"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPhoto(photo);
                      setIsCreatingNew(false);
                    }}
                    className="p-1 text-xs text-[#141416] hover:underline flex items-center space-x-1 cursor-pointer font-medium"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(photo.id, photo.title)}
                    className="p-1 text-xs text-red-600 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {formData.items.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-[#D4D2CB] text-[#737373] space-y-2">
              <Images className="w-8 h-8 mx-auto stroke-1 text-[#A1A1AA]" />
              <p className="text-xs">Belum ada foto yang dimasukkan ke galeri.</p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="text-xs text-[#141416] underline font-medium cursor-pointer"
              >
                Upload foto pertama Anda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit / Add Modal Popup */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBFBF9] border border-[#141416] w-full max-w-xl p-6 shadow-2xl relative space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
              <h4 className="font-serif-display text-xl text-[#141416] font-normal">
                {isCreatingNew ? 'Tambah Foto Galeri' : `Edit Foto: ${editingPhoto.title}`}
              </h4>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1.5 text-[#737373] hover:text-[#141416] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Judul Foto *
                </label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                  placeholder="Contoh: Main Hall Architecture"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Kategori Foto
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.category}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                    placeholder="Interior Cafe / Minuman / Makanan"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Orientasi Proporsi (Aspect Ratio)
                  </label>
                  <select
                    value={editingPhoto.aspect}
                    onChange={(e) =>
                      setEditingPhoto({
                        ...editingPhoto,
                        aspect: e.target.value as 'landscape' | 'portrait' | 'square',
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                  >
                    <option value="landscape">Landscape (Mendatar)</option>
                    <option value="portrait">Portrait (Tinggi Vertikal)</option>
                    <option value="square">Square (Bujur Sangkar 1:1)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Keterangan (Caption)
                </label>
                <textarea
                  rows={2}
                  value={editingPhoto.caption}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
                  placeholder="Ceritakan apa yang ada di dalam foto..."
                />
              </div>

              {/* Photo Upload */}
              <div className="pt-2 border-t border-[#E5E2DC]">
                <ImageUploadField
                  label="File Foto Galeri *"
                  value={editingPhoto.image}
                  onChange={(url) => setEditingPhoto({ ...editingPhoto, image: url })}
                  helperText="Upload gambar beresolusi tinggi dan jernih."
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E2DC]">
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#737373] hover:text-[#141416] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSavePhoto(editingPhoto)}
                className="px-6 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
