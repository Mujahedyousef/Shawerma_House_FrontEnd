import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';

const ProjectsGrid = ({ projects }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  // Get project title based on language
  const getProjectTitle = project => {
    return isRTL ? project.titleAr : project.titleEn;
  };

  // Dynamic grid layout based on number of projects
  const getGridLayout = count => {
    if (count === 2) {
      return 'grid-cols-1 md:grid-cols-2';
    } else if (count === 3) {
      return 'grid-cols-1 md:grid-cols-3';
    } else if (count === 4) {
      return 'grid-cols-1 md:grid-cols-3';
    } else if (count === 5) {
      return 'grid-cols-1 md:grid-cols-3';
    } else {
      // 6+ projects: 3 columns
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const gridClass = getGridLayout(projects.length);

  // Determine card span classes for special cases
  const getCardSpanClass = (index, total) => {
    // 4th project in 4-project layout: full width
    if (total === 4 && index === 3) {
      return 'md:col-span-3';
    }
    // 5th project in 5-project layout: takes 2 columns (rectangular)
    if (total === 5 && index === 4) {
      return 'md:col-span-2';
    }
    // 4th project in 5-project layout: takes 1 column (square)
    if (total === 5 && index === 3) {
      return 'md:col-span-1';
    }
    return '';
  };

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {projects.map((project, index) => {
        const title = getProjectTitle(project);
        const spanClass = getCardSpanClass(index, projects.length);

        return (
          <motion.div
            key={project.id}
            className={spanClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProjectCard project={project} title={title} getImageUrl={getImageUrl} isRTL={isRTL} navigate={navigate} />
          </motion.div>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project, title, getImageUrl, isRTL, navigate }) => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
      {/* Project Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img src={getImageUrl(project.imageUrl)} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

        {/* Modern Modular Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          {/* Glassmorphism Background Card */}
          <div className="relative backdrop-blur-xl bg-[var(--color-card)]/80 rounded-2xl border border-[var(--color-border)]/20 p-5 md:p-6 shadow-2xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-[var(--color-bg)]/30 to-transparent rounded-2xl pointer-events-none"></div>

            {/* Content */}
            <div className={`relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              {/* Left Side - Supplied Products Badge */}
              <div className={`${isRTL ? 'text-right md:text-left' : 'text-left'} order-2 md:order-1`}>
                <div className="inline-block bg-[var(--color-card)]/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-[var(--color-border)]/30">
                  <p className="text-[var(--color-text)]/80 text-xs md:text-sm mb-1 font-medium uppercase tracking-wider">
                    {isRTL ? 'المنتجات الموردة' : 'Supplied Products'}
                  </p>
                  <p className="text-[var(--color-text)] text-2xl md:text-3xl font-bold">
                    {project.productsCount || 0}{' '}
                    <span className="text-sm md:text-base font-normal text-[var(--color-text)]/70">{isRTL ? 'منتج' : 'products'}</span>
                  </p>
                </div>
              </div>

              {/* Right Side - Project Details */}
              <div className={`${isRTL ? 'text-right md:text-right' : 'text-left'} flex-1 order-1 md:order-2 ${isRTL ? 'md:mr-4' : 'md:ml-4'}`}>
                {/* Project Title */}
                <h3 className="text-[var(--color-text)] text-xl md:text-2xl font-bold mb-3 md:mb-4 line-clamp-2 leading-tight">{title}</h3>

                {/* Location and Year (if available) */}
                {(project.locationEn || project.locationAr || project.year) && (
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    {/* Location */}
                    {project.locationEn || project.locationAr ? (
                      <div
                        className={`flex items-center gap-2 text-[var(--color-text)]/90 text-sm ${
                          isRTL ? 'flex-row-reverse' : ''
                        } bg-[var(--color-card)]/30 rounded-lg px-3 py-1.5 border border-[var(--color-border)]/20`}
                      >
                        <MapPin size={14} className="flex-shrink-0 text-[var(--color-text)]/70" />
                        <span>{isRTL ? project.locationAr : project.locationEn}</span>
                      </div>
                    ) : null}

                    {/* Year */}
                    {project.year ? (
                      <div
                        className={`flex items-center gap-2 text-[var(--color-text)]/90 text-sm ${
                          isRTL ? 'flex-row-reverse' : ''
                        } bg-[var(--color-card)]/30 rounded-lg px-3 py-1.5 border border-[var(--color-border)]/20`}
                      >
                        <Calendar size={14} className="flex-shrink-0 text-[var(--color-text)]/70" />
                        <span>{project.year}</span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
