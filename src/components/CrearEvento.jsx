import React, { useState } from "react";

const CrearEvento = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    lugar: "",
    fecha: "",
    tipo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí conectarás con Supabase para insertar el evento
    console.log("Evento creado:", formData);
    alert("Evento creado exitosamente!");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-black mb-4">Crear Evento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre del Evento */}
        <div>
          <label className="block text-black font-medium mb-2">
            Nombre del Evento:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ejemplo: Reunión anual"
          />
        </div>

        {/* Lugar */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Lugar:</label>
          <input
            type="text"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            required
            className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ejemplo: Sala 102"
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tipo:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccionar</option>
            <option value="Entrega">Entrega</option>
            <option value="Actividad">Actividad</option>
          </select>
        </div>

        {/* Botón de enviar */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEvento;
