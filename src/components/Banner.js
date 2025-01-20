import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import '../scss/_banner.scss';

const Banner = () => {
  return (
    <CContainer className="banner-container">
      <CRow className="justify-content-center">
        <CCol className="text-center">
          <h1 className="banner-text">Bienvenido a Quick Ventory</h1>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Banner;