import React from 'react';
<<<<<<< HEAD
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
=======
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
>>>>>>> ed5b7cc (Prueba)
    </Router>
  );
}

<<<<<<< HEAD
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
=======
export default App;
>>>>>>> ed5b7cc (Prueba)
