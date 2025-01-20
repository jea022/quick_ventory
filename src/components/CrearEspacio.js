import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarEspacio } from '../services/firestore';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '../scss/style.scss';

const CrearEspacio = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const manejarCrear = async () => {
    if (!nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    const nuevoEspacio = { name: nombre, location: ubicacion, description: descripcion };
    try {
      await agregarEspacio(nuevoEspacio);
      alert('Espacio creado');
      navigate('/'); // Redirige al inicio después de crear el espacio
    } catch (error) {
      console.error('Error al crear el espacio:', error);
      alert('Hubo un error al crear el espacio. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <CContainer className="fullscreen-container">
      <h3 className="section-title">Crear Nuevo Espacio</h3>
      <CRow className="create-space-container">
        <CCol>
          <CForm onSubmit={(e) => e.preventDefault()}>
            <CFormInput
              type="text"
              placeholder="Nombre del Espacio"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="create-space-input"
              required
            />
            <CFormInput
              type="text"
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="create-space-input"
            />
            <CFormInput
              type="textarea"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="create-space-input"
            />
            <CButton type="button" color="primary" onClick={manejarCrear}>
              Crear Espacio
            </CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CrearEspacio;