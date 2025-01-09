// quickventory-backend/controllers/userController.js

const db = require('../config/firebaseAdmin');

// Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const newUser = req.body;
    await db.collection('users').add(newUser);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  // Aquí irá la lógica de autenticación con Firebase
};

// Recuperar contraseña
exports.recoverPassword = async (req, res) => {
  // Lógica para recuperación de contraseña
};

// Agregar usuario a un espacio
exports.addUserToSpace = async (req, res) => {
  // Lógica para asignar un usuario a un espacio
};
