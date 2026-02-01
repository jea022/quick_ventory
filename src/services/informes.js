import { db, auth } from '../firebase';
import { collection, getDocs, query, where, orderBy, limit, addDoc } from 'firebase/firestore';

// Helper para obtener el UID del usuario actual
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');
  return user.uid;
};

// Guardar un nuevo informe
export const guardarInforme = async (informe) => {
  const userId = getCurrentUserId();
  await addDoc(collection(db, 'informes'), { ...informe, userId });
};

// Obtener el último informe del usuario
export const obtenerUltimoInforme = async () => {
  try {
    const userId = getCurrentUserId();
    const q = query(
      collection(db, 'informes'),
      where('userId', '==', userId),
      orderBy('fecha', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.log('No hay informes anteriores o índice no creado:', error.message);
    return null;
  }
};

// Obtener todos los informes del usuario
export const obtenerInformes = async () => {
  const userId = getCurrentUserId();
  const q = query(
    collection(db, 'informes'),
    where('userId', '==', userId),
    orderBy('fecha', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
