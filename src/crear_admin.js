import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CrearAdministrador() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [grupo, setGrupo] = useState("");
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] =
    useState(false);
  const [crearOtro, setCrearOtro] = useState(false);

  const navigate = useNavigate();
  const handleUserManagement = () => {
    navigate("/gestion-usuarios");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCrearOtro(false);

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
        setMensaje(
          <>
            Administrador creado con éxito!.<br />
            Usuario: {usuario}, Contraseña: {contraseña}
          </>
        );
        setCrearOtro(true);
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
    setCrearOtro(false);
  };

  const handleRedirigir = () => {
    setCrearOtro(false);
    navigate("/index_admin");
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      <div className="w-full max-w-md p-6 rounded-lg mt-20 mx-auto z-10">
        <h2 className="w-auto text-2xl text-emerald-500 font-bold text-center mb-4">
          REGISTRO DE NUEVO STAFF
        </h2>
        {mensaje && (
          <div className="bg-white font-semibold text-center text-slate-950 p-2 mb-4 rounded">
            {mensaje}
            {crearOtro && (
              <div className="mt-4 text-center">
                <p className="mb-2">¿Deseas crear otro administrador?</p>
                <button
                  onClick={handleCrearOtro}
                  className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 mr-2"
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
              <label className="block text-sm text-white font-medium mb-1">
                Nombre:
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-white font-medium mb-1">
                Usuario:
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 relative">
              <label className="text-white block text-sm font-medium mb-1">
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
              <label className="text-white block text-sm font-medium mb-1">
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
              <label className="text-white block text-sm font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="text-white block text-sm font-medium mb-1">
                Grupo:
              </label>
              <select
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Selecciona un grupo</option>
                <option value="mod">Mod (Gestiona solo usuarios)</option>
                <option value="admin">Admin (Todos los privilegios)</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={activo}
                onChange={() => setActivo(!activo)}
                className="mr-2"
              />
              <label className="text-white text-sm">Activo</label>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleUserManagement}
                className="w-auto py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Volver
              </button>
              <button
                type="submit"
                className="w-auto py-2 px-4 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                Crear Administrador
              </button>
            </div>
          </form>
        )}
      </div>
      <img
        src="/img/login_2.png"
        alt="Imagen de fondo"
        className="w-full object-cover opacity-25 absolute top-0 left-0 h-full z-0"
      />
    </div>
  );
}

export default CrearAdministrador;
