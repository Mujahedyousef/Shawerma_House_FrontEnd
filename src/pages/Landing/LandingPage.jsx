import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useHeroSection } from '../../hooks/useHeroSection';
import HeroStats from '../../features/landing/components/HeroStats';
import HeroMediaCarousel from '../../features/landing/components/HeroMediaCarousel';
import CategoriesSection from '../../features/landing/components/CategoriesSection';
import SolutionsSection from '../../features/landing/components/SolutionsSection';
import BrandsSection from '../../features/landing/components/BrandsSection';
import ProjectsSection from '../../features/landing/components/ProjectsSection';
import CustomerTrustSection from '../../features/landing/components/CustomerTrustSection';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import ArticlesSection from '../../features/landing/components/ArticlesSection';
import DownloadAppSection from '../../features/landing/components/DownloadAppSection';
import BranchesMapSection from '../../features/landing/components/BranchesMapSection';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { getImageUrl } from '../../utils/imageUrl';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Fetch hero section data from CMS
  const { heroData } = useHeroSection();

  // Memoize text values to prevent unnecessary recalculations
  const heroTitle = useMemo(() => (heroData ? (isRTL ? heroData.titleAr : heroData.titleEn) : t('hero.mainHeading')), [heroData, isRTL, t]);
  const heroDescription = useMemo(() => (heroData ? (isRTL ? heroData.descriptionAr : heroData.descriptionEn) : t('hero.subheading')), [heroData, isRTL, t]);
  const heroButtonText = useMemo(() => (heroData ? (isRTL ? heroData.buttonTextAr : heroData.buttonTextEn) : t('hero.ctaButton')), [heroData, isRTL, t]);
  const heroMediaItems = useMemo(() => heroData?.mediaItems || [], [heroData?.mediaItems]);
  const heroStats = useMemo(() => heroData?.stats || [], [heroData?.stats]);

  const descriptionWords = useMemo(() => {
    return heroDescription ? heroDescription.split(' ') : [];
  }, [heroDescription]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Modular Media Carousel */}
        <HeroMediaCarousel mediaItems={heroMediaItems} autoPlayInterval={heroData?.autoPlayInterval || 5000} pauseOnHover={true} />

        {/* Overlay - with pointer-events-none to allow clicks through to carousel controls */}
        <div className="absolute inset-0 w-full h-full bg-black/40 z-[2]" style={{ pointerEvents: 'none' }} />

        {/* Hero Content */}
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-56 md:pb-60">
          <motion.div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
              variants={itemVariants}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {heroTitle}
            </motion.h1>

            {/* Subheading with Word-by-Word Animation */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed line-clamp-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.7 }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {descriptionWords?.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 1.0 + 0.05 * index,
                  }}
                  className="inline-block text-2xl"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {/* CTA Button */}
            <AnimatedButton
              className="mx-auto"
              text={heroButtonText}
              icon={ChevronRight}
              variant="primary"
              textSize="xl"
              onClick={() => {
                if (heroData?.buttonLink) {
                  window.location.href = heroData.buttonLink;
                }
              }}
            />
          </motion.div>

          {/* Statistics Section */}
          <HeroStats stats={heroStats} />
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Download App Section */}
      <DownloadAppSection />

      {/* Branches Map Section */}
      <BranchesMapSection />

      {/* Brands Section */}
      <BrandsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Customer Trust Section */}
      <CustomerTrustSection />

      {/* Start Project Section */}
      <StartProjectSection />

      {/* Articles Section */}
      <ArticlesSection />
    </div>
  );
};

export default LandingPage;
