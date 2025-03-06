import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li><Link to="/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/registro">📝 Registrar Alumno</Link></li>
        <li><Link to="/busqueda">🔍 Buscar Alumnos</Link></li>
        <li><Link to="/reportes">📊 Generar Reportes</Link></li>
        <li><Link to="/configuracion">⚙ Configuración</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
