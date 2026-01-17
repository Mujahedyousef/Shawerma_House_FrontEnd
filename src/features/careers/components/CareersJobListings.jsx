import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeader from '../../../components/ui/SectionHeader';
import AnimatedButton from '../../../components/ui/AnimatedButton';

const CareersJobListings = ({ settings, isRTL }) => {
  const navigate = useNavigate();
  const jobBenefits = settings?.jobBenefits || [];
  const jobListings = settings?.jobListings || [];

  if (jobListings.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-card-surface)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <SectionHeader title={isRTL ? 'الوظائف المتاحة حاليا' : 'Available Jobs Now'} align="center" color="text-[var(--color-text)]" subTitleColor="text-[var(--color-text-muted)]" />

        {/* Job Benefits */}
        {jobBenefits.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            {jobBenefits.map((benefit, index) => {
              const text = isRTL ? benefit.textAr : benefit.textEn;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-[var(--color-text-muted)]"
                >
                  <Check size={20} className="text-[var(--color-text-muted)] flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">{text}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-4">
          {jobListings.map((job, index) => {
            const title = isRTL ? job.titleAr : job.titleEn;
            const requiredExperience = isRTL ? job.requiredExperienceAr : job.requiredExperienceEn;
            const location = isRTL ? job.locationAr : job.locationEn;
            const jobType = isRTL ? job.jobTypeAr : job.jobTypeEn;

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--color-muted)] rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/careers/job/${job.id}`)}
              >
                <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 `}>
                  {/* Job Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className={`text-xl md:text-2xl font-bold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>
                    <div className={`flex flex-wrap gap-4 md:gap-6 text-sm md:text-base text-[var(--color-text-muted)] `}>
                      <span>
                        {isRTL ? 'الخبرة المطلوبة:' : 'Required Experience:'} {requiredExperience}
                      </span>
                      <span>
                        {isRTL ? 'الموقع:' : 'Location:'} {location}
                      </span>
                      <span>
                        {isRTL ? 'نوع الوظيفة:' : 'Job Type:'} {jobType}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <AnimatedButton text={isRTL ? 'قدم الآن' : 'Apply Now'} variant="brand" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareersJobListings;
