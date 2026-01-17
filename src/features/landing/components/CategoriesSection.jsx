import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { useCategoriesSection } from '../../../hooks/useCategoriesSection';
import { formatNumber } from '../../../utils/numberFormat';
import SectionHeader from '../../../components/ui/SectionHeader';
import { getImageUrl } from '../../../utils/imageUrl';

// Animation configuration for scroll-triggered entrance animations
const ANIMATION_CONFIG = {
  // Premium easing curves for smooth, editorial feel
  ease: [0.25, 0.1, 0.25, 1],
  easeOut: [0.16, 1, 0.3, 1],

  // Timing
  duration: 1.3,
  staggerDelay: 0.18, // Delay between items for visual rhythm

  // Transform values
  initialY: 50,
  initialScale: 0.88,
  initialRotateX: 12, // Subtle perspective rotation

  // Perspective
  perspective: 1200,
};

// Calculate grid position for stagger timing based on column/row
const getGridPosition = (gridClasses, index, isMobile) => {
  if (isMobile) return index;

  // Parse column and row from gridClasses
  const colMatch = gridClasses.match(/col-start-(\d+)/);
  const rowMatch = gridClasses.match(/row-start-(\d+)/);

  const col = colMatch ? parseInt(colMatch[1]) - 1 : index % 4;
  const row = rowMatch ? parseInt(rowMatch[1]) - 1 : Math.floor(index / 4);

  // Stagger by column first, then row for visual rhythm
  return col + row * 4;
};

// Container variants for stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.staggerDelay,
      delayChildren: 0.25,
    },
  },
};

// Card entrance variants with Y + scale + perspective
const cardVariants = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: ANIMATION_CONFIG.initialY,
    scale: ANIMATION_CONFIG.initialScale,
    rotateX: ANIMATION_CONFIG.initialRotateX,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
      delay,
    },
  },
});

const CategoriesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const { categories, loading, error } = useCategories();
  const { sectionSettings } = useCategoriesSection();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Navigate to products page with category filter
  const handleCategoryClick = categoryId => {
    navigate(`/products?categoryId=${categoryId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get title based on current language
  const getCategoryTitle = category => {
    return isRTL ? category.titleAr : category.titleEn;
  };

  // Construct image URL from backend

  // Parse gridClasses and convert to inline styles (works even if Tailwind purges classes)
  const parseGridClasses = classes => {
    const style = {};
    if (!classes) return style;

    // Parse col-span-X
    const colSpanMatch = classes.match(/col-span-(\d+)/);
    const colSpan = colSpanMatch ? parseInt(colSpanMatch[1]) : null;

    // Parse col-start-X
    const colStartMatch = classes.match(/col-start-(\d+)/);
    const colStart = colStartMatch ? parseInt(colStartMatch[1]) : null;

    // Parse row-span-X
    const rowSpanMatch = classes.match(/row-span-(\d+)/);
    const rowSpan = rowSpanMatch ? parseInt(rowSpanMatch[1]) : null;

    // Parse row-start-X
    const rowStartMatch = classes.match(/row-start-(\d+)/);
    const rowStart = rowStartMatch ? parseInt(rowStartMatch[1]) : null;

    // Build gridColumn: if both start and span, use "start / span X", otherwise use individual properties
    if (colStart !== null && colSpan !== null) {
      style.gridColumn = `${colStart} / span ${colSpan}`;
    } else if (colStart !== null) {
      style.gridColumnStart = colStart;
    } else if (colSpan !== null) {
      style.gridColumn = `span ${colSpan}`;
    }

    // Build gridRow: if both start and span, use "start / span X", otherwise use individual properties
    if (rowStart !== null && rowSpan !== null) {
      style.gridRow = `${rowStart} / span ${rowSpan}`;
    } else if (rowStart !== null) {
      style.gridRowStart = rowStart;
    } else if (rowSpan !== null) {
      style.gridRow = `span ${rowSpan}`;
    }

    return style;
  };

  if (loading) {
    return (
      <section className="w-full pt-10 md:pt-16 px-4 md:px-8 bg-[var(--color-bg1)]">
        <div className="text-center">
          <p className="text-[var(--color-text)]">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <section className="w-full pt-10 md:pt-16 px-4 md:px-8 bg-[var(--color-bg1)]">
        <div className="text-center">
          <p className="text-[var(--color-text)]">Failed to load categories.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-10 md:pt-16 px-4 md:px-8 bg-[var(--color-bg1)]">
      <div>
        {/* Section Title */}

        <SectionHeader
          title={i18n.language === 'ar' ? sectionSettings?.sectionTitleAr : sectionSettings?.sectionTitleEn}
          subtitle={i18n.language === 'ar' ? sectionSettings?.sectionSubtitleAr : sectionSettings?.sectionSubtitleEn}
          align="center"
          subTitleColor="text-[var(--color-text-muted)]"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 md:h-[1300px]"
          style={{
            gridTemplateRows: !isMobile ? 'repeat(4, minmax(0, 1fr))' : 'none',
            perspective: `${ANIMATION_CONFIG.perspective}px`,
            transformStyle: 'preserve-3d',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: '100px' }}
        >
          {categories.map((category, index) => {
            const gridClasses = (category.gridClasses || '').trim();
            const gridStyle = !isMobile ? parseGridClasses(gridClasses) : {};
            const gridPosition = getGridPosition(gridClasses, index, isMobile);
            const staggerDelay = gridPosition * ANIMATION_CONFIG.staggerDelay;

            return (
              <motion.div
                key={category.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer md:h-auto h-[300px]"
                style={{
                  ...gridStyle,
                  transformStyle: 'preserve-3d',
                }}
                variants={cardVariants(staggerDelay)}
                data-debug-grid={gridClasses}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Image */}
                <img
                  src={getImageUrl(category.imageUrl)}
                  alt={getCategoryTitle(category)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Initial Bottom Gradient Overlay (Always Visible) */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                />

                {/* Default Text Overlay (Bottom Left) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transition-all duration-500 group-hover:opacity-0">
                  <h3 className="text-lg md:text-3xl font-bold mb-1">{getCategoryTitle(category)}</h3>
                  <p className="text-sm md:text-base font-semibold opacity-90">
                    +{formatNumber(category.productCount)} {t('categories.products')}
                  </p>
                </div>

                {/* Hover Overlay (Black Transparent Blurred - Bottom to Top) */}
                <div className="absolute bg-black/50 bottom-0 left-0 right-0 backdrop-blur-sm transition-all duration-500 ease-out h-0 group-hover:h-full" />

                {/* Hover Content (Text + Button grouped together in center) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-10">
                  {/* Text above button */}
                  <div className="text-center w-full mb-4">
                    <h3 className="text-xl text-center md:text-2xl font-bold text-white max-w-[800px] mx-auto px-4">{getCategoryTitle(category)}</h3>
                  </div>

                  {/* Button */}
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeOut',
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={e => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                    className="relative group flex items-center gap-2 px-6 py-3 mx-auto cursor-pointer overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

                    {/* Button Text */}
                    <span className="relative z-10 text-sm font-semibold text-white tracking-wide drop-shadow-md">{t('categories.viewProducts')}</span>

                    {/* Icon with slide effect */}
                    <ArrowRight
                      size={16}
                      className={`relative z-10 text-white transition-transform duration-300 drop-shadow-md ${
                        isRTL ? 'rotate-180' : ''
                      } group-hover:translate-x-1`}
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
