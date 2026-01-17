import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Clock } from 'lucide-react';
import { getJobListingById } from '../../queries/careersPage.queries';
import AnimatedButton from '../../components/ui/AnimatedButton';
import JobApplicationModal from '../../features/careers/components/JobApplicationModal';
import { getImageUrl } from '../../utils/imageUrl';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [jobListing, setJobListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await getJobListingById(id);
      setJobListing(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const processContent = htmlContent => {
    if (!htmlContent) return '';

    let processed = htmlContent;
    processed = processed.replace(/src=(["'])([^"']+)\1/gi, (match, quote, src) => {
      const absoluteSrc = getImageUrl(src);
      return `src=${quote}${absoluteSrc}${quote}`;
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

  if (!jobListing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text)]">{isRTL ? 'الوظيفة غير موجودة' : 'Job not found'}</p>
      </div>
    );
  }

  const title = isRTL ? jobListing.titleAr : jobListing.titleEn;
  const requiredExperience = isRTL ? jobListing.requiredExperienceAr : jobListing.requiredExperienceEn;
  const location = isRTL ? jobListing.locationAr : jobListing.locationEn;
  const jobType = isRTL ? jobListing.jobTypeAr : jobListing.jobTypeEn;
  const description = processContent(isRTL ? jobListing.descriptionAr || '' : jobListing.descriptionEn || '');
  const requirements = processContent(isRTL ? jobListing.requirementsAr || '' : jobListing.requirementsEn || '');
  const responsibilities = processContent(isRTL ? jobListing.responsibilitiesAr || '' : jobListing.responsibilitiesEn || '');

  return (
    <div className="w-full min-h-screen bg-[var(--color-card-surface)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[var(--color-muted)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <button
            onClick={() => navigate('/careers')}
            className={`flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-4 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <ArrowLeft size={20} />
            <span>{isRTL ? 'العودة إلى الوظائف' : 'Back to Careers'}</span>
          </button>
          <h1 className={`text-3xl md:text-4xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-muted)] rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[var(--color-text-muted)]" size={20} />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">{isRTL ? 'الموقع' : 'Location'}</p>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{location}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--color-muted)] rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Clock className="text-[var(--color-text-muted)]" size={20} />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">{isRTL ? 'الخبرة المطلوبة' : 'Experience'}</p>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{requiredExperience}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[var(--color-muted)] rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="text-[var(--color-text-muted)]" size={20} />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">{isRTL ? 'نوع الوظيفة' : 'Job Type'}</p>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{jobType}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            {description && (
              <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
                <h2 className={`text-2xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'وصف الوظيفة' : 'Job Description'}
                </h2>
                <div
                  className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                  dangerouslySetInnerHTML={{ __html: description }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.section>
            )}

            {/* Responsibilities */}
            {responsibilities && (
              <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                <h2 className={`text-2xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'المسؤوليات والمهام' : 'Responsibilities & Tasks'}
                </h2>
                <div
                  className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                  dangerouslySetInnerHTML={{ __html: responsibilities }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.section>
            )}

            {/* Requirements */}
            {requirements && (
              <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
                <h2 className={`text-2xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'المتطلبات الوظيفية' : 'Job Requirements'}
                </h2>
                <div
                  className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                  dangerouslySetInnerHTML={{ __html: requirements }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.section>
            )}

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
                color: var(--color-text);
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
              .rich-text-content table {
                width: 100%;
                border-collapse: collapse;
                margin: 1.5rem 0;
              }
              .rich-text-content table th,
              .rich-text-content table td {
                border: 1px solid var(--color-border);
                padding: 0.75rem;
                text-align: ${isRTL ? 'right' : 'left'};
              }
              .rich-text-content table th {
                background-color: var(--color-muted);
                font-weight: 600;
              }
            `}</style>
          </div>

          {/* Sidebar - Apply Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[var(--color-muted)] rounded-xl p-6 md:p-8 sticky top-20"
            >
              <h3 className={`text-xl font-bold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'انضم إلى فريقنا' : 'Join our team'}
              </h3>
              <p className={`text-[var(--color-text-muted)] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'فرصة عمل مناسبة لمهاراتك؟' : 'A suitable job opportunity for your skills?'}
              </p>
              <AnimatedButton text={isRTL ? 'قدم الآن' : 'Apply Now'} variant="brand" onClick={() => setIsApplicationModalOpen(true)} className="w-full" />
              <p className={`text-sm text-[var(--color-text-muted)] mt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL
                  ? 'نوفر بيئة عمل احترافية تساعدك على التطور، ودعم مستمر لتطوير مهاراتك وتحقيق أهدافك.'
                  : 'We provide a professional work environment that helps you develop, with continuous support for developing your skills and achieving your goals.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <JobApplicationModal
          jobId={jobListing.id}
          jobTitle={title}
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          isRTL={isRTL}
        />
      )}
    </div>
  );
};

export default JobDetailsPage;
