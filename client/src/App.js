import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
import UploadVideo from './components/UploadVideo';

const App = () => {
  return (
    <Router>
      <Navbar />
      <UploadVideo />
      <Footer />
    </Router>
  );
};

export default App;
