import {useEffect, useState} from "react";
import axios from "axios";
import './MangaBlock.css'
import {Link} from "react-router-dom";
import {MangaData} from "../../@types";

export default function ({mangaData}: { mangaData: MangaData }) {

    const coverImageApi = (id: string, fileName: string) => {
        return 'https://uploads.mangadex.org/covers/' + id + '/' + fileName + '.256.jpg'
    }

    const [coverImage, setCoverImage] = useState<string>();

    useEffect(() => {
        axios.get('https://api.mangadex.org/cover/' + mangaData.coverArt_id,
        )
            .then(res => {
                    let cover = res.data.data.attributes.fileName;

                    setCoverImage(coverImageApi(mangaData.id, cover))
                }
            )

    }, [mangaData])

    return (
        <Link to={mangaData.id} className='mangaBlock' title={mangaData.description}>

            {mangaData.title && <div className='titleBlock'>
                <h2 className="title"
                    style={{'fontSize': (1.4 - 0.3 * Math.trunc(mangaData.title.length / 30)) + 'em'}}>{mangaData.title}</h2>
            </div>
            }
            <div className='coverBlock'
                 style={{'backgroundImage': 'url(' + coverImage + ')'}}
            >
            </div>
        </Link>
    )
}