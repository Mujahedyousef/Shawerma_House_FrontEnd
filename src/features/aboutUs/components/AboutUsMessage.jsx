import React from 'react';
import { motion } from 'framer-motion';

const AboutUsMessage = ({ settings, isRTL, getImageUrl }) => {
  const messageTitle = isRTL ? settings.messageSectionTitleAr : settings.messageSectionTitleEn;
  const messageText = isRTL ? settings.messageTextAr : settings.messageTextEn;
  const messageBannerText = isRTL ? settings.messageBannerTextAr : settings.messageBannerTextEn;
  const messageImageSrc = getImageUrl(settings.messageImageUrl);

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Two-Column Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch mb-8`} dir="ltr">
          {/* Image Column - Left in English, Right in Arabic */}
          <motion.div
            className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} flex flex-col gap-4 md:gap-6`}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden flex-shrink-0">
              <img src={messageImageSrc} alt={messageTitle} className="w-full h-full object-cover" />
            </div>

            {/* Banner Card - Same width as image */}
            {messageBannerText && (
              <motion.div
                className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 w-full flex-shrink-0 border border-[var(--color-border)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className={`text-[var(--color-text)] text-base md:text-lg leading-relaxed whitespace-pre-line ${isRTL ? 'text-right' : 'text-left'}`}>
                  {messageBannerText}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Text Card Column - Right in English, Left in Arabic */}
          <motion.div
            className={`${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'} flex`}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[var(--color-surface-elevated)] rounded-2xl p-6 md:p-8 shadow-lg w-full flex flex-col h-full">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">{messageTitle}</h2>
              <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">{messageText}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsMessage;
