import React from 'react';
import { useCmsData } from '../../cms/data/cmsStore';

export const About: React.FC = () => {
  const { data } = useCmsData();
  const { about, branding } = data;

  return (
    <section id="tentang" className="py-28 md:py-36 bg-[#FBFBF9] text-[#141416]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header Tag */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#141416]/40"></span>
            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium">
              {about.label || 'Tentang Kami'}
            </span>
          </div>
          <h2
            id="about-title"
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] max-w-2xl leading-[1.15]"
          >
            {about.title}
          </h2>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo of Interior */}
          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="overflow-hidden bg-[#EFECE6]">
                <img
                  src={about.photo}
                  alt={`${branding.name} Interior & Slow Bar`}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] filter contrast-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#737373] tracking-wider">
                <span>{about.photoCaption}</span>
                <span>{about.photoLocation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-4">
            <div className="space-y-6 text-[#4A4A4F] text-base md:text-lg font-light leading-relaxed">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
              <p>{about.paragraph3}</p>
            </div>

            {/* Subtle Metrics / Badges without tacky cards */}
            {about.stats && about.stats.length > 0 && (
              <div
                className={`mt-12 pt-8 border-t border-[#E5E2DC] grid grid-cols-${Math.min(
                  about.stats.length,
                  3
                )} gap-6 text-center lg:text-left`}
              >
                {about.stats.map((stat) => (
                  <div key={stat.id}>
                    <span className="font-serif-display text-3xl md:text-4xl text-[#141416] block mb-1">
                      {stat.number}
                    </span>
                    <span className="text-[11px] text-[#737373] uppercase tracking-wider block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
