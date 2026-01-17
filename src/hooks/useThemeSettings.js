import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeSettings } from '../queries/theme.queries';

export const useThemeSettings = () => {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  // Function to apply the correct font based on current language
  const applyFontBasedOnLanguage = () => {
    const root = document.documentElement;
    const body = document.body;
    const isRTL = i18n.language === 'ar';

    if (isRTL) {
      const fontAr = root.getAttribute('data-font-ar');
      if (fontAr) {
        root.style.setProperty('--font-sans', `'${fontAr}', sans-serif`);
        // Also update body font directly and add class
        body.style.fontFamily = `'${fontAr}', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      } else {
        // Fallback to default Arabic font
        root.style.setProperty('--font-sans', `'Cairo', sans-serif`);
        body.style.fontFamily = `'Cairo', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      }
    } else {
      const fontEn = root.getAttribute('data-font-en');
      if (fontEn) {
        root.style.setProperty('--font-sans', `'${fontEn}', sans-serif`);
        // Also update body font directly and add class
        body.style.fontFamily = `'${fontEn}', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      } else {
        // Fallback to default English font
        root.style.setProperty('--font-sans', `'Inter', sans-serif`);
        body.style.fontFamily = `'Inter', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      }
    }
  };

  useEffect(() => {
    const applyThemeSettings = async () => {
      try {
        const response = await getThemeSettings();
        if (response?.data) {
          const settings = response.data;
          const root = document.documentElement;

          // Apply brand colors (these work in both modes)
          if (settings.colorBrand) root.style.setProperty('--color-brand', settings.colorBrand);
          if (settings.colorBrandDark) root.style.setProperty('--color-brand-dark', settings.colorBrandDark);
          if (settings.colorAccent) root.style.setProperty('--color-accent', settings.colorAccent);
          if (settings.colorDestructive) root.style.setProperty('--color-destructive', settings.colorDestructive);
          if (settings.colorWarning) root.style.setProperty('--color-warning', settings.colorWarning);
          if (settings.colorInfo) root.style.setProperty('--color-info', settings.colorInfo);
          if (settings.colorRing) root.style.setProperty('--color-ring', settings.colorRing);
          
          // Create style tags for both light and dark mode to avoid inline style conflicts
          // Light Mode Colors (apply to :root without data-theme='dark')
          const lightModeStyle = document.createElement('style');
          lightModeStyle.id = 'theme-light-mode-colors';
          let lightCss = `:root:not([data-theme='dark']) {`;
          lightCss += `--color-bg1: ${settings.colorBg1 || '#f1f5f9'};`;
          lightCss += `--color-bg2: ${settings.colorBg2 || '#ffffff'};`;
          lightCss += `--color-card: ${settings.colorCard || '#ffffff'};`;
          lightCss += `--color-border: ${settings.colorBorder || '#e5e7eb'};`;
          lightCss += `--color-text: ${settings.colorText || '#020617'};`;
          lightCss += `--color-text2: ${settings.colorText2 || '#64748b'};`;
          lightCss += `--color-text-muted: ${settings.colorTextMuted || '#64748b'};`;
          lightCss += `--color-text-muted2: ${settings.colorTextMuted2 || '#94a3b8'};`;
          // Button Colors - Light Mode
          lightCss += `--color-button-primary-bg: ${settings.colorButtonPrimaryBg || '#020617'};`;
          lightCss += `--color-button-primary-bg-hover: ${settings.colorButtonPrimaryBgHover || '#0f172a'};`;
          lightCss += `--color-button-primary-text: ${settings.colorButtonPrimaryText || '#ffffff'};`;
          lightCss += `--color-button-primary-text-hover: ${settings.colorButtonPrimaryTextHover || '#ffffff'};`;
          lightCss += `--color-button-secondary-bg: ${settings.colorButtonSecondaryBg || 'transparent'};`;
          lightCss += `--color-button-secondary-bg-hover: ${settings.colorButtonSecondaryBgHover || '#f1f5f9'};`;
          lightCss += `--color-button-secondary-text: ${settings.colorButtonSecondaryText || '#020617'};`;
          lightCss += `--color-button-secondary-text-hover: ${settings.colorButtonSecondaryTextHover || '#020617'};`;
          lightCss += `}`;
          
          // Remove old light mode style if exists
          const oldLightStyle = document.getElementById('theme-light-mode-colors');
          if (oldLightStyle) oldLightStyle.remove();
          
          lightModeStyle.textContent = lightCss;
          document.head.appendChild(lightModeStyle);
          
          // Dark Mode Colors (apply to data-theme='dark' selector)
          // Always create dark mode styles, using DB values if available, or CSS defaults if not
          const darkModeStyle = document.createElement('style');
          darkModeStyle.id = 'theme-dark-mode-colors';
          let css = `:root[data-theme='dark'] {`;
          css += `--color-bg1: ${settings.colorBg1Dark || '#020617'};`;
          css += `--color-bg2: ${settings.colorBg2Dark || '#0f172a'};`;
          css += `--color-card: ${settings.colorCardDark || '#1e293b'};`;
          css += `--color-border: ${settings.colorBorderDark || '#334155'};`;
          css += `--color-text: ${settings.colorTextDark || '#ffffff'};`;
          css += `--color-text2: ${settings.colorText2Dark || '#cbd5e1'};`;
          css += `--color-text-muted: ${settings.colorTextMutedDark || '#cbd5e1'};`;
          css += `--color-text-muted2: ${settings.colorTextMuted2Dark || '#94a3b8'};`;
          // Button Colors - Dark Mode
          css += `--color-button-primary-bg: ${settings.colorButtonPrimaryBgDark || '#ffffff'};`;
          css += `--color-button-primary-bg-hover: ${settings.colorButtonPrimaryBgHoverDark || '#f1f5f9'};`;
          css += `--color-button-primary-text: ${settings.colorButtonPrimaryTextDark || '#020617'};`;
          css += `--color-button-primary-text-hover: ${settings.colorButtonPrimaryTextHoverDark || '#020617'};`;
          css += `--color-button-secondary-bg: ${settings.colorButtonSecondaryBgDark || 'transparent'};`;
          css += `--color-button-secondary-bg-hover: ${settings.colorButtonSecondaryBgHoverDark || '#1e293b'};`;
          css += `--color-button-secondary-text: ${settings.colorButtonSecondaryTextDark || '#ffffff'};`;
          css += `--color-button-secondary-text-hover: ${settings.colorButtonSecondaryTextHoverDark || '#ffffff'};`;
          css += `}`;
          
          // Remove old style if exists
          const oldStyle = document.getElementById('theme-dark-mode-colors');
          if (oldStyle) oldStyle.remove();
          
          darkModeStyle.textContent = css;
          document.head.appendChild(darkModeStyle);

          // Store font families for later use (don't apply immediately)
          if (settings.fontFamily) {
            root.setAttribute('data-font-en', settings.fontFamily);
          }
          if (settings.fontFamilyAr) {
            root.setAttribute('data-font-ar', settings.fontFamilyAr);
          }

          // Apply the correct font based on current language after settings are loaded
          applyFontBasedOnLanguage();
        }
      } catch (error) {
        console.error('Failed to load theme settings, using defaults:', error);
      } finally {
        setLoading(false);
      }
    };

    applyThemeSettings();
  }, []);

  // Update font when language changes
  useEffect(() => {
    // Apply font whenever language changes, checking if settings are loaded
    const root = document.documentElement;
    const hasFontEn = root.hasAttribute('data-font-en');
    const hasFontAr = root.hasAttribute('data-font-ar');

    // If settings are loaded, apply font based on language
    if (hasFontEn || hasFontAr) {
      applyFontBasedOnLanguage();
    } else {
      // If settings not loaded yet, apply default fonts based on language
      const body = document.body;
      const isRTL = i18n.language === 'ar';

      if (isRTL) {
        root.style.setProperty('--font-sans', `'Cairo', sans-serif`);
        body.style.fontFamily = `'Cairo', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      } else {
        root.style.setProperty('--font-sans', `'Inter', sans-serif`);
        body.style.fontFamily = `'Inter', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      }
    }
  }, [i18n.language]);

  return { loading };
};
