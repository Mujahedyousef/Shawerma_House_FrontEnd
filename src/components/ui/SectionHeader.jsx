import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
  align = 'center', // 'left' | 'center' | 'right'
  className = '',
  color = 'text-[var(--color-text)]',
  subTitleColor = 'text-[var(--color-text-muted)]',
}) => {
  // 1. Logic to split title into words for the "Rise Up" effect
  const words = title?.split(' ');

  // 2. Alignment mapping
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // --- VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delays each word
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 40, // Push down
      opacity: 0,
      rotateX: -90, // subtle 3D rotation
      filter: 'blur(10px)', // start blurry
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: '100px', // Target width of the line
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={`w-full flex flex-col mb-12 md:mb-20 ${alignClass[align]} ${className}`}>
      {/* OPTIONAL: Subtitle / Eyebrow Text */}
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-sm md:text-xl font-semibold tracking-widest uppercase ${subTitleColor} mb-3`}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {subtitle}
        </motion.span>
      )}

      {/* MAIN TITLE: Masked Reveal */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={` font-bold ${color} flex flex-wrap gap-x-3 gap-y-1 justify-center relative z-10`}
        style={{ justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end' }}
      >
        {words?.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1">
            {' '}
            {/* pb-1 accounts for font descenders */}
            <motion.span variants={wordVariants} className={`inline-block text-3xl md:text-4xl lg:text-5xl font-bold ${color}`}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {/* DECORATIVE LINE: Draws itself below title */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`h-1.5 mt-4 rounded-full bg-gradient-to-r from-indigo-300 via-red/90 to-rose-300`}
      />
    </div>
  );
};

export default SectionHeader;
