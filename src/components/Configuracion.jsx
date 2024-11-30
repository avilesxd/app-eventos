import React, { useState } from 'react';

const Configuracion = () => {
  const [config, setConfig] = useState({
    notificaciones: true,
    idioma: 'Español',
  });

  const handleToggle = (e) => {
    setConfig({ ...config, notificaciones: e.target.checked });
  };

  const handleSelect = (e) => {
    setConfig({ ...config, idioma: e.target.value });
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
      />
    </div>
    <div>
      <label className="text-gray-700 font-medium">Idioma:</label>
      <select
        value={config.idioma}
        onChange={handleSelect}
        className="ml-4 text-black border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
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
