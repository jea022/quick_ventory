import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const EditarInformacion = () => {
  const navigate = useNavigate();  // hook para redirigir
  const [nombre, setNombre] = useState('Ignasi');
  const [email, setEmail] = useState('ignasi@example.com');
  const [preferencias, setPreferencias] = useState('Notificaciones activadas');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica para guardar los cambios, puedes agregar la llamada al backend aquí
    // ...

    // Después de guardar, redirigir a la página de información
    navigate('/informacion');  // Redirige a la página de información
  };

  return (
    <div className="editar-container">
      <h1>Editar Información del Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Preferencias:</label>
          <input
            type="text"
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
          />
        </div>
        <button type="submit" className="save-button">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarInformacion;