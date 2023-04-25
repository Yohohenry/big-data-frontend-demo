import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/navbar';
import HomePage from './components/homepage';

function App() {
  return (
    <Router>
      <header className="App-header">
        <Navbar />
      </header>
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
