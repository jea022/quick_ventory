import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../styles.css';

const EditarInformacion = () => {
  const navigate = useNavigate();  // hook para redirigir
=======
import { CContainer, CRow, CCol, CForm, CFormInput, CButton } from '@coreui/react';
import '../scss/style.scss';

const EditarInformacion = () => {
  const navigate = useNavigate();
>>>>>>> ed5b7cc (Prueba)
  const [nombre, setNombre] = useState('Ignasi');
  const [email, setEmail] = useState('ignasi@example.com');
  const [preferencias, setPreferencias] = useState('Notificaciones activadas');

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
    // Lógica para guardar los cambios, puedes agregar la llamada al backend aquí
    // ...

    // Después de guardar, redirigir a la página de información
    navigate('/informacion');  // Redirige a la página de información
  };

  return (
    <div className="editar-container">
      <h1>Editar Información del Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Preferencias:</label>
          <input
            type="text"
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
          />
        </div>
        <button type="submit" className="save-button">Guardar Cambios</button>
      </form>
    </div>
=======
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
>>>>>>> ed5b7cc (Prueba)
  );
};

export default EditarInformacion;