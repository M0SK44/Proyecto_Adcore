import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas

function Vehiculos() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de los vehículos
  const [vehiculos, setVehiculos] = useState([
    { id: 1, licencia_dueno: "ABC123", patente: "sultanrs", aparcamiento: "Aparcamiento 1" },
    { id: 2, licencia_dueno: "XYZ456", patente: "zentorno", aparcamiento: "Aparcamiento 2" },
    // Agrega más vehículos aquí según sea necesario
  ]);

  // Estado para almacenar el vehículo seleccionado
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  // Estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para la confirmación de borrar
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vehiculoAEliminar, setVehiculoAEliminar] = useState(null);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Función para manejar la búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar vehículos según la búsqueda
  const filteredVehiculos = vehiculos.filter(
    (vehiculo) =>
      vehiculo.licencia_dueno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehiculo.patente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehiculo.aparcamiento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para manejar la selección de un vehículo de la tabla
  const handleSelectVehiculo = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
  };

  // Función para manejar el envío de los cambios del vehículo
  const handleModificarVehiculo = (e) => {
    e.preventDefault();

    if (selectedVehiculo) {
      const updatedVehiculos = vehiculos.map((vehiculo) =>
        vehiculo.id === selectedVehiculo.id ? selectedVehiculo : vehiculo
      );
      setVehiculos(updatedVehiculos);
      setSuccessMessage("Datos del vehículo modificados correctamente.");
    }
  };

  // Función para mostrar la confirmación de borrar
  const handleBorrarVehiculo = (vehiculo) => {
    setShowConfirmation(true);
    setVehiculoAEliminar(vehiculo);
  };

  // Función para confirmar el borrado del vehículo
  const confirmarBorrado = () => {
    const updatedVehiculos = vehiculos.filter((vehiculo) => vehiculo.id !== vehiculoAEliminar.id);
    setVehiculos(updatedVehiculos);
    setSuccessMessage(`Vehículo con patente ${vehiculoAEliminar.patente} borrado correctamente.`);
    setShowConfirmation(false); // Cerrar la confirmación
  };

  // Función para cancelar la acción de borrado
  const cancelarBorrado = () => {
    setShowConfirmation(false); // Cerrar la confirmación
  };

  // Función para manejar el botón de retroceso
  const handleAtras = () => {
    navigate("/index_admin"); // Redirige a la página anterior
  };

  // Función para manejar el botón de volver al panel
  const handleVolverPanel = () => {
    navigate("/index_admin"); // Redirige al panel principal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">Gestionar Vehículos</h2>

        {/* Campo de búsqueda */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
            ¿Con qué lo quieres buscar?
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por Licencia, Patente o Aparcamiento"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Tabla de vehículos */}
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Licencia del Dueño</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Patente del Vehículo</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Aparcamiento</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehiculos.length > 0 ? (
                filteredVehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">{vehiculo.licencia_dueno}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehiculo.patente}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehiculo.aparcamiento}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex justify-start space-x-2">
                        <button
                          className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                          onClick={() => handleSelectVehiculo(vehiculo)}
                        >
                          Modificar
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                          onClick={() => handleBorrarVehiculo(vehiculo)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-sm text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Formulario de modificación */}
        {selectedVehiculo && (
          <form onSubmit={handleModificarVehiculo} className="space-y-6">
            {/* Licencia del Dueño */}
            <div>
              <label htmlFor="licencia_dueno" className="block text-sm font-medium text-slate-700 mb-2">
                Licencia del Dueño
              </label>
              <input
                type="text"
                id="licencia_dueno"
                name="licencia_dueno"
                value={selectedVehiculo.licencia_dueno}
                onChange={(e) => setSelectedVehiculo({ ...selectedVehiculo, licencia_dueno: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Patente del Vehículo */}
            <div>
              <label htmlFor="patente" className="block text-sm font-medium text-slate-700 mb-2">
                Patente del Vehículo (Modelo GTA V)
              </label>
              <input
                type="text"
                id="patente"
                name="patente"
                value={selectedVehiculo.patente}
                onChange={(e) => setSelectedVehiculo({ ...selectedVehiculo, patente: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Aparcamiento */}
            <div>
              <label htmlFor="aparcamiento" className="block text-sm font-medium text-slate-700 mb-2">
                Aparcamiento
              </label>
              <input
                type="text"
                id="aparcamiento"
                name="aparcamiento"
                value={selectedVehiculo.aparcamiento}
                onChange={(e) => setSelectedVehiculo({ ...selectedVehiculo, aparcamiento: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleAtras}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Atrás
              </button>
            </div>
          </form>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mt-6 text-green-500 font-semibold">{successMessage}</div>
        )}

        {/* Confirmación de Borrado */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                ¿Estás seguro que quieres borrar el vehículo con patente "{vehiculoAEliminar.patente}"?
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={confirmarBorrado}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Sí, Borrar
                </button>
                <button
                  onClick={cancelarBorrado}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  No, Salir
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

export default Vehiculos;
