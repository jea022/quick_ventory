// src/components/SearchWidget.js

import React, { useState } from 'react';
import { db } from '../firestoreConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles.css'; // Importa el archivo CSS

const SearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const q = query(collection(db, 'items'), where('nombre', '>=', searchTerm));
    const querySnapshot = await getDocs(q);
    setResults(querySnapshot.docs.map(doc => doc.data()));
  };

  return (
    <div>
      <h2>Buscar Ítems</h2>
      <div className="search-container-widget">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre"
          className="search-input"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWidget;