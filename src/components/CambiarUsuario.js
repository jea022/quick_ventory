import React, { useState } from 'react';

const CambiarUsuario = () => {
  const [selectedUser, setSelectedUser] = useState('Usuario1');

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    // Lógica para cambiar de usuario
    console.log('Usuario cambiado a: ' + e.target.value);
  };

  return (
    <div className="cambiar-usuario-container">
      <h2>Cambiar Usuario</h2>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="Usuario1">Usuario1</option>
        <option value="Usuario2">Usuario2</option>
        {/* Agrega más usuarios si es necesario */}
      </select>
    </div>
  );
};

export default CambiarUsuario;
