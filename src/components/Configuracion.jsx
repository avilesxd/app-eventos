import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabaseClient'; // Cliente de Supabase configurado

const Configuracion = () => {
  const [config, setConfig] = useState({
    notificaciones: true,
    idioma: 'Español',
  });
  const [loading, setLoading] = useState(false);

  // Cargar configuraciones al montar el componente
  useEffect(() => {
    const fetchConfiguracion = async () => {
      try {
        const { data, error } = await supabase
          .from('configuraciones')
          .select('*')
          .eq('usuario_id', supabase.auth.getUser.id) // Filtrar por usuario actual
          .single();

        if (error && error.code !== 'PGRST116') { // Ignorar error si no hay configuración inicial
          throw error;
        }

        if (data) {
          setConfig({ notificaciones: data.notificaciones, idioma: data.idioma });
        }
      } catch (error) {
        console.error('Error al obtener configuraciones:', error.message);
      }
    };

    fetchConfiguracion();
  }, []);

  // Guardar configuraciones en la base de datos
  const saveConfiguracion = async (newConfig) => {
    setLoading(true);
    try {
      const usuarioId = supabase.auth.getUser.id;

      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      const { error } = await supabase
        .from('configuraciones')
        .upsert({
          usuario_id: usuarioId,
          ...newConfig,
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error al guardar configuraciones:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejadores para los cambios
  const handleToggle = (e) => {
    const newConfig = { ...config, notificaciones: e.target.checked };
    setConfig(newConfig);
    saveConfiguracion(newConfig);
  };

  const handleSelect = (e) => {
    const newConfig = { ...config, idioma: e.target.value };
    setConfig(newConfig);
    saveConfiguracion(newConfig);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Configuración</h2>
      <form className="space-y-4">
        <div className="flex items-center">
          <label className="text-gray-700 font-medium mr-4">Notificaciones:</label>
          <input
            type="checkbox"
            className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            checked={config.notificaciones}
            onChange={handleToggle}
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-gray-700 font-medium">Idioma:</label>
          <select
            value={config.idioma}
            onChange={handleSelect}
            className="ml-4 text-black border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
            disabled={loading}
          >
            <option value="Español">Español</option>
            <option value="Inglés">Inglés</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Configuracion;
