import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProjectsPage } from '../../hooks/useProjectsPage';
import ProjectsHero from '../../features/projects/components/ProjectsHero';
import ProjectsSection from '../../features/landing/components/ProjectsSection';
import CustomerTrustSection from '../../features/landing/components/CustomerTrustSection';
import StartProjectSection from '../../features/landing/components/StartProjectSection';

const ProjectsPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, loading } = useProjectsPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)]">
      {/* Combined Hero and Dark Background Section - Matching Contact Page Style but with Projects Theme */}
      <div className="relative w-full bg-[#020617]">
        {/* Hero Section with smooth gradient transition */}
        <section className="relative w-full">
          <ProjectsHero settings={settings} />
        </section>

        {/* Projects Content Section - Replacing Contact Form with Projects Scroll */}
        <section className="relative w-full -mt-24 md:mt-20">
          <ProjectsSection hideTitle={true} projectsPage={true} />
        </section>
      </div>

      {/* Testimonials Section */}
      <CustomerTrustSection />

      {/* Start Project Section */}
      <StartProjectSection />
    </div>
  );
};

export default ProjectsPage;
