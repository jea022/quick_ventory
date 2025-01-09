import React, { useState, useEffect } from 'react';
import '../styles.css'; // Estilos solo para este componente

const Buscar = ({ allItems = [] }) => {  // Usamos un valor por defecto vacío para allItems
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Verificar que allItems tenga datos
  useEffect(() => {
    console.log("Items en Buscar:", allItems); // Para depuración, asegurarnos de que los datos están presentes

    // Filtramos los ítems solo si allItems tiene datos
    if (allItems && allItems.length > 0) {
      const results = allItems.filter(item =>
        item.name && item.name.toLowerCase().includes(query.toLowerCase())  // Asegúrate de que 'name' exista
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);  // Si no hay ítems, limpiamos el estado
    }
  }, [query, allItems]);

  return (
    <div className="buscar-container">
      <h2>Búsqueda General</h2>
      <div className="buscar-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  // Actualiza query en tiempo real
          className="buscar-input"
          placeholder="Buscar..."
        />
      </div>

      <p>Resultados encontrados: {filteredItems.length}</p>

      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} {item.unit}
            </li>
          ))
        ) : (
          <p>No se encontraron ítems</p>
        )}
      </ul>
    </div>
  );
};

export default Buscar;
