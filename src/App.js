import React from 'react';
import './App.css';

import Navbar from './components/navbar';
import HomePage from './components/homepage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <HomePage />
    </div>
  );
}

export default App;
