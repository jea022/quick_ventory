import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../styles.css';

const Navbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/buscar');
        break;
      case 2:
        navigate('/notificaciones');
        break;
      case 3:
        navigate('/ajustes');
        break;
      case 4:
        navigate('/cerrar-sesion');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleNavigationChange}
      className="navbar"
    >
      <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
      <BottomNavigationAction label="Buscar" icon={<SearchIcon />} />
      <BottomNavigationAction label="Notificaciones" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="Ajustes" icon={<SettingsIcon />} />
      <BottomNavigationAction label="Cerrar Sesión" icon={<ExitToAppIcon />} />
    </BottomNavigation>
  );
};

export default Navbar;