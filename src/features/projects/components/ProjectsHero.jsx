import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';

const ProjectsHero = ({ settings }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const heroTitle = settings ? (isRTL ? settings.heroTitleAr : settings.heroTitleEn) : isRTL ? 'مشاريعنا التي نفتخر بها' : 'Our Projects We Are Proud Of';

  const heroDescription = settings ? (isRTL ? settings.heroDescriptionAr : settings.heroDescriptionEn) : '';

  const heroImageUrl = settings?.heroImageUrl ? getImageUrl(settings.heroImageUrl) : null;
  const heroButtons = settings?.heroButtons || [];
  const activeButtons = heroButtons.filter(btn => btn.isActive).sort((a, b) => a.order - b.order);

  return (
    <div className="relative w-full" style={{ height: '450px' }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {heroImageUrl && <img src={heroImageUrl} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />}
        {/* Smooth gradient overlay - starts almost black at bottom, fades to transparent at top */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 80%, rgba(2,6,23,0.98) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-16">
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
            {heroTitle}
          </motion.h1>

          {/* Description */}
          {heroDescription && (
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroDescription}
            </motion.p>
          )}

          {/* Hero Buttons */}
          {activeButtons.length > 0 && (
            <motion.div
              className={`flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {activeButtons.map(button => {
                const buttonText = isRTL ? button.textAr : button.textEn;
                const ButtonComponent = button.link ? 'a' : 'button';

                return (
                  <ButtonComponent
                    key={button.id}
                    href={button.link || undefined}
                    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/20 transition-all text-sm md:text-base font-medium ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Menu size={16} className="shrink-0" />
                    <span>{buttonText}</span>
                  </ButtonComponent>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsHero;
