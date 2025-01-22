import React from 'react';
import { CForm, CFormInput, CButton } from '@coreui/react';

const Forms = ({ titulo, campos, manejarGuardar, botonTexto }) => {
  return (
    <div className="fullscreen-container">
      <h3 className="section-title">{titulo}</h3>
      <div className="form-container">
        <CForm onSubmit={(e) => e.preventDefault()} className="form">
          {campos.map((campo, index) => (
            <CFormInput
              key={index}
              type={campo.type}
              placeholder={campo.placeholder}
              value={campo.value}
              onChange={(e) => campo.onChange(e.target.value)}
              className="form-input"
              required={campo.required}
            />
          ))}
          <CButton type="button" color="primary" onClick={manejarGuardar} className="form-button">
            {botonTexto}
          </CButton>
        </CForm>
      </div>
    </div>
  );
};

export default Forms;