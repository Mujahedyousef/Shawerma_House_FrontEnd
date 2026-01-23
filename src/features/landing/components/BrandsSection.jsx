import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useBrandsSection } from '../../../hooks/useBrandsSection';
import companyLogo from '../../../assets/Company_logo.png';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../utils/imageUrl';

const BrandsSection = () => {
  const { brandsData, loading } = useBrandsSection();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const rawLogos = brandsData?.logos || [];
  const initialLogos = rawLogos.length > 0 ? rawLogos : Array(3).fill({ imageUrl: companyLogo });

  /**
   * Infinite Row Component
   */
  const InfiniteRow = ({ direction = 'left', speed = 50, delay = 0 }) => {
    const setRef = useRef(null);
    const [setWidth, setSetWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const isHovering = useRef(false);

    const displayLogos = useMemo(() => {
      let items = [...initialLogos];
      if (items.length === 0) return [];
      while (items.length < 15) {
        items = [...items, ...initialLogos];
      }
      return items;
    }, [initialLogos]);

    useLayoutEffect(() => {
      const measure = () => {
        if (!setRef.current) return;
        setSetWidth(setRef.current.getBoundingClientRect().width);
      };
      measure();
      const timer = setTimeout(measure, 100);
      window.addEventListener('resize', measure);
      return () => {
        window.removeEventListener('resize', measure);
        clearTimeout(timer);
      };
    }, [displayLogos]);

    const multiplier = direction === 'left' ? -1 : 1;
    const x = useMotionValue(0);

    useAnimationFrame((t, delta) => {
      if (!setWidth) return;
      if (isDragging || isHovering.current) return;

      const moveBy = ((speed * delta) / 1000) * multiplier;
      let newX = x.get() + moveBy;

      if (newX <= -setWidth) newX = 0;
      else if (newX > 0) newX = -setWidth;

      x.set(newX);
    });

    return (
      <motion.div
        className="relative w-full overflow-visible cursor-grab active:cursor-grabbing perspective-1000"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        // ROLODEX SLOWED DOWN: Duration changed from 0.8 -> 1.5
        initial={{ opacity: 0, rotateX: -90 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 1, // Slower, more majestic
          delay: delay,
          type: 'spring',
          bounce: 0.2,
        }}
      >
        {/* 'group/row' is applied here. It detects if mouse is anywhere on the track */}
        <motion.div
          className="flex w-max gap-4 md:gap-6 will-change-transform group/row py-4"
          // added py-4 to give space for the scaling effect
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragElastic={0.05}
          dragMomentum={false}
        >
          <div ref={setRef} className="flex gap-4 md:gap-6">
            {displayLogos.map((logo, idx) => (
              <LogoCard key={`a-${idx}`} logo={logo} idx={idx} getImageUrl={getImageUrl} />
            ))}
          </div>

          <div className="flex gap-4 md:gap-6" aria-hidden="true">
            {displayLogos.map((logo, idx) => (
              <LogoCard key={`b-${idx}`} logo={logo} idx={idx} getImageUrl={getImageUrl} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="w-full pt-10 md:pt-16 bg-[var(--color-bg)]" dir="ltr">
      <div>
        {!loading && brandsData && (
          <SectionHeader
            title={isRTL ? brandsData.sectionTitleAr : brandsData.sectionTitleEn}
            subtitle={isRTL ? brandsData.sectionSubtitleAr : brandsData.sectionSubtitleEn}
            align="center"
            color="text-[var(--color-text)]"
            subTitleColor="text-[var(--color-text-muted)]"
          />
        )}

        <div className="space-y-2 md:space-y-4 overflow-x-hidden">
          <InfiniteRow direction="right" speed={38} delay={0} />
          <InfiniteRow direction="left" speed={28} delay={0.2} />
          <InfiniteRow direction="right" speed={32} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

// --- FIXED LOGO CARD ---
const LogoCard = ({ logo, idx, getImageUrl }) => {
  const logoImageUrl = logo?.imageUrl || logo;
  const logoName = logo?.nameEn || logo?.nameAr || `Brand ${idx + 1}`;

  return (
    <motion.div
      className="
        relative 
        shrink-0 
        w-[140px] h-[140px] md:w-[160px] md:h-[160px] 
        bg-white 
        border border-transparent
        rounded-2xl 
        flex items-center justify-center 
        select-none 
        overflow-hidden
        p-6
        transition-all duration-300 ease-out
        shadow-sm
        
        /* THE FIX: */
        /* 1. Base State */
        opacity-100 scale-100 grayscale-0 z-0

        /* 2. Group Hover State (When row is hovered, I fade out) */
        group-hover/row:opacity-40 group-hover/row:grayscale group-hover/row:scale-95

        /* 3. Self Hover State (When I am hovered, I override everything) */
        /* using !important to ensure this wins over the group-hover */
        hover:!opacity-100 
        hover:!grayscale-0 
        hover:!scale-110 
        hover:!z-20 
        hover:shadow-2xl 
        hover:border-blue-200
      "
    >
      <img
        src={getImageUrl(logoImageUrl)}
        alt={logoName}
        className="w-full h-full object-contain pointer-events-none"
        onError={e => (e.currentTarget.src = companyLogo)}
        draggable={false}
      />
    </motion.div>
  );
};

export default BrandsSection;
