import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios, eliminarEspacio } from '../services/firestore';
<<<<<<< HEAD
import '../styles.css';
=======
import Banner from './Banner';
import { CContainer, CRow, CCol, CFormInput, CButton, CCard, CCardBody, CCardTitle, CCardText, CModal, CModalBody, CModalFooter } from '@coreui/react';
import '../scss/style.scss';
>>>>>>> ed5b7cc (Prueba)

const Inicio = () => {
  const [espacios, setEspacios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [itemEncontrado, setItemEncontrado] = useState(null);
  const [menuContextual, setMenuContextual] = useState(null);
<<<<<<< HEAD
=======
  const [modalVisible, setModalVisible] = useState(false);
>>>>>>> ed5b7cc (Prueba)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacios = async () => {
      const espacios = await obtenerEspacios();
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
    let itemEncontrado = null;
    espacios.forEach(espacio => {
      if (espacio.items) {
        espacio.items.forEach(item => {
          if (item.name.toLowerCase().includes(busqueda.toLowerCase())) {
            itemEncontrado = { name: item.name, space: espacio.name };
          }
        });
      }
    });
    setItemEncontrado(itemEncontrado);
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
<<<<<<< HEAD
    <div className="inicio-page">
      <header className="inicio-header">
        <h3 className="inicio-title">Bienvenido a QuickVentory!</h3>
      </header>
      <div className="search-widget">
        <div className="search-container-widget">
          <img src="/images/logo.png" alt="Logo" className="header-logo" />
          <input
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

      <div className="inicio-create-space">
        <div className="create-space-container">
          <button className="create-space-button" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</button>
          <div className="categories-container">
            {espacios.length > 0 ? (
              espacios.map((espacio, index) => (
                <div
                  key={index}
                  className="category-button"
                  onClick={() => manejarClickEspacio(espacio.name)}
                  onContextMenu={(e) => mostrarMenuContextual(e, espacio)}
                >
                  {espacio.name}
                </div>
              ))
            ) : (
              <p>No hay espacios creados</p>
            )}
          </div>
        </div>
      </div>

      {menuContextual && (
        <div
          className="context-menu"
          style={{ top: `${menuContextual.y}px`, left: `${menuContextual.x}px` }}
        >
          <button onClick={() => manejarEditarEspacio(menuContextual.espacio)}>Editar</button>
          <button onClick={() => manejarEliminarEspacio(menuContextual.espacio.id)}>Eliminar</button>
        </div>
      )}
    </div>
=======
    <CContainer className="inicio-page">
      <header className="inicio-header">
        <Banner />
      </header>
      <CRow className="search-widget">
        <CCol>
          <div className="search-container-widget">
            <CFormInput
              type="text"
              placeholder="Buscar Item..."
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="search-buttons">
              <CButton color="primary" className="search-button" onClick={manejarBusqueda}>Buscar</CButton>
              <CButton color="secondary" className="clear-button" onClick={manejarLimpiarBusqueda}>Limpiar</CButton>
            </div>
            {itemEncontrado && (
              <div className="search-result">
                <p>Objeto encontrado: <strong>{itemEncontrado.name}</strong></p>
                <p>Ubicación: <strong>{itemEncontrado.space}</strong></p>
              </div>
            )}
          </div>
        </CCol>
      </CRow>

      <CRow className="inicio-create-space">
        <CCol>
          <div className="create-space-container">
            <CButton color="success" className="create-space-button" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</CButton>
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
        </CCol>
      </CRow>

      {menuContextual && (
        <CModal visible={modalVisible} onDismiss={ocultarMenuContextual}>
          <CModalBody>
            <CButton color="primary" onClick={() => manejarEditarEspacio(menuContextual.espacio)}>Editar</CButton>
            <CButton color="danger" onClick={() => manejarEliminarEspacio(menuContextual.espacio.id)}>Eliminar</CButton>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={ocultarMenuContextual}>Cerrar</CButton>
          </CModalFooter>
        </CModal>
      )}
    </CContainer>
>>>>>>> ed5b7cc (Prueba)
  );
};

export default Inicio;