import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';  // Componente principal
import IndexAdmin from './index_admin';  // Página de administración
import GestionUsuarios from './gestion-usuarios';  // Gestión de usuarios
import Jugadores from './jugadores';  // Gestión de jugadores
import Vehiculos from './vehiculos';  // Gestión de vehículos
import Gestion_administradorr from './gestion_administrador';  // Gestión de administrador
import Crear_administrador from './crear_administrador'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />  {/* Página principal */}
        <Route path="/index_admin" element={<IndexAdmin />} />  {/* Página de administración */}
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />  {/* Página de gestión de usuarios */}
        <Route path="/jugadores" element={<Jugadores />} />  {/* Página de gestión de jugadores */}
        <Route path="/vehiculos" element={<Vehiculos />} />  {/* Página de gestión de vehículos */}
        <Route path="/gestion_administrador" element={<Gestion_administradorr />} />  {/* Página de gestión de administrador */}
        <Route path="/crear_administrador" element={<Crear_administrador/>} />  {/* Página de gestión de administrador */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
