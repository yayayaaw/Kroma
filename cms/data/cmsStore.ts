import { useState, useEffect, useCallback } from 'react';
import { CafeFullData } from '../types/cmsTypes';
import { INITIAL_CAFE_DATA } from './defaultData';
import { applyThemeToDocument } from '../theme/themePresets';

const STORAGE_KEY = 'kroma_cafe_cms_data_v1';
const UPDATE_EVENT_NAME = 'kroma_cms_updated';

export const getCmsData = (): CafeFullData => {
  if (typeof window === 'undefined') {
    return INITIAL_CAFE_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      applyThemeToDocument(INITIAL_CAFE_DATA.theme);
      return INITIAL_CAFE_DATA;
    }
    const parsed = JSON.parse(raw);
    // Shallow verify structure
    if (!parsed.branding || !parsed.hero || !parsed.menu) {
      applyThemeToDocument(INITIAL_CAFE_DATA.theme);
      return INITIAL_CAFE_DATA;
    }
    // Ensure new fields are backfilled from default data if not present in existing stored data
    const completeData: CafeFullData = {
      ...INITIAL_CAFE_DATA,
      ...parsed,
      reviews: parsed.reviews || INITIAL_CAFE_DATA.reviews,
      theme: parsed.theme || INITIAL_CAFE_DATA.theme,
      legal: parsed.legal || INITIAL_CAFE_DATA.legal,
    };
    applyThemeToDocument(completeData.theme);
    return completeData;
  } catch (err) {
    console.error('Error reading CMS data from localStorage:', err);
    applyThemeToDocument(INITIAL_CAFE_DATA.theme);
    return INITIAL_CAFE_DATA;
  }
};

export const saveCmsData = (newData: CafeFullData): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const dataToSave = {
      ...newData,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    applyThemeToDocument(dataToSave.theme);
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: dataToSave }));
    return true;
  } catch (err) {
    console.error('Error saving CMS data to localStorage:', err);
    return false;
  }
};

export const resetCmsData = (): CafeFullData => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: INITIAL_CAFE_DATA }));
    } catch (err) {
      console.error('Error resetting CMS data:', err);
    }
  }
  return INITIAL_CAFE_DATA;
};

export const exportCmsDataJson = (): string => {
  const current = getCmsData();
  return JSON.stringify(current, null, 2);
};

export const importCmsDataJson = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.branding && parsed.hero && parsed.menu) {
      return saveCmsData(parsed as CafeFullData);
    }
    return false;
  } catch {
    return false;
  }
};

/**
 * React Hook that subscribes to CMS data changes.
 * Used in both public landing page components and CMS editor pages.
 */
export const useCmsData = (): {
  data: CafeFullData;
  updateData: (newData: CafeFullData) => boolean;
  updateSection: <K extends keyof CafeFullData>(sectionKey: K, sectionValue: CafeFullData[K]) => boolean;
  resetData: () => void;
} => {
  const [data, setData] = useState<CafeFullData>(getCmsData);

  useEffect(() => {
    const handleUpdate = () => {
      setData(getCmsData());
    };

    window.addEventListener(UPDATE_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateData = useCallback((newData: CafeFullData) => {
    const success = saveCmsData(newData);
    if (success) {
      setData(newData);
    }
    return success;
  }, []);

  const updateSection = useCallback(
    <K extends keyof CafeFullData>(sectionKey: K, sectionValue: CafeFullData[K]) => {
      const current = getCmsData();
      const updated: CafeFullData = {
        ...current,
        [sectionKey]: sectionValue,
      };
      return updateData(updated);
    },
    [updateData]
  );

  const resetData = useCallback(() => {
    const reset = resetCmsData();
    setData(reset);
  }, []);

  return {
    data,
    updateData,
    updateSection,
    resetData,
  };
};
