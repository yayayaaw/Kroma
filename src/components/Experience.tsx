import React from 'react';
import { Coffee, Compass, UtensilsCrossed, Users, Award, Heart, Sparkles } from 'lucide-react';
import { useCmsData } from '../../cms/data/cmsStore';

export const Experience: React.FC = () => {
  const { data } = useCmsData();
  const { experience } = data;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#141416]" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-[#141416]" />;
      case 'utensils':
        return <UtensilsCrossed className="w-5 h-5 text-[#141416]" />;
      case 'users':
        return <Users className="w-5 h-5 text-[#141416]" />;
      case 'award':
        return <Award className="w-5 h-5 text-[#141416]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#141416]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#141416]" />;
      default:
        return <Coffee className="w-5 h-5 text-[#141416]" />;
    }
  };

  return (
    <section id="pengalaman" className="py-28 md:py-36 bg-[#F5F4F0] text-[#141416]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#141416]/40"></span>
            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#737373] font-medium">
              {experience.sectionLabel || 'Nilai & Komitmen'}
            </span>
          </div>
          <h2
            id="experience-title"
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#141416] tracking-[-0.01em] max-w-2xl leading-[1.15]"
          >
            {experience.sectionTitle || 'Diciptakan dengan Perhatian pada Setiap Detail.'}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {experience.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 bg-[#FBFBF9] border border-[#E5E2DC] transition-all duration-300 hover:border-[#141416]"
            >
              <div>
                {/* Header: Number & Minimal Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif-display text-3xl text-[#737373] font-light">
                    {item.number}
                  </span>
                  <div className="p-2 bg-[#F5F4F0]">
                    {getIcon(item.iconType)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif-display text-2xl font-normal text-[#141416] mb-1">
                  {item.title}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#737373] block mb-4">
                  {item.subtitle}
                </span>

                {/* Description */}
                <p className="text-sm text-[#4A4A4F] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Geometric Accent */}
              <div className="pt-8 mt-8 border-t border-[#E5E2DC]/60 flex items-center justify-between">
                <span className="w-4 h-[1px] bg-[#141416]/30"></span>
                <span className="text-[10px] tracking-widest uppercase text-[#A1A1AA]">
                  KROMA Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
