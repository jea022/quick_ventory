// quickventory-backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, recoverPassword, addUserToSpace } = require('../controllers/userController');

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/recover-password', recoverPassword);
router.post('/assign-space', addUserToSpace);

module.exports = router;
