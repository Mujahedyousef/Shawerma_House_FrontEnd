import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, PenTool } from 'lucide-react';
import BlogConclusion from './BlogConclusion';

const BlogDetailsHero = ({ blog, isRTL, getImageUrl }) => {
  const formatDate = dateString => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-EG' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const title = isRTL ? blog.titleAr : blog.titleEn;
  const description = isRTL ? blog.descriptionAr : blog.descriptionEn;
  const rawContent = isRTL ? blog.contentAr : blog.contentEn;
  const conclusion = isRTL ? blog.conclusionAr : blog.conclusionEn;
  const imageSrc = getImageUrl(blog.imageUrl);
  const categoryName = blog.category ? (isRTL ? blog.category.nameAr : blog.category.nameEn) : null;
  const authorName = isRTL ? blog.authorAr : blog.authorEn;

  // Process HTML content to convert relative image URLs to absolute URLs and fix links
  const processContent = htmlContent => {
    if (!htmlContent) return '';

    let processed = htmlContent;

    processed = processed.replace(/src=(["'])([^"']+)\1/gi, (match, quote, src) => {
      const absoluteSrc = getImageUrl(src);
      return `src=${quote}${absoluteSrc}${quote}`;
    });

    processed = processed.replace(/href=(["'])([^"']+)\1/gi, (match, quote, href) => {
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('#')) {
        return match;
      }
      if (href.startsWith('/')) {
        return match;
      }
      return `href=${quote}https://${href}${quote}`;
    });

    return processed;
  };

  const content = processContent(rawContent);

  return (
    <div className="w-full">
      {/* Title and Description Section - Dark Background */}
      <div className="relative w-full bg-[#0b1320] py-16 md:py-20">
        {/* Gradient overlay at bottom to blend with image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(11, 19, 32, 0.5) 50%, rgba(11, 19, 32, 1) 100%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto text-center space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center leading-tight line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            {description && (
              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto text-center leading-relaxed line-clamp-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Image Section - Full Width, Large Height */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] mt-0">
        {/* Gradient overlay at top to blend with dark section */}
        <div
          className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(11, 19, 32, 1) 0%, rgba(11, 19, 32, 0.5) 50%, transparent 100%)',
          }}
        />
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />

        {/* Metadata Section - Dark Background at Bottom of Image */}
        <div className="w-full bg-[#0b132015] rounded-3xl backdrop-blur-sm py-6 absolute bottom-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Author */}
              {authorName && (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <PenTool size={18} className="text-white shrink-0" />
                  <span className="text-base text-white">{authorName}</span>
                </div>
              )}

              {/* Horizontal Separator Line - Longer */}
              {authorName && blog.date && <div className="flex-1 h-px bg-white/30" />}

              {/* Date */}
              {blog.date && (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar size={18} className="text-white shrink-0" />
                  <span className="text-base text-white whitespace-nowrap">{formatDate(blog.date)}</span>
                </div>
              )}

              {/* Category */}
              {categoryName && (
                <div className="border border-white/30 rounded-full px-4 py-1.5">
                  <span className="text-sm font-semibold text-white">{categoryName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      {content && (
        <section className="w-full pt-10 md:pt-14 bg-[var(--color-bg)]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div
              className={`rich-text-content text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
              dangerouslySetInnerHTML={{ __html: content }}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <style>{`
              .rich-text-content ul,
              .rich-text-content ol {
                margin: 1rem 0;
                ${isRTL ? 'padding-right: 1.5rem;' : 'padding-left: 1.5rem;'}
                ${isRTL ? 'padding-left: 0;' : 'padding-right: 0;'}
              }
              .rich-text-content ul {
                list-style-type: disc;
              }
              .rich-text-content ol {
                list-style-type: decimal;
              }
              .rich-text-content li {
                margin: 0.5rem 0;
                ${isRTL ? 'text-align: right;' : 'text-align: left;'}
                display: list-item;
              }
              .rich-text-content ul ul,
              .rich-text-content ol ol,
              .rich-text-content ul ol,
              .rich-text-content ol ul {
                margin: 0.5rem 0;
              }
              .rich-text-content p {
                margin: 1rem 0;
              }
              .rich-text-content strong {
                font-weight: 600;
              }
              .rich-text-content em {
                font-style: italic;
              }
              .rich-text-content a {
                color: var(--color-brand, #020617);
                text-decoration: underline;
              }
              .rich-text-content h1,
              .rich-text-content h2,
              .rich-text-content h3,
              .rich-text-content h4,
              .rich-text-content h5,
              .rich-text-content h6 {
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                color: var(--color-text);
              }
              .rich-text-content img {
                max-width: 100%;
                height: auto;
                margin: 1.5rem 0;
                border-radius: 0.5rem;
              }
            `}</style>
          </div>
        </section>
      )}

      {/* Conclusion Section */}
      <BlogConclusion conclusion={conclusion} isRTL={isRTL} />
    </div>
  );
};

export default BlogDetailsHero;
