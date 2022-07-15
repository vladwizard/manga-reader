import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import './Manga.css';

import ChangingLanguageBlock from '../../Components/ChangingLanguageBlock/ChangingLanguageBlock'
import ChapterArea from "../../Components/ChapterArea/ChapterArea";

export default function () {

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }

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

    const id = useParams().idManga as string;
    const [mangaData, setMangaData] = useState<any>();

    const [coverImage, setCoverImage] = useState<string>('');

    const title = mangaData?.attributes?.title.en;

    const description = mangaData?.attributes?.description.en;

    return (

        <div className='MangaPageWrapper'>
            <div className='top'>
                <div className='cover' style={{backgroundImage: 'url('+coverImage+')'}}
                     />
                <p className='title'>{title}</p>
                <p className='description'>{description}</p>

            </div>
            <div>
                <ChangingLanguageBlock/>
                <ChapterArea idManga={id}/>

            </div>
        </div>

    )

}