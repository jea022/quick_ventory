import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { obtenerObjetos } from '../services/firestore';
import '../scss/_main.scss';

const SearchWidget = () => {
  const [busqueda, setBusqueda] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [resultados, setResultados] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [objetos, setObjetos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const objetos = await obtenerObjetos();
        setObjetos(objetos);
      } catch (error) {
        console.error('Error fetching objetos:', error);
        setError(error);
      }
    };

    fetchObjetos();
  }, []);

  return (
    <div className="search-widget">
      <div className="search-container">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar productos"
            className="search-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;