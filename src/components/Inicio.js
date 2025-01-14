import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';
import '../styles.css';

const Inicio = () => {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState('');
  const [foundItem, setFoundItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSpaces = JSON.parse(localStorage.getItem('spaces')) || [];
    setSpaces(storedSpaces);
  }, []);

  const handleSpaceClick = (spaceName) => {
    navigate(`/espacio/${spaceName}`);
  };

  const handleCreateSpace = () => {
    navigate('/crear-espacio');
  };

  const handleSearch = () => {
    let itemFound = null;
    spaces.forEach(space => {
      if (space.items) {
        space.items.forEach(item => {
          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            itemFound = { name: item.name, space: space.name };
          }
        });
      }
    });
    setFoundItem(itemFound);
  };

  const handleClearSearch = () => {
    setSearch('');
    setFoundItem(null);
  };

  const showContextMenu = (event, space) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      space,
    });
  };

  const hideContextMenu = () => {
    setContextMenu(null);
  };

  const handleEditSpace = (space) => {
    navigate(`/editar-espacio/${space.name}`, { state: { space } });
    hideContextMenu();
  };

  const handleDeleteSpace = (spaceName) => {
    const updatedSpaces = spaces.filter(space => space.name !== spaceName);
    setSpaces(updatedSpaces);
    localStorage.setItem('spaces', JSON.stringify(updatedSpaces));
    hideContextMenu();
  };

  return (
    <div className="inicio-page">
      <header className="inicio-header">
        <Banner />
      </header>

      <div className="search-widget">
        <div className="search-container-widget">
          <input
            type="text"
            placeholder="Buscar Item..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search-buttons">
            <button className="search-button" onClick={handleSearch}>Buscar</button>
            <button className="clear-button" onClick={handleClearSearch}>Limpiar</button>
          </div>
          {foundItem && (
            <div className="search-result">
              <p>Objeto encontrado: <strong>{foundItem.name}</strong></p>
              <p>Ubicación: <strong>{foundItem.space}</strong></p>
            </div>
          )}
        </div>
      </div>

      <div className="inicio-create-space">
        <div className="create-space-container">
          <button className="create-space-button" onClick={handleCreateSpace}>Crear Nuevo Espacio</button>
          <div className="categories-container">
            {spaces.length > 0 ? (
              spaces.map((space, index) => (
                <div
                  key={index}
                  className="category-button"
                  onClick={() => handleSpaceClick(space.name)}
                  onContextMenu={(e) => showContextMenu(e, space)}
                >
                  {space.name}
                </div>
              ))
            ) : (
              <p>No hay espacios creados</p>
            )}
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button onClick={() => handleEditSpace(contextMenu.space)}>Editar</button>
          <button onClick={() => handleDeleteSpace(contextMenu.space.name)}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default Inicio;