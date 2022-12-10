import {useState} from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

// import './App.css'
import MainPage from './Pages/Main/Main'
import Header from "./Components/Header/Header";
import MangaPage from "./Pages/Manga/Manga";
import Chapter from "./Pages/Chapter/Chapter";

function App() {

    const [find, setFind] = useState('');
    return (
        <div>
            <Routes>
                <Route path='/*' element={
                    <div style={{minHeight: '100vh', display: "flex", flexDirection: "column"}}>
                        <Header setFind={setFind}/>
                        <main style={{background: '#eeeeee', flex: "1",position: "relative"}}>
                            <Routes>
                                <Route path='/*' element={
                                    <MainPage findLine={find}/>
                                }/>
                                <Route path='/:idManga' element={
                                    <MangaPage/>}/>
                            </Routes>
                        </main>
                    </div>
                }/>
                <Route path='/:idManga/:idChapter' element={<Chapter/>}/>
            </Routes>
        </div>
    );
}

export default App;
