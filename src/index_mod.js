import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Funciones para navegar entre las diferentes secciones
  const handlePlayersmod = () => {
    navigate("/index_mod");
  };
  const handleJugadores = () => {
    navigate("/Jugadores");
  };
  const handleVehicles = () => {
    navigate("/vehiculos");
  };

  const handleMoreOptions = () => {
    navigate("/mas-opciones");
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-white to-white">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-slate-950 to-slate-900 text-white p-6 ">
        <h2 className="text-2xl font-bold mb-8 ">Panel de control</h2>

        <ul>
          {/* Opciones del menú */}
          <li className="mb-6 w-64 rounded-full bg-white ">
            <button
              onClick={handlePlayersmod}
              className="w-full text-left p-3 text-emerald-500 rounded-lg focus:outline-none flex items-center"
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
          <li className="mt-4">
           
            <ul>
             

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
      <div className="flex-1 p-8 border-t-4 border-emerald-500">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Gestion administrativa de usuarios
        </h2>
        <p className="text-1xl text-gray-500 mb-6 ">
          Modifica la información del usuario y accede a más herramientas.
        </p>

        {/* Panel Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-slate-900">Jugadores</h3>
            <p className="text-gray-500">
              Administra y visualiza a los jugadores conectados al servidor.
            </p>

            <a
              onClick={handleJugadores}
              className="mt-4 inline-block rounded bg-emerald-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-emerald-500"
              href="#"
            >
              Ver jugadores
            </a>

            <div className="my-7">
              <img
                src="/img/jugadores_1.png"
                alt="Imagen de GTA V"
                className="w-50 h-auto object-contain"
              />
            </div>
          </div>

          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-slate-900">Vehículos</h3>
            <p className="text-gray-500">Gestiona los vehículos del servidor</p>
            <a
              onClick={handleVehicles}
              className="mt-4 inline-block rounded bg-emerald-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-emerald-500"
              href="#"
            >
              Ver vehículos
            </a>

            <div className="my-7">
              <img
                src="/img/jugadores_2.png"
                alt="Imagen de GTA V"
                className="w-50 h-auto object-contain"
              />
            </div>
          </div>

          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-slate-900">
              Más Opciones
            </h3>
            <p className="text-gray-500">
              Accede a herramientas adicionales para gestionar el servidor.
            </p>

            <a
              onClick={handleMoreOptions}
              className="mt-4 inline-block rounded bg-emerald-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-emerald-500"
              href="#"
            >
              Más opciones{" "}
            </a>

            <div className="my-7">
              <img
                src="/img/jugadores_3.png"
                alt="Imagen de GTA V"
                className="w-50 h-auto object-contain"
              />
            </div>
          </div>
          {/*Tus datos del administrador*/}
          <div className="shadow-lg shadow-slate-950/50 bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
            <h3 className="text-xl font-semibold text-slate-900">
              Tu información
            </h3>
            <div className="mt-2 flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Nombre</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    Bastian Contreras
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Cargo</dt>
                  <dd className="text-gray-700 sm:col-span-2">Administrador</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">mail</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    bastiancontrerasvillalobos@gmail.com
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
