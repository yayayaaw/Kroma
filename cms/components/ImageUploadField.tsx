import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { convertImageFileToDataUrl } from '../uploads/uploadHelper';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  helperText?: string;
  aspectRatio?: string; // e.g. 'aspect-[4/3]' or 'aspect-[16/9]'
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  aspectRatio = 'aspect-[16/10]',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await convertImageFileToDataUrl(file);
      onChange(dataUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memproses gambar.';
      alert(message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = () => {
    if (inputUrl.trim()) {
      onChange(inputUrl.trim());
      setInputUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider font-medium text-[#737373]">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Hapus Foto</span>
          </button>
        )}
      </div>

      {/* Preview Box & Upload Trigger */}
      <div className="border border-[#E5E2DC] bg-[#FBFBF9] p-3">
        {value ? (
          <div className="relative group overflow-hidden bg-[#EFECE6]">
            <div className={`${aspectRatio} w-full overflow-hidden flex items-center justify-center`}>
              <img
                src={value}
                alt="Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-[#FBFBF9] text-[#141416] text-xs uppercase tracking-wider font-medium cursor-pointer hover:bg-white"
              >
                Ganti File
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3 py-1.5 bg-[#141416] text-[#FBFBF9] text-xs uppercase tracking-wider font-medium cursor-pointer border border-[#FBFBF9]/30 hover:bg-[#27272A]"
              >
                Ganti via URL
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D4D2CB] text-center space-y-3">
            <div className="w-10 h-10 bg-[#F5F4F0] flex items-center justify-center text-[#737373]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#141416] font-medium">Belum ada gambar yang dipilih</p>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Upload dari perangkat Anda (JPG, PNG, WebP) atau gunakan tautan URL
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-2 bg-[#141416] text-[#FBFBF9] text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5 hover:bg-[#27272A] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Memproses...' : 'Pilih File'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3 py-2 bg-transparent border border-[#D4D2CB] text-[#141416] text-xs uppercase tracking-wider font-medium hover:bg-[#EFECE6] cursor-pointer"
              >
                Gunakan URL
              </button>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Optional URL Input Popover */}
        {showUrlInput && (
          <div className="mt-3 pt-3 border-t border-[#E5E2DC] flex items-center space-x-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E2DC] text-[#141416] focus:border-[#141416] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-2 bg-[#141416] text-[#FBFBF9] text-xs uppercase tracking-wider font-medium flex items-center space-x-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Gunakan</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="p-2 text-[#737373] hover:text-[#141416] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {helperText && <p className="text-[11px] text-[#737373]">{helperText}</p>}
    </div>
  );
};
