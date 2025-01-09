import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Asegúrate de ajustar la ruta según tu estructura

const Ajustes = () => {
  return (
    <div className="ajustes-container">
      <div className="profile-header">
      <img src="/images/logo.png" alt="Logo" className="inicio-logo" />
      <h2>QuickVentory</h2>
      </div>
      <h3>Ajustes</h3>
      <div className="ajustes-buttons">
        <Link to="/informacion" className="ajuste-button">
          <i className="fa fa-user"></i> Informacion
        </Link>
        <Link to="/cambiar-contrasena" className="ajuste-button">
          <i className="fa fa-lock"></i> Cambiar Contraseña
        </Link>
        <Link to="/cerrar-sesion" className="ajuste-button">
          <i className="fa fa-power-off"></i> Cerrar Sesión
        </Link>
        <Link to="/wisr" className="ajuste-button">
          WISr
        </Link>
        <Link to="/cambiar-usuario" className="ajuste-button">
          <i className="fa fa-users"></i> Cambiar Usuario
        </Link>
      </div>
    </div>
  );
};

export default Ajustes;
