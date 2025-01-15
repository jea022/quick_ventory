import React from 'react';
import '../styles.css';

const Banner = () => {
  return (
    <div className="banner">
      <h3 className="banner-title">Bienvenido a QuickVentory!</h3>
      <img src="/images/logo.png" alt="Logo" className="banner-logo" />
    </div>
  );
};

export default Banner;