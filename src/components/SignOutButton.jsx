import React from 'react';
import { supabase } from '../utils/supabase/supabaseClient';

const SignOutButton = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
      alert('Hubo un problema al cerrar sesión.');
    } else {
      alert('Sesión cerrada correctamente');
      window.location.href = '/auth';
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
    >
      Cerrar sesión
    </button>
  );
};

export default SignOutButton;
