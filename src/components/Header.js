import React from 'react';
import { useLocation } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { useAuth } from '../context/AuthContext';
import '../scss/_header.scss';
import logo from '../assets/logo.png';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Ocultar el header en las páginas de login y registro o si no está autenticado
  if (location.pathname === '/login' || location.pathname === '/register' || !isAuthenticated) {
    return null;
  }

  return (
    <header className="header">
      <CButton className="toggle-sidebar" onClick={toggleSidebar}>
        &#9776;
      </CButton>
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;