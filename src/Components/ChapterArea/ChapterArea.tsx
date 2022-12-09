import {getChapterByLanguage, getChapters, getLanguagesOfChapters} from "../../orders";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './ChapterArea.css'

export default function ({idManga}: { idManga: string }) {
    const idChapter = useParams().idChapter;

    const [chapters, setChapters] = useState<{ title: string, ids: string[] }[]>([]);

    useEffect(() => getChapters(idManga, setChapters), [])

    const [possibleLanguages, setPossibleLanguages] = useState<{ language: string, id: string }[]>([]);

    const defaultLanguage = 'en';
    const navigation = useNavigate()

    const [active, setActive] = useState(-1);

    return (
        <div className='chapterArea'>
            {chapters.map((item, index) => {
                    return <div className='chapterContainer'>
                        <button
                            className={['chapterButton', idChapter != undefined ? item.ids.indexOf(idChapter) != -1 ? 'currentChapter' : '' : ''].join(' ')}
                            key={index}
                            onClick={() => {
                                getLanguagesOfChapters(item.ids).then(
                                    res => {
                                        setPossibleLanguages(res as { language: string, id: string }[])
                                        setActive(index)
                                    })
                                if (index == active) {
                                    possibleLanguages.forEach((item) => {
                                        if (defaultLanguage == item.language)
                                            navigation('/' + idManga + '/' + item.id)
                                    })
                                }
                            }}
                            onDoubleClick={() => {
                                getChapterByLanguage(item.ids, defaultLanguage).then(res => {
                                        if (res != null) {
                                            navigation('/' + idManga + '/' + res as string)
                                        }
                                    }
                                )
                            }}
                        >{item.title}</button>
                        {active == index &&
                        <div className="dropdown-content">
                            {possibleLanguages.map((item, index) => {
                                    return <button key={index}
                                                   onClick={() => {
                                                       navigation('/' + idManga + '/' + item.id)
                                                   }}>{item.language}</button>

                                }
                            )
                            }
                        </div>
                        }
                    </div>

                }
            )}
        </div>
    )
}