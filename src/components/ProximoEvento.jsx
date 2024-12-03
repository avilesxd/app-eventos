import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabaseClient';

const ProximoEvento = () => {
  const [proximoEvento, setProximoEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProximoEvento = async () => {
      try {
        const { data, error } = await supabase
          .from('eventos') 
          .select('*')
          .order('fecha', { ascending: true }) 
          .limit(1); 
        if (error) throw new Error(error.message);

        setProximoEvento(data[0]); 
      } catch (error) {
        console.error('Error al obtener el próximo evento:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProximoEvento();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Próximo Evento</h2>
      {loading ? (
        <p className="text-gray-500">Cargando el próximo evento...</p>
      ) : proximoEvento ? (
        <div className="text-gray-600">
          <strong className="block text-lg text-green-600">{proximoEvento.nombre}</strong>
          <p>
            Lugar: <span className="font-medium">{proximoEvento.lugar}</span>
          </p>
          <p>
            Fecha: <span className="font-medium">{proximoEvento.fecha}</span>
          </p>
          <p>
            Tipo: <span className="font-medium">{proximoEvento.tipo}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No hay eventos próximos disponibles.</p>
      )}
    </div>
  );
};

export default ProximoEvento;
