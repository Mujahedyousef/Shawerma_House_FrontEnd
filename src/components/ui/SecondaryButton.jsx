import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const SecondaryButton = ({ text, onClick, icon: Icon = ChevronRight, isRTL = false, className, ...props }) => {
  // 1. Exact easing curve from your AnimatedButton
  const easeCurve = 'ease-[cubic-bezier(0.23,1,0.32,1)]';

  return (
    <motion.button
      layout
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={twMerge(
        // Parent Button Styles
        'relative group flex items-center gap-2 px-6 py-3 mx-auto cursor-pointer overflow-hidden rounded-xl',
        'bg-white/10 backdrop-blur-md border border-white/20',
        'shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

      {/* Button Text */}
      <span className="relative z-10 text-sm font-semibold text-white tracking-wide drop-shadow-md">{text}</span>

      {/* Icon Container 
        We use w-5 h-5 to ensure enough space. 
        overflow-hidden masks the sliding icons.
      */}
      <div className="relative z-10 w-5 h-5 overflow-hidden">
        {/* --- Icon 1: The one initially visible --- */}
        <Icon
          size={18} // Increased slightly for visibility
          className={twMerge(
            'absolute top-1/2 -translate-y-1/2 text-white drop-shadow-md',
            'transition-all duration-800', // Matches AnimatedButton duration
            easeCurve,

            // RTL Logic: Rotate arrow if needed
            isRTL ? 'rotate-180' : '',

            // SLIDE LOGIC (Position based)
            // LTR: Starts at right-0. Hover: Slides OUT to the right (-150%)
            // RTL: Starts at left-0. Hover: Slides OUT to the left (-150%)
            isRTL ? 'left-0 group-hover:left-[-150%]' : 'right-0 group-hover:right-[-150%]'
          )}
        />

        {/* --- Icon 2: The one that slides IN --- */}
        <Icon
          size={18}
          className={twMerge(
            'absolute top-1/2 -translate-y-1/2 text-white drop-shadow-md',
            'transition-all duration-800',
            easeCurve,
            isRTL ? 'rotate-180' : '',

            // SLIDE LOGIC (Position based)
            // LTR: Starts hidden to the LEFT (right-[150%]). Hover: Slides IN to center (right-0)
            // RTL: Starts hidden to the RIGHT (left-[150%]). Hover: Slides IN to center (left-0)
            isRTL ? 'left-[150%] group-hover:left-0' : 'right-[150%] group-hover:right-0'
          )}
        />
      </div>
    </motion.button>
  );
};

export default SecondaryButton;
