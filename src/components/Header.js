import React from 'react';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <a href="/" className="header-button">Inicio</a>
      <a href="/buscar" className="header-button">Buscar</a>
      <a href="/notificaciones" className="header-button">Notificaciones</a>
      <a href="/ajustes" className="header-button">Ajustes</a>
    </header>
  );
};

export default Header;