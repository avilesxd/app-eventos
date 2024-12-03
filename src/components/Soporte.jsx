import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/supabaseClient';

const Soporte = () => {
  const [formData, setFormData] = useState({ asunto: '', descripcion: '' });
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase.from('soporte').select('*').order('id', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      setTickets(data);
    } catch (error) {
      console.error('Error al obtener los tickets:', error.message);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('soporte').insert([formData]);

      if (error) {
        throw new Error(error.message);
      }

      alert('Tu solicitud de soporte ha sido enviada exitosamente.');
      setFormData({ asunto: '', descripcion: '' });
      fetchTickets();
    } catch (error) {
      console.error('Error al enviar la solicitud de soporte:', error.message);
      alert('Hubo un problema al enviar tu solicitud. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='bg-white shadow-md rounded-lg p-4'>
        <h2 className="text-xl font-bold mb-4 text-gray-700">Soporte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo: Asunto */}
        <div>
          <label className="block text-gray-700 font-medium">Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="w-full text-black mt-1 border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Campo: Descripción */}
        <div>
          <label className="block text-gray-700 font-medium">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full text-black mt-1 border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      </div>

      <div className="border-t border-gray-300 my-6"></div>

      <div className='bg-white shadow-md rounded-lg p-2'>
      <div className="mt-2">
        <h3 className="text-lg font-bold text-gray-700">Tickets Enviados</h3>
        <ul className="space-y-2">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <h4 className="font-bold text-gray-800">{ticket.asunto}</h4>
                <p className="text-gray-600">{ticket.descripcion}</p>
                <p className="text-sm text-gray-400">Enviado: {new Date(ticket.fecha).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No se han enviado tickets aún.</p>
          )}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Soporte;