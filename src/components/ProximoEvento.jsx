import React, { useEffect, useState } from 'react';

const ProximoEvento = () => {
  const [proximoEvento, setProximoEvento] = useState(null);

  useEffect(() => {
    // Conectar con Supabase para obtener el próximo evento
    const fetchProximoEvento = async () => {
      console.log('Fetching próximo evento...');
      setProximoEvento({
        id: 1,
        nombre: 'Entrega de agendas',
        lugar: 'Patio Laurato',
        fecha: '2024-04-22',
        tipo: 'Entrega',
      });
    };
    fetchProximoEvento();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
  <h2 className="text-xl font-bold mb-4 text-gray-700">Próximo Evento</h2>
  {proximoEvento ? (
    <div className="text-gray-600">
      <strong className="block text-lg text-green-600">{proximoEvento.nombre}</strong>
      <p>Lugar: <span className="font-medium">{proximoEvento.lugar}</span></p>
      <p>Fecha: <span className="font-medium">{proximoEvento.fecha}</span></p>
      <p>Tipo: <span className="font-medium">{proximoEvento.tipo}</span></p>
    </div>
  ) : (
    <p className="text-gray-500">Cargando el próximo evento...</p>
  )}
</div>

  );
};

export default ProximoEvento;
