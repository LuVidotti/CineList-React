import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Principal from './pages/Principal';
import PagFilme from './pages/PagFilme';
import Pag404 from './pages/Pag404';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Principal />}/>
          <Route path='/movie/:id' element={<PagFilme />}/>
          <Route path='*' element={<Pag404 />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
