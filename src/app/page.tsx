"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabaseClient";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard"; // Un componente que será visible solo si el usuario está autenticado

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.unsubscribe();
  }, []);

  return <div>{session ? <Dashboard /> : <Auth />}</div>;
};

export default App;
