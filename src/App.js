import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout';
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
import Login from './components/Login';
import VerEspacio from './components/VerEspacio';
import Informe from './components/Informe';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas sin layout */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Rutas privadas con layout */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/espacio/:spaceName" element={<VerEspacio />} />
            <Route path="/wisr" element={<Wisr />} />
            <Route path="/crear-espacio" element={<CrearEspacio />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />
            <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
            <Route path="/search-widget" element={<SearchWidget />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/editar-item" element={<EditarItem />} />
            <Route path="/editar-informacion" element={<EditarInformacion />} />
            <Route path="/editar-espacio/:spaceId" element={<EditarEspacio />} />
            <Route path="/crear-item/:spaceName" element={<CrearItem />} />
            <Route path="/editar-item/:spaceName/:itemName" element={<EditarItem />} />
            <Route path="/informe" element={<Informe />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;