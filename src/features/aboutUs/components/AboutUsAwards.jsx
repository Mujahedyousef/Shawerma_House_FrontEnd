import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../../components/ui/SectionHeader';

const AboutUsAwards = ({ settings, isRTL, getImageUrl }) => {
  const sectionTitle = isRTL ? settings?.awardsSectionTitleAr : settings?.awardsSectionTitleEn;
  const sectionSubtitle = isRTL ? settings?.awardsSectionSubtitleAr : settings?.awardsSectionSubtitleEn;
  const awards = settings?.awards || [];

  if (!sectionTitle || awards.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <SectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          align={isRTL ? 'right' : 'left'}
          color="text-[var(--color-text)]"
          subTitleColor="text-[var(--color-text-muted)]"
        />

        {/* Awards List */}
        <div className="space-y-0">
          {awards.map((award, index) => {
            const title = isRTL ? award.titleAr : award.titleEn;
            const description = isRTL ? award.descriptionAr : award.descriptionEn;
            const logoSrc = award.logoUrl ? getImageUrl(award.logoUrl) : null;

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 md:gap-8 py-6 md:py-8 ${
                  index !== awards.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                }`}
              >
                {/* Logo */}
                {logoSrc && (
                  <div className={`flex-shrink-0 ${isRTL ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-[var(--color-card)] rounded-lg p-4">
                      <img src={logoSrc} alt={title} className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`flex-1 ${isRTL ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}`}>
                  {/* Year */}
                  <div className="mb-2">
                    <span className="text-sm md:text-base text-[var(--color-text-muted)] font-medium">{award.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-3">{title}</h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUsAwards;
