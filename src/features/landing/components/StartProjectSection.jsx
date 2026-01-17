import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useStartProjectSection } from '../../../hooks/useStartProjectSection';
import backgroundImage from '../../../assets/categories/9.jpg';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import { getImageUrl } from '../../../utils/imageUrl';

const StartProjectSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { startProjectData, loading } = useStartProjectSection();

  // Data Extraction
  const sectionTitle = startProjectData ? (isRTL ? startProjectData.titleAr : startProjectData.titleEn) : t('startProject.title');
  const sectionDescription = startProjectData ? (isRTL ? startProjectData.descriptionAr : startProjectData.descriptionEn) : t('startProject.description');
  const backgroundImageUrl = startProjectData?.backgroundImageUrl ? getImageUrl(startProjectData.backgroundImageUrl || '') : backgroundImage;
  const button1Text = startProjectData ? (isRTL ? startProjectData.button1TextAr : startProjectData.button1TextEn) : t('startProject.talkToExpert');
  const button1Link = startProjectData?.button1Link || null;
  const button2Text = startProjectData ? (isRTL ? startProjectData.button2TextAr : startProjectData.button2TextEn) : t('startProject.startOrder');
  const button2Link = startProjectData?.button2Link || null;

  if (loading && !startProjectData) return null;
  if (startProjectData && !startProjectData.isActive) return null;

  return (
    <section className="relative w-full py-24 md:py-36 overflow-hidden flex items-center justify-center">
      {/* 1. Immersive Background with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Heavy Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </motion.div>
      </div>

      {/* 2. The Main "Magic Border" Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-4"
        initial={{ y: 150, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          type: 'spring',
          stiffness: 40,
          damping: 15,
          mass: 1.2,
        }}
      >
        {/* The Moving Border Layer */}
        {/* We create a div slightly larger than content, with a spinning gradient */}
        <div className="absolute -inset-[2px] rounded-[32px] overflow-hidden">
          <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#333333_50%,#ffffff_100%)] opacity-70" />
        </div>

        {/* The Content Layer (Sits on top of the moving border) */}
        <div className="relative bg-card/80 backdrop-blur-xl rounded-[30px] p-8 md:p-14 lg:p-16 border border-border/10 shadow-2xl">
          {/* Content Inner */}
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Title with Shine Effect */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text)]">{sectionTitle}</h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed font-light">{sectionDescription}</p>

            {/* Separator Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

            {/* Buttons Container */}
            <div className={`flex flex-col sm:flex-row gap-5 w-full md:w-auto mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* BUTTON 1: EXPERT (Primary Dark) */}
              <AnimatedButton
                text={button1Text}
                variant="secondary"
                textSize="xl"
                icon={ChevronRight}
                iconSize="base"
                onClick={() => {
                  if (button1Link) {
                    window.location.href = button1Link;
                  }
                }}
              />

              {/* BUTTON 2: START ORDER (White/Brand) */}
              <AnimatedButton
                text={button2Text}
                variant="primary"
                textSize="xl"
                icon={ChevronRight}
                iconSize="base"
                onClick={() => {
                  if (button2Link) {
                    window.location.href = button2Link;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StartProjectSection;
