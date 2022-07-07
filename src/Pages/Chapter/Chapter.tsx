import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

import './Chapter.css'

import {getChapters} from "../../orders";

export default function () {
    const id: any = useParams().id;
    const idChapter = useParams().idChapter;

    const [hash, setHash] = useState('');
    const [pages, setPages] = useState([]);

    const [chapters, setChapters] = useState<any[]>([]);

    const apiChapterInfo = 'https://api.mangadex.org/chapter/' + idChapter

    console.log('https://api.mangadex.org/at-home/server/' + idChapter)
    useEffect(() => {
            axios.get('https://api.mangadex.org/at-home/server/' + idChapter).then(res => {
                console.log(res)
                setPages(res.data.chapter.data)
                setHash(res.data.chapter.hash)
            })
            getChapters(id, setChapters)
        }, [idChapter]
    )

    const getUrl = (hash: string, pageId: string) => {
        return `https://uploads.mangadex.org/data/` + hash + '/' + pageId
    }

    const [menuToggle, setMenuToggle] = useState(false);

    // const LinkAreaRef = useRef(null);
    // useEffect(() => {
    //     console.log(15523, LinkAreaRef)
    //     if (LinkAreaRef != null) {
    //         if (LinkAreaRef.current != null) {
    //             document.getElementsByClassName('chapterArea')[0].scrollTo(0,1200)
    //         }
    //     }
    // }, [LinkAreaRef, LinkAreaRef.current])

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
                    <Link className='mangaPageLink' to={'/'}>Главная</Link>
                    <Link className='mangaPageLink' to={'/' + id}>Страница манги</Link>
                    <div className='chapterArea'>
                        {chapters.map((item) =>
                            <Link className={['chapterLink', idChapter == item[1] ? 'active' : ''].join(' ')}
                                  key={item[0]} to={'/' + id + '/' + item[1]}>Глава {item[0] + 1}</Link>
                        )}
                    </div>

                </div>
                }
            </div>
            <div className='pageArea'>
                {pages.map((url, index) => <img key={index} src={getUrl(hash, url)}/>)}
            </div>
        </div>
    )
}


