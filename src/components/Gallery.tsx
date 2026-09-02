import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Helper to determine grid span based on aspect ratio or index
  const getColSpan = (photo: CafeGalleryItem, index: number) => {
    if (photo.aspect === 'landscape' && index % 4 === 0) return 'md:col-span-8';
    if (photo.aspect === 'portrait') return 'md:col-span-4';
    if (photo.aspect === 'square') return 'md:col-span-4';
    return 'md:col-span-4';
  };

  const getAspectClass = (photo: CafeGalleryItem, index: number) => {
    if (photo.aspect === 'landscape' && index % 4 === 0) return 'aspect-[16/10]';
    if (photo.aspect === 'portrait') return 'aspect-[3/4]';
    if (photo.aspect === 'square') return 'aspect-square';
    return 'aspect-[4/3]';
  };

  return (
    <section id="galeri" className="py-28 md:py-36 bg-[#FBFBF9] text-[#141416]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#141416]/40"></span>
            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium">
              {gallery.sectionLabel || 'Dokumentasi Visual'}
            </span>
          </div>
          <h2
            id="gallery-title"
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] leading-[1.15]"
          >
            {gallery.sectionTitle || 'Sudut Ruang & Atmosfer'}
          </h2>
          <p className="mt-4 text-base text-[#737373] font-light leading-relaxed">
            {gallery.sectionDescription}
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {photos.map((photo, index) => {
            const colSpan = getColSpan(photo, index);
            const aspectClass = getAspectClass(photo, index);

            return (
              <div
                key={photo.id}
                className={`${colSpan} cursor-pointer group relative overflow-hidden bg-[#EFECE6]`}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <div className={`${aspectClass} overflow-hidden`}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                  />
                </div>

                {/* Subtle Hover Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6 md:p-8 text-[#FBFBF9]">
                  <div className="flex justify-end">
                    <span className="p-2 bg-white/10 backdrop-blur-xs rounded-full">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4D2CB] block mb-1">
                      {photo.category}
                    </span>
                    <h3 className="font-serif-display text-xl md:text-2xl text-white font-normal">
                      {photo.title}
                    </h3>
                  </div>
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
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] block mb-1">
                {activePhoto.category}
              </span>
              <h4 className="font-serif-display text-2xl font-normal text-white">
                {activePhoto.title}
              </h4>
              <p className="mt-2 text-sm text-[#D4D2CB]/80 font-light leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
