import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>📊 Bienvenido al Dashboard</h1>
        <p>Aquí verás un resumen de los alumnos registrados y las últimas acciones.</p>
      </div>
    </div>
  );
};

export default Dashboard;
