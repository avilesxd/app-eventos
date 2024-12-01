"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabaseClient";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener sesión:", error);
      } else {
        setSession(session);
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return <div>{session ? <Dashboard /> : <Auth />}</div>;
};

export default App;
