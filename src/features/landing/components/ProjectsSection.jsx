import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useProjectsSection } from '../../../hooks/useProjectsSection';
import { formatNumber } from '../../../utils/numberFormat';
import SectionHeader from '../../../components/ui/SectionHeader';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import { getImageUrl } from '../../../utils/imageUrl';

const ProjectsSection = ({ hideTitle = false, projectsPage = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const { projectsData, loading } = useProjectsSection();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCtaButtonHovered, setIsCtaButtonHovered] = useState(false);

  // Get section title based on language
  const getSectionTitle = () => {
    if (projectsData) {
      return isRTL ? projectsData.sectionTitleAr : projectsData.sectionTitleEn;
    }
    return t('projects.title');
  };

  // Get section subtitle based on language
  const getSectionSubtitle = () => {
    if (projectsData) {
      return isRTL ? projectsData.sectionSubtitleAr : projectsData.sectionSubtitleEn;
    }
    return null;
  };

  // Get project title based on language
  const getProjectTitle = project => {
    return isRTL ? project.titleAr : project.titleEn;
  };

  // Get button text based on language
  const getButtonText = project => {
    if (project.buttonTextEn || project.buttonTextAr) {
      return isRTL ? project.buttonTextAr || project.buttonTextEn : project.buttonTextEn || project.buttonTextAr;
    }
    return t('projects.viewDetails');
  };

  // Get CTA button text based on language
  const getCtaButtonText = () => {
    if (projectsData) {
      return isRTL ? projectsData.ctaButtonTextAr || projectsData.ctaButtonTextEn : projectsData.ctaButtonTextEn || projectsData.ctaButtonTextAr;
    }
    return t('projects.viewMore');
  };

  // Use API data if available, otherwise use fallback
  const projects = projectsData?.projects || [];

  if (loading) {
    return (
      <section className="w-full bg-[#020617] pt-10 md:pt-16">
        <div className="text-center text-white">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="w-full bg-[var(--color-bg2)] mt-10 md:mt-16">
      {/* Title */}
      {!loading && !hideTitle && (
        <div className="pt-6 md:pt-16">
          <SectionHeader
            title={getSectionTitle()}
            subtitle={getSectionSubtitle()}
            align="center"
            color="text-[var(--color-text2)]"
            subTitleColor="text-[var(--color-text-muted2)]"
          />
        </div>
      )}

      <div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            // Wrapper must be TALLER than the viewport so the sticky child has room to stick
            className={index === projects.length - 1 ? 'h-[100vh]' : 'h-[200vh]'}
            style={{ marginTop: index === 0 ? '0' : '-100vh', padding: projectsPage ? '0 16px' : '0' }}
          >
            {/* This is the sticky thing that pauses at the top */}
            <div className="sticky top-0 h-screen w-full" style={{ zIndex: 50 + index }}>
              <div className="relative w-full h-full overflow-hidden rounded-b-[48px]">
                {/* Background image */}
                <img
                  src={getImageUrl(project.imageUrl)}
                  alt={getProjectTitle(project)}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: projectsPage ? '12px' : '0' }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative text-white text-center bg-black/30 backdrop-blur-md rounded-lg p-1.5 md:p-2 lg:p-4 border border-white/10 overflow-hidden min-w-[300px] max-w-[650px] w-full m-4"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Logos */}
                    {project.logos && project.logos.length > 0 && (
                      <div className="flex items-center justify-center gap-6 mb-6">
                        {project.logos.map((logo, logoIndex) => (
                          <React.Fragment key={logo.id}>
                            <img src={getImageUrl(logo.imageUrl)} alt={`Logo ${logoIndex + 1}`} className="h-8 md:h-10 w-auto object-contain" />
                            {logoIndex < project.logos.length - 1 && <div className="w-px h-8 md:h-10 bg-white/30" />}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 line-clamp-2 overflow-hidden">{getProjectTitle(project)}</h3>

                    {/* Supplied products */}
                    <p className="text-white/80 text-base md:text-lg mb-6 flex flex-col items-center justify-center">
                      {t('projects.suppliedProducts')}{' '}
                      <span className="font-semibold text-white">
                        {formatNumber(project.productsCount)} {t('projects.products')}
                      </span>
                    </p>

                    {/* Button */}
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative z-100 group flex items-center gap-2 px-6 py-3 mx-auto cursor-pointer overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all duration-300"
                      onClick={() => {
                        // Navigate to project details page
                        navigate(`/projects/${project.id}`);
                      }}
                    >
                      {/* Shimmer Effect (Reflects light continuously) */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

                      {/* Button Text */}
                      <span className="relative z-10 text-sm font-semibold text-white tracking-wide drop-shadow-md">{getButtonText(project)}</span>

                      {/* Icon with slide effect */}
                      <ChevronRight
                        size={16}
                        className={`relative z-10 text-white transition-transform duration-300 drop-shadow-md ${
                          isRTL ? 'rotate-180' : ''
                        } group-hover:translate-x-1`}
                      />
                    </motion.button>

                    {/* Hover Overlay - Dark transparent blur layer from bottom to top */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center pointer-events-none"
                          initial={{ clipPath: 'inset(100% 0 0 0)' }}
                          animate={{ clipPath: 'inset(0 0 0 0)' }}
                          exit={{ clipPath: 'inset(100% 0 0 0)' }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        ></motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      {projectsData && (
        <div className={`flex justify-center ${hideTitle ? 'pt-12 pb-20' : 'py-20'}`}>
          <AnimatedButton
            className="mx-auto"
            text={getCtaButtonText()}
            icon={ChevronRight}
            variant="primary"
            textSize="xl"
            onClick={() => {
              if (projectsData?.ctaButtonLink) {
                window.location.href = projectsData.ctaButtonLink;
              }
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
