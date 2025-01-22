import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Forms from './Forms';

const EditarItem = () => {
  const { spaceName, itemName } = useParams();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica para obtener los detalles del item
  }, [spaceName, itemName]);

  const handleSave = () => {
    // Lógica para guardar los cambios
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre', value: name, onChange: setName, required: true },
    { type: 'text', placeholder: 'Unidad', value: unit, onChange: setUnit },
    { type: 'text', placeholder: 'Descripción', value: description, onChange: setDescription },
    { type: 'file', placeholder: 'Foto', value: photo, onChange: setPhoto }
  ];

  return (
    <Forms
      titulo="Editar Item"
      campos={campos}
      manejarGuardar={handleSave}
      botonTexto="Guardar"
    />
  );
};

export default EditarItem;