import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerEspacios, actualizarEspacio } from '../services/firestore';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '../scss/style.scss';

const EditarEspacio = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const locationState = useLocation().state;

  useEffect(() => {
    if (locationState && locationState.espacio) {
      const { name, location, description } = locationState.espacio;
      setNombre(name);
      setUbicacion(location);
      setDescripcion(description);
    }
  }, [locationState]);

  const manejarGuardar = async () => {
    if (!nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    const espacioActualizado = { name: nombre, location: ubicacion, description: descripcion };
    const espacios = await obtenerEspacios();
    const espacioIndex = espacios.findIndex(espacio => espacio.id === locationState.espacio.id);

    if (espacioIndex !== -1) {
      await actualizarEspacio(locationState.espacio.id, espacioActualizado);
      alert('Espacio actualizado');
      navigate('/');
    } else {
      alert('Espacio no encontrado');
    }
  };

  return (
    <CContainer className="fullscreen-container">
      <h3 className="section-title">Editar Espacio</h3>
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
            <CButton type="button" color="primary" onClick={manejarGuardar}>
              Guardar Cambios
            </CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EditarEspacio;