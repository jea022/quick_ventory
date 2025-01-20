import React, { useState } from 'react';
import { CHeader, CHeaderNav, CNavItem, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import '../scss/_header.scss';

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <CHeader className="header">
      <CButton className="toggle-sidebar" onClick={toggleSidebar}>
        &#9776; {/* Icono de tres rayas */}
      </CButton>
      <CHeaderNav className="ml-auto">
        <CNavItem>
          <CDropdown inNav>
            <CDropdownToggle color="secondary" caret={false} onClick={toggleDropdown}>
              <img src="/path/to/profile-pic.jpg" alt="Perfil" className="profile-pic" />
            </CDropdownToggle>
            <CDropdownMenu placement="bottom-end" show={dropdownOpen}>
              <CDropdownItem href="#">Perfil</CDropdownItem>
              <CDropdownItem href="#">Configuración</CDropdownItem>
              <CDropdownItem href="#">Cerrar Sesión</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;