import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Funciones para navegar entre las diferentes secciones
  const handlePlayers = () => {
    navigate("/index_admin");
  };

  const handleVehicles = () => {
    navigate("/vehiculos");
  };

  const handleCrearAdministrador = () => {
    navigate("/crear_admin");
  };
  const handleGestionAdministrador = () => {
    navigate("/Gestion_administrador");
  };

  const handleUserManagement = () => {
    navigate("/gestion-usuarios");
  };

  const handleServerSettings = () => {
    navigate("/configuraciones");
  };

  const handleReports = () => {
    navigate("/reportes");
  };
  const handleExit = () => {
    navigate("/");
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-white to-white">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-slate-950 to-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Panel de control</h2>
        <ul>
          {/* Opciones del menú */}
          <li className="mb-6">
            <button
              onClick={handlePlayers}
              className="w-full text-left p-3 rounded-lg focus:outline-none flex items-center text-emerald-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 mr-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Gestión de jugadores
            </button>
          </li>

          {/* Menú de Admin */}
          <li className="mt-8">
            <h3 className="text-2xl font-bold mb-8 font-semibold text-white mb-3">
              Administración
            </h3>
            <ul>
              <li className="mb-4 w-64 rounded-full bg-white ">
                <button
                  onClick={handleUserManagement}
                  className="w-full text-left text-cyan-500 p-3 rounded-lg focus:outline-none flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12c0-3.313-2.687-6-6-6s-6 2.687-6 6m12 0v6m0-6h3m-3 0l3-3m-3 3l-3 3"
                    />
                  </svg>
                  Gestión de staffs
                </button>
              </li>
             
            
              <li className="mb-4">
                <button
                  onClick={handleExit}
                  className="w-full text-left p-3 text-red-500 rounded-lg focus:outline-none flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H3m14 4h-4a2 2 0 01-2-2V6a2 2 0 012-2h4"
                    />
                  </svg>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 border-t-4 border-cyan-500 ">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Gestion administrativa de administradores
        </h2>
        <p className="text-1xl  text-gray-500 mb-6 ">
          Modifica la información de los administradores o crea nuevos
          administradores.
        </p>

        {/* Panel Section */}
        <div className="grid grid-cols-3 gap-6 ">
          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500 ">
            <h3 className="text-xl font-semibold text-slate-900">
              Nuevo administrador
            </h3>
            <p className="text-gray-500">
              Crea una nueva cuenta para administrador.
            </p>
            <a
              onClick={handleCrearAdministrador}
              className="mt-4 inline-block rounded bg-cyan-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-emerald-500"
              href="#"
            >
              Crear administrador{" "}
            </a>

            <div className="my-7">
              <img
                 src="/img/jugadores_3.png"
                alt="Imagen de GTA V"
                className="w-50 h-auto object-contain"
              />
            </div>
          </div>
          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500">
            <h3 className="text-xl font-semibold text-slate-900 ">
              Administradores
            </h3>
            <p className="text-gray-500">
              Elimina, modifica los administradores actuales.
            </p>
            <a
              onClick={handleGestionAdministrador}
              className="mt-4 inline-block rounded bg-cyan-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-emerald-500"
              href="#"
            >
              Gestionar{" "}
            </a>

            <div className="my-7">
              <img
                src="/img/jugadores_3.png"
                alt="Imagen de GTA V"
                className="w-50 h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
