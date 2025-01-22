import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Forms from './Forms';

const CrearItem = () => {
  const { spaceName } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSave = () => {
    // Lógica para guardar el nuevo item
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre', value: name, onChange: setName, required: true },
    { type: 'text', placeholder: 'Descripción', value: description, onChange: setDescription },
    { type: 'file', placeholder: 'Foto', value: photo, onChange: setPhoto }
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