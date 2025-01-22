import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerEspacioPorNombre, actualizarEspacio } from '../services/firestore';
import Forms from './Forms';
import '../scss/style.scss';

const EditarEspacio = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const locationState = useLocation().state;

  useEffect(() => {
    if (locationState && locationState.espacio) {
      const { name, location, description } = locationState.espacio;
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
    try {
      await actualizarEspacio(locationState.espacio.id, espacioActualizado);
      alert('Espacio actualizado');
      navigate('/espacios'); // Redirige a la lista de espacios después de actualizar el espacio
    } catch (error) {
      console.error('Error al actualizar el espacio:', error);
      alert('Hubo un error al actualizar el espacio. Por favor, inténtalo de nuevo.');
    }
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre del Espacio', value: nombre, onChange: setNombre, required: true },
    { type: 'text', placeholder: 'Ubicación', value: ubicacion, onChange: setUbicacion },
    { type: 'textarea', placeholder: 'Descripción', value: descripcion, onChange: setDescripcion }
  ];

  return (
    <Forms
      titulo="Editar Espacio"
      campos={campos}
      manejarGuardar={manejarGuardar}
      botonTexto="Guardar Cambios"
    />
  );
};

export default EditarEspacio;