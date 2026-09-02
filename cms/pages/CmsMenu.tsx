import React, { useState, useEffect } from 'react';
import { CafeMenuConfig, MenuItemData } from '../types/cmsTypes';
import { ImageUploadField } from '../components/ImageUploadField';
import {
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  Search,
  Coffee,
  X,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Info,
} from 'lucide-react';

interface CmsMenuProps {
  initialData: CafeMenuConfig;
  onSave: (data: CafeMenuConfig) => void;
}

export const CmsMenu: React.FC<CmsMenuProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<CafeMenuConfig>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state if initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Modal / Editor State for Menu Item
  const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleOpenAdd = () => {
    const newItem: MenuItemData = {
      id: `menu-${Date.now()}`,
      name: '',
      category: 'coffee',
      description: '',
      price: 'Rp 40.000',
      image:
        'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80',
      notes: '',
      isSignature: false,
    };
    setEditingItem(newItem);
    setIsCreatingNew(true);
  };

  const handleSaveItem = (itemToSave: MenuItemData) => {
    if (!itemToSave.name.trim()) {
      alert('Nama menu wajib diisi.');
      return;
    }
    if (!itemToSave.price.trim()) {
      alert('Harga menu wajib diisi (contoh: Rp 45.000).');
      return;
    }
    if (!itemToSave.image.trim()) {
      alert('Foto menu wajib diisi atau diunggah.');
      return;
    }

    let updatedItems: MenuItemData[];
    if (isCreatingNew) {
      updatedItems = [itemToSave, ...formData.items];
    } else {
      updatedItems = formData.items.map((it) => (it.id === itemToSave.id ? itemToSave : it));
    }

    const updatedConfig: CafeMenuConfig = {
      ...formData,
      items: updatedItems,
    };

    setFormData(updatedConfig);
    onSave(updatedConfig);
    setEditingItem(null);
    setIsCreatingNew(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar menu?`)) {
      const updatedConfig: CafeMenuConfig = {
        ...formData,
        items: formData.items.filter((it) => it.id !== id),
      };
      setFormData(updatedConfig);
      onSave(updatedConfig);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleToggleSignature = (id: string) => {
    const updatedItems = formData.items.map((it) =>
      it.id === id ? { ...it, isSignature: !it.isSignature } : it
    );
    const updatedConfig = { ...formData, items: updatedItems };
    setFormData(updatedConfig);
    onSave(updatedConfig);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
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

  // Filter items
  const filteredItems = formData.items.filter((item) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.price || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl space-y-8">
      {/* Toast Banner Alert */}
      {savedSuccess && (
        <div className="bg-[#141416] text-[#FBFBF9] px-4 py-3 text-xs flex items-center justify-between border border-[#27272A] shadow-md animate-fade-in">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Perubahan data menu berhasil disimpan dan otomatis diperbarui di website!</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="text-[#A1A1AA] hover:text-[#FBFBF9] p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Info notice about clean card format */}
      <div className="bg-[#EFECE6] border border-[#D4D2CB] p-4 text-xs text-[#4A4A4F] flex items-start space-x-3">
        <Info className="w-4 h-4 text-[#141416] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-[#141416]">
            Desain Kartu Menu Minimalis Aktif
          </p>
          <p className="leading-relaxed text-[#737373]">
            Kartu menu di website publik tampil bersih hanya dengan <strong>Foto Sajian</strong>, <strong>Nama Menu</strong>, dan <strong>Harga</strong>. Anda dapat mengunggah foto, mengatur nama, dan harga secara leluasa di bawah ini.
          </p>
        </div>
      </div>

      {/* Top Header & Section Settings */}
      <form onSubmit={handleSubmitHeader} className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Pengaturan Judul & Catatan Menu
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Teks heading dan catatan kaki yang tertera di seputar section menu.
            </p>
          </div>
          <button
            type="submit"
            className="self-start sm:self-auto px-4 py-2 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Catatan Menu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E5E2DC]">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Label Section Menu
            </label>
            <input
              type="text"
              value={formData.sectionLabel}
              onChange={(e) => setFormData({ ...formData, sectionLabel: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:outline-none focus:border-[#141416]"
              placeholder="Pilihan Barista"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Judul Utama Menu
            </label>
            <input
              type="text"
              value={formData.sectionTitle}
              onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:outline-none focus:border-[#141416]"
              placeholder="Signature Menu"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Catatan Kaki Alternatif (Footnote)
            </label>
            <input
              type="text"
              value={formData.footnote}
              onChange={(e) => setFormData({ ...formData, footnote: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:outline-none focus:border-[#141416]"
              placeholder="*Tersedia pilihan susu oat alternatif..."
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
              Catatan Pajak & Servis
            </label>
            <input
              type="text"
              value={formData.taxNote}
              onChange={(e) => setFormData({ ...formData, taxNote: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:outline-none focus:border-[#141416]"
              placeholder="Harga sudah termasuk pajak & servis"
            />
          </div>
        </div>
      </form>

      {/* Menu Items Manager Header */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
              Daftar Sajian Menu ({formData.items.length})
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Kelola foto sajian, nama menu, harga, dan rekomendasi signature.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer self-start md:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Menu Baru</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E5E2DC]">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {formData.categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.key)}
                className={`px-3 py-1.5 text-xs whitespace-nowrap uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCategoryFilter === cat.key
                    ? 'bg-[#141416] text-[#FBFBF9] font-medium'
                    : 'bg-[#F5F4F0] text-[#737373] hover:text-[#141416] hover:bg-[#EFECE6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Cari nama atau harga menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredItems.map((item) => {
            const actualIndex = formData.items.findIndex((it) => it.id === item.id);
            return (
              <div
                key={item.id}
                className="border border-[#E5E2DC] bg-[#FDFDFB] p-4 flex gap-4 hover:border-[#141416] transition-colors group"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 shrink-0 bg-[#EFECE6] overflow-hidden relative border border-[#E5E2DC]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isSignature && (
                    <div className="absolute top-1 left-1 bg-[#141416] text-[#FBFBF9] text-[8px] px-1 py-0.5 tracking-wider uppercase font-medium flex items-center space-x-0.5">
                      <Sparkles className="w-2 h-2" />
                      <span>Sig</span>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-display text-base text-[#141416] font-normal leading-snug truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#141416] shrink-0 font-serif-display">
                        {item.price}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#F5F4F0] text-[#737373] border border-[#E5E2DC]">
                        {item.category}
                      </span>
                      {item.isSignature && (
                        <span className="text-[10px] text-[#141416] font-medium flex items-center space-x-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Signature</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F5F4F0] mt-3">
                    {/* Reordering and Signature Toggle */}
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => handleToggleSignature(item.id)}
                        title={item.isSignature ? 'Hapus badge Signature' : 'Jadikan Signature'}
                        className={`p-1.5 text-xs transition-colors cursor-pointer border ${
                          item.isSignature
                            ? 'bg-[#141416] text-[#FBFBF9] border-[#141416]'
                            : 'text-[#737373] hover:text-[#141416] border-[#E5E2DC] bg-[#F5F4F0]'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                      </button>

                      {actualIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMoveItem(actualIndex, 'up')}
                          title="Geser Naik"
                          className="p-1.5 text-xs text-[#737373] hover:text-[#141416] hover:bg-[#F5F4F0] border border-[#E5E2DC] cursor-pointer transition-colors"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                      )}

                      {actualIndex < formData.items.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMoveItem(actualIndex, 'down')}
                          title="Geser Turun"
                          className="p-1.5 text-xs text-[#737373] hover:text-[#141416] hover:bg-[#F5F4F0] border border-[#E5E2DC] cursor-pointer transition-colors"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Edit and Delete */}
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem(item);
                          setIsCreatingNew(false);
                        }}
                        className="p-1.5 text-xs text-[#141416] hover:bg-[#F5F4F0] flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="md:col-span-2 py-12 text-center border border-dashed border-[#D4D2CB] text-[#737373] space-y-2">
              <Coffee className="w-8 h-8 mx-auto stroke-1 text-[#A1A1AA]" />
              <p className="text-xs">Tidak ada menu yang sesuai dengan filter atau kata kunci.</p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="text-xs text-[#141416] underline font-medium cursor-pointer"
              >
                Tambah menu sekarang
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit / Add Modal Popup */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBFBF9] border border-[#141416] w-full max-w-xl p-6 shadow-2xl relative space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
              <h4 className="font-serif-display text-xl text-[#141416] font-normal">
                {isCreatingNew ? 'Tambah Menu Baru' : `Edit Menu: ${editingItem.name || 'Sajian'}`}
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
              {/* Photo Upload - Primary Visual */}
              <div>
                <ImageUploadField
                  label="Foto Sajian Menu *"
                  value={editingItem.image}
                  onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                  helperText="Upload foto makanan atau minuman. Foto ini tampil utama di kartu menu website."
                  aspectRatio="aspect-[4/3]"
                />
              </div>

              {/* Menu Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                  Nama Menu *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                  placeholder="Contoh: KROMA Cold Brew Reserve"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Harga (Format Rp) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
                    placeholder="Rp 45.000"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Kategori Menu *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none cursor-pointer"
                  >
                    <option value="coffee">Kopi Artisanal (coffee)</option>
                    <option value="non-coffee">Botanical / Non-Kopi (non-coffee)</option>
                    <option value="pastry">Pastry & Bakery (pastry)</option>
                    <option value="brunch">Brunch & Mains (brunch)</option>
                  </select>
                </div>
              </div>

              {/* Signature Checkbox */}
              <div className="p-3 bg-[#F5F4F0] border border-[#E5E2DC] flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is-signature-checkbox"
                  checked={!!editingItem.isSignature}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, isSignature: e.target.checked })
                  }
                  className="w-4 h-4 text-[#141416] accent-[#141416] cursor-pointer"
                />
                <label
                  htmlFor="is-signature-checkbox"
                  className="text-xs text-[#141416] font-medium cursor-pointer select-none flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tandai sebagai Menu Signature (Rekomendasi Utama Barista)</span>
                </label>
              </div>

              {/* Optional Internal / Archival Details */}
              <div className="pt-2 border-t border-[#E5E2DC] space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#737373] mb-1.5">
                    Deskripsi / Catatan Bahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.description || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none leading-relaxed"
                    placeholder="Opsional - Catatan komposisi bahan atau profil rasa untuk arsip..."
                  />
                  <p className="text-[11px] text-[#A1A1AA] mt-1">
                    Kartu menu utama website kini tampil minimalis hanya menampilkan Foto, Nama, dan Harga.
                  </p>
                </div>
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
                className="px-6 py-2.5 bg-[#141416] text-[#FBFBF9] hover:bg-[#27272A] text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
