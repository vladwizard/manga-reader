import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import './Manga.css';

import ChangingLanguageBlock from '../../Components/ChangingLanguageBlock/ChangingLanguageBlock'
import ChapterArea from "../../Components/ChapterArea/ChapterArea";
import {MangaData} from "../../@types";

export default function () {

    const id = useParams().idManga as string;

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }

    useEffect(() => {
        axios.get('https://api.mangadex.org/manga/' + id).then(res => {
            let data = res.data.data

            let newMangaData = {} as MangaData
            newMangaData.title = data?.attributes?.title.en
            newMangaData.description = data?.attributes?.description.en;
            newMangaData.coverArt_id = data.relationships.find((item: any) => item.type == 'cover_art').id;

            setMangaData(newMangaData)

            axios.get('https://api.mangadex.org/cover/' + newMangaData.coverArt_id,)
                .then(res => {
                        let cover = res.data.data.attributes.fileName;
                        setCoverImage(coverImageApi(id, cover))
                    }
                )
        })

    }, [])



    const [mangaData, setMangaData] = useState<MangaData>({} as MangaData);

    const [coverImage, setCoverImage] = useState<string>('');

    return (

        <div className='MangaPageWrapper'>
            <div className='top'>
                <div className='cover' style={{backgroundImage: 'url('+coverImage+')'}}
                     />
                <p className='title'>{mangaData.title}</p>
                <p className='description'>{mangaData.description}</p>

            </div>
            <div>
                <div style={{position:"absolute",transform:'translate(-100%)'}}><ChangingLanguageBlock/></div>

                <ChapterArea idManga={id}/>
            </div>
        </div>

    )

}