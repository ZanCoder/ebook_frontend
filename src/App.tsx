import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';

function App() {
  const [keywordSearchNavbar, setSearchNavbar] = useState('');
  
  return (
    <div className="App">
      <Navbar keywordSearchNavbar={keywordSearchNavbar} setSearchNavbar={setSearchNavbar} />
      <HomePage keywordSearchNavbar={keywordSearchNavbar} />
      <Footer />
    </div>
  );
}

export default App;
