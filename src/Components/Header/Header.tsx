import React from "react";
import {Link} from "react-router-dom";
import './Header.css'

export default function () {

    return(
        <div className='header bg-dark text-white'>
            <div>
                <Link className='linkToMain nav-link px-2 text-secondary' to='/'>
                    Главная
                </Link>
            </div>
            <div>
                {/*<input className='findInput'/>*/}
                <input type="search" className="form-control form-control-dark text-white bg-dark"
                       placeholder="Search..." aria-label="Search"/>
            </div>
            <div>
            </div>
        </div>
    )
}