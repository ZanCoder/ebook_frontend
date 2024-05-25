import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import Contact from './layouts/contact/Contact';
import ProductDetail from './layouts/product/ProductDetail';
import Register from './layouts/user/Register';
import ActiveUser from './layouts/user/ActiveUser';
import Login from './layouts/user/Login';
import LoginSuccess from './layouts/user/LoginSuccess';
import ProductAdmin from './layouts/admin/ProductTable';

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
          <Route path='/active/:email/:codeActive' element={<ActiveUser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login-success' element={<LoginSuccess />} />
          <Route path='/admin/product' element={<ProductAdmin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
