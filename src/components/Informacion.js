import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Informacion = () => {
  const navigate = useNavigate();

  const handleEditarClick = () => {
    // Redirige a la página de edición
    navigate('/editar-informacion');
  };

  return (
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
