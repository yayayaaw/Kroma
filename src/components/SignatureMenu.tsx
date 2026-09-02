import React, { useState } from 'react';
import { useCmsData } from '../../cms/data/cmsStore';

export const SignatureMenu: React.FC = () => {
  const { data } = useCmsData();
  const { menu } = data;

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMenus =
    activeFilter === 'all'
      ? menu.items
      : menu.items.filter((item) => item.category === activeFilter);

  return (
    <section id="menu" className="py-28 md:py-36 bg-[#F5F4F0] text-[#141416]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header with Title and Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-[#141416]/40"></span>
              <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium">
                {menu.sectionLabel || 'Pilihan Barista'}
              </span>
            </div>
            <h2
              id="menu-section-title"
              className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] leading-[1.15]"
            >
              {menu.sectionTitle || 'Signature Menu'}
            </h2>
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {menu.categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                id={`menu-filter-${cat.key}`}
                onClick={() => setActiveFilter(cat.key)}
                className={`cursor-pointer px-4 py-2 text-xs tracking-wider transition-all duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-[#141416] text-[#FBFBF9]'
                    : 'bg-transparent text-[#737373] hover:text-[#141416] hover:bg-[#EFECE6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredMenus.map((item) => (
            <article
              key={item.id}
              id={`menu-card-${item.id}`}
              className="group flex flex-col justify-between bg-[#FBFBF9] border border-[#E5E2DC] transition-all duration-300 hover:border-[#141416] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              {/* Product Visual */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE6]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                />
                {item.isSignature && (
                  <div className="absolute top-4 left-4 bg-[#141416] text-[#FBFBF9] text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                    Signature
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-7 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="font-serif-display text-xl md:text-2xl font-normal text-[#141416] leading-snug">
                      {item.name}
                    </h3>
                    <span className="font-serif-display text-lg text-[#141416] font-normal whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-sm text-[#4A4A4F] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footnote / Tasting Notes */}
                {item.notes && (
                  <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-[11px] tracking-wider uppercase text-[#737373]">
                    <span>{item.notes}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Footnote on Dietary or Roasting Precision */}
        <div className="mt-16 pt-8 border-t border-[#E5E2DC] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#737373] tracking-wider gap-4">
          <p>{menu.footnote}</p>
          <p className="font-medium text-[#141416]">{menu.taxNote}</p>
        </div>
      </div>
    </section>
  );
};
