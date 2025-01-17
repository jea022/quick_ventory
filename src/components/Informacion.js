import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import '../scss/style.scss';

const Informacion = () => {
  const navigate = useNavigate();

  const handleEditarClick = () => {
    navigate('/editar-informacion');
  };

  return (
    <CContainer className="informacion-container">
      <CRow>
        <CCol>
          <h1>Información del Usuario</h1>
          <div className="informacion-content">
            <p><strong>Nombre:</strong> Ignasi</p>
            <p><strong>Email:</strong> ignasi@example.com</p>
            <p><strong>Fecha de registro:</strong> 18 de diciembre de 2024</p>
            <p><strong>Preferencias:</strong> Notificaciones activadas</p>
          </div>
          <CButton color="primary" onClick={handleEditarClick}>Editar Información</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Informacion;