import React from 'react';
import { CSidebar, CSidebarNav, CNavItem, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../scss/_sidebar.scss';

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      toggleSidebar();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // No mostrar sidebar si no está autenticado
  if (!isAuthenticated) {
    return null;
  }

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
          <CButton color="link" onClick={handleLogout}>
            Cerrar sesión
          </CButton>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;