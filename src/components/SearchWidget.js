import React from 'react';
import { Search } from '@mui/icons-material';
import '../scss/_main.scss';

const SearchWidget = () => {
  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Buscar productos"
        className="search-input"
      />
    </div>
  );
};

export default SearchWidget;