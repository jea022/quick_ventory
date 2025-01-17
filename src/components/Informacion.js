import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../styles.css';
=======
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import '../scss/style.scss';
>>>>>>> ed5b7cc (Prueba)

const Informacion = () => {
  const navigate = useNavigate();

  const handleEditarClick = () => {
<<<<<<< HEAD
    // Redirige a la página de edición
=======
>>>>>>> ed5b7cc (Prueba)
    navigate('/editar-informacion');
  };

  return (
<<<<<<< HEAD
    <div className="informacion-container">
      <h1>Información del Usuario</h1>
      <div className="informacion-content">
        <p><strong>Nombre:</strong> Ignasi</p>
        <p><strong>Email:</strong> ignasi@example.com</p>
        <p><strong>Fecha de registro:</strong> 18 de diciembre de 2024</p>
        <p><strong>Preferencias:</strong> Notificaciones activadas</p>
      </div>
      <button className="editar-btn" onClick={handleEditarClick}>Editar información</button>
    </div>
  );
};

export default Informacion;
=======
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
>>>>>>> ed5b7cc (Prueba)
