import React, {useState} from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import './App.css';

import MainPage from './Pages/Main/Main'
import Header from "./Components/Header/Header";
import MangaPage from "./Pages/Manga/Manga";
import Chapter from "./Pages/Chapter/Chapter";

function App() {

    const [find, setFind] = useState('');
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Routes>
                    <Route path='/*' element={
                        <div>
                            <Header setFind={setFind}/>
                            <Routes>
                                <Route path='/' element={
                                    <MainPage findLine={find}/>
                                }/>
                                <Route path='/:idManga' element={
                                    <MangaPage/>}/>
                            </Routes>
                        </div>
                    }/>
                    <Route path='/:idManga/:idChapter' element={<Chapter/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
