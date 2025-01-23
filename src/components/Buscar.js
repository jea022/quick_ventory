import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerObjetos } from '../services/firestore';
import { CRow, CCol, CFormInput, CListGroup, CListGroupItem, CContainer, CButton, CModal, CModalBody, CModalFooter } from '@coreui/react';
import '../scss/_buscar.scss';

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [error, setError] = useState(null);
  const [menuContextual, setMenuContextual] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const objetos = await obtenerObjetos();
        console.log('Objetos fetched:', objetos);
        setObjetos(objetos);
        setResultados(objetos);
      } catch (error) {
        console.error('Error fetching objetos:', error);
        setError(error);
      }
    };

    fetchObjetos();
  }, []);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
  };

  const manejarBuscar = () => {
    const resultadosFiltrados = objetos.filter(objeto =>
      objeto.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  const manejarLimpiarBusqueda = () => {
    setBusqueda('');
    setResultados(objetos);
  };

  const manejarClickObjeto = (objeto) => {
    navigate(`/espacio/${objeto.space}`);
  };

  const manejarClickDerecho = (e, objeto) => {
    e.preventDefault();
    setMenuContextual({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
      objeto,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  return (
    <CContainer fluid className="buscar-page">
      <header className="buscar-header">
      
      </header>
      <h1 className="dashboard-title">Buscar</h1>
      <div className="buscar-container">
        <CRow className="justify-content-center">
          <CCol md="8">
            <CFormInput
              className="form-control search-input"
              type="text"
              placeholder="Buscar Objeto..."
              value={busqueda}
              onChange={manejarBusqueda}
              style={{ textTransform: 'uppercase' }} // Permitir escribir en mayúsculas
            />
            <div className="search-buttons">
              <CButton className="search-button" onClick={manejarBuscar}>Buscar</CButton>
              <CButton color="secondary" className="clear-button" onClick={manejarLimpiarBusqueda}>Limpiar</CButton>
            </div>
          </CCol>
        </CRow>
        <CRow className="justify-content-center mt-3">
          <CCol md="8">
            {error ? (
              <div className="alert alert-danger">{error.message}</div>
            ) : (
              <>
                {resultados.length === 0 && !error && (
                  <div className="no-results">No hay resultados</div>
                )}
                <CListGroup>
                  {resultados.map((objeto, index) => (
                    <CListGroupItem
                      key={objeto.id}
                      onClick={() => manejarClickObjeto(objeto)}
                      onContextMenu={(e) => manejarClickDerecho(e, objeto)}
                    >
                      {objeto.name} - {objeto.quantity} unidades
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </>
            )}
          </CCol>
        </CRow>
      </div>
      {menuContextual && (
        <CModal visible={menuContextual !== null} onDismiss={ocultarMenuContextual}>
          <CModalBody>
            <button className="btn btn-primary" onClick={() => navigate(`/editar-item/${menuContextual.objeto.space}/${menuContextual.objeto.name}`)}>Editar</button>
            <button className="btn btn-secondary" onClick={ocultarMenuContextual}>Cerrar</button>
          </CModalBody>
        </CModal>
      )}
    </CContainer>
  );
};

export default Buscar;