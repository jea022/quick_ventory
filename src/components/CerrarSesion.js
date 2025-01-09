import React from 'react';
import { useNavigate } from 'react-router-dom';

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    navigate('/login');  // Redirige al login
  };

  return (
    <div className="cerrar-sesion-container">
      <h2>Cerrar Sesión</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default CerrarSesion;
