import React, { useEffect, useState } from 'react';
import { obtenerEspacios, obtenerObjetos, agregarEspacio } from '../services/firestore';
import { CContainer, CButton } from '@coreui/react';
import Banner from './Banner';
import "../scss/_header.scss";
import '../scss/_main.scss';

const Inicio = () => {
  const [espacios, setEspacios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const espacios = await obtenerEspacios();
        setEspacios(espacios);
      } catch (error) {
        console.error('Error fetching espacios:', error);
        setError(error);
      }
    };

    const fetchObjetos = async () => {
      try {
        const objetos = await obtenerObjetos();
        setObjetos(objetos);
      } catch (error) {
        console.error('Error fetching objetos:', error);
        setError(error);
      }
    };

    fetchEspacios();
    fetchObjetos();
  }, []);

  const manejarBusqueda = () => {
    const resultadosFiltrados = objetos.filter(objeto =>
      objeto.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  const manejarLimpiarBusqueda = () => {
    setBusqueda('');
    setResultados([]);
  };

  const manejarCrearEspacio = async () => {
    const nombreEspacio = prompt('Ingrese el nombre del nuevo espacio:');
    if (nombreEspacio) {
      try {
        await agregarEspacio({ name: nombreEspacio });
        const espaciosActualizados = await obtenerEspacios();
        setEspacios(espaciosActualizados);
        window.location.href = '/espacios'; // Redirigir a /espacios
      } catch (error) {
        console.error('Error al crear el espacio:', error);
        setError(error);
      }
    }
  };

  return (
    <CContainer fluid className="inicio-page">
      <header className="inicio-header">
        <Banner />
      </header>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="inicio-container">
        <div className="left-column">
          <h2>Buscar Objetos</h2>
          <div className="search-widget">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar productos"
                className="search-input"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <CButton color="primary" className="search-button" onClick={manejarBusqueda}>Buscar</CButton>
              <CButton color="secondary" className="clear-button" onClick={manejarLimpiarBusqueda}>Limpiar</CButton>
            </div>
            {error && <div className="error-message">{error.message}</div>}
            <div className="search-results">
              {resultados.length > 0 ? (
                resultados.map((objeto, index) => (
                  <div key={index} className="search-result-item">
                    <div><strong>Nombre:</strong> {objeto.name}</div>
                    <div><strong>Cantidad:</strong> {objeto.quantity} unidades</div>
                    <div><strong>Ubicación:</strong> {objeto.space}</div>
                  </div>
                ))
              ) : (
                <div className="no-results">No hay resultados</div>
              )}
            </div>
          </div>
        </div>
        <div className="right-column">
          <h2>Espacios</h2>
          <div className="create-space-container">
            <CButton color="primary" className="create-space-button" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</CButton>
            <p>Agrega espacios rápidamente</p>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default Inicio;