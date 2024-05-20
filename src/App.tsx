import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layout/about/About';
import Contact from './layout/contact/Contact';
import ProductDetail from './product/ProductDetail';
import Register from './user/Register';

function App() {
  const [keywordSearchNavbar, setSearchNavbar] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar keywordSearchNavbar={keywordSearchNavbar} setSearchNavbar={setSearchNavbar} />
        <Routes>
          <Route path='/' element={<HomePage keywordSearchNavbar={keywordSearchNavbar} />} />
          <Route path='/:id' element={<HomePage keywordSearchNavbar={keywordSearchNavbar} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
