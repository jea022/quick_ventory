import React, { useState } from 'react';

const CambiarContraseña = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    // Lógica para cambiar la contraseña
    console.log('Contraseña cambiada');
  };

  return (
    <div className="cambiar-contraseña-container">
      <h2>Cambiar Contraseña</h2>
      <input 
        type="password" 
        placeholder="Contraseña Actual"
        value={currentPassword} 
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Nueva Contraseña" 
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} 
      />
      <button onClick={handlePasswordChange}>Cambiar Contraseña</button>
    </div>
  );
};

export default CambiarContraseña;
