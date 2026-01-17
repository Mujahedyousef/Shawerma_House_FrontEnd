import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCareersPage } from '../../hooks/useCareersPage';
import CareersHero from '../../features/careers/components/CareersHero';
import CareersJobListings from '../../features/careers/components/CareersJobListings';
import CareersWhyWorkWithUs from '../../features/careers/components/CareersWhyWorkWithUs';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import { getImageUrl } from '../../utils/imageUrl';

const CareersPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, loading } = useCareersPage();

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
        <p className="text-[var(--color-text)]">Failed to load Careers page</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CareersHero settings={settings} isRTL={isRTL} getImageUrl={getImageUrl} />
      <CareersJobListings settings={settings} isRTL={isRTL} />
      <CareersWhyWorkWithUs settings={settings} isRTL={isRTL} />
      <StartProjectSection />
    </div>
  );
};

export default CareersPage;
