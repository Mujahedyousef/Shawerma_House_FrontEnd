import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ServiceCard = ({ service, isRTL }) => {
  const { t } = useTranslation();
  const [showTags, setShowTags] = useState(false);

  const title = isRTL ? service.titleAr : service.titleEn;
  const description = isRTL ? service.descriptionAr : service.descriptionEn;
  const tags = service.tags || [];
  const count = String(service.count).padStart(2, '0');

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  return (
    <motion.div
      className="bg-card-surface2 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Count Number */}
      <div className={`flex justify-${isRTL ? 'start' : 'end'} mb-4`}>
        <span className="text-base font-bold text-text">{count}</span>
      </div>

      {/* Title */}
      <h3 className={`text-2xl md:text-3xl font-bold text-text mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{title}</h3>

      {/* Description */}
      {description && (
        <p className={`text-text-muted mb-6 leading-relaxed max-h-[225px] overflow-auto break-words ${isRTL ? 'text-right' : 'text-left'}`}>{description}</p>
      )}

      {/* Tags Section */}
      <AnimatePresence>
        {showTags && tags.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {tags.map((tag, index) => (
                <motion.span
                  key={tag.id || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-1 py-1 bg-slate-300 text-slate-700 rounded-xs text-sm font-medium"
                >
                  {isRTL ? tag.textAr : tag.textEn}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Less/More Button */}
      {tags.length > 0 && (
        <button
          onClick={toggleTags}
          className={`mt-auto flex items-center gap-2 text-text-muted cursor-pointer transition-colors text-sm font-medium ${isRTL ? 'mr-auto' : 'ml-auto'}`}
        >
          {showTags ? (
            <>
              {isRTL ? 'عرض تفاصيل أقل' : 'Show less details'}
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {isRTL ? 'عرض تفاصيل أكثر' : 'Show more details'}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
};

export default ServiceCard;
