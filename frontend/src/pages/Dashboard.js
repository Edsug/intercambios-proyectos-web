import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="dashboard-main">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          <h1>📊 Bienvenido al Dashboard</h1>
          <p>Aquí verás un resumen de los alumnos registrados y las últimas acciones.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
