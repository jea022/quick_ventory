import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Necesitamos useParams para obtener el nombre del espacio
import '../styles.css';

const CrearItem = () => {
  const { spaceName } = useParams(); // Obtenemos el nombre del espacio
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name) {
      alert('El nombre es obligatorio');
      return;
    }

    // Recuperamos los espacios de localStorage
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];

    // Encontramos el espacio correspondiente por su nombre
    const spaceIndex = storedSpaces.findIndex((space) => space.name === spaceName);
    if (spaceIndex === -1) {
      alert('Este espacio no existe');
      return;
    }

    // Guardar el item dentro del espacio encontrado
    const newItem = { name, unit, description, photo };
    storedSpaces[spaceIndex].items = storedSpaces[spaceIndex].items || []; // Asegurarse de que exista un array de items
    storedSpaces[spaceIndex].items.push(newItem);

    // Guardamos los espacios actualizados en localStorage
    localStorage.setItem('spaces', JSON.stringify(storedSpaces));

    alert('Item creado');
    navigate(`/espacio/${spaceName}`); // Redirigir al espacio después de crear el item
  };

  return (
    <div className="create-item-form">
      <h2>Agregar Item al Espacio: {spaceName}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre (obligatorio)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-item-input"
          required
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="create-item-input"
        >
          <option value="">Unidad Medida (opcional)</option>
          <option value="Litros">Litros</option>
          <option value="Kilogramos">Kilogramos</option>
          <option value="Unidades">Unidades</option>
        </select>
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-item-input"
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="create-item-input"
        />
        <button type="submit" onClick={handleCreate} className="green">
          Crear Item
        </button>
      </form>
    </div>
  );
};

export default CrearItem;
