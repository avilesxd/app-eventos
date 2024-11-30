import React, { useEffect, useState } from 'react';

const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    // Conectar con Supabase para obtener los asistentes
    const fetchAsistentes = async () => {
      console.log('Fetching asistentes...');
      setAsistentes([
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
        { id: 2, nombre: 'María Gómez', email: 'maria.gomez@example.com' },
      ]);
    };
    fetchAsistentes();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
  <h2 className="text-xl font-bold mb-4 text-gray-700">Asistentes</h2>
  <ul className="space-y-2">
    {asistentes.map((asistente) => (
      <li
        key={asistente.id}
        className="p-2 border rounded-md bg-gray-50 hover:bg-gray-100"
      >
        <span className="font-bold text-green-600">{asistente.nombre}</span>
        <br />
        <span className="text-gray-500">{asistente.email}</span>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Asistentes;
