import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun, Menu, X, Phone } from 'lucide-react';
import { getNavbarSettings } from '../../queries/navbar.queries';
import AnimatedButton from '../ui/AnimatedButton';
import { getImageUrl } from '../../utils/imageUrl';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [navbarLinks, setNavbarLinks] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use consistent colors that work with solid navbar background
  const navLinkClass =
    'text-[var(--color-text)] no-underline font-medium text-[0.875rem] sm:text-[0.95rem] transition-colors duration-200 hover:text-text whitespace-nowrap';

  const iconButtonClass =
    'w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)] hover:scale-105 text-[var(--color-text)] border border-[var(--color-border)]';

  const mobileMenuBorderClass = 'lg:hidden border-t border-[var(--color-border)] mt-2 pt-4 pb-4';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const fetchNavbarSettings = async () => {
      try {
        const response = await getNavbarSettings();
        if (response?.data) {
          // Set logo URL
          if (response.data.logoUrl) {
            setLogoUrl(getImageUrl(response.data.logoUrl));
          }
          // Set navbar links
          if (response.data.links && Array.isArray(response.data.links)) {
            setNavbarLinks(response.data.links.filter(link => link.isActive));
          }
        }
      } catch (error) {
        console.error('Error fetching navbar settings:', error);
        // Keep default logo and links if API fails
      }
    };

    fetchNavbarSettings();
  }, []);

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change to solid after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isRTL = i18n.language === 'ar';

  // Dynamic navbar background based on scroll state
  // Solid background with backdrop blur for better visibility
  const navbarBackgroundClass = isScrolled
    ? 'bg-[var(--color-card-surface)]/95 backdrop-blur-md shadow-lg border-b border-[var(--color-border)]'
    : 'bg-[var(--color-card-surface)]/80 backdrop-blur-sm border-b border-[var(--color-border)]/50';

  return (
    <nav className={`sticky top-0 left-0 right-0 z-[1000] ${navbarBackgroundClass} transition-all duration-300 ${isRTL ? 'rtl' : ''}`}>
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 flex-nowrap`}>
        {/* Left Section: Logo + Navigation Links */}
        <div className={`flex items-center gap-2 sm:gap-3 lg:gap-6 min-w-0 flex-shrink`}>
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={logoUrl} alt="Central Jordanian Logo" className="h-7 sm:h-8 md:h-10 lg:h-[52px] w-auto cursor-pointer" />
          </Link>

          {/* Navigation Links - Hidden on mobile and tablet, shown on large screens */}
          <div className={`hidden lg:flex items-center gap-4 xl:gap-6 shrink-0`}>
            {navbarLinks.map(link => (
              <a key={link.id} href={link.link} className={navLinkClass}>
                {i18n.language === 'ar' ? link.textAr : link.textEn}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className={`flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0`}>
          {/* Contact Us Button - Hidden on very small screens, visible from sm */}
          <div className="hidden sm:block">
            <AnimatedButton
              text={t('navbar.contactUs')}
              icon={Phone}
              iconSize="sm"
              variant="primary"
              textSize="sm"
              className="whitespace-nowrap"
              onClick={() => {
                window.location.href = '/contact';
              }}
            />
          </div>

          {/* Hamburger Menu - Mobile and tablet */}
          <button
            className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)]`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
          </button>

          {/* Language & Theme Toggles - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              className="w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)] hover:scale-105 text-[var(--color-text)] border border-[var(--color-border)]"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <Globe size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              className="w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)] hover:scale-105 text-[var(--color-text)] border border-[var(--color-border)]"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className={mobileMenuBorderClass}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`flex flex-col gap-3 px-4 sm:px-6 lg:px-8 ${isRTL ? 'items-end' : 'items-start'}`}>
            {/* Navigation Links */}
            {navbarLinks.length > 0 ? (
              navbarLinks.map(link => (
                <a key={link.id} href={link.link} className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {i18n.language === 'ar' ? link.textAr : link.textEn}
                </a>
              ))
            ) : (
              // Fallback to default links if no dynamic links are available
              <>
                <a href="products" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.products')}
                </a>
                <a href="projects" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.projects')}
                </a>
                <a href="services" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.services')}
                </a>
                <a href="#articles" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.articles')}
                </a>
                <a href="#about" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.aboutUs')}
                </a>
              </>
            )}

            {/* Contact Button - Show on mobile menu */}
            <div className="sm:hidden w-full mt-2">
              <AnimatedButton
                text={t('navbar.contactUs')}
                icon={Phone}
                iconSize="sm"
                variant="brand"
                textSize="sm"
                className="w-full"
                onClick={() => {
                  window.location.href = '/contact';
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Language & Theme Toggles */}
            <div className={`flex items-center gap-3 mt-2`}>
              <button className={iconButtonClass} onClick={toggleLanguage} aria-label="Toggle language">
                <Globe size={18} />
              </button>
              <button className={iconButtonClass} onClick={toggleTheme} aria-label="Toggle theme">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
