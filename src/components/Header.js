import React from 'react';
import { useLocation } from 'react-router-dom';
import { CButton } from '@coreui/react';
import '../scss/_header.scss';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta al logo sea correcta

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  // Ocultar el header en las páginas de login y registro
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="header">
      <CButton className="toggle-sidebar" onClick={toggleSidebar}>
        &#9776; {/* Icono de tres rayas */}
      </CButton>
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;