import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación entre páginas

function Jugadores() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [filteredUsers, setFilteredUsers] = useState([]); // Estado para almacenar los usuarios filtrados
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [userToEdit, setUserToEdit] = useState(null); // Usuario que se va a editar
  const [userToDelete, setUserToDelete] = useState(null); // Usuario que se va a eliminar
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el texto de búsqueda
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito para operaciones

  useEffect(() => {
    fetch("http://localhost:3002/api/users") // Asegúrate de usar la URL correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos: " + response.statusText);
        }
        return response.json(); // Parsear la respuesta a JSON
      })
      .then((data) => {
        setUsers(data); // Almacenar los datos de los usuarios en el estado
        setFilteredUsers(data); // Inicializar los usuarios filtrados
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const handleEdit = (user) => {
    setUserToEdit(user); // Establecer el usuario a editar
    setShowModal(true); // Mostrar el modal
  };

  const handleChange = (e) => {
    setUserToEdit({
      ...userToEdit,
      [e.target.name]: e.target.value,
    }); 
  };

 
  const VolverAtras = () => {
    navigate("/index_admin");
  };
  const NoGuardar = () => {
    setUserToEdit(null); // Limpiar el usuario que se está editando
    setShowModal(false);  // Cerrar el modal
  };

  const handleSave = () => {
    if (userToEdit) {
      // Llamar al backend para actualizar el usuario
      fetch(`http://localhost:3002/api/users/${userToEdit.id}`, {
        method: "PUT", // Usamos PUT para actualizar el recurso
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToEdit),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el usuario");
          }
          return response.json();
        })
        .then(() => {
          // Mostrar el mensaje de éxito
          setSuccessMessage(`Modificaste con éxito a ${userToEdit.firstname} ${userToEdit.lastname}`);
          // Actualizar la lista de usuarios con el usuario modificado
          setUsers(users.map((user) => (user.id === userToEdit.id ? userToEdit : user)));
         
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario:", error);
        });
    }
    setShowModal(false); // Cerrar el modal después de guardar
  };

  const handleDelete = (user) => {
    setUserToDelete(user); // Establecer el usuario a eliminar
  };

  const confirmDelete = () => {
    if (userToDelete) {
      fetch(`http://localhost:3002/api/users/${userToDelete.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el usuario");
          }
          return response.json();
        })
        .then(() => {
          // Mostrar el mensaje de éxito
          setSuccessMessage(`Eliminaste con éxito a ${userToDelete.firstname} ${userToDelete.lastname}`);
          // Eliminar el usuario de la lista local
          setUsers(users.filter((user) => user.id !== userToDelete.id));
          setUserToDelete(null); // Limpiar el usuario a eliminar
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
        });
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null); // Cancelar la eliminación
  };

  // Filtrar usuarios según la búsqueda
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg w-full max-w-6xl"> {/* Aumentamos el ancho máximo */}
        {/* Título centrado */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          JUGADORES ACTUALES
        </h2>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Campo de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, trabajo, licencia..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Tabla de Usuarios */}
        <table className="min-w-full table-auto rounded-lg">
          <thead className="bg-gray-100 rounded-t-lg">
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Licencia</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Apellido</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Trabajo</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Grado</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Grupo</th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            
            {/* Mostrar los datos de los usuarios filtrados */}
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.identifier}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.firstname}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.lastname}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.job}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.job_grade}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">{user.group}</td>
                <td className="px-6 py-3 border-b text-sm text-gray-600">
                  <div className="flex justify-start space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
                
              </tr>
            ))}
            
          </tbody>
          
        </table>
        <button
  type="button"
  onClick={VolverAtras}
  className="w-auto mx-auto mt-4 bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 block"
>
  Atras
</button>

      </div>

      {/* Modal de Confirmación para Eliminar */}
      {userToDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro de eliminar a {userToDelete.firstname} {userToDelete.lastname}?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Usuario */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Usuario</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="firstname" className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={userToEdit.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-gray-700">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={userToEdit.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="job" className="block text-gray-700">Trabajo</label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={userToEdit.job}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="job_grade" className="block text-gray-700">Grado</label>
                <input
                  type="number"
                  id="job_grade"
                  name="job_grade"
                  value={userToEdit.job_grade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="group" className="block text-gray-700">Grupo</label>
                <input
                  type="text"
                  id="group"
                  name="group"
                  value={userToEdit.group}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={NoGuardar}
                className="w-full bg-red-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
              Volver
              </button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Jugadores;
