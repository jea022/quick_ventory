import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerItemPorNombre, actualizarItem } from '../services/firestore';
import Forms from './Forms';
import '../scss/style.scss';

const EditarItem = () => {
  const { spaceName, itemName } = useParams();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [menuContextual, setMenuContextual] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await obtenerItemPorNombre(spaceName, itemName);
        if (itemData) {
          setId(itemData.id);
          setName(itemData.name || '');
          setUnit(itemData.unit || '');
          setDescription(itemData.description || '');
        }
      } catch (error) {
        console.error('Error al obtener el ítem:', error);
      }
    };

    fetchItem();
  }, [spaceName, itemName]);

  const manejarGuardar = async () => {
    if (!name) {
      alert('El nombre es obligatorio');
      return;
    }

    const itemActualizado = { 
      name, 
      unit: unit || '', 
      description: description || '', 
    };

    try {
      console.log('Actualizando ítem con id:', id);
      console.log('Datos del ítem actualizado:', itemActualizado);
      await actualizarItem(id, itemActualizado);
      alert('Ítem actualizado');
      navigate(`/espacio/${spaceName}`); // Redirige a la vista del espacio después de actualizar el ítem
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
      alert('Hubo un error al actualizar el ítem. Por favor, inténtalo de nuevo.');
    }
  };

  const manejarClickDerecho = (e) => {
    e.preventDefault();
    setMenuContextual({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  const campos = [
    { type: 'text', placeholder: 'Nombre', value: name, onChange: setName, required: true },
    { type: 'text', placeholder: 'Unidad', value: unit, onChange: setUnit },
    { type: 'text', placeholder: 'Descripción', value: description, onChange: setDescription },
  ];

  return (
    <div onContextMenu={manejarClickDerecho} style={{ position: 'relative' }}>
      <Forms
        titulo="Editar Item"
        campos={campos}
        manejarGuardar={manejarGuardar}
        botonTexto="Guardar"
      />
      {menuContextual && (
        <div
          className="context-menu"
          style={{
            top: menuContextual.mouseY,
            left: menuContextual.mouseX,
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            borderRadius: '4px'
          }}
        >
          <button className="btn btn-primary" onClick={manejarGuardar}>Guardar</button>
          <button className="btn btn-secondary" onClick={ocultarMenuContextual}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default EditarItem;