import React, { useState } from "react";
import CrearEvento from "../components/CrearEvento";
import Calendario from "../components/Calendario";
import ProximoEvento from "../components/ProximoEvento";
import Asistentes from "../components/Asistentes";
import Configuracion from "../components/Configuracion";
import Soporte from "../components/Soporte";
import SignOutButton from "../components/SignOutButton";
import LogoDae from "../components/LogoDae";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Inicio");
  const [showEventosSubmenu, setShowEventosSubmenu] = useState(false);

  const renderComponent = () => {
    switch (activeMenu) {
      case "Crear Evento":
        return <CrearEvento />;
      case "Calendario":
        return <Calendario />;
      case "Próximo Evento":
        return <ProximoEvento />;
      case "Asistentes":
        return <Asistentes />;
      case "Configuración":
        return <Configuracion />;
      case "Soporte":
        return <Soporte />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-700">
            <h2 className="text-2xl font-bold">Bienvenido</h2>
            <p className="text-lg mt-2">Seleccione una opción del menú</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-700 text-white p-6 shadow-lg">
        <LogoDae className="mb-6" />
        <h1 className="text-2xl font-bold mb-6">Menú</h1>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveMenu("Inicio")}
            className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
              activeMenu === "Inicio" ? "bg-green-800" : ""
            }`}
          >
            Inicio
          </li>
          <li
            onClick={() => setShowEventosSubmenu(!showEventosSubmenu)}
            className="cursor-pointer p-2 rounded-md hover:bg-green-800 flex justify-between items-center"
          >
            <span>Eventos</span>
            <span
              className={`transition-transform ${
                showEventosSubmenu ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </li>
          {showEventosSubmenu && (
            <ul className="pl-4 space-y-2">
              <li
                onClick={() => setActiveMenu("Crear Evento")}
                className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
                  activeMenu === "Crear Evento" ? "bg-green-800" : ""
                }`}
              >
                Crear Evento
              </li>
              <li
                onClick={() => setActiveMenu("Próximo Evento")}
                className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
                  activeMenu === "Próximo Evento" ? "bg-green-800" : ""
                }`}
              >
                Próximo Evento
              </li>
              <li
                onClick={() => setActiveMenu("Calendario")}
                className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
                  activeMenu === "Calendario" ? "bg-green-800" : ""
                }`}
              >
                Calendario
              </li>
            </ul>
          )}
          <li
            onClick={() => setActiveMenu("Asistentes")}
            className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
              activeMenu === "Asistentes" ? "bg-green-800" : ""
            }`}
          >
            Asistentes
          </li>
          <li
            onClick={() => setActiveMenu("Configuración")}
            className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
              activeMenu === "Configuración" ? "bg-green-800" : ""
            }`}
          >
            Configuración
          </li>
          <li
            onClick={() => setActiveMenu("Soporte")}
            className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
              activeMenu === "Soporte" ? "bg-green-800" : ""
            }`}
          >
            Soporte
          </li>
          <li
            onClick={() => setActiveMenu("Cerrar Sesi&oacute;n")}
            className={`cursor-pointer p-2 rounded-md hover:bg-green-800 ${
              activeMenu === "Cerrar Sesi&oacute;n" ? "bg-green-800" : ""
            }`}
          >
            <SignOutButton />
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-4/5 bg-gray-100 p-6">{renderComponent()}</div>
    </div>
  );
}

export default Dashboard