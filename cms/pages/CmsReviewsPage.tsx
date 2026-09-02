import React, { useState } from 'react';
import {
  Star,
  Trash2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { CustomerReview } from '../types/cmsTypes';
import { useCmsData } from '../data/cmsStore';
import { INITIAL_CAFE_DATA } from '../data/defaultData';

export const CmsReviewsPage: React.FC = () => {
  const { data, updateSection } = useCmsData();
  const reviewsConfig = data.reviews || INITIAL_CAFE_DATA.reviews;
  const items = reviewsConfig.items || [];

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Statistics calculation
  const totalReviews = items.length;
  const count5 = items.filter((r) => r.rating === 5).length;
  const count4 = items.filter((r) => r.rating === 4).length;
  const count3OrBelow = items.filter((r) => r.rating <= 3).length;
  const avgRating = totalReviews > 0
    ? (items.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
    : '0.0';

  const handleDeleteReview = (id: string) => {
    const remaining = items.filter((r) => r.id !== id);
    const updatedConfig = {
      ...reviewsConfig,
      items: remaining,
    };
    updateSection('reviews', updatedConfig);
    setDeleteConfirmId(null);
    setSuccessMessage('Ulasan berhasil dihapus.');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleResetDefaultReviews = () => {
    updateSection('reviews', INITIAL_CAFE_DATA.reviews);
    setSuccessMessage('Daftar ulasan contoh berhasil dipulihkan.');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#27272A] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
            <span>Konten & Reputasi</span>
            <span>•</span>
            <span className="text-[#FBFBF9]">Ulasan Pelanggan</span>
          </div>
          <h1 className="font-serif-display text-2xl md:text-3xl font-medium text-[#FBFBF9] tracking-wide">
            Manajemen Ulasan Tamu
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Pantau testimoni, kepuasan pengunjung, dan kelola daftar ulasan yang ditampilkan di landing page.
          </p>
        </div>

        {items.length < INITIAL_CAFE_DATA.reviews.items.length && (
          <button
            type="button"
            onClick={handleResetDefaultReviews}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-medium border border-[#3F3F46] bg-[#1E1E22] text-[#FBFBF9] hover:bg-[#27272A] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Pulihkan Contoh Ulasan</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-[#14261C] border border-[#22543D] text-[#86EFAC] text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Integrity Notice Banner (User Rule: Owner cannot edit reviews) */}
      <div className="p-4 bg-[#1E1E22] border border-[#3F3F46] text-[#D4D2CB] text-xs leading-relaxed flex items-start space-x-3">
        <ShieldAlert className="w-4 h-4 text-[#A1A1AA] shrink-0 mt-0.5" />
        <div>
          <span className="font-medium text-[#FBFBF9]">Kebijakan Integritas Ulasan: </span>
          Demi menjaga keaslian dan transparansi publik, pemilik bisnis tidak dapat mengedit isi pesan, nama, atau rating bintang dari pelanggan. Anda hanya memiliki opsi untuk meninjau atau menghapus ulasan yang tidak relevan.
        </div>
      </div>

      {/* Statistics Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <div className="p-4 bg-[#1A1A1E] border border-[#27272A]">
          <p className="text-[11px] text-[#A1A1AA] tracking-wider uppercase">Total Ulasan</p>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="font-serif-display text-3xl font-medium text-[#FBFBF9]">
              {totalReviews}
            </span>
            <span className="text-[11px] text-[#71717A]">testimoni</span>
          </div>
        </div>

        <div className="p-4 bg-[#1A1A1E] border border-[#27272A]">
          <p className="text-[11px] text-[#A1A1AA] tracking-wider uppercase">Rata-rata Skor</p>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="font-serif-display text-3xl font-medium text-[#FBFBF9]">
              {avgRating}
            </span>
            <span className="text-[11px] text-[#71717A]">/ 5.0</span>
          </div>
          <div className="flex items-center space-x-0.5 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-[#FBFBF9] text-[#FBFBF9]"
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#1A1A1E] border border-[#27272A]">
          <p className="text-[11px] text-[#A1A1AA] tracking-wider uppercase">Bintang 5</p>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="font-serif-display text-3xl font-medium text-[#FBFBF9]">
              {count5}
            </span>
            <span className="text-[11px] text-[#71717A]">
              ({totalReviews > 0 ? Math.round((count5 / totalReviews) * 100) : 0}%)
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#1A1A1E] border border-[#27272A]">
          <p className="text-[11px] text-[#A1A1AA] tracking-wider uppercase">Bintang 4</p>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="font-serif-display text-3xl font-medium text-[#FBFBF9]">
              {count4}
            </span>
            <span className="text-[11px] text-[#71717A]">
              ({totalReviews > 0 ? Math.round((count4 / totalReviews) * 100) : 0}%)
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#1A1A1E] border border-[#27272A] col-span-2 md:col-span-1">
          <p className="text-[11px] text-[#A1A1AA] tracking-wider uppercase">≤ Bintang 3</p>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="font-serif-display text-3xl font-medium text-[#FBFBF9]">
              {count3OrBelow}
            </span>
            <span className="text-[11px] text-[#71717A]">
              ({totalReviews > 0 ? Math.round((count3OrBelow / totalReviews) * 100) : 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Table / Card List */}
      <div className="bg-[#1A1A1E] border border-[#27272A]">
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-[#A1A1AA]" />
            <h2 className="text-sm font-medium text-[#FBFBF9] tracking-wide">
              Daftar Ulasan Tamu ({items.length})
            </h2>
          </div>
          <span className="text-[11px] text-[#71717A]">Ditampilkan publik di section #ulasan</span>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-[#71717A] mx-auto" />
            <p className="text-sm text-[#A1A1AA]">Belum ada ulasan yang tersimpan.</p>
            <button
              type="button"
              onClick={handleResetDefaultReviews}
              className="px-4 py-2 bg-[#FBFBF9] text-[#141416] text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-[#E5E2DC]"
            >
              Muat Ulasan Bawaan
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#27272A]">
            {items.map((review) => (
              <div
                key={review.id}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#202025] transition-colors"
              >
                {/* Review Information */}
                <div className="flex items-start space-x-4 max-w-3xl">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover grayscale border border-[#3F3F46] shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#27272A] text-[#FBFBF9] flex items-center justify-center font-serif-display text-lg shrink-0">
                      {review.name.charAt(0)}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-[#FBFBF9]">
                        {review.name}
                      </span>
                      {review.roleOrVisit && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#27272A] text-[#A1A1AA] uppercase tracking-wider">
                          {review.roleOrVisit}
                        </span>
                      )}
                      <span className="text-[11px] text-[#71717A] font-mono ml-auto md:ml-0">
                        • {review.date}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? 'fill-[#FBFBF9] text-[#FBFBF9]'
                              : 'fill-transparent text-[#3F3F46]'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-[#D4D2CB] font-mono ml-1.5">
                        {review.rating}.0
                      </span>
                    </div>

                    <p className="text-xs text-[#D4D2CB] font-serif-display italic leading-relaxed pt-1">
                      "{review.comment}"
                    </p>
                  </div>
                </div>

                {/* Action Area */}
                <div className="shrink-0 flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#27272A]">
                  {deleteConfirmId === review.id ? (
                    <div className="flex items-center space-x-2 bg-[#2D1515] p-1.5 px-3 border border-[#7F1D1D] animate-in fade-in">
                      <span className="text-[11px] text-[#FCA5A5]">Yakin hapus?</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review.id)}
                        className="px-2.5 py-1 bg-[#DC2626] text-white text-[11px] font-medium hover:bg-[#B91C1C] cursor-pointer"
                      >
                        Ya, Hapus
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1 bg-[#374151] text-[#E5E7EB] text-[11px] hover:bg-[#4B5563] cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(review.id)}
                      className="flex items-center space-x-1.5 px-3 py-2 text-xs text-[#EF4444] hover:bg-[#2D1515] hover:text-[#F87171] border border-transparent hover:border-[#7F1D1D]/50 transition-colors cursor-pointer"
                      title="Hapus ulasan ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
