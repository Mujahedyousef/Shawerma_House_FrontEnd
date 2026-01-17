import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAboutUsPage } from '../../hooks/useAboutUsPage';
import AboutUsHero from '../../features/aboutUs/components/AboutUsHero';
import AboutUsVision from '../../features/aboutUs/components/AboutUsVision';
import AboutUsMessage from '../../features/aboutUs/components/AboutUsMessage';
import AboutUsStory from '../../features/aboutUs/components/AboutUsStory';
import AboutUsCoreValues from '../../features/aboutUs/components/AboutUsCoreValues';
import AboutUsTeam from '../../features/aboutUs/components/AboutUsTeam';
import AboutUsAwards from '../../features/aboutUs/components/AboutUsAwards';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import CustomerTrustSection from '../../features/landing/components/CustomerTrustSection';
import { getImageUrl } from '../../utils/imageUrl';

const AboutUsPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, loading } = useAboutUsPage();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text)]">Failed to load About Us page</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AboutUsHero settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsVision settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsMessage settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsStory settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsCoreValues settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsTeam settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <AboutUsAwards settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <CustomerTrustSection />
      <StartProjectSection />
    </div>
  );
};

export default AboutUsPage;
