import React from 'react';


// Localization
import { t } from 'i18next';
import i18n from '../../../i18n';

//Style
import './LanguagesSwitch.scss'


function LanguagesSwitch() {

    const languagesArray = [
        {
            code: 'en',
            name: t("common.english")
        },
        {
            code: 'it',
            name: t("common.italian")
        }
    ]

    const setLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    const renderLanguagesOptions = (lang, key) => {
        return (
            <option value={lang.code} key={`lang${key}`}> {lang.name} </option>
        )
    }


    return (
        <>
            <select className="select_language" onChange={setLanguage} value={i18n.resolvedLanguage}>
                {languagesArray.map(renderLanguagesOptions)}
            </select>
        </>
    )
}

export default LanguagesSwitch;