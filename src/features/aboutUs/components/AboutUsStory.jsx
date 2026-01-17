import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../../components/ui/SectionHeader';

const AboutUsStory = ({ settings, isRTL }) => {
  const scrollRef = useRef(null);

  // Drag State Logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Data from CMS
  const storyTitle = isRTL ? settings?.ourStorySectionTitleAr : settings?.ourStorySectionTitleEn;
  const storySubtitle = isRTL ? settings?.ourStorySectionSubtitleAr : settings?.ourStorySectionSubtitleEn;
  const mainDescription = isRTL ? settings?.ourStoryMainDescAr : settings?.ourStoryMainDescEn;
  const storyItems = settings?.storyItems || [];

  // Mouse Down (Start Drag)
  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Mouse Leave/Up (Stop Drag)
  const handleMouseUp = () => setIsDragging(false);

  // Mouse Move (Dragging)
  const handleMouseMove = e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full py-16 md:py-20 bg-[var(--color-bg)] overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full">
        {/* --- Header Section --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 md:mb-24">
          <SectionHeader title={storyTitle} subtitle={storySubtitle} align="center" color="text-[var(--color-text)]" subTitleColor="text-[var(--color-text-muted)]" />

          {mainDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-base md:text-xl text-[var(--color-text-muted)] leading-relaxed text-center"
            >
              {mainDescription}
            </motion.p>
          )}
        </div>

        {/* --- Timeline Scrollable Area --- */}
        <div className="relative w-full" onMouseDown={handleMouseDown} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
          <div
            ref={scrollRef}
            className={`overflow-x-auto overflow-y-hidden pb-12 scrollbar-hide w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* PADDING LOGIC:
               Mobile Item Width: 320px -> Half is 160px
               Desktop Item Width: 500px -> Half is 250px
               Padding = 50vw - Half Item Width. 
               This ensures the first item is centered on screen load.
            */}
            <div className="relative min-w-max flex px-[calc(50vw-160px)] md:px-[calc(50vw-250px)]">
              {storyItems &&
                storyItems.length > 0 &&
                storyItems.map((item, index) => {
                  const title = isRTL ? item.titleAr : item.titleEn;
                  const description = isRTL ? item.descriptionAr : item.descriptionEn;
                  const isLastItem = index === storyItems.length - 1;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex flex-col items-center justify-start flex-shrink-0 select-none w-[320px] md:w-[500px]"
                    >
                      {/* THE CONNECTING LINE 
                        - Rendered for every item EXCEPT the last one.
                        - Starts at 50% (center of current item).
                        - Width 100% (reaches exactly to the center of the next item).
                        - Top positioned at center of the circle (half of h-40/h-48).
                     */}
                      {!isLastItem && (
                        <div
                          className={`absolute top-20 md:top-24 border-t-[3px] border-dashed border-[var(--color-border)] opacity-40 w-full z-10 ${
                            isRTL ? 'right-1/2' : 'left-1/2'
                          }`}
                        />
                      )}

                      <div className="w-[320px] md:w-[500px] flex flex-col items-center">
                        {/* Year Circle */}
                        <div className="w-40 h-40 md:w-48 md:h-48 bg-[var(--color-card)] rounded-full flex items-center justify-center mb-8 border-[8px] border-[var(--color-bg)] shadow-xl transition-transform hover:scale-105 z-10 relative">
                          <span className="text-[var(--color-text)] font-bold text-3xl md:text-5xl tracking-widest">{item.year}</span>
                        </div>

                        {/* Content */}
                        <div className="text-center px-4 max-w-[280px] md:max-w-[380px]">
                          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">{title}</h3>
                          <p className="text-[var(--color-text-muted)] leading-relaxed text-sm md:text-lg">{description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsStory;
