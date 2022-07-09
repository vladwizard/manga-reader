import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import './Manga.css';
import {getChapters} from '../../orders'
import {log} from "util";

export default function () {

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }

    useEffect(() => {
        axios.get('https://api.mangadex.org/manga/' + id).then(res => {
            setMangaData(res.data.data)
            console.log(res.data)
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


    const [chapters, setChapters] = useState<string[][]>([]);



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

    return (

        <div className='MangaPageWrapper'>
            <div className='top'>
                <div className='imgBlock'>
                    <img src={coverImage} alt='coverArt'/>
                </div>
                <div className='infoBlock'>
                    <h1 className='title'>{title}</h1>
                    <p className='description'>{description}</p>
                </div>
            </div>
            <div className='chapterArea'>

                {chapters.map((item, index) => {
                        if (item[0] == 'hidden')

                            return <div className='chapterLink hidden'>1</div>

                        return <Link className='chapterLink' key={item[0]} to={item[1]}>{item[0]}</Link>
                    }
                )}
            </div>

        </div>

    )

}