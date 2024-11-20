import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';  // Componente principal
import IndexAdmin from './index_admin';  // Página de administración
import IndexMod from './index_mod';  // Página de mod 
import IndexHelper from './index_helper';  // Página de helper
import GestionUsuarios from './gestion-usuarios';  // Gestión de usuarios
import Jugadores from './jugadores';  // Gestión de jugadores
import Vehiculos from './vehiculos';  // Gestión de vehículos
import VehiculosHelper from './vehiculos_helper';  // Visualizacion para helper de vehiculos
import Gestion_administradorr from './gestion_administrador';  // Gestión de administrador
import Crear_administrador from './crear_administrador'; 
import Crear_admin from './crear_admin'; 
import reportWebVitals from './reportWebVitals';
import JugadoresHelper from './jugadores_helper';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />  {/* Página principal */}
        <Route path="/index_admin" element={<IndexAdmin />} />  {/* Página de administración luego del login*/}
        <Route path="/index_mod" element={<IndexMod />} />  {/* Página de mods luego del login */}
        <Route path="/index_helper" element={<IndexHelper />} />  {/* Página de helper luego del login */}
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />  {/* Página de gestión de usuarios */}
        <Route path="/jugadores" element={<Jugadores />} />  {/* Página de gestión de jugadores */}
        <Route path="/jugadores_helper" element={<JugadoresHelper />} />  {/* Página de gestión de jugadores */}
        <Route path="/vehiculos" element={<Vehiculos />} />  {/* Página de gestión de vehículos */}
        <Route path="/vehiculos_helper" element={<VehiculosHelper />} />  {/* Página de visualizacion de vehículos helper*/}
        <Route path="/gestion_administrador" element={<Gestion_administradorr />} />  {/* Página de gestión de administrador */}
        <Route path="/crear_administrador" element={<Crear_administrador/>} />  {/* Página de gestión de administrador */}
        <Route path="/crear_admin" element={<Crear_admin/>} />  {/* Página de gestión de administrador */}
      
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
