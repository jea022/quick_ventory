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