import React, {useState} from "react";
import './ChangingLanguageBlock.css'

export default function (){
    const [defaultLanguage,setDefaultLanguage] = useState('en')

    return (
        <div className="changingLanguageBlock">
            <button className="dropbtn">{defaultLanguage}</button>
            <div className="dropdown-content">
                {['en', 'ru', 'ms', 'pt-br', 'mn', 'tr', 'fr', 'id', 'pl', 'es', 'it', 'zh-hk', 'fa', 'sr', 'es-la', 'uk'].map((item) => {
                        if (item != defaultLanguage)
                            return <button key={item}
                                           onClick={() => {
                                               setDefaultLanguage(item)
                                           }}>{item}</button>
                    }
                )
                }
            </div>
        </div>
    )
}