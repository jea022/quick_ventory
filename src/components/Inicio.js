import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Inicio = () => {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState('');
  const [foundItem, setFoundItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null); // Para manejar el menú flotante
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
      space.items.forEach(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          itemFound = { name: item.name, space: space.name };
        }
      });
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
    <div className="inicio-container" onClick={hideContextMenu}>
      <header className="inicio-header">
        <img src="/images/logo.png" alt="Logo" className="inicio-logo" />
        <h1 className="inicio-title">Bienvenido a QuickVentory!</h1>
      </header>

      <div className="inicio-search">
        <input
          type="text"
          placeholder="Buscar Item..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Buscar</button>
        <button className="clear-button" onClick={handleClearSearch}>Limpiar</button>
      </div>

      {/* Mostrar el resultado de la búsqueda */}
      {foundItem && (
        <div className="search-result">
          <p>Objeto encontrado: <strong>{foundItem.name}</strong></p>
          <p>Ubicación: <strong>{foundItem.space}</strong></p>
        </div>
      )}

      {/* Botón para crear un nuevo espacio */}
      <div className="inicio-create-space">
        <button className="green" onClick={handleCreateSpace}>Crear Espacio</button>
      </div>

      {/* Mostrar los espacios creados */}
      <div className="inicio-categories">
        {spaces.length > 0 ? (
          spaces.map((space, index) => (
            <div
              key={index}
              className="category-button"
              onClick={() => handleSpaceClick(space.name)}
              onContextMenu={(e) => showContextMenu(e, space)} // Muestra el menú flotante
            >
              {space.name}
            </div>
          ))
        ) : (
          <p>No hay espacios creados</p>
        )}
      </div>

      {/* Menú flotante */}
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
