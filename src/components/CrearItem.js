import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { agregarItem } from '../services/firestore'; // Importar la función agregarItem
import Forms from './Forms';

const CrearItem = () => {
  const { spaceName } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const nuevoItem = { name, space: spaceName, description, quantity, createdAt: new Date() };
    try {
      await agregarItem(nuevoItem);
      alert('Ítem creado');
      navigate(`/espacio/${spaceName}`); // Redirige a la vista del espacio después de crear el ítem
    } catch (error) {
      console.error('Error al crear el ítem:', error);
      alert('Hubo un error al crear el ítem. Por favor, inténtalo de nuevo.');
    }
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre', value: name, onChange: setName, required: true },
    { type: 'text', placeholder: 'Descripción', value: description, onChange: setDescription },
    { type: 'text', placeholder: 'Cantidad', value: quantity, onChange: setQuantity },
  ];

  return (
    <Forms
      titulo="Crear Item"
      campos={campos}
      manejarGuardar={handleSave}
      botonTexto="Guardar"
    />
  );
};

export default CrearItem;