// Script para crear datos de prueba
// Ejecutar desde la consola del navegador mientras estés autenticado

import { agregarEspacio, agregarItem } from '../services/firestore';

export const seedData = async () => {
  console.log('🌱 Iniciando seed de datos...');

  // Crear espacios
  const espacios = [
    { name: 'Tecnología', location: 'Piso 1', description: 'Equipos tecnológicos y electrónicos' },
    { name: 'Herramientas', location: 'Piso 2', description: 'Herramientas de trabajo y mantenimiento' },
    { name: 'Materiales', location: 'Piso 3', description: 'Materiales de construcción y suministros' },
  ];

  // Items por espacio
  const itemsTecnologia = [
    { name: 'Laptop Dell XPS 15', description: 'Laptop para desarrollo', quantity: 5 },
    { name: 'Monitor LG 27"', description: 'Monitor 4K para diseño', quantity: 10 },
    { name: 'Teclado Mecánico', description: 'Teclado gaming RGB', quantity: 15 },
    { name: 'Mouse Logitech MX', description: 'Mouse ergonómico', quantity: 12 },
    { name: 'Webcam HD 1080p', description: 'Cámara para videollamadas', quantity: 8 },
    { name: 'Auriculares Sony', description: 'Auriculares con cancelación de ruido', quantity: 6 },
    { name: 'Tablet iPad Pro', description: 'Tablet para presentaciones', quantity: 4 },
    { name: 'Cargador USB-C', description: 'Cargador rápido 65W', quantity: 20 },
    { name: 'Cable HDMI 2m', description: 'Cable HDMI 4K', quantity: 25 },
    { name: 'Hub USB 7 puertos', description: 'Hub USB 3.0', quantity: 10 },
  ];

  const itemsHerramientas = [
    { name: 'Taladro Bosch', description: 'Taladro percutor 750W', quantity: 3 },
    { name: 'Destornillador Set', description: 'Set de 20 destornilladores', quantity: 5 },
    { name: 'Martillo', description: 'Martillo de carpintero 500g', quantity: 8 },
    { name: 'Sierra Circular', description: 'Sierra circular 1200W', quantity: 2 },
    { name: 'Llave Inglesa', description: 'Llave ajustable 12"', quantity: 6 },
    { name: 'Alicates', description: 'Set de alicates profesionales', quantity: 10 },
    { name: 'Cinta Métrica 5m', description: 'Cinta métrica con freno', quantity: 15 },
    { name: 'Nivel Láser', description: 'Nivel láser autonivelante', quantity: 4 },
    { name: 'Escalera Aluminio', description: 'Escalera plegable 2m', quantity: 3 },
    { name: 'Caja Herramientas', description: 'Caja organizadora grande', quantity: 7 },
  ];

  const itemsMateriales = [
    { name: 'Cemento 50kg', description: 'Cemento Portland gris', quantity: 50 },
    { name: 'Arena Fina', description: 'Saco de arena 25kg', quantity: 30 },
    { name: 'Ladrillos', description: 'Ladrillos rojos estándar', quantity: 500 },
    { name: 'Varillas Acero', description: 'Varillas corrugadas 1/2"', quantity: 100 },
    { name: 'Pintura Blanca', description: 'Galón pintura látex', quantity: 20 },
    { name: 'Cables Eléctricos', description: 'Rollo cable 2.5mm 100m', quantity: 15 },
    { name: 'Tubería PVC', description: 'Tubo PVC 4" x 3m', quantity: 40 },
    { name: 'Tornillos Mixtos', description: 'Caja tornillos 500 unidades', quantity: 25 },
    { name: 'Clavos 2"', description: 'Caja clavos 1kg', quantity: 30 },
    { name: 'Silicona', description: 'Tubo silicona transparente', quantity: 50 },
  ];

  try {
    // Crear espacios
    for (const espacio of espacios) {
      await agregarEspacio(espacio);
      console.log(`✅ Espacio creado: ${espacio.name}`);
    }

    // Crear items de Tecnología
    for (const item of itemsTecnologia) {
      await agregarItem({ ...item, space: 'Tecnología', createdAt: new Date() });
    }
    console.log('✅ 10 items creados en Tecnología');

    // Crear items de Herramientas
    for (const item of itemsHerramientas) {
      await agregarItem({ ...item, space: 'Herramientas', createdAt: new Date() });
    }
    console.log('✅ 10 items creados en Herramientas');

    // Crear items de Materiales
    for (const item of itemsMateriales) {
      await agregarItem({ ...item, space: 'Materiales', createdAt: new Date() });
    }
    console.log('✅ 10 items creados en Materiales');

    console.log('🎉 ¡Seed completado! 3 espacios y 30 items creados.');
    return true;
  } catch (error) {
    console.error('❌ Error en seed:', error);
    return false;
  }
};
