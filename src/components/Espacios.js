import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios, eliminarEspacio } from '../services/firestore';
import ContextMenu from './ContextMenu';
import '../scss/_espacios.scss';

const Espacios = () => {
  const [espacios, setEspacios] = useState([]);
  const [menuContextual, setMenuContextual] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacios = async () => {
      const espacios = await obtenerEspacios();
      setEspacios(espacios);
    };
    fetchEspacios();
  }, []);

  const manejarClickEspacio = (nombreEspacio) => {
    navigate(`/espacio/${nombreEspacio}`);
  };

  const manejarCrearEspacio = () => {
    navigate('/crear-espacio');
  };

  const mostrarMenuContextual = (event, espacio) => {
    event.preventDefault();
    setMenuContextual({
      mouseX: event.clientX,
      mouseY: event.clientY,
      espacio,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  const manejarEditarEspacio = () => {
    navigate(`/editar-espacio/${menuContextual.espacio.name}`, { state: { espacio: menuContextual.espacio } });
    ocultarMenuContextual();
  };

  const manejarEliminarEspacio = async () => {
    await eliminarEspacio(menuContextual.espacio.id);
    setEspacios(espacios.filter(espacio => espacio.id !== menuContextual.espacio.id));
    ocultarMenuContextual();
  };

  return (
    <div className="espacios-page">
      <h1 className="section-title">Creador de Espacios</h1>
      <button className="btn btn-primary" onClick={manejarCrearEspacio}>Crear Nuevo Espacio</button>
      <h2 className="section-title mt-4">Espacios</h2>
      <div className="row">
        {espacios.length > 0 ? (
          espacios.map((espacio, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" onContextMenu={(e) => mostrarMenuContextual(e, espacio)}>
                <div className="card-body" onClick={() => manejarClickEspacio(espacio.name)}>
                  <h5 className="card-title">{espacio.name}</h5>
                  <p className="card-text">{espacio.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-espacios">No hay espacios creados.</p>
        )}
      </div>

      {menuContextual && (
        <ContextMenu
          title="Editar Espacio"
          onEdit={manejarEditarEspacio}
          onClose={ocultarMenuContextual}
          onDelete={manejarEliminarEspacio}
          position={menuContextual}
        />
      )}
    </div>
  );
};

export default Espacios;