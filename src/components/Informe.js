import React, { useState, useEffect } from 'react';
import { obtenerEspacios, obtenerObjetos } from '../services/firestore';
import { guardarInforme, obtenerUltimoInforme } from '../services/informes';

const Informe = () => {
  const [espacios, setEspacios] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generando, setGenerando] = useState(false);
  const [informeActual, setInformeActual] = useState(null);
  const [informeAnterior, setInformeAnterior] = useState(null);
  const [diferencias, setDiferencias] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [espaciosData, objetosData] = await Promise.all([
        obtenerEspacios(),
        obtenerObjetos()
      ]);
      setEspacios(espaciosData);
      setObjetos(objetosData);
      
      // Obtener último informe por separado para manejar errores
      try {
        const ultimoInforme = await obtenerUltimoInforme();
        setInformeAnterior(ultimoInforme);
      } catch (e) {
        console.log('No hay informes anteriores');
        setInformeAnterior(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calcularDiferencias = (actual, anterior) => {
    if (!anterior) return null;

    const diferencias = {
      nuevos: [],
      eliminados: [],
      modificados: [],
      sinCambios: []
    };

    const anteriorMap = new Map(anterior.objetos.map(o => [o.id, o]));
    const actualMap = new Map(actual.map(o => [o.id, o]));

    // Buscar nuevos y modificados
    actual.forEach(obj => {
      const anteriorObj = anteriorMap.get(obj.id);
      if (!anteriorObj) {
        diferencias.nuevos.push(obj);
      } else if (anteriorObj.quantity !== obj.quantity) {
        diferencias.modificados.push({
          ...obj,
          cantidadAnterior: anteriorObj.quantity,
          diferencia: obj.quantity - anteriorObj.quantity
        });
      } else {
        diferencias.sinCambios.push(obj);
      }
    });

    // Buscar eliminados
    anterior.objetos.forEach(obj => {
      if (!actualMap.has(obj.id)) {
        diferencias.eliminados.push(obj);
      }
    });

    return diferencias;
  };

  const generarInforme = async () => {
    setGenerando(true);
    try {
      const nuevoInforme = {
        fecha: new Date(),
        espacios: espacios.map(e => ({ id: e.id, name: e.name, location: e.location })),
        objetos: objetos.map(o => ({ id: o.id, name: o.name, quantity: o.quantity, space: o.space })),
        totalEspacios: espacios.length,
        totalObjetos: objetos.length,
        totalUnidades: objetos.reduce((sum, o) => sum + (o.quantity || 0), 0)
      };

      await guardarInforme(nuevoInforme);
      setInformeActual(nuevoInforme);

      if (informeAnterior) {
        const difs = calcularDiferencias(objetos, informeAnterior);
        setDiferencias(difs);
      }

      alert('¡Informe generado y guardado!');
    } catch (error) {
      console.error('Error al generar informe:', error);
      alert('Error al generar el informe');
    } finally {
      setGenerando(false);
    }
  };

  // Agrupar objetos por espacio
  const objetosPorEspacio = objetos.reduce((acc, obj) => {
    if (!acc[obj.space]) acc[obj.space] = [];
    acc[obj.space].push(obj);
    return acc;
  }, {});

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Informe de Inventario</h1>
          <p className="text-gray-400 mt-1">Genera y compara el estado de tu inventario</p>
        </div>
        <button
          onClick={generarInforme}
          disabled={generando}
          className="inline-flex items-center gap-2 gradient-purple px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          {generando ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Generar Informe</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{espacios.length}</p>
              <p className="text-gray-400">Espacios</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{objetos.length}</p>
              <p className="text-gray-400">Items</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{objetos.reduce((sum, o) => sum + (o.quantity || 0), 0)}</p>
              <p className="text-gray-400">Unidades Totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diferencias con informe anterior */}
      {diferencias && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📈</span> Cambios respecto al informe anterior
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <p className="text-green-400 text-sm font-medium">Nuevos Items</p>
              <p className="text-2xl font-bold text-white">{diferencias.nuevos.length}</p>
            </div>
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
              <p className="text-yellow-400 text-sm font-medium">Modificados</p>
              <p className="text-2xl font-bold text-white">{diferencias.modificados.length}</p>
            </div>
            <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
              <p className="text-red-400 text-sm font-medium">Eliminados</p>
              <p className="text-2xl font-bold text-white">{diferencias.eliminados.length}</p>
            </div>
          </div>

          {/* Lista de cambios */}
          {diferencias.nuevos.length > 0 && (
            <div className="mb-4">
              <h3 className="text-green-400 font-medium mb-2">✅ Nuevos Items:</h3>
              <div className="space-y-1">
                {diferencias.nuevos.map((item, i) => (
                  <div key={i} className="text-gray-300 text-sm pl-4">
                    • {item.name} ({item.quantity} unidades) - {item.space}
                  </div>
                ))}
              </div>
            </div>
          )}

          {diferencias.modificados.length > 0 && (
            <div className="mb-4">
              <h3 className="text-yellow-400 font-medium mb-2">🔄 Modificados:</h3>
              <div className="space-y-1">
                {diferencias.modificados.map((item, i) => (
                  <div key={i} className="text-gray-300 text-sm pl-4">
                    • {item.name}: {item.cantidadAnterior} → {item.quantity} 
                    <span className={item.diferencia > 0 ? 'text-green-400' : 'text-red-400'}>
                      {' '}({item.diferencia > 0 ? '+' : ''}{item.diferencia})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {diferencias.eliminados.length > 0 && (
            <div className="mb-4">
              <h3 className="text-red-400 font-medium mb-2">❌ Eliminados:</h3>
              <div className="space-y-1">
                {diferencias.eliminados.map((item, i) => (
                  <div key={i} className="text-gray-300 text-sm pl-4">
                    • {item.name} ({item.quantity} unidades) - {item.space}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Informe anterior */}
      {informeAnterior && !diferencias && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span>📅</span> Último informe
          </h2>
          <p className="text-gray-400 text-sm">
            Generado el {new Date(informeAnterior.fecha.seconds * 1000).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {informeAnterior.totalEspacios} espacios, {informeAnterior.totalObjetos} items, {informeAnterior.totalUnidades} unidades
          </p>
        </div>
      )}

      {/* Lista completa del inventario */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Inventario Completo
        </h2>

        {Object.entries(objetosPorEspacio).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(objetosPorEspacio).map(([espacio, items]) => (
              <div key={espacio}>
                <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                  <span>📦</span> {espacio}
                  <span className="text-gray-400 text-sm font-normal">({items.length} items)</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-white/10">
                        <th className="text-left py-2 px-3">Nombre</th>
                        <th className="text-left py-2 px-3">Descripción</th>
                        <th className="text-right py-2 px-3">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-3 text-white">{item.name}</td>
                          <td className="py-2 px-3 text-gray-400">{item.description || '-'}</td>
                          <td className="py-2 px-3 text-right">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                              {item.quantity} uds
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No hay items en el inventario</p>
        )}
      </div>
    </div>
  );
};

export default Informe;
