import React, {useEffect, useState} from "react";
import {Link, useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import './Manga.css';
import {getChapters,getAllChapters,getChapterByLanguage} from '../../orders'

import type { RootState } from '../../Redux/store'
import { useSelector, useDispatch } from 'react-redux'
import {changeLanguage} from '../../Redux/Slice/language'

export default function () {

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }


    const [chapters, setChapters] = useState<{ title: string, ids: string[] }[]>([]);

    useEffect(() => {
        axios.get('https://api.mangadex.org/manga/' + id).then(res => {
            setMangaData(res.data.data)
            // console.log(res.data)
            let cover_id: string = res.data.data.relationships.find((item: any) => item.type == 'cover_art').id;

            axios.get('https://api.mangadex.org/cover/' + cover_id,)
                .then(res => {
                        let cover = res.data.data.attributes.fileName;
                        setCoverImage(coverImageApi(id, cover))
                    }
                )
        })

        getChapters(id, setChapters)

    }, [])


    //Вставка пусткых клеток в chapterArea
    // useEffect(() => {
    //         if (chapters != null) {
    //
    //             // let hidden = ['hidden', ''];
    //             // let nNormal = 0;
    //             // for (let i = 0; i < chapters.length; i++) {
    //             // if (chapters[i][0].indexOf('.') == -1) chapters[i][0] +='  '
    //             // }
    //             // if (chapters.length > 9) {
    //             //     for (let i = 0; i < chapters.length; i++) {
    //             //
    //             //         if (chapters[i][0].indexOf('.') == -1)
    //             //         if (parseInt(chapters[i][0].match(/(\d+)$/)![0]) % 10 != i % 10)
    //             //             chapters.splice(i, 0, hidden)
    //             //     }
    //             // }
    //             // if (nNormal != 0) {
    //             //
    //             //     for (let i = 0; i < chapters.length; i++) {
    //             //
    //             //         if (chapters[i][0].indexOf('.') != -1) {
    //             //             chapters.splice(i, 0, hidden)
    //             //             break
    //             //         }
    //             //     }
    //             // }
    //         }
    //     }
    //     ,
    //     [chapters]
    // )

    const id: any = useParams().id;
    const [mangaData, setMangaData] = useState<any>();

    const [coverImage, setCoverImage] = useState<string>('');

    const title = mangaData?.attributes?.title.en;

    const description = mangaData?.attributes?.description.en;

    const language = useSelector((state: RootState) => state.language.language)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    return (

        <div className='MangaPageWrapper'>
            {/*<button onClick={() => setChapters([])}>123</button>*/}
            <div className='top'>

                <img src={coverImage}
                     // onError="this.style.visibility='hidden'"
                     alt=""/>
                <p className='title'>{title}</p>
                <p className='description'>{description}</p>

            </div>
            <div>
                <div className="dropdown">
                    <button className="dropbtn">{language}</button>
                    <div className="dropdown-content">
                        {['en', 'ru'].map((item) => {
                                if(item != language)
                                    return   <button key={item} onClick={() => dispatch(changeLanguage(item))}>{item}</button>
                            }
                        )
                        }
                    </div>
                </div>
                <div className='chapterArea'>

                    {chapters.map((item, index) => {
                            // if (item[0] == 'hidden')
                            //
                            //     return <div className='chapterLink hidden'>1</div>

                            return <button className='chapterLink' key={index} onClick={()=>getChapterByLanguage(item.ids,language).then(res => navigation(res as string))}>{item.title}</button>
                        }
                    )}
                </div>
            </div>
        </div>

    )

}