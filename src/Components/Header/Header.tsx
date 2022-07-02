import React from "react";
import {Link} from "react-router-dom";
import './Header.css'

export default function () {

    return(
        <div className='header'>
            <div>
                <Link className='linkToMain' to='/'>
                    Главная
                </Link>
            </div>
            <div>
                {/*<input className='findInput'/>*/}
                <input type="search" className="findInput"
                       placeholder="Search..." aria-label="Search"/>
            </div>
            <div>
            </div>
        </div>
    )
}