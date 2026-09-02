import React, { useState } from 'react';
import {
  Palette,
  Check,
  CheckCircle2,
  Sparkles,
  Sliders,
  Eye,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useCmsData } from '../data/cmsStore';
import {
  THEME_PRESETS,
  DEFAULT_THEME_CONFIG,
  applyThemeToDocument,
} from '../theme/themePresets';
import { ThemePresetId, CafeThemeConfig } from '../types/cmsTypes';

export const CmsThemePage: React.FC = () => {
  const { data, updateSection } = useCmsData();
  const activeTheme = data.theme || DEFAULT_THEME_CONFIG;

  const [themeMode, setThemeMode] = useState<'preset' | 'custom'>(activeTheme.mode || 'preset');
  const [selectedPresetId, setSelectedPresetId] = useState<ThemePresetId>(
    activeTheme.activePresetId || 'monochrome'
  );

  const [customPrimary, setCustomPrimary] = useState<string>(
    activeTheme.customColors?.primary || '#141416'
  );
  const [customSecondary, setCustomSecondary] = useState<string>(
    activeTheme.customColors?.secondary || '#FBFBF9'
  );

  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectPreset = (presetId: ThemePresetId) => {
    setSelectedPresetId(presetId);
    const newConfig: CafeThemeConfig = {
      mode: 'preset',
      activePresetId: presetId,
    };
    updateSection('theme', newConfig);
    applyThemeToDocument(newConfig);
    setNotification(`Tema "${THEME_PRESETS[presetId].name}" berhasil diaktifkan.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApplyCustom = () => {
    const newConfig: CafeThemeConfig = {
      mode: 'custom',
      activePresetId: selectedPresetId,
      customColors: {
        primary: customPrimary,
        secondary: customSecondary,
      },
    };
    updateSection('theme', newConfig);
    applyThemeToDocument(newConfig);
    setNotification('Warna kustom berhasil diterapkan ke seluruh website.');
    setTimeout(() => setNotification(null), 3000);
  };

  const currentPreset = THEME_PRESETS[selectedPresetId] || THEME_PRESETS.monochrome;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#27272A] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
            <span>Tampilan & Visual</span>
            <span>•</span>
            <span className="text-[#FBFBF9]">Tema & Warna</span>
          </div>
          <h1 className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9] tracking-wide">
            Pengaturan Tema & Identitas Warna
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Ganti palet warna utama landing page dan elemen visual website dengan preset kurasi profesional atau palet kustom.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 bg-[#1A1A1E] border border-[#27272A] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setThemeMode('preset')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              themeMode === 'preset'
                ? 'bg-[#FBFBF9] text-[#141416]'
                : 'text-[#A1A1AA] hover:text-[#FBFBF9]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Koleksi Preset</span>
          </button>
          <button
            type="button"
            onClick={() => setThemeMode('custom')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              themeMode === 'custom'
                ? 'bg-[#FBFBF9] text-[#141416]'
                : 'text-[#A1A1AA] hover:text-[#FBFBF9]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Kustom Warna</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {notification && (
        <div className="p-4 bg-[#14261C] border border-[#22543D] text-[#86EFAC] text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Preset Themes Mode */}
      {themeMode === 'preset' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4D2CB]" />
              <span>6 Pilihan Preset Elegan KROMA</span>
            </h2>
            <span className="text-[11px] text-[#71717A]">
              Klik kartu untuk mengaktifkan seketika
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(Object.keys(THEME_PRESETS) as ThemePresetId[]).map((presetKey) => {
              const preset = THEME_PRESETS[presetKey];
              const isCurrent =
                activeTheme.mode === 'preset' && activeTheme.activePresetId === presetKey;

              return (
                <div
                  key={presetKey}
                  onClick={() => handleSelectPreset(presetKey)}
                  className={`p-5 bg-[#1A1A1E] border transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                    isCurrent
                      ? 'border-[#FBFBF9] shadow-[0_0_15px_rgba(255,255,255,0.08)] ring-1 ring-[#FBFBF9]'
                      : 'border-[#27272A] hover:border-[#4B4B52] hover:bg-[#202025]'
                  }`}
                >
                  {/* Active Badge */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#FBFBF9] text-[#141416] text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Aktif</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-[#FBFBF9] tracking-wide mb-1">
                      {preset.name}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                      {preset.tagline}
                    </p>

                    {/* Color Swatch Bars */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-7 h-7 border border-[#3F3F46] shrink-0"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div className="text-[11px] font-mono text-[#D4D2CB]">
                          Primary: {preset.primary}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-7 h-7 border border-[#3F3F46] shrink-0"
                          style={{ backgroundColor: preset.secondary }}
                        />
                        <div className="text-[11px] font-mono text-[#D4D2CB]">
                          Secondary: {preset.secondary}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-7 h-7 border border-[#3F3F46] shrink-0"
                          style={{ backgroundColor: preset.accent }}
                        />
                        <div className="text-[11px] font-mono text-[#D4D2CB]">
                          Accent: {preset.accent}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Preview Pill */}
                  <div
                    className="p-3 border text-xs flex items-center justify-between"
                    style={{
                      backgroundColor: preset.bgSurface,
                      borderColor: preset.border,
                      color: preset.textMain,
                    }}
                  >
                    <span className="font-serif-display text-sm font-medium">
                      Preview Nuansa
                    </span>
                    <span
                      className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase"
                      style={{
                        backgroundColor: preset.primary,
                        color: preset.secondary,
                      }}
                    >
                      Tombol
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom Color Mode */}
      {themeMode === 'custom' && (
        <div className="p-6 bg-[#1A1A1E] border border-[#27272A] space-y-6">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <div>
              <h2 className="text-sm font-medium text-[#FBFBF9] tracking-wide">
                Konfigurasi Warna Kustom
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Tentukan kode warna heksadesimal primer dan sekunder sesuai identitas cafe Anda.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-[#D4D2CB]">
              <Info className="w-3.5 h-3.5" />
              <span>Sistem menjaga kontras otomatis</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Color Picker */}
            <div className="space-y-3 p-4 bg-[#141416] border border-[#27272A]">
              <label className="text-xs font-medium text-[#FBFBF9] block">
                Warna Utama / Gelap (Primary)
              </label>
              <p className="text-[11px] text-[#A1A1AA]">
                Digunakan untuk background hero section, tombol reservasi, navigasi dark bar, dan judul utama.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="color"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="w-10 h-10 border border-[#3F3F46] cursor-pointer bg-transparent rounded-xs"
                />
                <input
                  type="text"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="px-3 py-2 bg-[#1A1A1E] border border-[#3F3F46] text-xs font-mono text-[#FBFBF9] w-36 uppercase tracking-wider"
                  placeholder="#141416"
                />
              </div>
            </div>

            {/* Secondary Color Picker */}
            <div className="space-y-3 p-4 bg-[#141416] border border-[#27272A]">
              <label className="text-xs font-medium text-[#FBFBF9] block">
                Warna Kedua / Terang (Secondary)
              </label>
              <p className="text-[11px] text-[#A1A1AA]">
                Digunakan untuk kanvas latar belakang landing page, teks kontras, dan panel konten.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="color"
                  value={customSecondary}
                  onChange={(e) => setCustomSecondary(e.target.value)}
                  className="w-10 h-10 border border-[#3F3F46] cursor-pointer bg-transparent rounded-xs"
                />
                <input
                  type="text"
                  value={customSecondary}
                  onChange={(e) => setCustomSecondary(e.target.value)}
                  className="px-3 py-2 bg-[#1A1A1E] border border-[#3F3F46] text-xs font-mono text-[#FBFBF9] w-36 uppercase tracking-wider"
                  placeholder="#FBFBF9"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
              Pratinjau Hasil Warna Kustom
            </span>
            <div
              className="p-8 border flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                backgroundColor: customSecondary,
                color: customPrimary,
                borderColor: '#D4D2CB',
              }}
            >
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono block mb-1">
                  KROMA Coffee Atelier
                </span>
                <h3 className="font-serif-display text-2xl font-normal">
                  Kenyamanan Menikmati Secangkir Kopi
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase"
                  style={{
                    backgroundColor: customPrimary,
                    color: customSecondary,
                  }}
                >
                  Tombol Reservasi
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApplyCustom}
            className="w-full sm:w-auto px-6 py-3 bg-[#FBFBF9] text-[#141416] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#E5E2DC] transition-colors cursor-pointer"
          >
            Terapkan Palet Kustom ke Website
          </button>
        </div>
      )}

      {/* Global CSS Variables Reference Explanation */}
      <div className="p-5 bg-[#1A1A1E] border border-[#27272A] space-y-3">
        <h3 className="text-xs font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
          <Eye className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span>Implementasi Teknis CSS Variables</span>
        </h3>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          Setiap tema yang dipilih menyuntikkan variabel CSS murni ke elemen root (<code className="text-[#FBFBF9] bg-[#141416] px-1 py-0.5 font-mono text-[11px]">--color-primary</code>, <code className="text-[#FBFBF9] bg-[#141416] px-1 py-0.5 font-mono text-[11px]">--color-secondary</code>, <code className="text-[#FBFBF9] bg-[#141416] px-1 py-0.5 font-mono text-[11px]">--color-bg-main</code>, <code className="text-[#FBFBF9] bg-[#141416] px-1 py-0.5 font-mono text-[11px]">--color-dark-surface</code>), menjamin peralihan warna mulus secara instan tanpa reload browser.
        </p>
      </div>
    </div>
  );
};
