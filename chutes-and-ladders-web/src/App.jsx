import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBarElements';
import Home from './pages/Home';
import SetPlayerName from './pages/GameSetup';
import Try from './pages/Try';

function App() {
  return (
    <div>
      <div>
        <Home></Home>
      </div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="pages/Try" element={<Try />} />
          <Route path="/pages/GameSetup" element={<SetPlayerName />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
