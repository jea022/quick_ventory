import React, { useState, useEffect } from 'react';
import '../styles.css';

const SearchItems = () => {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState('');
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    setSpaces(storedSpaces);
  }, []);

  const handleSearch = () => {
    const itemsFound = [];
    spaces.forEach(space => {
      if (space.items) {
        space.items.forEach(item => {
          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            itemsFound.push({ name: item.name, space: space.name });
          }
        });
      }
    });
    setFoundItems(itemsFound);
  };

  const handleClearSearch = () => {
    setSearch('');
    setFoundItems([]);
  };

  return (
    <div className="fullscreen-container">
      <h3 className="section-title">Buscar Items</h3>
      <div className="search-widget">
        <div className="search-container-widget">
          <input
            type="text"
            placeholder="Buscar Item..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search-buttons">
            <button className="search-button" onClick={handleSearch}>Buscar</button>
            <button className="clear-button" onClick={handleClearSearch}>Limpiar</button>
          </div>
          {foundItems.length > 0 && (
            <div className="search-result">
              {foundItems.map((item, index) => (
                <p key={index}>
                  Objeto encontrado: <strong>{item.name}</strong> en <strong>{item.space}</strong>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItems;