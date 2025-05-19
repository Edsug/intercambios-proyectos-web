import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlumnos: 0,
    nuevosRegistros: 0,
    cursosActivos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/basecambios/get_dashboard_stats.php")
      .then(res => res.json())
      .then(data => {
        setStats({
          totalAlumnos: data.totalAlumnos,
          nuevosRegistros: data.nuevosRegistros,
          cursosActivos: data.cursosActivos,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-content">
        <p>Cargando estadísticas…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-welcome">
        <h1>📊 Bienvenido al Dashboard</h1>
        <p>Aquí verás un resumen de los alumnos registrados y las últimas acciones.</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de alumnos</h3>
          <p className="stat-number">{stats.totalAlumnos}</p>
        </div>
        <div className="stat-card">
          <h3>Registros nuevos (últ. 7d)</h3>
          <p className="stat-number">{stats.nuevosRegistros}</p>
        </div>
        <div className="stat-card">
          <h3>Cursos activos</h3>
          <p className="stat-number">{stats.cursosActivos}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
