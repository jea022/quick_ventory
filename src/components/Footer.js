import React from 'react';
import '../styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <a href="/" className="footer-button">Inicio</a>
      <a href="/buscar" className="footer-button">Buscar</a>
      <a href="/notificaciones" className="footer-button">Notificaciones</a>
      <a href="/ajustes" className="footer-button">Ajustes</a>
    </footer>
  );
};

export default Footer;
