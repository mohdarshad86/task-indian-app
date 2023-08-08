import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Home />
      <Footer />
    </Router>
  );
};

export default App;
