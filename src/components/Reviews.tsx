import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';

export const Reviews: React.FC = () => {
  const { data } = useCmsData();
  const { reviews } = data;

  if (!reviews || !reviews.items || reviews.items.length === 0) {
    return null;
  }

  // Calculate average rating
  const totalReviews = reviews.items.length;
  const avgRating = (
    reviews.items.reduce((acc, item) => acc + (item.rating || 5), 0) / (totalReviews || 1)
  ).toFixed(1);

  return (
    <section
      id="ulasan"
      className="py-24 md:py-32 px-6 md:px-10 border-t border-[#E5E2DC]"
      style={{
        backgroundColor: 'var(--color-bg-main, #FBFBF9)',
        borderColor: 'var(--color-border, #E5E2DC)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-[#E5E2DC]/80">
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <span
                className="w-2 h-2 rounded-full bg-[#141416]"
                style={{ backgroundColor: 'var(--color-primary, #141416)' }}
              />
              <span
                className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#737373]"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                {reviews.sectionLabel || 'Apa Kata Mereka'}
              </span>
            </div>
            <h2
              className="font-serif-display text-3xl md:text-5xl font-normal text-[#141416] tracking-tight max-w-xl"
              style={{ color: 'var(--color-text-main, #141416)' }}
            >
              {reviews.sectionTitle || 'Ulasan & Pengalaman Tamu'}
            </h2>
            {reviews.sectionSubtitle && (
              <p
                className="mt-4 text-sm md:text-base text-[#737373] max-w-xl font-light leading-relaxed"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                {reviews.sectionSubtitle}
              </p>
            )}
          </div>

          {/* Social Proof Summary Badge */}
          <div className="mt-8 md:mt-0 flex items-center space-x-4 bg-[#F5F4F0] p-4 px-6 border border-[#E5E2DC] self-start md:self-auto">
            <div className="text-right">
              <div className="flex items-center space-x-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#141416] text-[#141416]"
                    style={{
                      fill: 'var(--color-primary, #141416)',
                      color: 'var(--color-primary, #141416)',
                    }}
                  />
                ))}
              </div>
              <p
                className="text-[11px] font-mono tracking-wider text-[#737373] mt-1"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                Skor Kepuasan Tamu
              </p>
            </div>
            <div className="h-9 w-px bg-[#D4D2CB]" />
            <div>
              <span
                className="font-serif-display text-3xl font-medium text-[#141416] leading-none"
                style={{ color: 'var(--color-text-main, #141416)' }}
              >
                {avgRating}
              </span>
              <span
                className="text-xs text-[#737373] ml-1 font-mono"
                style={{ color: 'var(--color-text-muted, #737373)' }}
              >
                / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.items.map((review, idx) => (
            <div
              key={review.id || idx}
              id={`review-card-${review.id || idx}`}
              className="group relative flex flex-col justify-between p-8 bg-[#F5F4F0] border border-[#E5E2DC] transition-all duration-300 hover:border-[#141416]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              style={{
                backgroundColor: 'var(--color-bg-surface, #F5F4F0)',
                borderColor: 'var(--color-border, #E5E2DC)',
              }}
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? 'fill-[#141416] text-[#141416]'
                            : 'fill-transparent text-[#D4D2CB]'
                        }`}
                        style={
                          i < review.rating
                            ? {
                                fill: 'var(--color-primary, #141416)',
                                color: 'var(--color-primary, #141416)',
                              }
                            : undefined
                        }
                      />
                    ))}
                  </div>
                  <Quote
                    className="w-5 h-5 text-[#D4D2CB] group-hover:text-[#141416] transition-colors"
                    style={{ color: 'var(--color-border, #D4D2CB)' }}
                  />
                </div>

                {/* Review Text */}
                <p
                  className="font-serif-display text-lg md:text-xl text-[#141416] leading-relaxed italic mb-6"
                  style={{ color: 'var(--color-text-main, #141416)' }}
                >
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#E5E2DC] flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover grayscale contrast-125 border border-[#D4D2CB]"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full bg-[#141416] text-[#FBFBF9] flex items-center justify-center font-serif-display text-base"
                      style={{
                        backgroundColor: 'var(--color-primary, #141416)',
                        color: 'var(--color-secondary, #FBFBF9)',
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4
                        className="text-xs font-semibold tracking-wider text-[#141416]"
                        style={{ color: 'var(--color-text-main, #141416)' }}
                      >
                        {review.name}
                      </h4>
                      <CheckCircle2
                        className="w-3 h-3 text-[#737373]"
                        title="Tamu Terverifikasi"
                      />
                    </div>
                    {review.roleOrVisit && (
                      <p
                        className="text-[10px] text-[#737373] tracking-wide"
                        style={{ color: 'var(--color-text-muted, #737373)' }}
                      >
                        {review.roleOrVisit}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className="text-[10px] font-mono text-[#8C8A84] tracking-tight"
                  style={{ color: 'var(--color-text-muted, #8C8A84)' }}
                >
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
