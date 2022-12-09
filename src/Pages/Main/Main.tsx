import {useEffect, useState} from "react";
import axios from "axios";
import './Main.css'

import MangaBlock from "../../Components/MangaBlock/MangaBlock";
import debounce from "lodash.debounce";
import {MangaData} from "../../@types";


export default function ({findLine}: { findLine: string }) {
    const paginationButtonSvg = <svg viewBox="-6 0 96 96" width='60px'>
        <path
            d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
    </svg>


    const [page, setPage] = useState(0);

    const nInPage = 10

    const [mangas, setMangas] = useState(new Array<MangaData>())

    function getMangas(handlePage: number = page) {
        axios.get('https://api.mangadex.org/manga?' + ['limit=' + nInPage, findLine ? '&title=' + findLine : '', '&offset=' + nInPage * handlePage].join('&'))
            .then(res => {
                let newMangas = new Array<MangaData>();
                res.data.data.forEach((item:any)=>{
                    let newManga = {} as MangaData;
                    newMangas.push(newManga)

                    newManga.id = item.id
                    newManga.title = Object.values(item.attributes.title)[0] as string;
                    newManga.description = item.attributes.description.en
                    newManga.coverArt_id = item.relationships.find((item: any) => item.type == 'cover_art').id;
                })
                setMangas(newMangas);
                console.log(newMangas)
            })
    }

    useEffect(() => {
        debounce(() => {
                getMangas()

                if (page != 0)
                    setPage(0)
            }
            , 150)()
    }, [findLine])

    function changePage(newPage: number) {
        setPage(newPage)
        getMangas(newPage)
    }

    return (
        <div className='MainPage'>
            <div className='content'>

                <button className='paginationButton leftButton' style={{'transform': 'scale(-1,1)'}}
                        onClick={() => {
                            if (page > 0) {
                                changePage(page - 1)
                            }
                        }}
                >{paginationButtonSvg}</button>

                <div className='mangaArea'>
                    {mangas.map((item, i) => <MangaBlock key={i} mangaData={item}/>)}

                </div>
                <button className='paginationButton rightButton'
                        onClick={() => {
                            changePage(page + 1)
                        }}
                >{paginationButtonSvg}</button>
                <p className='pageNumber'>Page {page + 1}</p>
            </div>


        </div>
    )
}