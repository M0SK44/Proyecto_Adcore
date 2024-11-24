import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3002';

function Administradores() {
  const navigate = useNavigate();

  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [adminAEliminar, setAdminAEliminar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAdministradores = async () => {
      try {
        const response = await axios.get("/api/administradores");
        setAdministradores(response.data);
      } catch (err) {
        setError("Hubo un problema al cargar los administradores.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdministradores();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredAdmins = administradores.filter((admin) =>
    [admin.nombre, admin.usuario, admin.mail]  // Cambié 'email' por 'mail'
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectAdmin = (admin) => {
    setSelectedAdmin({ ...admin, activo: admin.activo ? "1" : "0" });  // Asegura valores numéricos en 'activo'
  };

  const handleBorrarAdmin = (admin) => {
    setShowConfirmation(true);
    setAdminAEliminar(admin);
  };

  const confirmarBorrado = async () => {
    try {
      await axios.delete(`/api/administradores/${adminAEliminar.id}`);
      setAdministradores((prev) => prev.filter((a) => a.id !== adminAEliminar.id));
      setSuccessMessage(`Administrador ${adminAEliminar.nombre} borrado correctamente.`);
    } catch {
      setError("Hubo un problema al eliminar el administrador.");
    }
    setShowConfirmation(false);
  };

  const modificarAdministrador = async (e) => {
    e.preventDefault();
  
    // Validación de campos requeridos
    const { nombre, usuario, mail, grupo, activo, contraseña } = selectedAdmin;
  
    // Verificar campos obligatorios
    if (!nombre || !usuario || !mail || !grupo || activo === undefined) {
      setError("Todos los campos son obligatorios excepto la contraseña.");
      return;
    }
  
    try {
      const { id, ...adminData } = selectedAdmin;
  
      // Enviar los datos al backend, asegurando que 'activo' sea un número
      const response = await axios.put(`/api/administradores/${id}`, {
        ...adminData,
        activo: adminData.activo === "1" || adminData.activo === 1 ? 1 : 0, // Normaliza activo
        contraseña: contraseña || undefined, // Si no hay contraseña, no la envía
      });
  
      console.log("Respuesta del servidor:", response.data);
  
      // Actualizar el estado con el administrador modificado
      setAdministradores((prev) =>
        prev.map((admin) => (admin.id === id ? selectedAdmin : admin))
      );
  
      setSelectedAdmin(null);
      setSuccessMessage("Administrador actualizado correctamente.");
    } catch (err) {
      console.error("Error en la solicitud PUT:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Error al intentar actualizar el administrador."
      );
    }
  };
  
  
  

  const cancelarBorrado = () => setShowConfirmation(false);
  const handleAtras = () => navigate("/index_admin");
  const handleVolverPanel = () => navigate("/index_admin");

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">Gestionar Administradores</h2>

        {/* Búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por Nombre, Usuario o Mail"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Tabla */}
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Nombre</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Usuario</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Mail</th>  {/* Cambié email por mail */}
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.usuario}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.mail}</td>  {/* Cambié email por mail */}
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleSelectAdmin(admin)}
                        className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 mr-2"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => handleBorrarAdmin(admin)}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No se encontraron resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Formulario */}
        {selectedAdmin && (
          <form onSubmit={modificarAdministrador} className="space-y-6">
            <input
              type="text"
              value={selectedAdmin.nombre}
              onChange={(e) => setSelectedAdmin({ ...selectedAdmin, nombre: e.target.value })}
              placeholder="Nombre"
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={selectedAdmin.usuario}
              onChange={(e) => setSelectedAdmin({ ...selectedAdmin, usuario: e.target.value })}
              placeholder="Usuario"
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <input
              type="email"
              value={selectedAdmin.mail}  // Cambié email por mail
              onChange={(e) => setSelectedAdmin({ ...selectedAdmin, mail: e.target.value })}
              placeholder="Mail"
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            />
            <select
              value={selectedAdmin.grupo}
              onChange={(e) => setSelectedAdmin({ ...selectedAdmin, grupo: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            >
              <option value="">Seleccionar Grupo</option>
              <option value="admin">Admin</option>
              <option value="mod">Mod</option>
            </select>
            <select
              value={selectedAdmin.activo}
              onChange={(e) => setSelectedAdmin({ ...selectedAdmin, activo: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg"
              required
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
            <button type="submit" className="bg-emerald-500 text-white py-2 px-6 rounded-md hover:bg-emerald-600">
              Guardar Cambios
            </button>
          </form>
        )}

        {/* Confirmación */}
        {showConfirmation && (
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-600">
              ¿Estás seguro de que deseas borrar a {adminAEliminar?.nombre}?
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={confirmarBorrado} className="bg-green-500 text-white py-2 px-4 rounded-md">
                Sí, Borrar
              </button>
              <button onClick={cancelarBorrado} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                No, Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Mensajes */}
        {successMessage && (
          <div className="mt-6 bg-green-100 text-green-600 p-4 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Botones adicionales */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAtras}
            className="bg-slate-400 text-white py-2 px-4 rounded-md hover:bg-slate-500"
          >
            Atrás
          </button>
          <button
            onClick={handleVolverPanel}
            className="bg-slate-400 text-white py-2 px-4 rounded-md hover:bg-slate-500"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Administradores;
