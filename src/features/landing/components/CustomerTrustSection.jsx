import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTestimonial } from '../../../hooks/useTestimonial';
import { AnimatedTestimonials } from '../../../components/ui/animated-testimonials';
import customerTrustImage from '../../../assets/customer-trust.jpg';
import SectionHeader from '../../../components/ui/SectionHeader';
import { getImageUrl } from '../../../utils/imageUrl';

const CustomerTrustSection = () => {
  const { i18n } = useTranslation();
  const { testimonialData, loading } = useTestimonial();
  const isRTL = i18n.language === 'ar';

  if (loading) {
    return (
      <section className="w-full py-14 md:py-20 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border"></div>
          </div>
        </div>
      </section>
    );
  }

  // Handle No Data
  const profiles = testimonialData?.profiles || [];
  if (!testimonialData || profiles.length === 0) {
    return null;
  }

  // Map CMS data to AnimatedTestimonials format
  const formattedTestimonials = profiles.map(profile => ({
    name: profile.name,
    designation: profile.role,
    // Use Translation logic
    quote: isRTL ? profile.testimonialTextAr || '' : profile.testimonialTextEn || '',
    // Use the BIG image for the 3D card
    src: getImageUrl(profile.testimonialImageUrl) || customerTrustImage,
    // Use the SMALL profile image for the avatar
    avatar: getImageUrl(profile.imageUrl) || 'https://via.placeholder.com/150',
  }));

  // Get section title and subtitle
  const sectionTitle = isRTL ? testimonialData.sectionTitleAr : testimonialData.sectionTitleEn;
  const sectionSubtitle = isRTL ? testimonialData.sectionSubtitleAr : testimonialData.sectionSubtitleEn;

  return (
    <section className="w-full py-14 md:py-20 bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <SectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          align="center"
          color="text-[var(--color-text)]"
          subTitleColor="text-[var(--color-text-muted)]"
        />

        {/* The New Component */}
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} isRTL={isRTL} />
      </div>
    </section>
  );
};

export default CustomerTrustSection;
