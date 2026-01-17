import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useFAQPage } from '../../../hooks/useFAQPage';

const FAQSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, loading } = useFAQPage();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (loading || !settings) {
    return null;
  }

  const faqItems = settings.faqItems || [];
  const activeItems = faqItems.filter(item => item.isActive);

  if (activeItems.length === 0) {
    return null;
  }

  const title = isRTL ? settings.titleAr : settings.titleEn;
  const description = isRTL ? settings.descriptionAr : settings.descriptionEn;

  return (
    <section className="w-full py-12 md:py-16 bg-[var(--color-card-surface)]">
      <div className="mx-auto px-4 md:px-8">
        <div className={`flex flex-col md:flex-row justify-between`}>
          {/* Title and Description - Right Side in RTL, Left Side in LTR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`w-full mb-8 md:mb-0`}
          >
            <div className={`${isRTL ? 'text-right' : 'text-left'} `}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>

          {/* FAQ Items - Left Side in RTL, Right Side in LTR */}
          <motion.div
            className={`w-full`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-0">
              {activeItems.map((item, index) => {
                const isExpanded = expandedItems.has(item.id);
                const question = isRTL ? item.questionAr : item.questionEn;
                const answer = isRTL ? item.answerAr : item.answerEn;
                const itemNumber = String(item.order + 1).padStart(2, '0');

                return (
                  <div
                    key={item.id}
                    className={`border-b border-[var(--color-border)] last:border-b-0 ${
                      index === 0 ? 'border-t border-[var(--color-border)]' : ''
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center gap-4 py-5 hover:bg-[var(--color-muted)] transition-colors ${
                        isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                      }`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {/* Circular Icon */}
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-text)] flex items-center justify-center text-white">
                        {isExpanded ? (
                          <Minus size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </div>

                      {/* Question Number and Text */}
                      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 ${isRTL ? '' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                          <span className="text-xs font-bold text-[var(--color-text-muted)] shrink-0">
                            {itemNumber}
                          </span>
                          <p className={`font-semibold text-[var(--color-text)] text-base md:text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                            {question}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Answer Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ 
                            duration: 0.3,
                            ease: 'easeInOut',
                            height: { duration: 0.3 },
                            opacity: { duration: 0.2 }
                          }}
                          className={`overflow-hidden ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <div className="pb-5">
                            <p className={`text-[var(--color-text-muted)] leading-relaxed text-sm md:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                              {answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
