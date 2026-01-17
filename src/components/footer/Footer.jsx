import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useFooter } from '../../hooks/useFooter';
import AnimatedButton from '../ui/AnimatedButton';

// --- ANIMATION VARIANTS ---

// Controls the staggering of the children (columns/sections)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Controls the fade-up effect for each item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- SUB-COMPONENTS ---

const getSocialIcon = iconType => {
  const iconMap = {
    Linkedin: Linkedin,
    Facebook: Facebook,
    Instagram: Instagram,
    Youtube: Youtube,
    Snapchat: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.15c-.012.75-.024 1.486-.011 2.254.016 1.17.032 2.38.032 3.618 0 2.794-.103 4.852-.268 6.196-.127 1.044-.27 1.736-.49 2.24-.28.64-.65 1.216-1.17 1.752-.56.58-1.29 1.017-2.21 1.405-.99.41-2.25.699-3.75.852-1.5.15-3.21.19-4.97.19-1.76 0-3.47-.04-4.97-.19-1.5-.153-2.76-.442-3.75-.852-.92-.388-1.65-.825-2.21-1.405-.52-.536-.89-1.112-1.17-1.752-.22-.504-.363-1.196-.49-2.24-.165-1.344-.268-3.402-.268-6.196 0-1.238.016-2.448.032-3.618.013-.768.001-1.504-.011-2.254l-.003-.15c-.104-1.628-.23-3.654.299-4.847C3.347 1.069 6.704.793 7.694.793h4.512z" />
      </svg>
    ),
  };
  return iconMap[iconType] || Linkedin;
};

// Modular Social Button with Pop Effect
const SocialButton = ({ social }) => {
  const IconComponent = getSocialIcon(social.iconType);
  const isSnapchat = social.iconType === 'Snapchat';

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center"
      aria-label={social.name}
      variants={itemVariants}
      whileHover={{
        scale: 1.15,
        backgroundColor: '#334155',
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-white">{isSnapchat ? <IconComponent /> : <IconComponent className="w-5 h-5" />}</div>
    </motion.a>
  );
};

// Modular Link with Slide Effect
const FooterLink = ({ link, isRTL }) => {
  return (
    <motion.li variants={itemVariants} className="block overflow-hidden">
      <motion.a
        href={link.link}
        className="text-[var(--color-text2)] inline-block"
        initial={{ x: 0 }}
        whileHover={{
          x: isRTL ? -6 : 6,
          color: '#ffffff',
        }}
        transition={{ duration: 0.2 }}
      >
        {isRTL ? link.textAr : link.textEn}
      </motion.a>
    </motion.li>
  );
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [email, setEmail] = useState('');
  const [hoveredButton, setHoveredButton] = useState(null);
  const { footerSettings, loading } = useFooter();

  // Group links by column
  const linksByColumn = useMemo(() => {
    if (!footerSettings?.links) return { 1: [], 2: [], 3: [], 4: [] };

    const grouped = { 1: [], 2: [], 3: [], 4: [] };
    footerSettings.links.forEach(link => {
      if (link.isActive && grouped[link.column]) {
        grouped[link.column].push(link);
      }
    });
    return grouped;
  }, [footerSettings]);

  // Get column titles
  const getColumnTitle = columnNumber => {
    if (!footerSettings) return '';
    const lang = isRTL ? 'Ar' : 'En';
    return footerSettings[`column${columnNumber}Title${lang}`] || '';
  };

  // Get localized text from settings
  const getText = key => {
    if (!footerSettings) return '';
    const lang = isRTL ? 'Ar' : 'En';
    return footerSettings[`${key}${lang}`] || '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  if (loading) {
    return (
      <footer className="bg-bg2 ">
        <div className="mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex justify-center items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-text rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-text rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-text rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerSettings) return null;

  const columnTitleStyles = 'text-[var(--color-text-muted2)] font-normal text-sm mb-4';

  return (
    <footer className="bg-bg2  border-t border-border overflow-hidden">
      {/* Main Animation Container 
        viewport={{ once: true }} ensures animation happens only on first scroll
      */}
      <motion.div
        className="mx-auto px-4 md:px-8 py-10 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Top Section - Columns */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          {[1, 2, 3, 4].map(colNum => (
            <motion.div key={colNum} variants={itemVariants}>
              <h3 className={columnTitleStyles}>{getColumnTitle(colNum)}</h3>
              <ul className="space-y-2">
                {linksByColumn[colNum].map(link => (
                  <FooterLink key={link.id} link={link} isRTL={isRTL} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12">
          <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 }`}>
            {/* Follow Us On - Left */}
            <motion.div variants={itemVariants} className={`flex flex-col gap-4 ${isRTL ? 'items-end lg:items-start' : 'items-start'}`}>
              <h4 className="text-muted font-normal text-sm">{getText('followUsTitle')}</h4>
              <div className="flex gap-3">
                {footerSettings.socialMedia && footerSettings.socialMedia.length > 0
                  ? footerSettings.socialMedia.map(social => <SocialButton key={social.id} social={social} />)
                  : null}
              </div>
            </motion.div>

            {/* Subscribe to Newsletter - Right */}
            <motion.div variants={itemVariants} className={`flex-1 max-w-md w-full ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h4 className="text-gray-400 font-normal text-sm mb-4">{getText('newsletterTitle')}</h4>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={getText('newsletterEmailPlaceholder')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-bg2 text-text2 placeholder-gray-400 px-4 py-2 rounded-lg border border-border"
                  required
                />
                <AnimatedButton text={getText('newsletterButtonText')} variant="primary" textSize="base" icon={ChevronRight} iconSize="base" />
              </form>
            </motion.div>
          </div>

          {/* Copyright - Bottom Center */}
          <motion.div variants={itemVariants} className="mt-4 pt-4 text-center">
            <p className="text-gray-400 text-base">{getText('copyrightText')}</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
