import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

const EditarItem = () => {
  const { spaceName, itemName } = useParams(); // Obtenemos el nombre del espacio y del item
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const space = storedSpaces.find(space => space.name === spaceName);
    if (space) {
      const item = space.items.find(item => item.name === itemName);
      if (item) {
        setName(item.name);
        setUnit(item.unit);
        setDescription(item.description);
        setPhoto(item.photo);
      }
    }
  }, [spaceName, itemName]);

  const handleSave = () => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const spaceIndex = storedSpaces.findIndex(space => space.name === spaceName);
    if (spaceIndex !== -1) {
      const space = storedSpaces[spaceIndex];
      const itemIndex = space.items.findIndex(item => item.name === itemName);
      if (itemIndex !== -1) {
        space.items[itemIndex] = { name, unit, description, photo };
        localStorage.setItem('spaces', JSON.stringify(storedSpaces));
        alert('Item actualizado');
        navigate(`/espacio/${spaceName}`);
      }
    }
  };

  return (
    <div className="create-item-form">
      <h2>Editar Item en el Espacio: {spaceName}</h2>
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
        <button type="submit" onClick={handleSave} className="green">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarItem;
