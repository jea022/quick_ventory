<<<<<<< HEAD
import React, { useEffect } from 'react';

const WISr = () => {
  useEffect(() => {
    // Lógica para consumir la API de WISr
    console.log('Fetching WISr data...');
  }, []);

  return (
    <div className="wisr-container">
      <h2>WISr</h2>
      <p>Aquí mostrarás los datos consumidos de la API.</p>
    </div>
  );
};

export default WISr;
=======
import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react';

const Wisr = () => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Wisr</h1>
          <CCard>
            <CCardBody>
              <CCardTitle>Wisr 1</CCardTitle>
              <CCardText>Descripción de Wisr 1.</CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Wisr;
>>>>>>> ed5b7cc (Prueba)
