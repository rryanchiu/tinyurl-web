import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enUS from './en_US.json';
import zhCN from './zh_CN.json';

const resources = {
    'en': {
        translation: enUS,
    },
    'zh_cn': {
        translation: zhCN,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'zh_cn',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
