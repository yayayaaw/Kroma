import React, { useRef, useState } from 'react';
import { CafeFullData } from '../types/cmsTypes';
import {
  exportCmsDataJson,
  importCmsDataJson,
  resetCmsData,
} from '../data/cmsStore';
import {
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  FileJson,
  Database,
  Info,
} from 'lucide-react';

interface CmsSettingsProps {
  data: CafeFullData;
  onRefreshData: () => void;
}

export const CmsSettings: React.FC<CmsSettingsProps> = ({ data, onRefreshData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleExport = () => {
    const jsonStr = exportCmsDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kroma-cafe-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const success = importCmsDataJson(text);
        if (success) {
          onRefreshData();
          setImportStatus('Data backup berhasil diimpor!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          alert('Format file JSON tidak valid untuk KROMA CMS.');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExecuteReset = () => {
    resetCmsData();
    onRefreshData();
    setResetConfirmOpen(false);
    alert('Seluruh data CMS telah dikembalikan ke pengaturan awal pabrik KROMA.');
  };

  const jsonContentLength = exportCmsDataJson().length;
  const estimatedKb = (jsonContentLength / 1024).toFixed(1);

  return (
    <div className="max-w-3xl space-y-8">
      {/* Storage Information Card */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#F5F4F0] text-[#141416]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-display text-xl text-[#141416] font-normal">
              Status Penyimpanan Lokal
            </h3>
            <p className="text-xs text-[#737373] font-light">
              Penyimpanan mandiri di browser pemilik cafe tanpa memerlukan database server berbayar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E2DC]">
          <div className="p-3.5 bg-[#F5F4F0] border border-[#E5E2DC]">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
              Ukuran Data JSON
            </span>
            <span className="font-serif-display text-xl text-[#141416] font-normal">
              ~{estimatedKb} KB
            </span>
          </div>
          <div className="p-3.5 bg-[#F5F4F0] border border-[#E5E2DC]">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
              Jumlah Menu
            </span>
            <span className="font-serif-display text-xl text-[#141416] font-normal">
              {data.menu.items.length} Item
            </span>
          </div>
          <div className="p-3.5 bg-[#F5F4F0] border border-[#E5E2DC]">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
              Jumlah Foto Galeri
            </span>
            <span className="font-serif-display text-xl text-[#141416] font-normal">
              {data.gallery.items.length} Foto
            </span>
          </div>
        </div>
      </div>

      {/* Backup & Restore Card */}
      <div className="bg-[#FBFBF9] border border-[#E5E2DC] p-6 space-y-5">
        <div>
          <h3 className="font-serif-display text-xl text-[#141416] font-normal mb-1">
            Backup & Pemulihan (Export / Import)
          </h3>
          <p className="text-xs text-[#737373] font-light">
            Unduh seluruh konfigurasi cafe sebagai file arsip JSON atau pulihkan data dari file yang
            sudah Anda simpan sebelumnya.
          </p>
        </div>

        {importStatus && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5E2DC]">
          {/* Export */}
          <div className="p-4 border border-[#E5E2DC] bg-[#FDFDFB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center space-x-2 text-[#141416] font-medium text-xs uppercase tracking-wider mb-1">
                <FileJson className="w-4 h-4" />
                <span>Download Backup</span>
              </div>
              <p className="text-xs text-[#737373] font-light leading-relaxed">
                Simpan file cadangan seluruh teks, link, dan pengaturan cafe ke komputer Anda.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              className="w-full py-2.5 px-4 bg-[#141416] text-[#FBFBF9] text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 hover:bg-[#27272A] cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File JSON</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 border border-[#E5E2DC] bg-[#FDFDFB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center space-x-2 text-[#141416] font-medium text-xs uppercase tracking-wider mb-1">
                <Upload className="w-4 h-4" />
                <span>Impor File Backup</span>
              </div>
              <p className="text-xs text-[#737373] font-light leading-relaxed">
                Muat kembali file cadangan JSON yang pernah Anda unduh untuk menimpa data sekarang.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 bg-transparent border border-[#141416] text-[#141416] text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 hover:bg-[#EFECE6] cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Pilih File Backup</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-[#FBFBF9] border border-red-200 p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-50 text-red-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif-display text-lg text-red-700 font-normal">
              Reset ke Pengaturan Awal Pabrik
            </h3>
            <p className="text-xs text-[#737373] leading-relaxed font-light">
              Tindakan ini akan menghapus semua perubahan kustom Anda dan mengembalikan seluruh isi
              website ke teks, menu, dan foto default KROMA Coffee Atelier.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-red-100 flex justify-end">
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Sekarang</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBF9] border border-[#141416] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-serif-display text-xl text-[#141416]">Konfirmasi Reset</h4>
            </div>
            <p className="text-xs text-[#4A4A4F] leading-relaxed">
              Apakah Anda benar-benar yakin ingin mengembalikan seluruh website ke konfigurasi awal?
              Seluruh item menu kustom dan perubahan teks Anda akan digantikan dengan data asli.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E5E2DC]">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#737373] hover:text-[#141416] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Ya, Reset Semuanya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
