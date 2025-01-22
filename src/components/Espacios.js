import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacios, eliminarEspacio } from '../services/firestore';
import { CModal, CModalBody, CModalFooter } from '@coreui/react';
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
      x: event.clientX,
      y: event.clientY,
      espacio,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
  };

  const manejarEditarEspacio = (espacio) => {
    navigate(`/editar-espacio/${espacio.name}`, { state: { espacio } });
    ocultarMenuContextual();
  };

  const manejarEliminarEspacio = async (idEspacio) => {
    await eliminarEspacio(idEspacio);
    setEspacios(espacios.filter(espacio => espacio.id !== idEspacio));
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
        <CModal visible={menuContextual !== null} onDismiss={ocultarMenuContextual}>
          <CModalBody>
            <button className="btn btn-primary" onClick={() => manejarEditarEspacio(menuContextual.espacio)}>Editar</button>
            <button className="btn btn-danger" onClick={() => manejarEliminarEspacio(menuContextual.espacio.id)}>Eliminar</button>
          </CModalBody>
          <CModalFooter>
            <button className="btn btn-secondary" onClick={ocultarMenuContextual}>Cerrar</button>
          </CModalFooter>
        </CModal>
      )}
    </div>
  );
};

export default Espacios;