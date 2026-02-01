import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerObjetos } from '../services/firestore';

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const objetos = await obtenerObjetos();
        setObjetos(objetos);
        setResultados(objetos);
      } catch (error) {
        console.error('Error fetching objetos:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjetos();
  }, []);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    
    if (valor.length > 0) {
      const resultadosFiltrados = objetos.filter(objeto =>
        objeto.name.toLowerCase().includes(valor.toLowerCase()) ||
        objeto.space?.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(resultadosFiltrados);
    } else {
      setResultados(objetos);
    }
  };

  const manejarLimpiar = () => {
    setBusqueda('');
    setResultados(objetos);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Buscar</h1>
        <p className="text-gray-400 mt-1">Encuentra cualquier item en tu inventario</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card rounded-2xl p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o espacio..."
            className="w-full px-4 py-4 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
            value={busqueda}
            onChange={manejarBusqueda}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {busqueda && (
            <button
              onClick={manejarLimpiar}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <span>{resultados.length} resultado{resultados.length !== 1 ? 's' : ''}</span>
          {busqueda && (
            <button onClick={manejarLimpiar} className="text-purple-400 hover:text-purple-300">
              Limpiar búsqueda
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {resultados.length > 0 ? (
          resultados.map((objeto, index) => (
            <Link
              key={index}
              to={`/espacio/${objeto.space}`}
              className="glass-card rounded-xl p-5 flex items-center justify-between hover:bg-white/15 transition-all block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
                  📋
                </div>
                <div>
                  <h3 className="font-semibold text-white">{objeto.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <span>📍 {objeto.space}</span>
                    {objeto.description && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-xs">{objeto.description}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {objeto.quantity} unidades
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 opacity-50">
              🔍
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscar;