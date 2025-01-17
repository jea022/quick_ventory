import React from 'react';
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
  );
};

export default Banner;