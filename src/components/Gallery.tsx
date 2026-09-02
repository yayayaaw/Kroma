import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';
import { CafeGalleryItem } from '../../cms/types/cmsTypes';

export const Gallery: React.FC = () => {
  const { data } = useCmsData();
  const { gallery } = data;
  const photos = gallery.items;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto: CafeGalleryItem | null =
    selectedPhotoIndex !== null && photos[selectedPhotoIndex]
      ? photos[selectedPhotoIndex]
      : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowLeft' && photos.length > 0) {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
      }
      if (e.key === 'ArrowRight' && photos.length > 0) {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section
      id="galeri"
      className="py-24 md:py-32 bg-[#FBFBF9] text-[#141416]"
      style={{
        backgroundColor: 'var(--color-bg-main, #FBFBF9)',
        color: 'var(--color-text-main, #141416)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#141416]/40"></span>
              <span
                className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                {gallery.sectionLabel || 'Dokumentasi Visual'}
              </span>
            </div>
            <h2
              id="gallery-title"
              className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] leading-[1.15]"
              style={{ color: 'var(--color-text-main, #141416)' }}
            >
              {gallery.sectionTitle || 'Sudut Ruang & Atmosfer'}
            </h2>
            <p
              className="mt-3 text-sm md:text-base text-[#737373] font-light leading-relaxed"
              style={{ color: 'var(--color-text-muted, #737373)' }}
            >
              {gallery.sectionDescription ||
                'Menyelami detail arsitektur, kesibukan barista di balik meja slow bar, hingga ketenangan yang dihadirkan bagi setiap pengunjung.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#737373] tracking-wider self-start md:self-end">
            <Camera className="w-3.5 h-3.5" />
            <span>{photos.length} Foto Arsip</span>
          </div>
        </div>

        {/* Vertical Editorial Gallery Grid - Scrolls naturally downwards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {photos.map((photo, index) => {
            const aspectClass =
              photo.aspect === 'landscape'
                ? 'aspect-[16/10]'
                : photo.aspect === 'portrait'
                ? 'aspect-[3/4]'
                : 'aspect-square';

            return (
              <div
                key={photo.id || index}
                id={`gallery-item-${photo.id || index}`}
                className="cursor-pointer group flex flex-col justify-between bg-[#FBFBF9] border border-[#E5E2DC] transition-all duration-300 hover:border-[#141416] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] select-none overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-surface, #FBFBF9)',
                  borderColor: 'var(--color-border, #E5E2DC)',
                }}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                {/* Photo container */}
                <div className={`relative ${aspectClass} overflow-hidden bg-[#EFECE6]`}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                    loading="lazy"
                  />
                  {/* Subtle Zoom Indicator on Hover */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white/90 text-[#141416] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Visible Editorial Caption & Category */}
                <div
                  className="p-4 sm:p-5 border-t border-[#E5E2DC] flex items-center justify-between gap-3"
                  style={{ borderColor: 'var(--color-border, #E5E2DC)' }}
                >
                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-[#737373] block font-mono mb-1 truncate"
                      style={{ color: 'var(--color-text-muted, #737373)' }}
                    >
                      {photo.category}
                    </span>
                    <h3
                      className="font-serif-display text-base sm:text-lg text-[#141416] font-normal truncate"
                      style={{ color: 'var(--color-text-main, #141416)' }}
                    >
                      {photo.title}
                    </h3>
                  </div>
                  <span
                    className="shrink-0 text-xs font-mono text-[#737373] group-hover:text-[#141416] transition-colors"
                    style={{ color: 'var(--color-text-muted, #737373)' }}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 transition-opacity"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="cursor-pointer absolute top-6 right-6 z-10 text-white/70 hover:text-white p-2 transition-colors"
            aria-label="Tutup Galeri"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className="cursor-pointer absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xs transition-colors"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            type="button"
            onClick={handleNext}
            className="cursor-pointer absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xs transition-colors"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain shadow-2xl"
            />
            <div className="mt-6 text-center text-[#FBFBF9] max-w-xl">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] block mb-1 font-mono">
                {activePhoto.category}
              </span>
              <h4 className="font-serif-display text-2xl font-normal text-white">
                {activePhoto.title}
              </h4>
              {activePhoto.caption && (
                <p className="mt-2 text-sm text-[#D4D2CB]/80 font-light leading-relaxed">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
