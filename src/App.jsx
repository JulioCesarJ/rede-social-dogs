import React from 'react';
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home.jsx';
import Login from './components/Login/Login';

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={Home}/>
        <Route path='/login/login' element={Login}/>
      </Routes>
      <Footer />

    </BrowserRouter>
    </div>
  )
};

export default App;
