import { db, auth } from '../firebase';
import { collection, getDocs, query, where, orderBy, limit, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Helper para obtener el UID del usuario actual
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');
  return user.uid;
};

// Obtener todos los espacios del usuario actual
export const obtenerEspacios = async () => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'espacios'), where('userId', '==', userId));
  const espaciosSnapshot = await getDocs(q);
  const espaciosList = espaciosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return espaciosList;
};

// Obtener espacio por nombre
export const obtenerEspacioPorNombre = async (nombreEspacio) => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const espacio = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  return espacio ? { id: espacio.id, ...espacio.data() } : null;
};

// Agregar un nuevo espacio
export const agregarEspacio = async (espacio) => {
  const userId = getCurrentUserId();
  await addDoc(collection(db, 'espacios'), { ...espacio, userId });
};

// Actualizar un espacio existente
export const actualizarEspacio = async (id, espacio) => {
  const espacioRef = doc(db, 'espacios', id);
  await updateDoc(espacioRef, espacio);
};

// Eliminar un espacio
export const eliminarEspacio = async (idEspacio) => {
  await deleteDoc(doc(db, 'espacios', idEspacio));
};

// Obtener items por nombre de espacio
export const obtenerItemsPorNombre = async (nombreEspacio) => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'items'), where('space', '==', nombreEspacio), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener item por nombre
export const obtenerItemPorNombre = async (spaceName, itemName) => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'items'), where('space', '==', spaceName), where('name', '==', itemName), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const item = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  return item ? { id: item.id, ...item.data() } : null;
};


// Agregar un nuevo item
export const agregarItem = async (item) => {
  const userId = getCurrentUserId();
  await addDoc(collection(db, 'items'), { ...item, userId });
};

// Actualizar un item existente
export const actualizarItem = async (id, item) => {
  try {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, item);
  } catch (error) {
    console.error('Error al actualizar el ítem en Firestore:', error);
    throw error;
  }
};

// Eliminar un item
export const eliminarItem = async (idItem) => {
  await deleteDoc(doc(db, 'items', idItem));
};

// Obtener los últimos espacios accedidos
export const obtenerUltimosEspaciosAccedidos = async () => {
  const userId = getCurrentUserId();
  const espaciosRef = collection(db, 'espacios');
  const q = query(espaciosRef, where('userId', '==', userId), orderBy('lastAccessed', 'desc'), limit(3));
  const querySnapshot = await getDocs(q);
  const espacios = [];
  querySnapshot.forEach((doc) => {
    espacios.push({ id: doc.id, ...doc.data() });
  });
  return espacios;
};

// Eliminar un objeto de un espacio
export const eliminarObjetoDeEspacio = async (nombreEspacio, nombreObjeto) => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const espacioDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  if (espacioDoc) {
    const espacioRef = doc(db, 'espacios', espacioDoc.id);
    const espacioData = espacioDoc.data();
    const nuevosItems = espacioData.items.filter(item => item.name !== nombreObjeto);
    await updateDoc(espacioRef, { items: nuevosItems });
  }
};

// Actualizar un objeto en un espacio
export const actualizarObjetoEnEspacio = async (nombreEspacio, nombreObjeto, nuevoNombreObjeto) => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const espacioDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  if (espacioDoc) {
    const espacioRef = doc(db, 'espacios', espacioDoc.id);
    const espacioData = espacioDoc.data();
    const nuevosItems = espacioData.items.map(item => item.name === nombreObjeto ? { name: nuevoNombreObjeto } : item);
    await updateDoc(espacioRef, { items: nuevosItems });
  }
};

// Obtener todos los objetos del usuario actual
export const obtenerObjetos = async () => {
  const userId = getCurrentUserId();
  const q = query(collection(db, 'items'), where('userId', '==', userId));
  const objetosSnapshot = await getDocs(q);
  const objetosList = objetosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return objetosList;
};