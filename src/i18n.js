import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your JSON translation files
import en from './locales/en/common.json';
import si from './locales/si/common.json';
import ta from './locales/ta/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      si: { translation: si },
      ta: { translation: ta },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
