import { CafeThemeColorPalette, CafeThemeConfig, ThemePresetId } from '../types/cmsTypes';

export const THEME_PRESETS: Record<ThemePresetId, CafeThemeColorPalette> = {
  monochrome: {
    id: 'monochrome',
    name: 'Monochrome Minimalist',
    tagline: 'Hitam charcoal murni & putih ivory dengan kontras elegan.',
    primary: '#141416',
    secondary: '#FBFBF9',
    accent: '#27272A',
    bgMain: '#FBFBF9',
    bgSurface: '#F4F3EF',
    darkSurface: '#141416',
    border: '#E5E2DC',
    textMain: '#141416',
    textMuted: '#737373',
  },
  'warm-cream': {
    id: 'warm-cream',
    name: 'Warm Cream & Umber',
    tagline: 'Nuansa hangat butter cream & dark roasted coffee bean.',
    primary: '#2B1D16',
    secondary: '#FAF6F0',
    accent: '#C3996E',
    bgMain: '#FAF6F0',
    bgSurface: '#F1E8DC',
    darkSurface: '#231711',
    border: '#E5DACB',
    textMain: '#241811',
    textMuted: '#7D6F64',
  },
  'coffee-earth': {
    id: 'coffee-earth',
    name: 'Coffee Earth & Amber',
    tagline: 'Karakter tanah liat, kayu jati, dan seduhan espresso pekat.',
    primary: '#281B12',
    secondary: '#F5EFE7',
    accent: '#A37349',
    bgMain: '#FAF6F1',
    bgSurface: '#EEE3D3',
    darkSurface: '#1E130B',
    border: '#E2D5C3',
    textMain: '#23170E',
    textMuted: '#7A6C5E',
  },
  'navy-elegant': {
    id: 'navy-elegant',
    name: 'Navy Elegant & Slate',
    tagline: 'Kemewahan modern midnight blue dengan sentuhan porcelain halus.',
    primary: '#0F1A2A',
    secondary: '#F3F6F9',
    accent: '#567A9C',
    bgMain: '#F8FAFC',
    bgSurface: '#EBF0F5',
    darkSurface: '#0A121D',
    border: '#DCE3EB',
    textMain: '#0E1724',
    textMuted: '#637588',
  },
  'forest-elegant': {
    id: 'forest-elegant',
    name: 'Forest Botanical & Sage',
    tagline: 'Ketenangan pinus hutan tropis dan suasana courtyard asri.',
    primary: '#102219',
    secondary: '#F4F7F4',
    accent: '#527E64',
    bgMain: '#F8FAF8',
    bgSurface: '#EBF2EB',
    darkSurface: '#0B1912',
    border: '#DCE6DC',
    textMain: '#0F1E16',
    textMuted: '#63776A',
  },
  'burgundy-classic': {
    id: 'burgundy-classic',
    name: 'Burgundy Classic & Silk',
    tagline: 'Kemegahan anggur vintage dan aroma plum kering yang anggun.',
    primary: '#2A1117',
    secondary: '#F9F3F5',
    accent: '#924E5E',
    bgMain: '#FAF5F7',
    bgSurface: '#F3E6EA',
    darkSurface: '#200C11',
    border: '#E6D6DB',
    textMain: '#240E14',
    textMuted: '#7D676E',
  },
};

export const DEFAULT_THEME_CONFIG: CafeThemeConfig = {
  mode: 'preset',
  activePresetId: 'monochrome',
};

/**
 * Resolves current color palette based on theme configuration.
 * Safely computes derived shades if custom color mode is enabled.
 */
export const resolveActivePalette = (config?: CafeThemeConfig): CafeThemeColorPalette => {
  if (!config) {
    return THEME_PRESETS.monochrome;
  }

  if (config.mode === 'custom' && config.customColors?.primary && config.customColors?.secondary) {
    const p = config.customColors.primary;
    const s = config.customColors.secondary;
    return {
      id: 'monochrome',
      name: 'Custom Theme',
      tagline: 'Tema kustom pilihan pemilik bisnis.',
      primary: p,
      secondary: s,
      accent: p,
      bgMain: s,
      bgSurface: '#F4F3EE',
      darkSurface: p,
      border: '#E5E2DC',
      textMain: p,
      textMuted: '#737373',
    };
  }

  return THEME_PRESETS[config.activePresetId] || THEME_PRESETS.monochrome;
};

/**
 * Applies CSS variables directly to :root so that all components adapt instantly.
 */
export const applyThemeToDocument = (config?: CafeThemeConfig): CafeThemeColorPalette => {
  const palette = resolveActivePalette(config);
  if (typeof document === 'undefined') return palette;

  const root = document.documentElement;
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-secondary', palette.secondary);
  root.style.setProperty('--color-accent', palette.accent);
  root.style.setProperty('--color-bg-main', palette.bgMain);
  root.style.setProperty('--color-bg-surface', palette.bgSurface);
  root.style.setProperty('--color-dark-surface', palette.darkSurface);
  root.style.setProperty('--color-border', palette.border);
  root.style.setProperty('--color-text-main', palette.textMain);
  root.style.setProperty('--color-text-muted', palette.textMuted);

  return palette;
};
