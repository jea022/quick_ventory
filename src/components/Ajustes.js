import React from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../styles.css';

const Ajustes = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const manejarCerrarSesion = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const manejarCambiarContrasena = () => {
    navigate('/cambiar-contrasena');
  };

  return (
    <Box className="ajustes-container">
      <Typography variant="h4" className="ajustes-title">Ajustes</Typography>
      <Box className="ajustes-content">
        <Box className="ajustes-item">
          <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 80, height: 80, marginBottom: 2 }} />
          <Typography variant="h6">{user?.displayName}</Typography>
          <Typography variant="body1">{user?.email}</Typography>
        </Box>
        <Box className="ajustes-item">
          <Button variant="contained" color="primary" onClick={manejarCambiarContrasena}>
            Cambiar Contraseña
          </Button>
        </Box>
        <Box className="ajustes-item">
          <Button variant="contained" color="secondary" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Ajustes;