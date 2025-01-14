import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarEspacio } from '../services/firestore';
import '../styles.css';

const CrearEspacio = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const manejarCrear = async () => {
    if (!nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    // Guardar el espacio en Firestore
    const nuevoEspacio = { name: nombre, location: ubicacion, description: descripcion };
    try {
      await agregarEspacio(nuevoEspacio);
      alert('Espacio creado');
      navigate('/'); // Redirige al inicio después de crear el espacio
    } catch (error) {
      console.error('Error al crear el espacio:', error);
      alert('Hubo un error al crear el espacio. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="fullscreen-container">
      <h3 className="section-title">Crear Nuevo Espacio</h3>
      <div className="create-space-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Nombre del Espacio"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="create-space-input"
            required
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="create-space-input"
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="create-space-input"
          />
          <button type="button" className="create-space-button" onClick={manejarCrear}>
            Crear Espacio
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearEspacio;