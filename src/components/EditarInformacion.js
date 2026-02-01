import React, { useState } from 'react';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '../scss/style.scss';


const EditarInformacion = () => {
  const [nombre, setNombre] = useState('Ignasi');
  const [email, setEmail] = useState('ignasi@example.com');
  const [preferencias, setPreferencias] = useState('Notificaciones activadas');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la edición de la información
  };

  return (
    <CContainer className="editar-container">
      <CRow>
        <CCol>
          <h1>Editar Información del Usuario</h1>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <CFormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CFormInput
              type="text"
              placeholder="Preferencias"
              value={preferencias}
              onChange={(e) => setPreferencias(e.target.value)}
            />
            <CButton type="submit" color="primary">Guardar Cambios</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EditarInformacion;