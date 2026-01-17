import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../../components/ui/SectionHeader';

const AboutUsCoreValues = ({ settings, isRTL, getImageUrl }) => {
  const sectionTitle = isRTL ? settings?.coreValuesSectionTitleAr : settings?.coreValuesSectionTitleEn;
  const sectionSubtitle = isRTL ? settings?.coreValuesSectionSubtitleAr : settings?.coreValuesSectionSubtitleEn;
  const coreValues = settings?.coreValues || [];

  if (!sectionTitle || coreValues.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full mx-auto px-4 md:px-8">
        {/* Header Section */}
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} align="center" color="text-[var(--color-text)]" subTitleColor="text-[var(--color-text-muted)]" />

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreValues.map((value, index) => {
            const title = isRTL ? value.titleAr : value.titleEn;
            const description = isRTL ? value.descriptionAr : value.descriptionEn;
            const imageSrc = value.imageUrl ? getImageUrl(value.imageUrl) : null;

            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col overflow-hidden rounded-lg space-y-2 "
              >
                {/* Top Bar with Title */}
                <div className="bg-[var(--color-card)] px-4 md:px-6 py-4 md:py-5  rounded-lg">
                  <h3 className={`text-xl md:text-2xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>
                </div>

                {/* Image */}
                {imageSrc && (
                  <div className="relative w-full h-[250px] md:h-[300px] bg-[var(--color-border)] rounded-lg overflow-hidden">
                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Bottom Card Banner */}
                {description && (
                  <div className="bg-[var(--color-card)] px-4 md:px-6 py-4 md:py-5 mt-auto rounded-lg border border-[var(--color-border)]">
                    <p className={`text-[var(--color-text)] text-sm md:text-base leading-relaxed whitespace-pre-line ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUsCoreValues;
