import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import './scss/style.scss';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Buscar from './components/Buscar';
import Espacios from './components/Espacios';
import Wisr from './components/Wisr';
import CrearEspacio from './components/CrearEspacio';
import CerrarSesion from './components/CerrarSesion';
import CambiarContraseña from './components/CambiarContraseña';
import SearchWidget from './components/SearchWidget';
import Register from './components/Register';
import Informacion from './components/Informacion';
import EditarItem from './components/EditarItem';
import EditarInformacion from './components/EditarInformacion';
import EditarEspacio from './components/EditarEspacio';
import CrearItem from './components/CrearItem';
import PerfilUsuario from './components/PerfilUsuario';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <CContainer>
          <Header />
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/wisr" element={<Wisr />} />
            <Route path="/crear-espacio" element={<CrearEspacio />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />
            <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
            <Route path="/search-widget" element={<SearchWidget />} />
            <Route path="/register" element={<Register />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/editar-item" element={<EditarItem />} />
            <Route path="/editar-informacion" element={<EditarInformacion />} />
            <Route path="/editar-espacio" element={<EditarEspacio />} />
            <Route path="/crear-item" element={<CrearItem />} />
            <Route path="/perfil-usuario" element={<PerfilUsuario />} />
          </Routes>
        </CContainer>
      </div>
    </Router>
  );
}

export default App;