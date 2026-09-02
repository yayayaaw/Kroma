import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  RotateCcw,
  ArrowUpRight,
  BarChart3,
  Layers,
} from 'lucide-react';
import {
  getAnalyticsData,
  resetAnalyticsData,
  AnalyticsData,
} from '../data/analyticsStore';

export const CmsAnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(getAnalyticsData);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  const handleReset = () => {
    if (confirm('Kembalikan data analitik ke nilai awal?')) {
      const reset = resetAnalyticsData();
      setAnalytics(reset);
    }
  };

  const chartData = timeRange === '7d' ? analytics.dailyTrend : analytics.monthlyTrend;

  // Compute SVG chart coordinates
  const maxVisitors = Math.max(...chartData.map((d) => d.visitors), 100);
  const chartHeight = 180;
  const chartWidth = 560;
  const paddingX = 40;
  const paddingY = 25;

  const points = chartData.map((d, index) => {
    const x =
      paddingX +
      (index / (chartData.length - 1 || 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      (d.visitors / maxVisitors) * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
      : '';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#27272A] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
            <span>Performa & Data</span>
            <span>•</span>
            <span className="text-[#FBFBF9]">Visitor Analytics</span>
          </div>
          <h1 className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9] tracking-wide">
            Statistik & Analitik Pengunjung
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Pantau arus kunjungan, efektivitas konten menu, dan perilaku calon pelanggan KROMA Coffee Atelier.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border border-[#3F3F46] bg-[#1E1E22] text-[#D4D2CB] hover:bg-[#27272A] hover:text-[#FBFBF9] transition-colors cursor-pointer self-start sm:self-auto"
          title="Reset metrik ke default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metric Cards Grid (5 Core Numbers Requested by User) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="p-4 md:p-5 bg-[#1A1A1E] border border-[#27272A] relative overflow-hidden">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs mb-2">
            <span className="uppercase tracking-wider text-[10px]">Total Pengunjung</span>
            <Users className="w-4 h-4 text-[#71717A]" />
          </div>
          <p className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9]">
            {analytics.totalVisitors.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-[#22C55E] flex items-center space-x-1 mt-1 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4% bln ini</span>
          </span>
        </div>

        <div className="p-4 md:p-5 bg-[#1A1A1E] border border-[#27272A]">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs mb-2">
            <span className="uppercase tracking-wider text-[10px]">Pengunjung Hari Ini</span>
            <Clock className="w-4 h-4 text-[#71717A]" />
          </div>
          <p className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9]">
            {analytics.todayVisitors.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-[#A1A1AA] mt-1 font-mono block">
            Aktif sesi terkini
          </span>
        </div>

        <div className="p-4 md:p-5 bg-[#1A1A1E] border border-[#27272A]">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs mb-2">
            <span className="uppercase tracking-wider text-[10px]">Minggu Ini</span>
            <Calendar className="w-4 h-4 text-[#71717A]" />
          </div>
          <p className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9]">
            {analytics.weeklyVisitors.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-[#22C55E] flex items-center space-x-1 mt-1 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+8.2% vs lalu</span>
          </span>
        </div>

        <div className="p-4 md:p-5 bg-[#1A1A1E] border border-[#27272A]">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs mb-2">
            <span className="uppercase tracking-wider text-[10px]">Bulan Ini</span>
            <BarChart3 className="w-4 h-4 text-[#71717A]" />
          </div>
          <p className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9]">
            {analytics.monthlyVisitors.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-[#A1A1AA] mt-1 font-mono block">
            Agustus 2026
          </span>
        </div>

        <div className="p-4 md:p-5 bg-[#1A1A1E] border border-[#27272A] col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs mb-2">
            <span className="uppercase tracking-wider text-[10px]">Total Page Views</span>
            <Eye className="w-4 h-4 text-[#71717A]" />
          </div>
          <p className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9]">
            {analytics.totalPageViews.toLocaleString('id-ID')}
          </p>
          <span className="text-[10px] text-[#A1A1AA] mt-1 font-mono block">
            Rata-rata 3.1 view/tamu
          </span>
        </div>
      </div>

      {/* Main Graph Card */}
      <div className="p-5 md:p-6 bg-[#1A1A1E] border border-[#27272A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#D4D2CB]" />
              <span>Grafik Tren Kunjungan</span>
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              Visualisasi jumlah penikmat kopi yang mengakses website atelier.
            </p>
          </div>

          {/* Time Range Filter Toggle */}
          <div className="flex items-center p-1 bg-[#141416] border border-[#27272A] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                timeRange === '7d'
                  ? 'bg-[#FBFBF9] text-[#141416]'
                  : 'text-[#A1A1AA] hover:text-[#FBFBF9]'
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                timeRange === '30d'
                  ? 'bg-[#FBFBF9] text-[#141416]'
                  : 'text-[#A1A1AA] hover:text-[#FBFBF9]'
              }`}
            >
              4 Minggu Terakhir
            </button>
          </div>
        </div>

        {/* Clean Artisanal SVG Chart */}
        <div className="relative w-full overflow-x-auto pt-4 pb-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-48 md:h-56 select-none overflow-visible"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBFBF9" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FBFBF9" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle Horizontal Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              return (
                <g key={ratio}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#27272A"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    fill="#71717A"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {Math.round(ratio * maxVisitors)}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Primary Curve Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#FBFBF9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((pt, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setHoveredPointIdx(idx)}
                onMouseLeave={() => setHoveredPointIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredPointIdx === idx ? 5 : 3.5}
                  fill={hoveredPointIdx === idx ? '#FFFFFF' : '#141416'}
                  stroke="#FBFBF9"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                <text
                  x={pt.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fill={hoveredPointIdx === idx ? '#FBFBF9' : '#71717A'}
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  {pt.date}
                </text>
              </g>
            ))}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoveredPointIdx !== null && points[hoveredPointIdx] && (
            <div className="absolute top-2 right-4 bg-[#141416] border border-[#3F3F46] p-2.5 px-3 shadow-lg pointer-events-none animate-in fade-in text-xs space-y-0.5">
              <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-mono">
                {points[hoveredPointIdx].fullDate}
              </p>
              <div className="flex items-center space-x-3 text-[#FBFBF9]">
                <span>
                  <strong className="font-serif-display text-base">
                    {points[hoveredPointIdx].visitors}
                  </strong>{' '}
                  pengunjung
                </span>
                <span className="text-[#A1A1AA] font-mono text-[11px]">
                  {points[hoveredPointIdx].pageViews} views
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two-Column Section Breakdown & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Breakdown */}
        <div className="p-5 md:p-6 bg-[#1A1A1E] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h3 className="text-sm font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#D4D2CB]" />
              <span>Section Paling Diminati</span>
            </h3>
            <span className="text-[10px] text-[#71717A] uppercase tracking-wider">
              % Minat
            </span>
          </div>

          <div className="space-y-3.5">
            {analytics.topSections.map((sec) => (
              <div key={sec.sectionId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#D4D2CB] font-medium">{sec.name}</span>
                  <span className="text-[#A1A1AA] font-mono">
                    {sec.views.toLocaleString('id-ID')} views ({sec.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#141416] overflow-hidden">
                  <div
                    className="h-full bg-[#FBFBF9]"
                    style={{ width: `${sec.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Peak Hours */}
        <div className="space-y-6">
          {/* Device Distribution */}
          <div className="p-5 md:p-6 bg-[#1A1A1E] border border-[#27272A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-sm font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-[#D4D2CB]" />
                <span>Distribusi Perangkat Pengunjung</span>
              </h3>
              <span className="text-[10px] text-[#71717A]">Hardware</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {analytics.deviceDistribution.map((d) => (
                <div
                  key={d.device}
                  className="p-3 bg-[#141416] border border-[#27272A] text-center"
                >
                  <div className="flex justify-center mb-1.5 text-[#A1A1AA]">
                    {d.device.includes('Mobile') ? (
                      <Smartphone className="w-4 h-4 text-[#FBFBF9]" />
                    ) : d.device.includes('Desktop') ? (
                      <Laptop className="w-4 h-4 text-[#D4D2CB]" />
                    ) : (
                      <Tablet className="w-4 h-4 text-[#A1A1AA]" />
                    )}
                  </div>
                  <p className="font-serif-display text-xl font-medium text-[#FBFBF9]">
                    {d.percentage}%
                  </p>
                  <p className="text-[10px] text-[#71717A] truncate mt-0.5">{d.device}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours Breakdown */}
          <div className="p-5 md:p-6 bg-[#1A1A1E] border border-[#27272A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-sm font-medium text-[#FBFBF9] tracking-wide flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4D2CB]" />
                <span>Jam Sibuk Akses Online</span>
              </h3>
              <span className="text-[10px] text-[#71717A]">WIB</span>
            </div>

            <div className="space-y-2.5">
              {analytics.peakHours.map((h) => (
                <div
                  key={h.timeRange}
                  className="flex items-center justify-between text-xs py-1"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[#FBFBF9] text-[11px] w-28">
                      {h.timeRange}
                    </span>
                    <span className="text-[#A1A1AA] text-[11px]">{h.label}</span>
                  </div>
                  <div className="w-24 h-1.5 bg-[#141416] ml-2">
                    <div
                      className="h-full bg-[#E5E2DC]"
                      style={{ width: `${h.intensityPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
