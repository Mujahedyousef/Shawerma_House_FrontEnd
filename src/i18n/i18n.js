import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arTranslations from './ar/common.json';
import enTranslations from './en/common.json';

// Check if running on server or client
const isServer = typeof window === 'undefined';

// Get saved language from localStorage or default to 'en' (only on client)
const savedLanguage = isServer ? 'en' : (localStorage.getItem('language') || 'en');

// Initialize i18n
if (!isServer) {
  i18n.use(LanguageDetector);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Only run on client-side
if (!isServer) {
  // Save language preference when it changes
  i18n.on('languageChanged', lng => {
    localStorage.setItem('language', lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  });

  // Set initial language
  document.documentElement.lang = savedLanguage;
  document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
}

export default i18n;

