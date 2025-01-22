import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios, eliminarEspacio, obtenerUltimosEspaciosAccedidos } from '../services/firestore';
import { CContainer, CFormInput, CButton, CCard, CCardBody, CCardTitle, CCardText, CModal, CModalBody, CModalFooter } from '@coreui/react';
import Banner from './Banner';
import '../scss/style.scss';
import '../scss/_inicio.scss';
import "../scss/_header.scss";

const Inicio = () => {
  const [espacios, setEspacios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [itemEncontrado, setItemEncontrado] = useState(null);
  const [menuContextual, setMenuContextual] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacios = async () => {
      const espacios = await obtenerUltimosEspaciosAccedidos();
      setEspacios(espacios);
    };
    fetchEspacios();
  }, []);

  const manejarClickEspacio = (nombreEspacio) => {
    navigate(`/espacio/${nombreEspacio}`);
  };

  const manejarCrearEspacio = () => {
    navigate('/crear-espacio');
  };

  const manejarBusqueda = () => {
    // Lógica para manejar la búsqueda
  };

  const manejarLimpiarBusqueda = () => {
    setBusqueda('');
    setItemEncontrado(null);
  };

  const mostrarMenuContextual = (event, espacio) => {
    event.preventDefault();
    setMenuContextual({
      x: event.clientX,
      y: event.clientY,
      espacio,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  const manejarEditarEspacio = (espacio) => {
    navigate(`/editar-espacio/${espacio.name}`, { state: { espacio } });
    ocultarMenuContextual();
  };

  const manejarEliminarEspacio = async (idEspacio) => {
    await eliminarEspacio(idEspacio);
    setEspacios(espacios.filter(espacio => espacio.id !== idEspacio));
    ocultarMenuContextual();
  };

  return (
    <CContainer fluid className="inicio-page">
      <header className="inicio-header">
        <Banner />
      </header>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="inicio-container">
        <div className="left-column">
          <h2>Widget</h2>
          <div className="search-widget">
            <div className="search-container-widget">
              <CFormInput
                type="text"
                placeholder="Buscar Item..."
                className="search-input"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <div className="search-buttons">
                <button className="search-button" onClick={manejarBusqueda}>Buscar</button>
                <button className="clear-button" onClick={manejarLimpiarBusqueda}>Limpiar</button>
              </div>
              {itemEncontrado && (
                <div className="search-result">
                  <p>Objeto encontrado: <strong>{itemEncontrado.name}</strong></p>
                  <p>Ubicación: <strong>{itemEncontrado.space}</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-column">
          <h2>Espacios</h2>
          <div className="create-space-container">
            <button className="create-space-button" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</button>
            <div className="categories-container">
              {espacios.length > 0 ? (
                espacios.map((espacio, index) => (
                  <CCard key={index} className="category-button" onContextMenu={(e) => mostrarMenuContextual(e, espacio)}>
                    <CCardBody onClick={() => manejarClickEspacio(espacio.name)}>
                      <CCardTitle>{espacio.name}</CCardTitle>
                      <CCardText>{espacio.descripcion}</CCardText>
                    </CCardBody>
                  </CCard>
                ))
              ) : (
                <p>No hay espacios creados</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuContextual && (
        <CModal visible={menuContextual !== null} onDismiss={ocultarMenuContextual}>
          <CModalBody>
            <button className="btn btn-primary" onClick={() => manejarEditarEspacio(menuContextual.espacio)}>Editar</button>
            <button className="btn btn-danger" onClick={() => manejarEliminarEspacio(menuContextual.espacio.id)}>Eliminar</button>
          </CModalBody>
          <CModalFooter>
            <button className="btn btn-secondary" onClick={ocultarMenuContextual}>Cerrar</button>
          </CModalFooter>
        </CModal>
      )}
    </CContainer>
  );
};

export default Inicio;