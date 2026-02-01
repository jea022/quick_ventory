import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerEspacioPorNombre, obtenerItemsPorNombre, eliminarItem } from '../services/firestore';

const VerEspacio = () => {
  const { spaceName } = useParams();
  const [espacio, setEspacio] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [espacioData, itemsData] = await Promise.all([
          obtenerEspacioPorNombre(spaceName),
          obtenerItemsPorNombre(spaceName)
        ]);
        setEspacio(espacioData);
        setItems(itemsData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [spaceName]);

  const manejarEliminarItem = async (item) => {
    if (window.confirm(`¿Estás seguro de eliminar "${item.name}"?`)) {
      await eliminarItem(item.id);
      setItems(items.filter(i => i.id !== item.id));
    }
    setMenuAbierto(null);
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
      {/* Back Button & Header */}
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => navigate('/espacios')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-white">{espacio?.name || spaceName}</h1>
          <p className="text-gray-400 mt-1">{espacio?.description || 'Espacio de inventario'}</p>
        </div>
        <Link
          to={`/crear-item/${spaceName}`}
          className="inline-flex items-center gap-2 gradient-purple px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Item
        </Link>
      </div>

      {/* Items Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-5 hover:bg-white/15 transition-all group relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                📋
              </div>
              <h3 className="font-semibold text-white text-lg truncate">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{item.description}</p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {item.quantity} unidades
                </span>
              </div>

              {/* Menu Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuAbierto(menuAbierto === index ? null : index);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {menuAbierto === index && (
                  <div className="absolute right-0 mt-2 w-40 glass-card rounded-xl py-2 shadow-xl z-10">
                    <button
                      onClick={() => {
                        navigate(`/editar-item/${spaceName}/${item.name}`);
                        setMenuAbierto(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => manejarEliminarItem(item)}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 opacity-50">
            📋
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No hay items</h3>
          <p className="text-gray-400 mb-6">Comienza agregando items a este espacio</p>
          <Link
            to={`/crear-item/${spaceName}`}
            className="inline-flex items-center gap-2 gradient-purple px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Crear Item
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerEspacio;