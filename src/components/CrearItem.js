import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

const EditarItem = () => {
  const { spaceName, itemName } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const space = storedSpaces.find(space => space.name === spaceName);
    if (space && space.items) {
      const item = space.items.find(item => item.name === itemName);
      if (item) {
        setName(item.name);
        setDescription(item.description);
        setPhoto(item.photo);
      }
    }
  }, [spaceName, itemName]);

  const handleSave = () => {
    if (!name) {
      alert('El nombre es obligatorio');
      return;
    }

    // Guardar los cambios del item en el espacio correspondiente en localStorage
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const spaceIndex = storedSpaces.findIndex(space => space.name === spaceName);
    if (spaceIndex !== -1) {
      const itemIndex = storedSpaces[spaceIndex].items.findIndex(item => item.name === itemName);
      if (itemIndex !== -1) {
        storedSpaces[spaceIndex].items[itemIndex] = { name, description, photo };
        localStorage.setItem('spaces', JSON.stringify(storedSpaces));
        alert('Item actualizado');
        navigate(`/espacio/${spaceName}`); // Redirige al espacio después de guardar los cambios
      } else {
        alert('Item no encontrado');
      }
    } else {
      alert('Espacio no encontrado');
    }
  };

  return (
    <div className="fullscreen-container">
      <h3 className="section-title">Editar Item en {spaceName}</h3>
      <div className="edit-item-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Nombre del Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="edit-item-input"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-item-input"
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="edit-item-input"
            style={{ fontSize: '1.2em' }} // Aumenta el tamaño del input de archivo
          />
          <button type="button" className="edit-item-button" onClick={handleSave}>
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarItem;