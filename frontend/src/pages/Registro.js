import React from "react";
import Sidebar from "../components/Sidebar";

const Registro = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>📝 Registrar Alumno</h1>
        <p>Aquí se podrá registrar a los alumnos.</p>
      </div>
    </div>
  );
};

export default Registro;
