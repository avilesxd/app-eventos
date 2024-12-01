import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabaseClient";

const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const fetchAsistentes = async () => {
      try {
        setLoading(true); // Activar estado de carga

        // Consulta a la tabla "asistentes" en Supabase
        const { data, error } = await supabase.from("asistentes").select("*");

        if (error) throw new Error(error.message);

        // Guardar los asistentes obtenidos
        setAsistentes(data);
      } catch (error) {
        console.error("Error al obtener asistentes:", error.message);
      } finally {
        setLoading(false); // Desactivar estado de carga
      }
    };

    fetchAsistentes();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Asistentes</h2>
      
      {loading ? (
        <p className="text-gray-500">Cargando asistentes...</p>
      ) : (
        <ul className="space-y-2">
          {asistentes.length > 0 ? (
            asistentes.map((asistente) => (
              <li
                key={asistente.id}
                className="p-2 border rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-bold text-green-600">{asistente.nombre}</span>
                <br />
                <span className="text-gray-500">{asistente.email}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay asistentes registrados.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Asistentes;
