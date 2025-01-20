import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';

const EditarItem = () => {
  const { spaceName, itemName } = useParams();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica para obtener los detalles del item
  }, [spaceName, itemName]);

  const handleSave = () => {
    // Lógica para guardar los cambios
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Editar Item</h1>
          <CForm>
            <CFormInput
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CFormInput
              type="text"
              placeholder="Unidad"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
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

export default EditarItem;