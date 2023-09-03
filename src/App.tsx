import React from 'react';
import { Route, Routes, Link } from "react-router-dom"
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './Pages/Home';
import Leaderboard from './Pages/Leaderboard';
import Login from './Pages/Login';
import Play from './Pages/Play';
import Profile from './Pages/Profile';
import Results from './Pages/Results';
 const App = () => {
  return (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <Header/>
      <Routes>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/results" element={<Results/>} />
        <Route path="/play" element ={<Play/>}/>
        <Route path="/leaderboard" element ={<Leaderboard/>}/>
        <Route path="/" element ={<Home/>}/>
      </Routes>
      <Footer/>
  </div>
   
  )
}

export default App
