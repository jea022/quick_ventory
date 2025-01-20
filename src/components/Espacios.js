// filepath: /c:/Users/aguin/Escritorio/GradoDam2/quick_ventory/src/components/Espacios.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEspacioPorNombre, agregarObjetoAEspacio, eliminarObjetoDeEspacio, actualizarObjetoEnEspacio } from '../services/firestore';
import { CContainer, CRow, CCol, CFormInput, CButton, CCard, CCardBody, CCardTitle, CCardText, CModal, CModalBody, CModalFooter } from '@coreui/react';
import '../scss/_espacios.scss';

const Espacios = () => {
  const [espacio, setEspacio] = useState(null);
  const [nuevoObjeto, setNuevoObjeto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [menuContextual, setMenuContextual] = useState(null);
  const [objetoSeleccionado, setObjetoSeleccionado] = useState(null);
  const [nuevoNombreObjeto, setNuevoNombreObjeto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspacio = async () => {
      const espacio = await obtenerEspacioPorNombre('nombreEspacio'); // Cambia 'nombreEspacio' por el nombre real del espacio
      setEspacio(espacio);
    };
    fetchEspacio();
  }, []);

  const manejarAgregarObjeto = async () => {
    if (nuevoObjeto.trim() !== '') {
      await agregarObjetoAEspacio('nombreEspacio', nuevoObjeto); // Cambia 'nombreEspacio' por el nombre real del espacio
      setNuevoObjeto('');
      const espacioActualizado = await obtenerEspacioPorNombre('nombreEspacio'); // Cambia 'nombreEspacio' por el nombre real del espacio
      setEspacio(espacioActualizado);
    }
  };

  const manejarEliminarObjeto = async (nombreObjeto) => {
    await eliminarObjetoDeEspacio('nombreEspacio', nombreObjeto); // Cambia 'nombreEspacio' por el nombre real del espacio
    const espacioActualizado = await obtenerEspacioPorNombre('nombreEspacio'); // Cambia 'nombreEspacio' por el nombre real del espacio
    setEspacio(espacioActualizado);
    ocultarMenuContextual();
  };

  const manejarEditarObjeto = async () => {
    if (nuevoNombreObjeto.trim() !== '') {
      await actualizarObjetoEnEspacio('nombreEspacio', objetoSeleccionado, nuevoNombreObjeto); // Cambia 'nombreEspacio' por el nombre real del espacio
      const espacioActualizado = await obtenerEspacioPorNombre('nombreEspacio'); // Cambia 'nombreEspacio' por el nombre real del espacio
      setEspacio(espacioActualizado);
      setNuevoNombreObjeto('');
      ocultarMenuContextual();
    }
  };

  const mostrarMenuContextual = (event, objeto) => {
    event.preventDefault();
    setObjetoSeleccionado(objeto);
    setMenuContextual({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const ocultarMenuContextual = () => {
    setMenuContextual(null);
    setObjetoSeleccionado(null);
  };

  const objetosFiltrados = espacio?.items?.filter(item => item.name.toLowerCase().includes(busqueda.toLowerCase())) || [];

  if (!espacio) {
    return <p>Cargando...</p>;
  }

  return (
    <CContainer className="espacios-page">
      <h1 className="section-title">{espacio.name}</h1>
      <CRow>
        <CCol>
          <h2>Objetos</h2>
          <CFormInput
            type="text"
            placeholder="Buscar objeto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {objetosFiltrados.length > 0 ? (
            objetosFiltrados.map((item, index) => (
              <CCard key={index} onContextMenu={(e) => mostrarMenuContextual(e, item.name)}>
                <CCardBody>
                  <CCardTitle>{item.name}</CCardTitle>
                </CCardBody>
              </CCard>
            ))
          ) : (
            <p>No hay objetos en este espacio.</p>
          )}
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <h2>Agregar Nuevo Objeto</h2>
          <CFormInput
            type="text"
            placeholder="Nombre del objeto"
            value={nuevoObjeto}
            onChange={(e) => setNuevoObjeto(e.target.value)}
          />
          <CButton color="success" onClick={manejarAgregarObjeto}>Agregar Objeto</CButton>
        </CCol>
      </CRow>
      <CButton color="secondary" onClick={() => navigate(-1)}>Volver</CButton>

      {menuContextual && (
        <CModal visible={menuContextual !== null} onDismiss={ocultarMenuContextual}>
          <CModalBody>
            <CFormInput
              type="text"
              placeholder="Nuevo nombre del objeto"
              value={nuevoNombreObjeto}
              onChange={(e) => setNuevoNombreObjeto(e.target.value)}
            />
            <CButton color="primary" onClick={manejarEditarObjeto}>Editar</CButton>
            <CButton color="danger" onClick={() => manejarEliminarObjeto(objetoSeleccionado)}>Eliminar</CButton>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={ocultarMenuContextual}>Cerrar</CButton>
          </CModalFooter>
        </CModal>
      )}
    </CContainer>
  );
};

export default Espacios;