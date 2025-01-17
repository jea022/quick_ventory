import React, { useState } from 'react';
import { CContainer, CRow, CCol, CFormInput, CButton, CListGroup, CListGroupItem } from '@coreui/react';
import { obtenerItemsPorNombre } from '../services/firestore';

const Buscar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
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
  );
};

export default Buscar;