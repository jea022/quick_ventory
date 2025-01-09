import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../styles.css';

const Espacio = () => {
  const { spaceName } = useParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // Inicializamos navigate

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const space = storedSpaces.find((space) => space.name === spaceName);

    if (space) {
      setItems(space.items || []);
    } else {
      alert('Este espacio no existe');
    }
  }, [spaceName]);

  const handleRightClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  const handleEdit = () => {
    setContextMenu(null);
    navigate(`/editar-item/${spaceName}/${selectedItem.name}`); // Redirige a la página de edición
  };

  const handleDelete = () => {
    setContextMenu(null);
    const updatedItems = items.filter(item => item !== selectedItem);
    setItems(updatedItems);
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    const spaceIndex = storedSpaces.findIndex(space => space.name === spaceName);
    storedSpaces[spaceIndex].items = updatedItems;
    localStorage.setItem('spaces', JSON.stringify(storedSpaces));
    alert('Item borrado');
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="espacio-container" onClick={handleCloseMenu}>
      <header>
        <h2>{spaceName}</h2>
        <input
          type="text"
          placeholder="Buscar item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      <div className="items-list">
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} onContextMenu={(e) => handleRightClick(e, item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <button className="green" onClick={() => navigate(`/crear-item/${spaceName}`)}>
        Agregar Item
      </button>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Borrar</button>
          <button onClick={() => navigate(`/espacio/${spaceName}`)}>Ir al Espacio</button> {/* Aquí está el botón de redirección */}
        </div>
      )}
    </div>
  );
};

export default Espacio;
