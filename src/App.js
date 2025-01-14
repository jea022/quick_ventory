import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Inicio from './components/Inicio';
import SearchItem from './components/SearchItems';
import CrearEspacio from './components/CrearEspacio';
import Espacio from './components/Espacio';
import CrearItem from './components/CrearItem';
import EditarItem from './components/EditarItem';
import EditarEspacio from './components/EditarEspacio';
import Buscar from './components/Buscar';
import Ajustes from './components/Ajustes';
import CerrarSesion from './components/CerrarSesion';
import CambiarContraseña from './components/CambiarContraseña';
import Informacion from './components/Informacion';
import CambiarUsuario from './components/CambiarUsuario';
import Wisr from './components/Wisr';
import EditarInformacion from './components/EditarInformacion';
import Navbar from './components/Navbar'; // Importa el nuevo Navbar
import './styles.css';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Usa el Navbar en lugar del Footer */}
      <div className="app">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searchItem" element={<SearchItem />} />
          <Route path="/crear-espacio" element={<CrearEspacio />} />
          <Route path="/espacio/:spaceName" element={<Espacio />} />
          <Route path="/crear-item/:spaceName" element={<CrearItem />} />
          <Route path="/editar-item/:spaceName/:itemName" element={<EditarItem />} />
          <Route path="/editar-espacio/:spaceName" element={<EditarEspacio />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/cerrar-sesion" element={<CerrarSesion />} />
          <Route path="/wisr" element={<Wisr />} />
          <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
          <Route path="/editar-informacion" element={<EditarInformacion />} />
          <Route path="/cambiar-usuario" element={<CambiarUsuario />} />
        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;