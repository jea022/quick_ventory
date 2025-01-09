const express = require("express");
const db = require("../firestoreConfig"); // Importar Firestore
const router = express.Router();

// Registrar usuario
router.post("/register", async (req, res) => {
  const { email, nombre, rol } = req.body;
  try {
    const nuevoUsuario = await db.collection("usuarios").add({ email, nombre, rol });
    res.status(201).send({ id: nuevoUsuario.id, message: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ error: "Error registrando usuario" });
  }
});

module.exports = router;

