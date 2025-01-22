import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerEspacioPorNombre, obtenerItemsPorNombre } from '../services/firestore';
import { CButton, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import '../scss/style.scss';

const VerEspacio = () => {
  const { spaceName } = useParams();
  const [espacio, setEspacio] = useState(null);
  const [items, setItems] = useState([]);
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

  const manejarCrearItem = () => {
    navigate(`/crear-item/${spaceName}`);
  };

  return (
    <div className="ver-espacio-container">
      {espacio && (
        <>
          <h1 className="espacio-title">{espacio.name}</h1>
          <CButton color="primary" onClick={manejarCrearItem} className="crear-item-button">
            Crear Item
          </CButton>
          <div className="items-list">
            {items.length > 0 ? (
              items.map((item, index) => (
                <CCard key={index} className="item-card">
                  <CCardBody>
                    <CCardTitle>{item.name}</CCardTitle>
                    <CCardText>{item.description}</CCardText>
                  </CCardBody>
                </CCard>
              ))
            ) : (
              <p>No hay ítems en este espacio.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VerEspacio;