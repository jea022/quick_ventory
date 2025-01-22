import React from 'react';
import { CSidebar, CSidebarNav, CNavItem, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import '../scss/_sidebar.scss';

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Esconder el sidebar después de la navegación
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
    navigate('/login'); // Redirige al login
  };

  return (
    <CSidebar className={`sidebar ${isVisible ? 'visible' : ''}`} unfoldable>
      <div className="sidebar-header">QuickVentory</div>
      <CSidebarNav className="sidebar-nav">
        <CNavItem className="nav-item">
          <CButton color="link" onClick={() => handleNavigation('/')}>
            Inicio
          </CButton>
        </CNavItem>
        <CNavItem className="nav-item">
          <CButton color="link" onClick={() => handleNavigation('/buscar')}>
            Buscar
          </CButton>
        </CNavItem>
        <CNavItem className="nav-item">
          <CButton color="link" onClick={() => handleNavigation('/espacios')}>
            Espacios
          </CButton>
        </CNavItem>
        <CNavItem className="nav-item">
          <CButton color="link" onClick={() => handleNavigation('/wisr')}>
            Wisr
          </CButton>
        </CNavItem>
        <CNavItem className="nav-item">
          <CButton color="link" onClick={() => handleNavigation('/cerrar-sesion')}>
            Cerrar sesión
          </CButton>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;