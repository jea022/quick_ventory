import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/_cerrarSesion.scss'; // Asegúrate de crear este archivo de estilos

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    navigate('/login');  // Redirige al login
  };

  return (
    <div className="cerrar-sesion-container">
      <div className="cerrar-sesion-row">
        <div className="cerrar-sesion-col">
          <h2>Cerrar Sesión</h2>
          <button className="cerrar-sesion-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default CerrarSesion;