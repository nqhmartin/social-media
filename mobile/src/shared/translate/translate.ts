import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as language from './source'



i18next.use(initReactI18next).init({
    lng: "en",
    resources: language,
    debug: false,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
        escapeValue: false,
    },
})

export const translate = (path: string, option?: any): string => {
    return i18next.t(path, option)
}

export const changeLanguage = (alias: string): void => {
    console.log('log_', alias)
    i18next.changeLanguage(alias)
}
export default i18next