import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTermsAndConditionsPage } from '../../hooks/useTermsAndConditionsPage';
import { getImageUrl } from '../../utils/imageUrl';

const TermsAndConditionsPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, loading } = useTermsAndConditionsPage();

  // Get title based on language
  const getTitle = () => {
    if (settings) {
      return isRTL ? settings.titleAr : settings.titleEn;
    }
    return isRTL ? 'الشروط والأحكام' : 'Terms and Conditions';
  };

  // Get description based on language
  const getDescription = () => {
    if (settings) {
      return isRTL ? settings.descriptionAr : settings.descriptionEn;
    }
    return '';
  };

  // Get content based on language
  const getContent = () => {
    if (settings) {
      return isRTL ? settings.contentAr : settings.contentEn;
    }
    return '';
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-[var(--color-text)]">Failed to load terms and conditions page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width with Background Image */}
      <section className="relative w-full min-h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src={getImageUrl(settings?.heroImageUrl || '')} alt="Terms and Conditions" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 w-full h-full bg-black/50 z-1" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-2 flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-16">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {getTitle()}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {getDescription()}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-4 md:py-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <motion.div
            className="p-6 md:p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Rich Text Content */}
            {getContent() && (
              <div
                className={`terms-content prose prose-lg max-w-none ${
                  isRTL ? 'prose-rtl' : ''
                } prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-text-muted)] prose-strong:text-[var(--color-text)] prose-li:text-[var(--color-text-muted)]`}
                dangerouslySetInnerHTML={{ __html: getContent() }}
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{
                  color: 'var(--color-text-muted)',
                }}
              />
            )}

            {!getContent() && (
              <div className="text-center py-12">
                <p className="text-[var(--color-text-muted)]">{isRTL ? 'لا يوجد محتوى متاح حالياً' : 'No content available at the moment'}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
