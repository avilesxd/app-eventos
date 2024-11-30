import React, { useEffect, useState } from "react";

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Aquí conectarás con Supabase para obtener eventos
    const fetchEventos = async () => {
      console.log("Fetching events...");
      setEventos([
        {
          id: 1,
          nombre: "Entrega de agendas",
          lugar: "Patio",
          fecha: "2024-04-22",
          tipo: "Entrega",
        },
        {
          id: 2,
          nombre: "Fiestas Patrias",
          lugar: "Plaza",
          fecha: "2024-09-12",
          tipo: "Actividad",
        },
      ]);
    };
    fetchEventos();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Calendario de Eventos</h2>
      <ul className="space-y-4">
        {eventos.map((evento) => (
          <li
            key={evento.id}
            className="p-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200"
          >
            <strong className="text-lg font-semibold text-green-700">
              {evento.nombre}
            </strong>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Fecha:</span> {evento.fecha}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Lugar:</span> {evento.lugar}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Tipo:</span> {evento.tipo}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendario;