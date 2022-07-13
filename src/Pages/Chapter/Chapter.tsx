import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import './Chapter.css'

import {getChapterByLanguage, getChapters} from "../../orders";
import { useSelector} from 'react-redux'
import {RootState} from "../../Redux/store";

export default function () {
    const id: any = useParams().id;
    const idChapter = useParams().idChapter;

    const [hash, setHash] = useState('');
    const [pages, setPages] = useState([]);

    const [chapters, setChapters] = useState<{title:string, ids:string[]}[]>([]);


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
    const language = useSelector((state: RootState) => state.language.language)

    const navigation = useNavigate()
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
                    <Link className='mangaPageLink link' to={'/' + id}>Manga's page</Link>
                    <div className='chapterArea'>
                        {chapters.map((item,index) =>

                            <button className={['chapterLink', item.ids.indexOf(idChapter as string)!=-1 ? 'active' : '','link'].join(' ')} key={index} onClick={()=>getChapterByLanguage(item.ids,language).then(res => navigation('/'+id+'/'+res as string))}>{item.title}</button>
                        )}
                    </div>
                    <p className='language'>{language}</p>
                </div>
                }
            </div>
            <div className='pageArea'>
                {pages.map((url, index) => <img key={index} src={getUrl(hash, url)}/>)}
            </div>
        </div>
    )
}


