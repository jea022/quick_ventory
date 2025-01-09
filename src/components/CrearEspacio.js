import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles.css';

const CrearEspacio = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate(); // Crea la instancia de navigate

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
    <div className="create-space-form">
      <h2>Creador de Espacios</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre (obligatorio)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-space-input"
          required
        />
        <input
          type="text"
          placeholder="Ubicación (opcional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="create-space-input"
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-space-input"
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="create-space-input"
        />
        <button type="submit" onClick={handleCreate} className="green">
          Crear Espacio
        </button>
      </form>
    </div>
  );
};

export default CrearEspacio;
