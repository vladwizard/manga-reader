import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import './Manga.css';
import {getChapters} from '../../orders'

export default function () {

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }
    useEffect(() => {
        axios.get('https://api.mangadex.org/manga/' + id).then(res => {
            setMangaData(res.data.data)

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

    const [chapters, setChapters] = useState<string[]>([]);
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
                <div className='hiddenCell'></div>
                {chapters.map((item, index) =>
                    <Link className='chapterLink' key={item[0]} to={item[1]}>Глава {item[0]}</Link>
                )}
            </div>

        </div>

    )

}