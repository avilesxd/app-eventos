import React from 'react';

const Soporte = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tu solicitud de soporte ha sido enviada.');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
  <h2 className="text-xl font-bold mb-4 text-gray-700">Soporte</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium">Asunto:</label>
      <input
        type="text"
        name="asunto"
        className="w-full text-black mt-1 border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
        required
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium">Descripción:</label>
      <textarea
        name="descripcion"
        className="w-full text-black mt-1 border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
        rows="4"
        required
      ></textarea>
    </div>
    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Enviar
    </button>
  </form>
</div>

  );
};

export default Soporte;
