import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const Reportes = () => {
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
          <h1>📊 Generar Reportes</h1>
          <p>Aquí se podrán generar y exportar reportes.</p>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
