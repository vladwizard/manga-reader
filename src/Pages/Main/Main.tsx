import React, {useEffect, useState} from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import './Main.css'

import MangaBlock from "../../Components/MangaBlock/MangaBlock";

export default function () {
    const mangaApi = 'https://api.mangadex.org/manga';

    const [mangas, setMangas] = useState<any>([])

    useEffect(() => {
        axios.get(mangaApi)
            .then(res => {
                const data = res.data;
                setMangas(data.data);
            })
    }, [])

    return (
        <div className='Main'>
            {mangas.map((item:object,i:number)=><MangaBlock key={i} mangaData={item}/>)}

        </div>
    )
}