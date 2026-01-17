import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectPhotoGallery = ({ galleryImages, getImageUrl, titleEn = 'Project Photo Gallery', titleAr = 'معرض صور المشروع' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'], // Start when section is 80% down viewport, end when 20% down
  });

  // Transform scroll progress to different speeds for each column (parallax effect)
  // Different speeds create the staggered floating effect
  const column1Y = useTransform(scrollYProgress, [0, 1], [400, -3800]);
  const column2Y = useTransform(scrollYProgress, [0, 1], [0, -1400]);
  const column3Y = useTransform(scrollYProgress, [0, 1], [300, -3200]);

  // Distribute images across 3 columns (masonry layout)
  const columns = useMemo(() => {
    if (!galleryImages || galleryImages.length === 0) return [[], [], []];

    const col1 = [];
    const col2 = [];
    const col3 = [];

    galleryImages.forEach((image, index) => {
      const columnIndex = index % 3;
      if (columnIndex === 0) {
        col1.push(image);
      } else if (columnIndex === 1) {
        col2.push(image);
      } else {
        col3.push(image);
      }
    });

    return [col1, col2, col3];
  }, [galleryImages]);

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef} className="w-full pt-16 md:pt-24 bg-[#0b1320]">
      <div className="mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-32">{isRTL ? titleAr : titleEn}</h2>

        {/* Masonry Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 -mb-[700px]">
          {/* Column 1 */}
          <motion.div className="flex flex-col gap-4 md:gap-6" style={{ y: column1Y }}>
            {columns[0].map((image, index) => (
              <motion.div
                key={image.id || index}
                className="relative rounded-xl overflow-hidden bg-gray-300 aspect-[4/5] "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <img
                  src={getImageUrl(image.imageUrl)}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Column 2 */}
          <motion.div className="flex flex-col gap-4 md:gap-6" style={{ y: column2Y }}>
            {columns[1].map((image, index) => (
              <motion.div
                key={image.id || index}
                className="relative rounded-xl overflow-hidden bg-gray-300 aspect-[4/5] group "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <img
                  src={getImageUrl(image.imageUrl)}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Column 3 */}
          <motion.div className="flex flex-col gap-4 md:gap-6" style={{ y: column3Y }}>
            {columns[2].map((image, index) => (
              <motion.div
                key={image.id || index}
                className="relative rounded-xl overflow-hidden bg-gray-300 aspect-[4/5] group "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <img
                  src={getImageUrl(image.imageUrl)}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPhotoGallery;
