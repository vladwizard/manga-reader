import React, {useState} from "react";
import './ChangingLanguageBlock.css'

export default function () {
    const [defaultLanguage, setDefaultLanguage] = useState(document.cookie.split('=')[1])

    return (
        <div className="changingLanguageBlock">
            <button className="dropbtn">{defaultLanguage}</button>
            <div className="dropdown-content">
                {['en', 'ru', 'ms', 'pt-br', 'mn', 'tr', 'fr', 'id', 'pl', 'es', 'it', 'zh-hk', 'fa', 'sr', 'es-la', 'uk'].map((item) => {
                        return <button key={item}
                                       onClick={() => {
                                           setDefaultLanguage(item)
                                           document.cookie = "languageForReading="+item;
                                           console.log(document.cookie);
                                       }}>{item}</button>
                    }
                )
                }
            </div>
        </div>
    )
}