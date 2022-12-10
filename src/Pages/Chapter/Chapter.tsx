import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

import './Chapter.css'

import ChangingLanguageBlock from "../../Components/ChangingLanguageBlock/ChangingLanguageBlock";
import ChapterArea from "../../Components/ChapterArea/ChapterArea";

type Chapter = {
    hash: string,
    pages: string[]
}
export default function () {
    const idManga: any = useParams().idManga;
    const idChapter = useParams().idChapter;

    const [chapterData, setChapterData] = useState<Chapter>()

    useEffect(() => {
            axios.get('https://api.mangadex.org/at-home/server/' + idChapter).then(res => {
                console.log(res)
                let newChapter = {} as Chapter

                let data = res.data.chapter
                newChapter.hash = data.hash;
                newChapter.pages = data.data

                setChapterData(newChapter)
            })
        }, [idChapter]
    )

    const getUrl = (hash: string, pageId: string) => {
        return `https://uploads.mangadex.org/data/` + hash + '/' + pageId
    }

    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <div className='chapterPage'>
            <div className={['menu', menuToggle ? 'activeMenu' : ''].join(' ')}>
                <button className='menuButton'
                        onClick={() => setMenuToggle(!menuToggle)}
                >
                    <svg viewBox="0 0 96 96" width='50px'>
                        <path
                            d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
                    </svg>

                </button>
                {menuToggle &&
                <div className='extendedMenu'>
                    <Link className='mangaPageLink link' to={'/'}>Main</Link>
                    <Link className='mangaPageLink link' to={'/' + idManga}>Manga's page</Link>
                    <ChapterArea idManga={idManga}/>
                </div>
                }
            </div>
            <div className='pageArea'>
                {chapterData?.pages.map((url, index) => <img alt={''} key={index}
                                                             src={getUrl(chapterData.hash, url)}/>)}
            </div>
        </div>
    )
}


