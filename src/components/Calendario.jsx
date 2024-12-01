import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabaseClient";

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const { data, error } = await supabase.from("eventos").select("*");

      if (error) {
        console.error("Error al obtener los eventos:", error.message);
        return;
      }

      setEventos(data);
    };

    fetchEventos();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Calendario de Eventos
      </h2>
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
