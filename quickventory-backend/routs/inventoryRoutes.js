// quickventory-backend/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem, createSpace } = require('../controllers/inventoryController');

// Rutas CRUD para ítems
router.get('/items', getItems);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

// Ruta para crear espacios
router.post('/spaces', createSpace);

module.exports = router;
