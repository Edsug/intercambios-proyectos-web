import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-welcome">
        <h1>📊 Bienvenido al Dashboard</h1>
        <p>Aquí verás un resumen de los alumnos registrados y las últimas acciones.</p>
      </div>
      
      {/* Aquí puedes agregar más contenido del dashboard como estadísticas, gráficos, etc. */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de alumnos</h3>
          <p className="stat-number">124</p>
        </div>
        <div className="stat-card">
          <h3>Registros nuevos</h3>
          <p className="stat-number">8</p>
        </div>
        <div className="stat-card">
          <h3>Cursos activos</h3>
          <p className="stat-number">12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;