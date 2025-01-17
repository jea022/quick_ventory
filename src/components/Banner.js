import React from 'react';
<<<<<<< HEAD
import '../styles.css';

const Banner = () => {
  return (
    <div className="banner">
      <h3 className="banner-title">Bienvenido a QuickVentory!</h3>
      <img src="/images/logo.png" alt="Logo" className="banner-logo" />
    </div>
=======
import { CContainer, CRow, CCol } from '@coreui/react';

const Banner = () => {
  return (
    <CContainer className="banner">
      <CRow>
        <CCol>
          <h1>Bienvenido a Quick-Ventory</h1>
        </CCol>
      </CRow>
    </CContainer>
>>>>>>> ed5b7cc (Prueba)
  );
};

export default Banner;