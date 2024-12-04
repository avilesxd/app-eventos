import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabaseClient";

const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchAsistentes = async () => {
      try {
        setLoading(true);

        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
          .from("asistentes")
          .select("*", { count: "exact" })
          .range(from, to);

        if (error) throw new Error(error.message);

        setAsistentes(data);
        setTotalPages(Math.ceil(count / pageSize));
      } catch (error) {
        console.error("Error al obtener asistentes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsistentes();
  }, [currentPage]);

  const handleConfirmarAsistencia = async (id) => {
    try {
      const { error } = await supabase
        .from("asistentes")
        .update({ confirmado: true })
        .eq("id", id);
      
      if (error) throw new Error(error.message);

      setAsistentes((prevAsistentes) =>
        prevAsistentes.map((asistente) =>
          asistente.id === id ? { ...asistente, confirmado: true } : asistente
        )
      );
    } catch (error) {
      console.error("Error al confirmar asistencia:", error.message);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Asistentes</h2>

      {loading ? (
        <p className="text-gray-500">Cargando asistentes...</p>
      ) : (
        <>
          <ul className="space-y-2">
            {asistentes.length > 0 ? (
              asistentes.map((asistente) => (
                <li
                  key={asistente.id}
                  className="p-2 border rounded-md bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-green-600">
                      {asistente.nombre}
                    </span>
                    <br />
                    <span className="text-gray-500">{asistente.email}</span>
                  </div>
                  <button
                    onClick={() => handleConfirmarAsistencia(asistente.id)}
                    disabled={asistente.confirmado}
                    className={`px-4 py-2 rounded-full text-white ${
                      asistente.confirmado
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-400 to-green-600 hover:shadow-lg"
                    } transition-all duration-200`}
                  >
                    {asistente.confirmado
                      ? "Asistencia confirmada"
                      : "Confirmar asistencia"}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No hay asistentes registrados.</p>
            )}
          </ul>

          {/* Controles de paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Asistentes;
