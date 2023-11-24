import { createContext, useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Popular from './Components/Popular';
import AnimeItem from './Components/AnimeItem';
import Upcoming from './Components/Upcoming';
import CharacterInfo from './Components/CharacterInfo';
import People from './Components/People';

const App = () => {

  return (
      <div className='app'>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Popular />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/anime/:id' element={<AnimeItem />} />
          <Route path='/upcoming/anime/:id' element={<AnimeItem />} />
          <Route path='/character/:id' element={<CharacterInfo />} />
          <Route path='/voice-actor/:id' element={<People />} />
        </Routes>
        </BrowserRouter>
      </div >      
  );
}

export default App;
