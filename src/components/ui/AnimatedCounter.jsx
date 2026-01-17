import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { formatNumber, extractNumber } from '../../utils/numberFormat';

const AnimatedCounter = ({
  value,
  duration = 2,
  delay = 0,
  className = '',
  format = true,
  springConfig = { stiffness: 100, damping: 30, mass: 1 },
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // Extract numeric value and suffix from input
  const { numericValue, suffix } = useMemo(() => {
    if (typeof value === 'number') {
      return { numericValue: value, suffix: '' };
    }
    
    const valueStr = String(value);
    // Extract number part (handles "1,000+", "1,000 products", etc.)
    const match = valueStr.match(/^([\d,]+)(.*)$/);
    if (match) {
      const numPart = match[1].replace(/,/g, '');
      const numValue = parseFloat(numPart) || 0;
      const suffixPart = match[2] || '';
      return { numericValue: numValue, suffix: suffixPart };
    }
    
    // Fallback: try to extract any number
    const numValue = extractNumber(value);
    return { numericValue: numValue, suffix: valueStr.replace(/[\d,]/g, '') };
  }, [value]);
  
  // Motion value for animation
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, springConfig);
  
  // Transform to formatted number with suffix
  const displayValue = useTransform(spring, (latest) => {
    const rounded = Math.round(latest);
    let formattedNum;
    if (format) {
      formattedNum = formatNumber(rounded);
    } else {
      formattedNum = String(rounded);
    }
    
    // Add "+" sign at the end to indicate "more than" if not already present
    const finalSuffix = suffix.includes('+') ? suffix : suffix + '+';
    
    return formattedNum + finalSuffix;
  });

  useEffect(() => {
    if (isInView) {
      // Start animation after delay
      const timer = setTimeout(() => {
        motionValue.set(numericValue);
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else {
      // Reset when not in view
      motionValue.set(0);
    }
  }, [isInView, numericValue, delay, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      <motion.span className="text-base md:text-xl font-bold">{displayValue}</motion.span>
    </motion.span>
  );
};

export default AnimatedCounter;

