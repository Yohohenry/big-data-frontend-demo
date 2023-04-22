import React from 'react';

import LeftBar from '../left-bar';
import SearchForm from '../search-form';
import SearchResult from '../search-result';

import './style.scss';

export default function Homepage() {
  return (
    <div className="home-page">
      <LeftBar />
      <div className="page-content">
        <SearchForm />
        <SearchResult />
      </div>
    </div>
  );
}
