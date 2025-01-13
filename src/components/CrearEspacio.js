import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const CrearEspacio = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name) {
      alert('El nombre es obligatorio');
      return;
    }

    // Guardar el espacio en localStorage
    const newSpace = { name, location, description, photo };
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    storedSpaces.push(newSpace);
    localStorage.setItem('spaces', JSON.stringify(storedSpaces));

    alert('Espacio creado');
    navigate('/'); // Redirige al inicio después de crear el espacio
  };

  return (
    <div className="fullscreen-container">
      <h3 className="section-title">Mis espacios</h3>
      <div className="create-space-container">
        <h2>Creador de Espacios</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Nombre del Espacio"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ fontSize: '1.2em' }} // Aumenta el tamaño del input de archivo
          />
          <button type="button" className="create-space-button" onClick={handleCreate}>
            Crear Espacio
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearEspacio;