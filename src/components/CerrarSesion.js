import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
>>>>>>> ed5b7cc (Prueba)

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    navigate('/login');  // Redirige al login
  };

  return (
<<<<<<< HEAD
    <div className="cerrar-sesion-container">
      <h2>Cerrar Sesión</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default CerrarSesion;
=======
    <CContainer>
      <CRow>
        <CCol>
          <h2>Cerrar Sesión</h2>
          <CButton color="danger" onClick={handleLogout}>Cerrar Sesión</CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CerrarSesion;
>>>>>>> ed5b7cc (Prueba)
