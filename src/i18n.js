import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../src/translations/en/translation.json";
import translationAR from "../src/translations/ar/translation.json";
import translationSP from "../src/translations/sp/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
  sp: {
    translation: translationSP,
  },
};

const i8 = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      fallbackLng: "en",
      load: "languageOnly",
      supportedLngs: ["en", "ar", "sp"],
      // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};

export default i8;
