import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '../scss/style.scss';

const CrearItem = () => {
  const { spaceName } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSave = () => {
    // Lógica para guardar el nuevo item
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Crear Item</h1>
          <CForm>
            <CFormInput
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CFormInput
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <CFormInput
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <CButton color="primary" onClick={handleSave}>Guardar</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CrearItem;