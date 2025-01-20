import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// Obtener todos los espacios
export const obtenerEspacios = async () => {
  const espaciosSnapshot = await getDocs(collection(db, 'espacios'));
  const espaciosList = espaciosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return espaciosList;
};

// Agregar un nuevo espacio
export const agregarEspacio = async (espacio) => {
  await addDoc(collection(db, 'espacios'), espacio);
};

// Actualizar un espacio existente
export const actualizarEspacio = async (id, espacio) => {
  const espacioRef = doc(db, 'espacios', id);
  await updateDoc(espacioRef, espacio);
};

// Eliminar un espacio
export const eliminarEspacio = async (id) => {
  const espacioRef = doc(db, 'espacios', id);
  await deleteDoc(espacioRef);
};

// Obtener items por nombre
export const obtenerItemsPorNombre = async (nombre) => {
  const q = query(collection(db, 'items'), where('nombre', '>=', nombre));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};