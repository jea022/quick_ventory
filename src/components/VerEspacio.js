import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerEspacioPorNombre, obtenerItemsPorNombre, eliminarItem } from '../services/firestore';
import { CButton } from '@coreui/react';
import ContextMenu from './ContextMenu';
import '../scss/style.scss';

const VerEspacio = () => {
  const { spaceName } = useParams();
  const [espacio, setEspacio] = useState(null);
  const [items, setItems] = useState([]);
  const [menuContextual, setMenuContextual] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacio = async () => {
      const espacioData = await obtenerEspacioPorNombre(spaceName);
      setEspacio(espacioData);
    };

    const fetchItems = async () => {
      const itemsData = await obtenerItemsPorNombre(spaceName);
      setItems(itemsData);
    };

    fetchEspacio();
    fetchItems();
  }, [spaceName]);

  const manejarClickDerecho = (e, item) => {
    e.preventDefault();
    setMenuContextual({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
      item,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  const manejarEditarItem = () => {
    navigate(`/editar-item/${spaceName}/${menuContextual.item.name}`);
    ocultarMenuContextual();
  };

  const manejarEliminarItem = async () => {
    await eliminarItem(menuContextual.item.id);
    setItems(items.filter(item => item.id !== menuContextual.item.id));
    ocultarMenuContextual();
  };

  return (
    <div className="ver-espacio-container">
      {espacio && (
        <>
          <h1 className="espacio-title">{espacio.name}</h1>
          <CButton color="primary" onClick={() => navigate(`/crear-item/${spaceName}`)} className="crear-item-button">
            Crear Item
          </CButton>
          <div className="row">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card item-card" onContextMenu={(e) => manejarClickDerecho(e, item)}>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">{item.quantity} unidades</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">No hay ítems en este espacio.</p>
            )}
          </div>
        </>
      )}
      {menuContextual && (
        <ContextMenu
          title="Editar Objeto"
          onEdit={manejarEditarItem}
          onClose={ocultarMenuContextual}
          onDelete={manejarEliminarItem}
          position={menuContextual}
        />
      )}
    </div>
  );
};

export default VerEspacio;