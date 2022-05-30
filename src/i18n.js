import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {TRANSLATIONS_EN} from './assets/localization/en/translation'
import {TRANSLATIONS_IT} from './assets/localization/it/translation'

const resources = {
    en: {
        translation : TRANSLATIONS_EN
    },
    it:{
        translation: TRANSLATIONS_IT
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: {
            default:['en']
        },
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ["navigator", "path", "localStorage", "htmlTag", "cookie"],
            caches: ["localStorage", "cookie"]
        }
    });

export default i18n;