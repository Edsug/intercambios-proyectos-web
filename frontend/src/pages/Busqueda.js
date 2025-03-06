import React from "react";
import Sidebar from "../components/Sidebar";

const Busqueda = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>🔍 Buscar Alumnos</h1>
        <p>Aquí se podrán buscar los alumnos registrados.</p>
      </div>
    </div>
  );
};

export default Busqueda;
