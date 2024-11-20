import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas

function VehiculosHelper() {
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

 
  // Función para manejar el botón de volver al panel
  const handleVolverPanel = () => {
    navigate("/index_helper"); // Redirige al panel principal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">Visualizando los Vehículos</h2>

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

export default VehiculosHelper;
