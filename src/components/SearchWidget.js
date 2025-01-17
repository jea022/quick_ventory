<<<<<<< HEAD
// src/components/SearchWidget.js

import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles.css'; // Importa el archivo CSS
=======
import React, { useState } from 'react';
import { CContainer, CRow, CCol, CFormInput, CButton, CListGroup, CListGroupItem } from '@coreui/react';
import { obtenerItemsPorNombre } from '../services/firestore';
>>>>>>> ed5b7cc (Prueba)

const SearchWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
<<<<<<< HEAD
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
=======
    const items = await obtenerItemsPorNombre(searchTerm);
    setResults(items);
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Buscar Ítems</h2>
          <div className="search-container-widget">
            <CFormInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre"
              className="search-input"
            />
            <CButton color="primary" onClick={handleSearch}>Buscar</CButton>
          </div>
          <CListGroup>
            {results.map((item, index) => (
              <CListGroupItem key={index}>{item.nombre}</CListGroupItem>
            ))}
          </CListGroup>
        </CCol>
      </CRow>
    </CContainer>
>>>>>>> ed5b7cc (Prueba)
  );
};

export default SearchWidget;