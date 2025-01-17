import React from 'react';
import { CSidebar, CSidebarNav, CNavItem, CNavLink } from '@coreui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <CSidebar unfoldable>
      <CSidebarNav>
        <CNavItem>
          <CNavLink component={Link} to="/inicio">
            Inicio
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink component={Link} to="/buscar">
            Buscar
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink component={Link} to="/espacios">
            Espacios
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink component={Link} to="/wisr">
            Wisr
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink component={Link} to="/perfil-usuario">
            Perfil del Usuario
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;