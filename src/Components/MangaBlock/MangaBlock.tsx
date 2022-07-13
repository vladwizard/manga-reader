import React, {useEffect, useState} from "react";
import axios from "axios";
import './MangaBlock.css'
import {Link} from "react-router-dom";

export default function ({mangaData}: { mangaData: any }) {
    // console.log(id)
    const id = mangaData.id;
    const title = Object.values(mangaData.attributes.title)[0] as string;
    // console.log(Object.values(mangaData.attributes.title)[0])
    const description = mangaData.attributes.description.en
    const cover_id: string = mangaData.relationships.find((item: any) => item.type == 'cover_art').id;

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName+'.256.jpg'
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

    }, [mangaData])

    // console.log(coverImage)
    // console.log(description)
    return (
        <Link to={id} className='mangaBlock' title={description}>

            {title && <div className='titleBlock'>
                <h2 className="title"
                    style={{'fontSize': (1.4 - 0.3 * Math.trunc(title.length / 30)) + 'em'}}>{title}</h2>
            </div>
            }
            <div className='coverBlock'
                 style={{'backgroundImage': 'url(' + coverImage + ')'}}
            >
            </div>
        </Link>
    )
}