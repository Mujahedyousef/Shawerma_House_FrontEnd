import React from 'react';
import { Target } from 'lucide-react';

const BlogConclusion = ({ conclusion, isRTL }) => {
  if (!conclusion) return null;

  return (
    <section className="w-full pb-8 bg-[var(--color-bg)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className={`bg-card-surface2 rounded-lg ${isRTL ? 'border-r-4 border-slate-500' : 'border-l-4 border-slate-500'} p-4 md:p-5`}>
          {/* Header with Icon and Title */}
          <div className={`flex items-center gap-2 mb-4 `}>
            <Target size={24} className="text-blue-500 shrink-0" strokeWidth={2} />
            <h2 className={`text-xl md:text-2xl font-bold text-text ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الخلاصة' : 'Conclusion'}</h2>
          </div>

          {/* Conclusion Text */}
          <div className={`text-base md:text-lg text-text-muted leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="whitespace-pre-line">{conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogConclusion;
