import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProjectsSection } from '../../hooks/useProjectsSection';
import { useServicesPageSettings } from '../../hooks/useServicesPageSettings';
import useServices from '../../hooks/useServices';
import ServicesHero from '../../features/services/components/ServicesHero';
import ServicesGrid from '../../features/services/components/ServicesGrid';
import ProjectsGrid from '../../features/services/components/ProjectsGrid';
import CustomerTrustSection from '../../features/landing/components/CustomerTrustSection';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import SectionHeader from '../../components/ui/SectionHeader';

const ServicesPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { projectsData, loading: projectsLoading } = useProjectsSection();
  const { settings, loading: settingsLoading } = useServicesPageSettings();
  const { services, loading: servicesLoading } = useServices();

  // Get projects from API
  const projects = projectsData?.projects || [];
  const sectionTitle = projectsData
    ? isRTL
      ? projectsData.sectionTitleAr
      : projectsData.sectionTitleEn
    : isRTL
    ? 'مشاريعنا التي نفتخر بها'
    : 'Our Projects We Are Proud Of';

  if (projectsLoading || settingsLoading || servicesLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <ServicesHero settings={settings} />

      {/* Services Grid Section */}
      <section className="w-full py-12 md:py-20 bg-[var(--color-bg)]">
        <div className="mx-auto px-4 md:px-8">
          <ServicesGrid services={services} />
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="w-full py-12 md:py-20">
        <div className=" mx-auto px-4 md:px-8">
          {/* Section Title */}

          <SectionHeader title={sectionTitle} />

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">{isRTL ? 'لا توجد مشاريع متاحة حالياً' : 'No projects available at the moment'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <CustomerTrustSection />

      {/* Start Project Section */}
      <StartProjectSection />
    </div>
  );
};

export default ServicesPage;
