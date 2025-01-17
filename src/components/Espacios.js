import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios } from '../services/firestore';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import '../scss/style.scss';

const Espacios = () => {
  const [espacios, setEspacios] = useState([]);
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

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Espacios</h1>
          <CButton color="success" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</CButton>
          <div className="categories-container">
            {espacios.length > 0 ? (
              espacios.map((espacio, index) => (
                <CCard key={index} className="category-button">
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
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Espacios;