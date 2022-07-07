import React, {useEffect, useState} from "react";
import axios from "axios";
import './Main.css'

import MangaBlock from "../../Components/MangaBlock/MangaBlock";
import debounce from "lodash.debounce";


export default function ({findLine}: { findLine: string }) {
    const paginationButtonSvg = <svg viewBox="0 0 96 96" width='50px'>
        <path
            d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
    </svg>


    const [page, setPage] = useState(0);
    // const [scroll, setScroll] = useState(0);
    // window.addEventListener('scroll', function () {
    // //     setScroll(window.pageYOffset);
    // // });
    // useEffect(() => console.log(scroll), [scroll])

    const nInPage = 10

    const mangaApi = 'https://api.mangadex.org/manga?' + ['limit=' + nInPage, findLine ? '&title=' + findLine : '', '&offset=' + nInPage * page].join('&');

    const [mangas, setMangas] = useState<any>([])

    useEffect(() => {
        debounce(() =>
            axios.get(mangaApi
                // , {
                //     headers: {
                //         'access-control-allow-origin': "https://vladwizard.github.io/:1"
                //     }
                // }
            )
                .then(res => {
                    const data = res.data;
                    console.log(res)
                    setMangas(data.data);
                }), 150)()
    }, [findLine, page])

    return (
        <div>
            <div className='MainPage'>
                <button className='paginationButton' style={{'transform': 'scale(-1,1)'}}
                        onClick={() => {
                            if (page > 0) setPage(page - 1)
                        }}
                >{paginationButtonSvg}</button>
                <div className='mangaArea'>
                    {mangas.map((item: object, i: number) => <MangaBlock key={i} mangaData={item}/>)}

                </div>
                <button className='paginationButton'
                        onClick={() => {
                            setPage(page + 1)
                        }}
                >{paginationButtonSvg}</button>
            </div>
            <p className='pageNumber'>Страница {page + 1}</p>
        </div>
    )
}