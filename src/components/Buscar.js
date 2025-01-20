import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios } from '../services/firestore';
import '../scss/_buscar.scss';

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacios = async () => {
      const espacios = await obtenerEspacios();
      setResultados(espacios);
    };
    fetchEspacios();
  }, []);

  const manejarBusqueda = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);
    const resultadosFiltrados = resultados.filter(espacio =>
      espacio.name.toLowerCase().includes(valorBusqueda)
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <div className="container buscar-page">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <input
            className="form-control search-input"
            type="text"
            placeholder="Buscar Espacio..."
            value={busqueda}
            onChange={manejarBusqueda}
          />
        </div>
      </div>
      <div className="row">
        {resultados.map((espacio, index) => (
          <div key={index} className="col-md-4">
            <div className="card category-button" onClick={() => navigate(`/espacio/${espacio.name}`)}>
              <div className="card-body">
                <h5 className="card-title">{espacio.name}</h5>
                <p className="card-text">{espacio.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscar;