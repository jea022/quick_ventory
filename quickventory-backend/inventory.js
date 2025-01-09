const express = require("express");
const db = require("../firestoreConfig"); // Importar Firestore
const router = express.Router();

// Crear espacio de inventario
router.post("/create-space", async (req, res) => {
  const { nombre, creadoPor } = req.body;
  try {
    const nuevoEspacio = await db.collection("espaciosInventario").add({ nombre, creadoPor });
    res.status(201).send({ id: nuevoEspacio.id, message: "Espacio creado" });
  } catch (error) {
    res.status(500).send({ error: "Error creando espacio" });
  }
});

module.exports = router;

