import React from 'react';
import { motion } from 'framer-motion';

const AboutUsVision = ({ settings, isRTL, getImageUrl }) => {
  const visionTitle = isRTL ? settings.visionSectionTitleAr : settings.visionSectionTitleEn;
  const visionText = isRTL ? settings.visionTextAr : settings.visionTextEn;
  const visionImageSrc = getImageUrl(settings.visionImageUrl);
  const quoteText = isRTL ? settings.visionQuoteTextAr : settings.visionQuoteTextEn;
  const authorName = isRTL ? settings.visionQuoteAuthorNameAr : settings.visionQuoteAuthorNameEn;
  const authorTitle = isRTL ? settings.visionQuoteAuthorTitleAr : settings.visionQuoteAuthorTitleEn;
  const authorImageSrc = settings.visionQuoteAuthorImageUrl ? getImageUrl(settings.visionQuoteAuthorImageUrl) : null;

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center `}>
          {/* Text Content */}
          <motion.div className={`space-y-6 `} initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)]">{visionTitle}</h2>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">{visionText}</p>
          </motion.div>

          {/* Image with Quote Overlay */}
          <motion.div
            className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img src={visionImageSrc} alt={visionTitle} className="w-full h-full object-cover" />

              {/* Quote/Testimonial Overlay */}
              {quoteText && (
                <div className={`absolute bottom-0 w-full bg-[var(--color-card)]/90 backdrop-blur-sm p-6 md:p-8 rounded-t-2xl border-t border-[var(--color-border)] ${isRTL ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
                  <p className="text-[var(--color-text)] text-base md:text-lg mb-4 leading-relaxed">{quoteText}</p>

                  {/* Author Info */}
                  {(authorName || authorImageSrc) && (
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {authorImageSrc && (
                        <img src={authorImageSrc} alt={authorName || 'Author'} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-border)]" />
                      )}
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        {authorName && <p className="text-[var(--color-text)] font-semibold text-sm md:text-base">{authorName}</p>}
                        {authorTitle && <p className="text-[var(--color-text-muted)] text-xs md:text-sm">{authorTitle}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsVision;
