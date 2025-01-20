import React, { useState } from 'react';
import { 
  CHeader, 
  CHeaderNav, 
  CNavItem, 
  CButton, 
  CDropdown, 
  CDropdownToggle, 
  CDropdownMenu, 
  CDropdownItem 
} from '@coreui/react';
import { useLocation } from 'react-router-dom';
import '../scss/_header.scss';

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Ocultar el header en las páginas de login y registro
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <CHeader className="header">
      <CButton className="toggle-sidebar" onClick={toggleSidebar}>
        &#9776; {/* Icono de tres rayas */}
      </CButton>
      <CHeaderNav className="ml-auto">
        <CNavItem>
          <CDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <CDropdownToggle className="user-menu-button">
              Usuario
            </CDropdownToggle>
            <CDropdownMenu className="dropdown-menu">
              <CDropdownItem className="dropdown-item">Perfil</CDropdownItem>
              <CDropdownItem className="dropdown-item">Configuración</CDropdownItem>
              <CDropdownItem className="dropdown-item">Cerrar sesión</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;