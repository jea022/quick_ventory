import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import '../scss/style.scss';

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const handleEditarClick = () => {
    navigate('/editar-informacion');
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Perfil del Usuario</h1>
          <p>Nombre: Ignasi</p>
          <p>Email: ignasi@example.com</p>
          <p>Preferencias: Notificaciones activadas</p>
          <CButton color="primary" onClick={handleEditarClick}>Editar Información</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default PerfilUsuario;