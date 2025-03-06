import React from "react";
import Sidebar from "../components/Sidebar";

const Reportes = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>📊 Generar Reportes</h1>
        <p>Aquí se podrán generar y exportar reportes.</p>
      </div>
    </div>
  );
};

export default Reportes;
