import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../scss/_cerrarSesion.scss';

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="cerrar-sesion-container">
      <div className="cerrar-sesion-row">
        <div className="cerrar-sesion-col">
          <h2>Cerrar Sesión</h2>
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
          <button className="cerrar-sesion-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default CerrarSesion;