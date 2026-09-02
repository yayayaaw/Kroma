export interface DailyVisitPoint {
  date: string; // e.g., 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'
  fullDate: string; // '26 Agu', etc.
  visitors: number;
  pageViews: number;
}

export interface SectionViewStat {
  sectionId: string;
  name: string;
  views: number;
  percentage: number;
}

export interface DeviceDistribution {
  device: string;
  percentage: number;
  count: number;
}

export interface PeakHourStat {
  timeRange: string;
  label: string;
  intensityPercent: number; // 0 - 100
}

export interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  weeklyVisitors: number;
  monthlyVisitors: number;
  totalPageViews: number;
  lastUpdated: string;
  dailyTrend: DailyVisitPoint[];
  monthlyTrend: DailyVisitPoint[];
  topSections: SectionViewStat[];
  deviceDistribution: DeviceDistribution[];
  peakHours: PeakHourStat[];
}

const ANALYTICS_STORAGE_KEY = 'kroma_cafe_analytics_v1';

// Clean, realistic baseline analytics data
export const INITIAL_ANALYTICS_DATA: AnalyticsData = {
  totalVisitors: 2450,
  todayVisitors: 87,
  weeklyVisitors: 520,
  monthlyVisitors: 1890,
  totalPageViews: 7640,
  lastUpdated: new Date().toISOString(),
  dailyTrend: [
    { date: 'Sen', fullDate: '25 Agu', visitors: 64, pageViews: 198 },
    { date: 'Sel', fullDate: '26 Agu', visitors: 71, pageViews: 224 },
    { date: 'Rab', fullDate: '27 Agu', visitors: 82, pageViews: 250 },
    { date: 'Kam', fullDate: '28 Agu', visitors: 79, pageViews: 241 },
    { date: 'Jum', fullDate: '29 Agu', visitors: 114, pageViews: 380 },
    { date: 'Sab', fullDate: '30 Agu', visitors: 148, pageViews: 490 },
    { date: 'Min', fullDate: '31 Agu', visitors: 135, pageViews: 435 },
  ],
  monthlyTrend: [
    { date: 'Minggu 1', fullDate: '1-7 Agu', visitors: 410, pageViews: 1320 },
    { date: 'Minggu 2', fullDate: '8-14 Agu', visitors: 465, pageViews: 1490 },
    { date: 'Minggu 3', fullDate: '15-21 Agu', visitors: 512, pageViews: 1640 },
    { date: 'Minggu 4', fullDate: '22-28 Agu', visitors: 568, pageViews: 1810 },
  ],
  topSections: [
    { sectionId: 'menu', name: 'Signature Menu', views: 2890, percentage: 38 },
    { sectionId: 'galeri', name: 'Galeri & Sudut Ruang', views: 1980, percentage: 26 },
    { sectionId: 'reservasi', name: 'Reservasi Meja', views: 1450, percentage: 19 },
    { sectionId: 'lokasi', name: 'Lokasi & Kontak', views: 1290, percentage: 17 },
    { sectionId: 'ulasan', name: 'Ulasan Pelanggan', views: 1040, percentage: 14 },
    { sectionId: 'tentang', name: 'Tentang KROMA', views: 890, percentage: 12 },
  ],
  deviceDistribution: [
    { device: 'Smartphone (Mobile)', percentage: 72, count: 1764 },
    { device: 'Desktop / Laptop', percentage: 24, count: 588 },
    { device: 'Tablet / iPad', percentage: 4, count: 98 },
  ],
  peakHours: [
    { timeRange: '08:00 — 11:00', label: 'Morning Coffee & Pastry', intensityPercent: 65 },
    { timeRange: '12:00 — 14:00', label: 'Lunch & Pour Over Break', intensityPercent: 88 },
    { timeRange: '15:00 — 18:00', label: 'Afternoon Work & Meetings', intensityPercent: 78 },
    { timeRange: '19:00 — 22:00', label: 'Evening Gathering & Chill', intensityPercent: 95 },
  ],
};

export const getAnalyticsData = (): AnalyticsData => {
  if (typeof window === 'undefined') return INITIAL_ANALYTICS_DATA;
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(INITIAL_ANALYTICS_DATA));
      return INITIAL_ANALYTICS_DATA;
    }
    return JSON.parse(raw) as AnalyticsData;
  } catch (err) {
    console.error('Error parsing analytics data:', err);
    return INITIAL_ANALYTICS_DATA;
  }
};

export const recordPageView = () => {
  if (typeof window === 'undefined') return;
  try {
    const data = getAnalyticsData();
    const sessionRecorded = sessionStorage.getItem('kroma_session_recorded');

    const updated: AnalyticsData = {
      ...data,
      totalPageViews: data.totalPageViews + 1,
      totalVisitors: sessionRecorded ? data.totalVisitors : data.totalVisitors + 1,
      todayVisitors: sessionRecorded ? data.todayVisitors : data.todayVisitors + 1,
      lastUpdated: new Date().toISOString(),
    };

    if (!sessionRecorded) {
      sessionStorage.setItem('kroma_session_recorded', '1');
    }

    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage issues
  }
};

export const recordSectionClick = (sectionId: string) => {
  if (typeof window === 'undefined') return;
  try {
    const data = getAnalyticsData();
    const foundIdx = data.topSections.findIndex((s) => s.sectionId === sectionId);
    if (foundIdx >= 0) {
      const copy = [...data.topSections];
      copy[foundIdx] = {
        ...copy[foundIdx],
        views: copy[foundIdx].views + 1,
      };
      const updated = { ...data, topSections: copy };
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore storage issues
  }
};

export const resetAnalyticsData = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(INITIAL_ANALYTICS_DATA));
  }
  return INITIAL_ANALYTICS_DATA;
};
