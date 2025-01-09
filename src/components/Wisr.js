import React, { useEffect } from 'react';

const WISr = () => {
  useEffect(() => {
    // Lógica para consumir la API de WISr
    console.log('Fetching WISr data...');
  }, []);

  return (
    <div className="wisr-container">
      <h2>WISr</h2>
      <p>Aquí mostrarás los datos consumidos de la API.</p>
    </div>
  );
};

export default WISr;
