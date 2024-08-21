import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enUS from './en_US.json';
import zhCN from './zh_CN.json';
import zhTW from './zh_TW.json';
import ja from './ja.json';
import ko from './ko.json';
import de from './de.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    'en': {
        translation: enUS,
    },
    'zh-CN': {
        translation: zhCN,
    },
    'zh-TW': {
        translation: zhTW,
    },
    'ja': {
        translation: ja,
    },
    'ko': {
        translation: ko,
    },
    'de': {
        translation: de,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
