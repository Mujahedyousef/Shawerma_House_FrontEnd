import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjectDetails } from '../../hooks/useProjectDetails';
import { useProjectsSection } from '../../hooks/useProjectsSection';
import ProjectDetailsHero from '../../features/projects/components/ProjectDetailsHero';
import ProjectPhotoGallery from '../../features/projects/components/ProjectPhotoGallery';
import ProjectsGrid from '../../features/services/components/ProjectsGrid';
import SectionHeader from '../../components/ui/SectionHeader';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import { getImageUrl } from '../../utils/imageUrl';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { project, loading, error } = useProjectDetails(id);
  const { projectsData } = useProjectsSection();

  // Process HTML content to convert relative image URLs to absolute URLs and fix links
  const processContent = htmlContent => {
    if (!htmlContent) return '';

    let processed = htmlContent;

    processed = processed.replace(/src=(["'])([^"']+)\1/gi, (match, quote, src) => {
      const absoluteSrc = getImageUrl(src);
      return `src=${quote}${absoluteSrc}${quote}`;
    });

    processed = processed.replace(/href=(["'])([^"']+)\1/gi, (match, quote, href) => {
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('#')) {
        return match;
      }
      if (href.startsWith('/')) {
        return match;
      }
      return `href=${quote}https://${href}${quote}`;
    });

    return processed;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text)]">{isRTL ? 'المشروع غير موجود' : 'Project not found'}</p>
        </div>
      </div>
    );
  }

  const title = isRTL ? project.titleAr : project.titleEn;
  const content = processContent(isRTL ? project.contentAr : project.contentEn);
  const specifications =
    project.specifications && typeof project.specifications === 'object' ? (Array.isArray(project.specifications) ? project.specifications : []) : [];

  // Get other projects (excluding current project) - limit to 3 for related projects
  const allProjects = projectsData?.projects || [];
  const otherProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3);
  const relatedProjectsTitle = projectsData ? (isRTL ? projectsData.sectionTitleAr : projectsData.sectionTitleEn) : isRTL ? 'مشاريع أخرى' : 'Other Projects';

  return (
    <div className="w-full">
      <ProjectDetailsHero project={project} isRTL={isRTL} getImageUrl={getImageUrl} />

      {/* Content and Specifications Container */}
      <section className="w-full bg-[var(--color-bg)]">
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Specifications Section - Sticky Sidebar */}
            {specifications.length > 0 && (
              <aside className={`w-full lg:w-80 ${isRTL ? 'lg:order-1' : ''}`}>
                <div className="lg:sticky lg:top-24">
                  <div className="bg-[#0b1320] rounded-none shadow-lg overflow-y-auto" style={{ minHeight: '500px', maxHeight: 'calc(100vh - 6rem)' }}>
                    <div className="flex flex-col h-full p-6" style={{ minHeight: '500px' }}>
                      <h2 className="text-2xl font-semibold text-white mb-6 flex-shrink-0">{title}</h2>
                      <div className="space-y-3 flex-grow flex flex-col justify-start">
                        {specifications?.map((spec, index) => (
                          <div key={index} className="py-2">
                            <div className={`flex gap-3 items-center ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                              <span className="text-sm font-semibold text-white whitespace-nowrap">{isRTL ? spec.keyAr : spec.keyEn}:</span>
                              <span className="text-sm text-white/80">{isRTL ? spec.valueAr : spec.valueEn}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Content Section */}
            <main className={`flex-1 ${isRTL ? 'lg:order-2' : ''}`}>
              {content && (
                <div className="max-w-4xl">
                  <div
                    className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                    dangerouslySetInnerHTML={{ __html: content }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <style>{`
                    .rich-text-content ul,
                    .rich-text-content ol {
                      margin: 1rem 0;
                      ${isRTL ? 'padding-right: 1.5rem;' : 'padding-left: 1.5rem;'}
                      ${isRTL ? 'padding-left: 0;' : 'padding-right: 0;'}
                    }
                    .rich-text-content ul {
                      list-style-type: disc;
                    }
                    .rich-text-content ol {
                      list-style-type: decimal;
                    }
                    .rich-text-content li {
                      margin: 0.5rem 0;
                      ${isRTL ? 'text-align: right;' : 'text-align: left;'}
                      display: list-item;
                    }
                    .rich-text-content ul ul,
                    .rich-text-content ol ol,
                    .rich-text-content ul ol,
                    .rich-text-content ol ul {
                      margin: 0.5rem 0;
                    }
                    .rich-text-content p {
                      margin: 1rem 0;
                    }
                    .rich-text-content strong {
                      font-weight: 600;
                    }
                    .rich-text-content em {
                      font-style: italic;
                    }
                    .rich-text-content a {
                      color: var(--color-brand, #020617);
                      text-decoration: underline;
                    }
                    .rich-text-content h1,
                    .rich-text-content h2,
                    .rich-text-content h3,
                    .rich-text-content h4,
                    .rich-text-content h5,
                    .rich-text-content h6 {
                      font-weight: 700;
                      margin-top: 1.5rem;
                      margin-bottom: 1rem;
                      color: var(--color-text);
                    }
                    .rich-text-content img {
                      max-width: 100%;
                      height: auto;
                      margin: 1.5rem 0;
                      border-radius: 0.5rem;
                    }
                  `}</style>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Project Photo Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <ProjectPhotoGallery
          galleryImages={project.galleryImages}
          getImageUrl={getImageUrl}
          titleEn={projectsData?.galleryTitleEn || 'Project Photo Gallery'}
          titleAr={projectsData?.galleryTitleAr || 'معرض صور المشروع'}
        />
      )}

      {/* Related Projects Section */}
      {otherProjects.length > 0 && (
        <section className="w-full py-12 md:py-20 bg-[var(--color-bg)]">
          <div className="mx-auto px-4 md:px-8">
            <SectionHeader title={relatedProjectsTitle} />
            <ProjectsGrid projects={otherProjects} />
          </div>
        </section>
      )}

      {/* Start Project Section - Full Width (outside the container) */}
      <StartProjectSection />
    </div>
  );
};

export default ProjectDetailsPage;
