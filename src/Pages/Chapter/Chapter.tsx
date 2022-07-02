import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

import './Chapter.css'

export default function () {

    const idChapter = useParams().idChapter;

    const [hash, setHash] = useState('');
    const [pages, setPages] = useState([]);

    useEffect(() => {
            axios.get('https://api.mangadex.org/at-home/server/' + idChapter).then(res => {
                setPages(res.data.chapter.data)
                setHash(res.data.chapter.hash)

            })
        }, []
    )
    const getUrl = (hash: string, pageId: string) => {
        return `https://uploads.mangadex.org/data/` + hash + '/' + pageId
    }

    return (
        <div className='chapterPage'>
            {pages.map((url, index) => <img key={index} src={getUrl(hash, url)}/>)}
        </div>
    )
}


