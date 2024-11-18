import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas

function Jugadores() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de los jugadores
  const [jugadores, setJugadores] = useState([
    {
      id: 1,
      licencia: "ABC123",
      nombre: "Juan",
      apellido: "Pérez",
      trabajo: "Police",
      grado: "0",
      grupo: "admin",
    },
    {
      id: 2,
      licencia: "XYZ456",
      nombre: "Ana",
      apellido: "Gómez",
      trabajo: "Ambulance",
      grado: "1",
      grupo: "user",
    },
    {
      id: 3,
      licencia: "DEF789",
      nombre: "Bastian",
      apellido: "Contreras",
      trabajo: "Mechanic",
      grado: "5",
      grupo: "mod",
    },
    // Agrega más jugadores aquí según sea necesario
  ]);

  const [filtro, setFiltro] = useState(""); // Estado para el filtro de búsqueda
  const [selectedJugador, setSelectedJugador] = useState(null); // Estado para almacenar el jugador seleccionado
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [confirmDelete, setConfirmDelete] = useState(null); // Estado para mostrar el cuadro de confirmación de borrado

  // Función para manejar la selección de un jugador de la tabla
  const handleSelectJugador = (jugador) => {
    setSelectedJugador(jugador);
  };
  // Función para manejar el botón de volver al panel
  const handleVolverPanel = () => {
    navigate("/index_admin"); // Redirige al panel principal
  };

  // Función para manejar el envío de los cambios del jugador
  const handleModificarJugador = (e) => {
    e.preventDefault();
    if (selectedJugador) {
      const updatedJugadores = jugadores.map((jugador) =>
        jugador.id === selectedJugador.id ? selectedJugador : jugador
      );
      setJugadores(updatedJugadores);
      setSuccessMessage("Datos del jugador modificados correctamente.");
    }
  };

  // Función para manejar el botón de retroceso
  const handleAtras = () => {
    setSelectedJugador(null); // Restablece el estado de jugador seleccionado a null
    setSuccessMessage(""); // Limpia el mensaje de éxito
    setFiltro(""); // Limpia el filtro
  };

  // Función para activar el cuadro de confirmación de borrado
  const handleConfirmarBorrar = (jugador) => {
    setConfirmDelete(jugador);
  };

  // Función para borrar un jugador
  const handleBorrarJugador = () => {
    if (confirmDelete) {
      const updatedJugadores = jugadores.filter(
        (jugador) => jugador.id !== confirmDelete.id
      );
      setJugadores(updatedJugadores);
      setSuccessMessage("Jugador borrado correctamente.");
      setConfirmDelete(null); // Resetea la confirmación
    }
  };

  // Función para cancelar el borrado
  const handleCancelarBorrar = () => {
    setConfirmDelete(null); // Cierra el cuadro de confirmación sin borrar
  };

  // Función para filtrar jugadores por cualquiera de los campos
  const handleFiltro = (e) => {
    setFiltro(e.target.value);
  };

  // Filtrar jugadores por cualquier campo (licencia, nombre, apellido, trabajo, grado, grupo)
  const jugadoresFiltrados = jugadores.filter(
    (jugador) =>
      jugador.licencia.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.trabajo.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.grado.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.grupo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Modificar Jugador
        </h2>

        {/* Input de filtro */}
        {!selectedJugador && (
          <div className="mb-6">
            <label
              htmlFor="filtro"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Buscar Jugador
            </label>
            <input
              type="text"
              id="filtro"
              value={filtro}
              onChange={handleFiltro}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Busca por cualquier campo (licencia, nombre, apellido, etc.)"
            />
          </div>
        )}

        {/* Tabla de jugadores */}
        {!selectedJugador && (
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Licencia
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Trabajo
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Grado
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Grupo
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {jugadoresFiltrados.map((jugador) => (
                  <tr key={jugador.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.licencia}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.apellido}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.trabajo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.grado}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {jugador.grupo}
                    </td>
                    <td className="px-6 py-4 text-sm flex justify-end gap-2">
                      <button
                        className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                        onClick={() => handleSelectJugador(jugador)}
                      >
                        Modificar
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        onClick={() => handleConfirmarBorrar(jugador)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              
            </table>
            
          </div>
          
        )}
        {/* Formulario de modificación */}
        {selectedJugador && (
          <form onSubmit={handleModificarJugador} className="space-y-6">
            {/* Licencia de Rockstar */}
            <div>
              <label
                htmlFor="licencia"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Licencia de Rockstar
              </label>
              <input
                type="text"
                id="licencia"
                name="licencia"
                value={selectedJugador.licencia}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    licencia: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={selectedJugador.nombre}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    nombre: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={selectedJugador.apellido}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    apellido: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Trabajo */}
            <div>
              <label
                htmlFor="trabajo"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Trabajo
              </label>
              <input
                type="text"
                id="trabajo"
                name="trabajo"
                value={selectedJugador.trabajo}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    trabajo: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Grado */}
            <div>
              <label
                htmlFor="grado"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Grado
              </label>
              <input
                type="text"
                id="grado"
                name="grado"
                value={selectedJugador.grado}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    grado: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Grupo */}
            <div>
              <label
                htmlFor="grupo"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Grupo
              </label>
              <input
                type="text"
                id="grupo"
                name="grupo"
                value={selectedJugador.grupo}
                onChange={(e) =>
                  setSelectedJugador({
                    ...selectedJugador,
                    grupo: e.target.value,
                  })
                }
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="flex justify-between">
             
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                >
                  Modificar Jugador
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmarBorrar(selectedJugador)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Borrar Jugador
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Confirmación de borrar */}
        {confirmDelete && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                ¿Estás seguro de que deseas borrar a {confirmDelete.nombre}{" "}
                {confirmDelete.apellido}?
              </h3>
              <div className="flex justify-between">
                <button
                  onClick={handleBorrarJugador}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Sí, hazlo
                </button>
                <button
                  onClick={handleCancelarBorrar}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  No, salir
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Botón Volver al Panel */}
        <div className="mt-6">
                <button
                  onClick={handleVolverPanel}
                  className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
                >
                  Volver al Panel
                </button>
              </div>
      </div>
      
    </div>
  );
}

export default Jugadores;
