import { useState } from 'react'
import './App.css'
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StravaTest from './pages/stravaTest';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/stravaTest" element={<StravaTest></StravaTest>}></Route>
      <Route path="/homePage" element={<HomePage></HomePage>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
