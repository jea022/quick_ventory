import React from 'react';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Bienvenido al Inicio</h1>
      <img src="/images/logo.png" alt="Logo" className="header-logo" />
    </header>
  );
};

export default Header;