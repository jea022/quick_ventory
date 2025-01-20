import React, { useState } from 'react';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const CambiarContraseña = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    // Lógica para cambiar la contraseña
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Cambiar Contraseña</h1>
          <CForm>
            <CFormInput
              type="password"
              placeholder="Contraseña Actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <CFormInput
              type="password"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <CButton color="primary" onClick={handlePasswordChange}>Cambiar Contraseña</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CambiarContraseña;