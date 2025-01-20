import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    navigate('/login');  // Redirige al login
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Cerrar Sesión</h2>
          <CButton color="danger" onClick={handleLogout}>Cerrar Sesión</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CerrarSesion;