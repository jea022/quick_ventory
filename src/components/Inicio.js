import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerEspacios, obtenerObjetos } from '../services/firestore';
import { seedData } from '../utils/seedData';

const Inicio = () => {
  const [espacios, setEspacios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [espaciosData, objetosData] = await Promise.all([
        obtenerEspacios(),
        obtenerObjetos()
      ]);
      setEspacios(espaciosData);
      setObjetos(objetosData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      await seedData();
      await fetchData();
      alert('¡Datos de prueba creados exitosamente!');
    } catch (error) {
      console.error('Error al crear datos:', error);
      alert('Error al crear datos de prueba');
    } finally {
      setSeeding(false);
    }
  };

  const manejarBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);
    if (query.length > 0) {
      const resultadosFiltrados = objetos.filter(objeto =>
        objeto.name.toLowerCase().includes(query.toLowerCase())
      );
      setResultados(resultadosFiltrados);
    } else {
      setResultados([]);
    }
  };

  const stats = [
    { label: 'Espacios', value: espacios.length, icon: '📦', color: 'from-purple-500 to-pink-500' },
    { label: 'Objetos', value: objetos.length, icon: '📋', color: 'from-blue-500 to-cyan-500' },
    { label: 'Activos', value: objetos.filter(o => o.quantity > 0).length, icon: '✅', color: 'from-green-500 to-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Gestiona tu inventario de forma sencilla</p>
        </div>
        <div className="flex gap-3">
          {espacios.length === 0 && (
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-50"
            >
              {seeding ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <span>🌱</span>
                  <span>Cargar Datos Demo</span>
                </>
              )}
            </button>
          )}
          <Link
            to="/crear-espacio"
            className="inline-flex items-center gap-2 gradient-purple px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Espacio
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Section */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔍</span> Buscar Objetos
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en tu inventario..."
              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={busqueda}
              onChange={manejarBusqueda}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Results */}
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {resultados.length > 0 ? (
              resultados.map((objeto, index) => (
                <Link
                  key={index}
                  to={`/espacio/${objeto.space}`}
                  className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{objeto.name}</h3>
                      <p className="text-sm text-gray-400">📍 {objeto.space}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {objeto.quantity} unidades
                    </span>
                  </div>
                </Link>
              ))
            ) : busqueda.length > 0 ? (
              <p className="text-gray-400 text-center py-4">No se encontraron resultados</p>
            ) : (
              <p className="text-gray-400 text-center py-4">Escribe para buscar objetos</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Acciones Rápidas
          </h2>
          <div className="space-y-3">
            <Link
              to="/espacios"
              className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium text-white">Ver Espacios</p>
                <p className="text-sm text-gray-400">Gestiona tus espacios</p>
              </div>
            </Link>
            <Link
              to="/buscar"
              className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-medium text-white">Búsqueda Avanzada</p>
                <p className="text-sm text-gray-400">Filtros detallados</p>
              </div>
            </Link>
            <Link
              to="/informe"
              className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-medium text-white">Generar Informe</p>
                <p className="text-sm text-gray-400">Revisa tu inventario</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Spaces */}
      {espacios.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span>📦</span> Espacios Recientes
            </h2>
            <Link to="/espacios" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {espacios.slice(0, 4).map((espacio, index) => (
              <Link
                key={index}
                to={`/espacio/${espacio.name}`}
                className="glass-card rounded-xl p-5 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  📦
                </div>
                <h3 className="font-semibold text-white truncate">{espacio.name}</h3>
                <p className="text-sm text-gray-400 mt-1">Espacio de inventario</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;