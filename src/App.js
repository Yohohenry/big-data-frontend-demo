import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/navbar';
import HomePage from './components/homepage';
import SearchForm from './components/homepage/search-form';

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
        >
          <Route
            path=":year/:county/:town"
            element={<SearchForm />}
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
