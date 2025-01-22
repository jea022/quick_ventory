import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

// Obtener todos los espacios
export const obtenerEspacios = async () => {
  const espaciosSnapshot = await getDocs(collection(db, 'espacios'));
  const espaciosList = espaciosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return espaciosList;
};

export const obtenerEspacioPorNombre = async (nombreEspacio) => {
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio));
  const querySnapshot = await getDocs(q);
  const espacio = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  return espacio ? { id: espacio.id, ...espacio.data() } : null;
};

// Agregar un nuevo espacio
export const agregarEspacio = async (espacio) => {
  await addDoc(collection(db, 'espacios'), espacio);
};

export const agregarObjetoAEspacio = async (nombreEspacio, nombreObjeto) => {
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio));
  const querySnapshot = await getDocs(q);
  const espacioDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  if (espacioDoc) {
    const espacioRef = doc(db, 'espacios', espacioDoc.id);
    const espacioData = espacioDoc.data();
    const nuevosItems = espacioData.items ? [...espacioData.items, { name: nombreObjeto }] : [{ name: nombreObjeto }];
    await updateDoc(espacioRef, { items: nuevosItems });
  }
};

export const eliminarObjetoDeEspacio = async (nombreEspacio, nombreObjeto) => {
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio));
  const querySnapshot = await getDocs(q);
  const espacioDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  if (espacioDoc) {
    const espacioRef = doc(db, 'espacios', espacioDoc.id);
    const espacioData = espacioDoc.data();
    const nuevosItems = espacioData.items.filter(item => item.name !== nombreObjeto);
    await updateDoc(espacioRef, { items: nuevosItems });
  }
};

export const actualizarObjetoEnEspacio = async (nombreEspacio, nombreObjeto, nuevoNombreObjeto) => {
  const q = query(collection(db, 'espacios'), where('name', '==', nombreEspacio));
  const querySnapshot = await getDocs(q);
  const espacioDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[0] : null;
  if (espacioDoc) {
    const espacioRef = doc(db, 'espacios', espacioDoc.id);
    const espacioData = espacioDoc.data();
    const nuevosItems = espacioData.items.map(item => item.name === nombreObjeto ? { name: nuevoNombreObjeto } : item);
    await updateDoc(espacioRef, { items: nuevosItems });
  }
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

// Obtener items por nombre
export const obtenerItemsPorNombre = async (nombreEspacio) => {
  const q = query(collection(db, 'items'), where('space', '==', nombreEspacio));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const obtenerObjetos = async () => {
  const objetosCollection = collection(db, 'objetos');
  const objetosSnapshot = await getDocs(objetosCollection);
  const objetosList = objetosSnapshot.docs.map(doc => doc.data());
  return objetosList;
};

export const obtenerUltimosEspaciosAccedidos = async () => {
  const espaciosRef = collection(db, 'espacios');
  const q = query(espaciosRef, orderBy('lastAccessed', 'desc'), limit(3));
  const querySnapshot = await getDocs(q);
  const espacios = [];
  querySnapshot.forEach((doc) => {
    espacios.push({ id: doc.id, ...doc.data() });
  });
  return espacios;
};
