import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AnimatedTestimonials = ({ testimonials, autoplay = false, className, isRTL = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive(prev => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = index => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn('max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20 antialiased font-sans', className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* IMAGE SECTION - 3D Card Stack (Displays the BIG Hero Images) */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {/* Creative Integration: Avatar next to Name */}
            <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border shadow-sm"
              />
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <h3 className="text-2xl font-bold text-[var(--color-text)]">{testimonials[active].name}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{testimonials[active].designation}</p>
              </div>
            </div>

            <motion.p className={`text-lg text-[var(--color-text-muted)] mt-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.02 * index,
                  }}
                  className="inline-block text-lg"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className={`flex gap-4 pt-12 md:pt-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={isRTL ? handleNext : handlePrev}
              className="h-10 w-10 cursor-pointer rounded-full bg-slate-950 hover:bg-slate-800  flex items-center justify-center group/button transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={isRTL ? handlePrev : handleNext}
              className="h-10 w-10 cursor-pointer rounded-full bg-slate-950 hover:bg-gray-800  flex items-center justify-center group/button transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
