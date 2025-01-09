// quickventory-backend/config/firebaseAdmin.js

const admin = require('firebase-admin');
const serviceAccount = require('../path-to-your-serviceAccountKey.json');  // Asegúrate de poner la ruta correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'  // Cambia "your-project-id" por el id de tu proyecto en Firebase
});

const db = admin.firestore();
module.exports = db;
