<<<<<<< HEAD
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Función para agregar un nuevo espacio
export const agregarEspacio = async (espacio) => {
  try {
    const docRef = await addDoc(collection(db, 'spaces'), espacio);
    console.log('Documento escrito con ID: ', docRef.id);
  } catch (e) {
    console.error('Error añadiendo documento: ', e);
  }
};

// Función para obtener todos los espacios
export const obtenerEspacios = async () => {
  const querySnapshot = await getDocs(collection(db, 'spaces'));
  const espacios = [];
  querySnapshot.forEach((doc) => {
    espacios.push({ id: doc.id, ...doc.data() });
  });
  return espacios;
};

// Función para actualizar un espacio
export const actualizarEspacio = async (id, espacioActualizado) => {
  try {
    const espacioRef = doc(db, 'spaces', id);
    await updateDoc(espacioRef, espacioActualizado);
    console.log('Documento actualizado con ID: ', id);
  } catch (e) {
    console.error('Error actualizando documento: ', e);
  }
};

// Función para eliminar un espacio
export const eliminarEspacio = async (id) => {
  try {
    await deleteDoc(doc(db, 'spaces', id));
    console.log('Documento eliminado con ID: ', id);
  } catch (e) {
    console.error('Error eliminando documento: ', e);
  }
=======
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
>>>>>>> ed5b7cc (Prueba)
};