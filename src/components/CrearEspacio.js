import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarEspacio } from '../services/firestore';
import Forms from './Forms';

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

    const nuevoEspacio = { name: nombre, location: ubicacion, description: descripcion };
    try {
      await agregarEspacio(nuevoEspacio);
      alert('Espacio creado');
      navigate('/espacios'); // Redirige a la lista de espacios después de crear el espacio
    } catch (error) {
      console.error('Error al crear el espacio:', error);
      alert('Hubo un error al crear el espacio. Por favor, inténtalo de nuevo.');
    }
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre del Espacio', value: nombre, onChange: setNombre, required: true },
    { type: 'text', placeholder: 'Ubicación', value: ubicacion, onChange: setUbicacion },
    { type: 'textarea', placeholder: 'Descripción', value: descripcion, onChange: setDescripcion }
  ];

  return (
    <Forms
      titulo="Crear Nuevo Espacio"
      campos={campos}
      manejarGuardar={manejarCrear}
      botonTexto="Crear Espacio"
    />
  );
};

export default CrearEspacio;