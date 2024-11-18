import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Estado para la notificación de éxito

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!usuario || !password) {
      setError("Usuario y contraseña son obligatorios");
      setLoading(false);
      return;
    }

    try {
      console.log("Enviando datos:", { usuario, password });

      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        setSuccess(true); // Mostrar la notificación de éxito
        setTimeout(() => {
          navigate("/index_admin"); // Navegar después de un breve tiempo
        }, 500);
      } else {
        const data = await response.json();
        console.error("Error en la respuesta del servidor:", data);
        setError(data.message || "Usuario o contraseña incorrectos");
       
      }
    } catch (err) {
      console.error("Error al conectar al servidor:", err);
      setError(
        "Hubo un error al conectar con el servidor. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900">
      <img
        src="/img/fondologin2.png"
        alt="Imagen de fondo"
        className="absolute inset-0 w-full h-full object-cover"
      />
     
      <div className="shadow-md shadow-slate-700 w-full max-w-sm p-8 bg-white rounded-lg shadow-lg relative z-10">
        <h2 className="text-5xl font-bold text-center text-slate-900 mb-10">
          A D C O R E
        </h2>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-gray-100 bg-white p-4 mb-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-red-500 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <strong className="block font-medium text-gray-900">
                  {error}
                </strong>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div
            role="alert"
            className="rounded-xl border border-gray-100 bg-white p-4 mb-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-emerald-500 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <strong className="block font-medium text-gray-900">
                  Conexión exitosa
                </strong>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="usuario"
              className="block text-sm font-semibold text-slate-900"
            >
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              aria-label="Usuario"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="M0SK4"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-900"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Contraseña"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="1234"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Mostrar/Ocultar contraseña"
              >
                {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 rounded" />
              Recordar
            </label>
            <a href="#" className="text-sm text-cyan-500 hover:underline">
              ¿Contraseña olvidada?
            </a>
          </div>
         

          <button
            type="submit"
            disabled={loading}
            className="shadow-lg shadow-slate-950/50 rounded-lg font-semibold text-white w-full py-2 mt-4 bg-emerald-500 hover:bg-emerald-600"
          >
            {loading ? "Cargando..." : "Acceder"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-cyan-500 hover:underline">
            Contacta con el administrador
          </a>
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.8,
          fontSize: "14px",
          color: "#fff",
        }}
      >
        <p>AdCore 2024 Tesis</p>
      </div>
    </div>
  );
}

export default App;
