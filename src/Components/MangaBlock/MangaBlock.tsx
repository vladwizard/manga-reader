import React, {useEffect, useState} from "react";
import axios from "axios";
import './MangaBlock.css'
import {Link} from "react-router-dom";

export default function ({mangaData}: { mangaData: any }) {
// console.log(mangaData)
    const id = mangaData.id;
    const title = mangaData.attributes.title.en;
    const description = mangaData.attributes.description.en
    const cover_id: string = mangaData.relationships.find((item: any) => item.type == 'cover_art').id;

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName
    }

    const [coverImage, setCoverImage] = useState<any>();

    useEffect(() => {
        axios.get('https://api.mangadex.org/cover/' + cover_id,
        )
            .then(res => {
                    let cover = res.data.data.attributes.fileName;

                    setCoverImage(coverImageApi(id, cover))
                }
            )

    }, [])

    // console.log(coverImage)
    // console.log(description)
    return (
        <Link to={id} className='mangaBlock' title={description}>
            <div className='coverBlock'>
                <img className='cover' src={coverImage}></img>
            </div>
            <div className='titleBlock'>
            <h2 className="title">{title}</h2>
            </div>
        </Link>
    )
}