import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';
import { MenuItemData } from '../../cms/types/cmsTypes';

export const SignatureMenu: React.FC = () => {
  const { data } = useCmsData();
  const { menu } = data;

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMenus =
    activeFilter === 'all'
      ? menu.items
      : menu.items.filter((item) => item.category === activeFilter);

  // Split menus into 2 horizontal rows
  const mid = Math.ceil(filteredMenus.length / 2);
  const row1Items = filteredMenus.slice(0, mid);
  const row2Items = filteredMenus.slice(mid);

  const renderMenuCard = (item: MenuItemData) => (
    <article
      key={item.id}
      id={`menu-card-${item.id}`}
      className="group w-[240px] sm:w-[280px] md:w-[300px] shrink-0 flex flex-col bg-[#FBFBF9] border border-[#E5E2DC] transition-all duration-300 hover:border-[#141416] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] select-none overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-surface, #FBFBF9)',
        borderColor: 'var(--color-border, #E5E2DC)',
      }}
    >
      {/* Product Visual */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE6]">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
          loading="lazy"
        />
        {item.isSignature && (
          <div
            className="absolute top-3 left-3 bg-[#141416] text-[#FBFBF9] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium flex items-center space-x-1"
            style={{
              backgroundColor: 'var(--color-primary, #141416)',
              color: 'var(--color-secondary, #FBFBF9)',
            }}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Signature</span>
          </div>
        )}
      </div>

      {/* Product Info: Hanya Nama dan Harga */}
      <div
        className="p-4 sm:p-5 border-t border-[#E5E2DC] flex items-center justify-between gap-3"
        style={{ borderColor: 'var(--color-border, #E5E2DC)' }}
      >
        <h3
          className="font-serif-display text-base sm:text-lg font-normal text-[#141416] leading-snug truncate"
          style={{ color: 'var(--color-text-main, #141416)' }}
        >
          {item.name}
        </h3>
        <span
          className="font-serif-display text-sm sm:text-base text-[#141416] font-normal whitespace-nowrap shrink-0"
          style={{ color: 'var(--color-text-main, #141416)' }}
        >
          {item.price}
        </span>
      </div>
    </article>
  );

  return (
    <section
      id="menu"
      className="py-24 md:py-32 bg-[#F5F4F0] text-[#141416] overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
        color: 'var(--color-text-main, #141416)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header with Title and Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#141416]/40"></span>
              <span
                className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                {menu.sectionLabel || 'Pilihan Barista'}
              </span>
            </div>
            <h2
              id="menu-section-title"
              className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] leading-[1.15]"
              style={{ color: 'var(--color-text-main, #141416)' }}
            >
              {menu.sectionTitle || 'Signature Menu'}
            </h2>
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {menu.categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                id={`menu-filter-${cat.key}`}
                onClick={() => setActiveFilter(cat.key)}
                className={`cursor-pointer px-3.5 py-1.5 text-xs tracking-wider transition-all duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-[#141416] text-[#FBFBF9]'
                    : 'bg-transparent text-[#737373] hover:text-[#141416] hover:bg-[#EFECE6]'
                }`}
                style={
                  activeFilter === cat.key
                    ? {
                        backgroundColor: 'var(--color-primary, #141416)',
                        color: 'var(--color-secondary, #FBFBF9)',
                      }
                    : undefined
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredMenus.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#737373]">
            Tidak ada menu yang tersedia untuk kategori ini.
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* BARIS 1 */}
            {row1Items.length > 0 && (
              <div
                className="flex overflow-x-auto gap-5 md:gap-6 pb-2 scroll-smooth touch-pan-x"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {row1Items.map(renderMenuCard)}
              </div>
            )}

            {/* BARIS 2 */}
            {row2Items.length > 0 && (
              <div
                className="flex overflow-x-auto gap-5 md:gap-6 pb-2 scroll-smooth touch-pan-x"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {row2Items.map(renderMenuCard)}
              </div>
            )}
          </div>
        )}

        {/* Footnote on Dietary or Roasting Precision */}
        <div
          className="mt-14 pt-6 border-t border-[#E5E2DC] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#737373] tracking-wider gap-4"
          style={{ borderColor: 'var(--color-border, #E5E2DC)' }}
        >
          <p>{menu.footnote}</p>
          <p
            className="font-medium text-[#141416]"
            style={{ color: 'var(--color-text-main, #141416)' }}
          >
            {menu.taxNote}
          </p>
        </div>
      </div>
    </section>
  );
};
