import React from 'react';
import '../styles.css';

const InventoryList = ({ items }) => {
  return (
    <div className="inventory-list">
      <h2>Lista de Inventario</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;