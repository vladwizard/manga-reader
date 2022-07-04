import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './Header.css'


export default function ({setFind}: { setFind: any }) {
    const id = useParams()['*'];

    useEffect(() => {
        setFind('')
        setHandleFind('')
    }, [id])

    const [handleFind, setHandleFind] = useState('')
    return (
        <div className='header'>
            <div>
                <Link className='linkToMain' to='/'>
                    Главная
                </Link>
            </div>
            <div>
                {/*<input className='findInput'/>*/}
                <input type="search" className="findInput"
                       placeholder="Search..." aria-label="Search"
                       value={handleFind}
                       onChange={event => {
                           setHandleFind(event.target.value)

                           setFind(event.target.value)

                       }}
                />
            </div>
            <div>
            </div>
        </div>
    )
}