import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../../components/ui/SectionHeader';

const CareersWhyWorkWithUs = ({ settings, isRTL }) => {
  const sectionTitle = isRTL ? settings?.whyWorkWithUsTitleAr : settings?.whyWorkWithUsTitleEn;
  const items = settings?.whyWorkWithUsItems || [];

  if (!sectionTitle || items.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-section-light)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <SectionHeader
          title={sectionTitle}
          align="center"
          color="text-[var(--color-text-on-light)]"
          subTitleColor="text-[var(--color-text-muted)]"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, index) => {
            const title = isRTL ? item.titleAr : item.titleEn;
            const description = isRTL ? item.descriptionAr : item.descriptionEn;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--color-card-surface)] rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className={`text-xl md:text-2xl font-bold text-[var(--color-text)] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {title}
                </h3>
                <p className={`text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareersWhyWorkWithUs;
