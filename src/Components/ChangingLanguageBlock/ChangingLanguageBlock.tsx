import React, {useState} from "react";
import './ChangingLanguageBlock.css'

export default function () {
    const [defaultLanguage, setDefaultLanguage] = useState(document.cookie.split('=')[1])
    const languages = ['en', 'ru', 'ms', 'pt-br', 'mn', 'tr', 'fr', 'id', 'pl', 'es', 'it', 'zh-hk', 'fa', 'sr', 'es-la', 'uk'];
    return (

        <select className="changingLanguage">
            {languages.map((item, index) => {
                return <option key={index}>{item}</option>
            })}
        </select>

    )
}