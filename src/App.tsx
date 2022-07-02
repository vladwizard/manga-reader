import React from 'react';

import axios from "axios";
import debounce from "lodash.debounce";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import './App.css';

import MainPage from './Pages/Main/Main'
import Header from "./Components/Header/Header";
import MangaPage from "./Pages/Manga/Manga";
import Chapter from "./Pages/Chapter/Chapter";

function App() {

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>

                <Routes>
                    <Route path='/' element={<MainPage/>}/>

                    <Route path='/:id' element={<MangaPage />}/>
                    <Route path='/:id/:idChapter' element={<Chapter />}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
