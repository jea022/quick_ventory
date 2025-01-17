import React from 'react';
import { CHeader, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

const Header = () => {
  return (
    <CHeader>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            Perfil del Usuario
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;