import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Para el icono del ojo
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

function CrearAdministrador() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState(""); // Nuevo estado para confirmar la contraseña
  const [email, setEmail] = useState("");
  const [grupo, setGrupo] = useState("");
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] =
    useState(false); // Estado para mostrar/ocultar la confirmar contraseña
  const [crearOtro, setCrearOtro] = useState(false); // Estado para mostrar la pregunta de crear otro administrador

  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCrearOtro(false);

    // Verifica que todas las contraseñas coincidan
    if (
      !nombre ||
      !usuario ||
      !contraseña ||
      !email ||
      !grupo ||
      !confirmarContraseña
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const data = { nombre, usuario, contraseña, email, grupo, activo };

    try {
      const response = await fetch(
        "http://localhost:3002/api/crear-administrador",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Mostrar mensaje de éxito con los datos del usuario y contraseña
        setMensaje(
          `Administrador creado con éxito. Usuario: ${usuario}, Contraseña: ${contraseña}`
        );

        // Preguntar si quiere crear otro administrador
        setCrearOtro(true);

        // Limpiar los campos del formulario
        setNombre("");
        setUsuario("");
        setContraseña("");
        setConfirmarContraseña("");
        setEmail("");
        setGrupo("");
        setActivo(true);
      } else {
        setError(result.message || "Hubo un error al crear el administrador.");
      }
    } catch (err) {
      setError("Error al enviar los datos. Intenta de nuevo.");
      console.error("Error al enviar los datos:", err);
    }
  };

  const handleCrearOtro = () => {
    setCrearOtro(false); // Ocultar la pregunta de crear otro
  };

  const handleRedirigir = () => {
    setCrearOtro(false); // Ocultar la pregunta de crear otro
    navigate("/index_admin"); // Redirigir a la página de administración
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      {/* Imagen insertada */}
      <img
        src="https://cdn.discordapp.com/attachments/1113261514669969428/1307562416271523881/gtaonline-after-hours-the-black-madonna-artwork-png-8662-1600.png?ex=673ac1e5&is=67397065&hm=4d8a86a868b2a3c9bef210227d725444f0a8eacba359e10bdeae995cfeee4944&"
        alt="Trevor Philips"
        className="w-[92.5%] h-[auto] max-w-none object-contain absolute top-[-5%] left-[-40%] transform translate-x-[50px] translate-y-[30px]"
      />

      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg relative">
        <h2 className="text-2xl font-bold text-center mb-4">
          Menu de nuevos administradores
        </h2>
        {mensaje && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            {mensaje}
            {crearOtro && (
              <div className="mt-4 text-center">
                <p className="mb-2">¿Deseas crear otro administrador?</p>
                <button
                  onClick={handleCrearOtro}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                  Sí
                </button>
                <button
                  onClick={handleRedirigir}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  No
                </button>
              </div>
            )}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {!crearOtro && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Usuario:</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">
                Contraseña:
              </label>
              <input
                type={mostrarContraseña ? "text" : "password"}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
              >
                {mostrarContraseña ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">
                Vuelve a poner la contraseña:
              </label>
              <input
                type={mostrarConfirmarContraseña ? "text" : "password"}
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() =>
                  setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)
                }
              >
                {mostrarConfirmarContraseña ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Grupo:</label>
              <input
                type="text"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={activo}
                onChange={() => setActivo(!activo)}
                className="mr-2"
              />
              <label className="text-sm">Activo</label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Crear Administrador
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CrearAdministrador;
