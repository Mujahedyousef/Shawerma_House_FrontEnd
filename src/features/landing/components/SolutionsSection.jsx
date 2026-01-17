import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowUpRight, Sparkles } from 'lucide-react';
import { useSolutions } from '../../../hooks/useSolutions';
import { formatNumber } from '../../../utils/numberFormat';
import { getImageUrl } from '../../../utils/imageUrl';
import SectionHeader from '../../../components/ui/SectionHeader';
import AnimatedButton from '../../../components/ui/AnimatedButton';

// --- Constants & Config ---
// Desktop: Fixed height (75vh). Mobile: Auto height (grows with content)
const DEFAULT_HEIGHT = 'h-auto md:h-[75vh] md:min-h-[600px]';

// --- Modular Card Component ---
const SolutionCard = memo(({ solution, isActive, onClick, language, index }) => {
  const { titleAr, titleEn, descriptionAr, descriptionEn, imageUrl, tags, extraCount, ctaButtonTextEn, ctaButtonTextAr, ctaButtonLink } = solution;
  const navigate = useNavigate();

  // Resolve localized text
  const title = language === 'ar' ? titleAr : titleEn;
  const desc = language === 'ar' ? descriptionAr : descriptionEn;
  const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? JSON.parse(tags || '[]') : [];
  const ctaButtonText = language === 'ar' ? ctaButtonTextAr || ctaButtonTextEn || 'EXPLORE SOLUTION' : ctaButtonTextEn || 'EXPLORE SOLUTION';

  // Image Helper
  const displayImage = imageUrl ? getImageUrl(imageUrl) : null;

  // Handle CTA button click
  const handleCtaClick = e => {
    e.stopPropagation(); // Prevent card click
    if (ctaButtonLink) {
      if (ctaButtonLink.startsWith('http://') || ctaButtonLink.startsWith('https://')) {
        window.open(ctaButtonLink, '_blank');
      } else {
        navigate(ctaButtonLink);
      }
    }
  };

  // --- Stagger Logic (Desktop Only) ---
  // On mobile, we disable the stagger so cards stack neatly.
  const isOdd = index % 2 !== 0;

  // Mobile: Always 0 translate. Desktop: Apply stagger.
  const verticalShift = isActive ? 'translate-y-0' : isOdd ? 'translate-y-0 md:-translate-y-10' : 'translate-y-0 md:translate-y-10';

  // --- Sizing Logic ---
  // Mobile: Active = Fixed Tall Height, Inactive = Fixed Short Height
  // Desktop: Active = Full Height, Inactive = 95% Height
  const mobileHeight = isActive ? 'h-[550px]' : 'h-[100px]';
  const desktopHeight = isActive ? 'md:h-full' : 'md:h-[95%]';

  // Flex Logic:
  // Mobile: w-full (block). Desktop: flex-grow logic.
  const flexState = isActive ? 'w-full md:w-auto md:flex-[3]' : 'w-full md:w-auto md:flex-[1] md:hover:flex-[1.2]';

  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 150}ms` }}
      className={`
        relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        border border-border/10 shadow-2xl
        group
        
        /* Entrance Animation */
        animate-fadeInUp opacity-0 fill-mode-forwards

        /* Layout & Sizing */
        ${flexState}
        ${mobileHeight} ${desktopHeight}
        
        /* Alignment */
        self-center
        ${verticalShift}

        /* Opacity on Inactive */
        ${isActive ? 'opacity-100' : 'opacity-90 md:opacity-80'}
      `}
    >
      {/* --- Dynamic Background Image --- */}
      {displayImage && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className={`
              w-full h-full object-cover
              transition-transform duration-[10s] ease-linear
              ${isActive ? 'scale-125 translate-x-2' : 'scale-110 grayscale-[20%] group-hover:scale-100'}
            `}
          />
        </div>
      )}

      {/* --- Overlays --- */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent
        transition-all duration-500 pointer-events-none
        ${isActive ? 'opacity-90' : 'opacity-60 group-hover:opacity-40'}
      `}
      />

      {/* --- Active Content (Expanded) --- */}
      <div
        className={`
        absolute inset-0 p-6 md:p-12 flex flex-col justify-end z-10
        transition-all duration-700 delay-100
        ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'}
      `}
      >
        <div className="max-w-3xl">
          {/* Animated Tags */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6 transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
            {parsedTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/20"
              >
                {language === 'ar' ? tag.textAr : tag.textEn}
              </span>
            ))}
            {extraCount && (
              <span className="flex items-center gap-1 px-3 py-1 text-[10px] md:text-xs font-bold text-amber-300 bg-amber-500/10 rounded-full border border-amber-500/20">
                <Sparkles size={10} /> +{formatNumber(extraCount)}
              </span>
            )}
          </div>
          {/* Animated Title */}
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-[0.9] tracking-tight transform transition-all duration-700 delay-300">
            {title}
          </h2>
          {/* Animated Description */}
          {desc && (
            <div className="overflow-hidden mb-6 md:mb-8">
              <p className="text-sm md:text-lg text-gray-300/90 leading-relaxed max-w-xl transform transition-all duration-700 delay-500 line-clamp-4 md:line-clamp-none">
                {desc}
              </p>
            </div>
          )}
          {/* Animated Button */}
          {ctaButtonLink && (
            <div className="relative z-20 pointer-events-auto">
              <AnimatedButton text={ctaButtonText} variant="secondary" textSize="base" icon={ArrowUpRight} iconSize="sm" onClick={handleCtaClick} />
            </div>
          )}
        </div>
      </div>

      {/* --- Inactive Content (Collapsed) --- */}
      <div
        className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-all duration-500
        ${isActive ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}
      `}
      >
        {/* Floating Icon - Smaller on Mobile */}
        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center mb-0 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
          <Plus className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>

        {/* Desktop Vertical Text */}
        <h3 className="hidden md:block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 [writing-mode:vertical-rl] rotate-180 tracking-widest uppercase drop-shadow-sm">
          {title}
        </h3>

        {/* Mobile Horizontal Text (Absolute positioning to stay centered in the small strip) */}
        <h3 className="md:hidden absolute left-14 text-lg font-bold text-white text-left px-2 line-clamp-1">{title}</h3>
      </div>
    </div>
  );
});

// --- Main Section Component ---
const SolutionsSection = () => {
  const { t, i18n } = useTranslation();
  const { solutions, sectionSettings, loading } = useSolutions();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (solutions?.length > 0 && !activeId) {
      setActiveId(solutions[0].id);
    }
  }, [solutions, activeId]);

  const getSectionTitle = () => {
    if (!sectionSettings) return t('solutions.title');
    return i18n.language === 'ar' ? sectionSettings.sectionTitleAr : sectionSettings.sectionTitleEn;
  };

  const getSectionSubtitle = () => {
    if (!sectionSettings) return null;
    return i18n.language === 'ar' ? sectionSettings.sectionSubtitleAr : sectionSettings.sectionSubtitleEn;
  };

  if (loading) {
    return (
      <section className={`w-full bg-[var(--color-bg2)] flex items-center justify-center min-h-[500px]`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        </div>
      </section>
    );
  }

  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="relative w-full py-12 md:py-20 bg-[var(--color-bg2)] overflow-hidden mt-10 md:mt-20">
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .fill-mode-forwards { animation-fill-mode: forwards; }
        `}
      </style>

      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[128px] pointer-events-none" />

      {/* Header */}
      <div className="w-full px-4 md:px-12 mb-8 md:mb-12">
        <SectionHeader
          title={getSectionTitle()}
          subtitle={getSectionSubtitle()}
          align="left"
          color="text-[var(--color-text2)]"
          subTitleColor="text-[var(--color-text-muted2)]"
        />
      </div>

      {/* Container: Stack Vertically on Mobile, Row on Desktop */}
      <div className={`w-full px-2 md:px-6 ${DEFAULT_HEIGHT}`}>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full w-full">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              index={index}
              solution={solution}
              isActive={activeId === solution.id}
              onClick={() => setActiveId(solution.id)}
              language={i18n.language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
