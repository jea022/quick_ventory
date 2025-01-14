import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerEspacios, actualizarEspacio } from '../services/firestore';
import '../styles.css';

const EditarEspacio = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const locationState = useLocation().state;

  useEffect(() => {
    if (locationState && locationState.space) {
      const { name, location, description } = locationState.space;
      setNombre(name);
      setUbicacion(location);
      setDescripcion(description);
    }
  }, [locationState]);

  const manejarGuardar = async () => {
    if (!nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    const espacioActualizado = { name: nombre, location: ubicacion, description: descripcion };
    const espacios = await obtenerEspacios();
    const espacioIndex = espacios.findIndex(espacio => espacio.id === locationState.space.id);

    if (espacioIndex !== -1) {
      await actualizarEspacio(locationState.space.id, espacioActualizado);
      alert('Espacio actualizado');
      navigate('/');
    } else {
      alert('Espacio no encontrado');
    }
  };

  return (
    <div className="fullscreen-container">
      <h3 className="section-title">Editar Espacio</h3>
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
          <button type="button" className="create-space-button" onClick={manejarGuardar}>
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarEspacio;