import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const Busqueda = () => {
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
          <h1>🔍 Buscar Alumnos</h1>
          <p>Aquí se podrán buscar los alumnos registrados.</p>
        </div>
      </div>
    </div>
  );
};

export default Busqueda;
