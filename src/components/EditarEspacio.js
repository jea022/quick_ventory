import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

const EditarEspacio = () => {
  const { spaceName, EspacioName } = useParams(); // Obtenemos el nombre del espacio y del Espacio
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getEspacio('spaces')) || [];
    const space = storedSpaces.find(space => space.name === spaceName);
    if (space) {
      const Espacio = space.Espacios.find(Espacio => Espacio.name === EspacioName);
      if (Espacio) {
        setName(Espacio.name);
        setUnit(Espacio.unit);
        setDescription(Espacio.description);
        setPhoto(Espacio.photo);
      }
    }
  }, [spaceName, EspacioName]);

  const handleSave = () => {
    const storedSpaces = JSON.parse(localStorage.getEspacio('spaces')) || [];
    const spaceIndex = storedSpaces.findIndex(space => space.name === spaceName);
    if (spaceIndex !== -1) {
      const space = storedSpaces[spaceIndex];
      const EspacioIndex = space.Espacios.findIndex(Espacio => Espacio.name === EspacioName);
      if (EspacioIndex !== -1) {
        space.Espacios[EspacioIndex] = { name, unit, description, photo };
        localStorage.setEspacio('spaces', JSON.stringify(storedSpaces));
        alert('Espacio actualizado');
        navigate(`/espacio/${spaceName}`);
      }
    }
  };

  return (
    <div className="create-Espacio-form">
      <h2>Editar Espacio en el Espacio: {spaceName}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nombre (obligatorio)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-Espacio-input"
          required
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="create-Espacio-input"
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
          className="create-Espacio-input"
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="create-Espacio-input"
        />
        <button type="submit" onClick={handleSave} className="green">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarEspacio;
