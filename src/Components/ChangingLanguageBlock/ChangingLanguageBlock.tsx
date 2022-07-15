import {changeDefaultLanguage} from "../../Redux/Slices/language";
import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from "../../Redux/store";
import './ChangingLanguageBlock.css'

export default function (){
    const defaultLanguage = useSelector((state: RootState) => state.language.defaultLanguage);
    const dispatch = useDispatch();
    return (
        <div className="changingLanguageBlock">
            <button className="dropbtn">{defaultLanguage}</button>
            <div className="dropdown-content">
                {['en', 'ru', 'ms', 'pt-br', 'mn', 'tr', 'fr', 'id', 'pl', 'es', 'it', 'zh-hk', 'fa', 'sr', 'es-la', 'uk'].map((item) => {
                        if (item != defaultLanguage)
                            return <button key={item}
                                           onClick={() => {
                                               dispatch(changeDefaultLanguage(item))
                                           }}>{item}</button>
                    }
                )
                }
            </div>
        </div>
    )
}