import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslations from './ar/common.json';
import enTranslations from './en/common.json';

// Server-side i18n configuration (no LanguageDetector, no localStorage)
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
    lng: 'en', // Default language for SSR
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
