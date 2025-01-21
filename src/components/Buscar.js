import React, { useState, useEffect } from 'react';
import { obtenerObjetos } from '../services/firestore';
import { CRow, CCol, CFormInput, CListGroup, CListGroupItem, CContainer, CButton } from '@coreui/react';
import '../scss/_buscar.scss';

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const objetos = await obtenerObjetos();
        setObjetos(objetos);
        setResultados(objetos);
      } catch (err) {
        setError('Error fetching data');
      }
    };
    fetchObjetos();
  }, []);

  const manejarBusqueda = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);
    const resultadosFiltrados = objetos.filter(objeto =>
      objeto.name.toLowerCase().includes(valorBusqueda)
    );
    setResultados(resultadosFiltrados);
  };

  const manejarLimpiarBusqueda = () => {
    setBusqueda('');
    setResultados(objetos);
  };

  return (
    <CContainer fluid className="buscar-page">
      <h1 className="dashboard-title">Buscar</h1>
      <div className="buscar-container">
        <CRow className="justify-content-center">
          <CCol md="8">
            <CFormInput
              className="search-input"
              type="text"
              placeholder="Buscar Objeto..."
              value={busqueda}
              onChange={manejarBusqueda}
            />
            <div className="search-buttons">
              <CButton className="search-button" onClick={manejarBusqueda}>Buscar</CButton>
              <CButton color="secondary" className="clear-button" onClick={manejarLimpiarBusqueda}>Limpiar</CButton>
            </div>
          </CCol>
        </CRow>
        <CRow className="justify-content-center mt-3">
          <CCol md="8">
            <div className="result-container">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <>
                  {resultados.length === 0 && !error && (
                    <div className="no-results">No hay resultados</div>
                  )}
                  <CListGroup>
                    {resultados.map((objeto, index) => (
                      <CListGroupItem key={index}>
                        {objeto.name}
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </>
              )}
            </div>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
};

export default Buscar;