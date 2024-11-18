import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Administradores() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de los administradores
  const [administradores, setAdministradores] = useState([
    { id: 1, nombre: "Juan Pérez", usuario: "jperez", contraseña: "12345", mail: "jperez@example.com" },
    { id: 2, nombre: "María López", usuario: "mlopez", contraseña: "67890", mail: "mlopez@example.com" },
    { id: 3, nombre: "Carlos García", usuario: "cgarcia", contraseña: "abcde", mail: "cgarcia@example.com" },
    { id: 4, nombre: "Ana Martínez", usuario: "amartinez", contraseña: "qwerty", mail: "amartinez@example.com" },
    { id: 5, nombre: "Pedro Sánchez", usuario: "psanchez", contraseña: "11111", mail: "psanchez@example.com" },
    { id: 6, nombre: "Laura Gómez", usuario: "lgomez", contraseña: "22222", mail: "lgomez@example.com" },
    { id: 7, nombre: "José Ramírez", usuario: "jramirez", contraseña: "33333", mail: "jramirez@example.com" },
    { id: 8, nombre: "Lucía Rodríguez", usuario: "lrodriguez", contraseña: "44444", mail: "lrodriguez@example.com" },
    { id: 9, nombre: "Sergio Fernández", usuario: "sfernandez", contraseña: "55555", mail: "sfernandez@example.com" },
    { id: 10, nombre: "Elena Pérez", usuario: "eperez", contraseña: "66666", mail: "eperez@example.com" },
    { id: 11, nombre: "Francisco Díaz", usuario: "fdiaz", contraseña: "77777", mail: "fdiaz@example.com" },
    { id: 12, nombre: "Isabel González", usuario: "igonzalez", contraseña: "88888", mail: "igonzalez@example.com" },
    { id: 13, nombre: "José Luis Martín", usuario: "jlmartin", contraseña: "99999", mail: "jlmartin@example.com" },
    { id: 14, nombre: "Patricia Romero", usuario: "promero", contraseña: "00000", mail: "promero@example.com" },
    { id: 15, nombre: "Rafael Pérez", usuario: "rperez", contraseña: "zxcvbn", mail: "rperez@example.com" },
    { id: 16, nombre: "Gabriela Fernández", usuario: "gfernandez", contraseña: "asdfgh", mail: "gfernandez@example.com" },
    { id: 17, nombre: "Mario Díaz", usuario: "mdiaz", contraseña: "vbnm12", mail: "mdiaz@example.com" },
    { id: 18, nombre: "Verónica Torres", usuario: "vtorres", contraseña: "yuiop3", mail: "vtorres@example.com" },
    { id: 19, nombre: "Raúl Sánchez", usuario: "rsanchez", contraseña: "123qwe", mail: "rsanchez@example.com" },
    { id: 20, nombre: "Claudia Hernández", usuario: "chernandez", contraseña: "456asd", mail: "chernandez@example.com" }
  ]);
  

  // Estado para almacenar el administrador seleccionado
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para la confirmación de borrar
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [adminAEliminar, setAdminAEliminar] = useState(null);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Función para manejar la búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar administradores según la búsqueda
  const filteredAdmins = administradores.filter(
    (admin) =>
      admin.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.mail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para manejar la selección de un administrador de la tabla
  const handleSelectAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  // Función para manejar el envío de los cambios del administrador
  const handleModificarAdmin = (e) => {
    e.preventDefault();

    if (selectedAdmin) {
      const updatedAdmins = administradores.map((admin) =>
        admin.id === selectedAdmin.id ? selectedAdmin : admin
      );
      setAdministradores(updatedAdmins);
      setSuccessMessage("Datos del administrador modificados correctamente.");
    }
  };

  // Función para mostrar la confirmación de borrar
  const handleBorrarAdmin = (admin) => {
    setShowConfirmation(true);
    setAdminAEliminar(admin);
  };

  // Función para confirmar el borrado del administrador
  const confirmarBorrado = () => {
    const updatedAdmins = administradores.filter((admin) => admin.id !== adminAEliminar.id);
    setAdministradores(updatedAdmins);
    setSuccessMessage(`Administrador ${adminAEliminar.nombre} borrado correctamente.`);
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
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">Gestionar Administradores</h2>

        {/* Campo de búsqueda */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
            Buscar por Nombre, Usuario o Email
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por Nombre, Usuario o Email"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Tabla de administradores */}
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Nombre</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Usuario</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Contraseña</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.usuario}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.contraseña}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.mail}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex justify-start space-x-2">
                        <button
                          className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                          onClick={() => handleSelectAdmin(admin)}
                        >
                          Modificar
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                          onClick={() => handleBorrarAdmin(admin)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-4 text-sm text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Formulario de modificación */}
        {selectedAdmin && (
          <form onSubmit={handleModificarAdmin} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={selectedAdmin.nombre}
                onChange={(e) => setSelectedAdmin({ ...selectedAdmin, nombre: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Usuario */}
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={selectedAdmin.usuario}
                onChange={(e) => setSelectedAdmin({ ...selectedAdmin, usuario: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={selectedAdmin.contraseña}
                onChange={(e) => setSelectedAdmin({ ...selectedAdmin, contraseña: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="mail" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="mail"
                name="mail"
                value={selectedAdmin.mail}
                onChange={(e) => setSelectedAdmin({ ...selectedAdmin, mail: e.target.value })}
                required
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Botón de modificar */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600"
            >
              Modificar
            </button>
          </form>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mt-6 text-center text-green-600">{successMessage}</div>
        )}

        {/* Confirmación de borrado */}
        {showConfirmation && (
          <div className="mt-6 bg-red-100 p-4 rounded-lg">
            <p className="text-center text-red-600">
              ¿Estás seguro de que deseas borrar al administrador{" "}
              <strong>{adminAEliminar.nombre}</strong>?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={confirmarBorrado}
              >
                Sí, borrar
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={cancelarBorrado}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            onClick={handleAtras}
          >
            Volver Atrás
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            onClick={handleVolverPanel}
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Administradores;
