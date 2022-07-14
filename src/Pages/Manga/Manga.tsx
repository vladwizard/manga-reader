import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import './Manga.css';
import {getChapters, getLanguagesOfChapters, getChapterByLanguage} from '../../orders'

import type {RootState} from '../../Redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {changeLanguage} from '../../Redux/Slice/language'
import {log} from "util";


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
            getChapters(id, setChapters)
        })


    }, [])
    // useEffect(() => {
    //     if (chapters.length > 0)
    //         getLanguagesOfChapters(chapters[0].ids).then(res => setPossibleLanguages(res as string[]))
    // }, [chapters])

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

    const [possibleLanguages, setPossibleLanguages] = useState<{ language: string, id: string }[]>([]);
    const language = useSelector((state: RootState) => state.language.language)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const [active, setActive] = useState(-1);
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

                <div className='chapterArea'>

                    {chapters.map((item, index) => {


                            // return <button className='chapterLink' key={index}
                            //                onClick={() => getChapterByLanguage(item.ids, language).then(res => navigation(res as string))}>{item.title}</button>

                            return <div className='chapterContainer'>
                                <button className='chapterButton' key={index}
                                        onClick={() => {
                                            getLanguagesOfChapters(item.ids).then(
                                                res => {
                                                    setPossibleLanguages(res as { language: string, id: string }[])

                                                    setActive(index)

                                                })
                                        }}>{item.title}</button>
                                {active == index &&
                                <div className="dropdown-content">
                                    {possibleLanguages.map((item,index) => {
                                                return <Link key={index}
                                                               to={item.id}>{item.language}</Link>
                                        }
                                    )
                                    }
                                </div>
                                }
                            </div>


                        }
                    )}
                </div>
            </div>
        </div>

    )

}