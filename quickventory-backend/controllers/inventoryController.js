// quickventory-backend/controllers/inventoryController.js

const db = require('../config/firebaseAdmin');

// Obtener todos los ítems
exports.getItems = async (req, res) => {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ítems', error });
  }
};

// Crear nuevo ítem
exports.createItem = async (req, res) => {
  try {
    const newItem = req.body;
    await db.collection('items').add(newItem);
    res.status(201).json({ message: 'Ítem creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ítem', error });
  }
};

// Actualizar ítem
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    await db.collection('items').doc(id).update(updatedItem);
    res.status(200).json({ message: 'Ítem actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ítem', error });
  }
};

// Eliminar ítem
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('items').doc(id).delete();
    res.status(200).json({ message: 'Ítem eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ítem', error });
  }
};

// Crear un nuevo espacio
exports.createSpace = async (req, res) => {
  try {
    const newSpace = req.body;
    await db.collection('spaces').add(newSpace);
    res.status(201).json({ message: 'Espacio creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear espacio', error });
  }
};
