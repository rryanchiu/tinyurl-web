import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enUS from './en_US.json';
import zhCN from './zh_CN.json';
import zhTW from './zh_TW.json';
import ja from './ja.json';
import ko from './ko.json';
import de from './de.json';


const resources = {
    'en': {
        translation: enUS,
    },
    'zh_cn': {
        translation: zhCN,
    },
    'zh_tw': {
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

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
