import React, { useState } from 'react';
import '../scss/_main.scss';

const Form = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío del formulario
    console.log('Formulario enviado:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Ingrese un valor"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="form-input"
      />
      <button type="submit" className="form-button">Enviar</button>
    </form>
  );
};

export default Form;