import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaFileAlt, FaSearch, FaClipboardList, FaCog } from "react-icons/fa"; 
import "../styles/SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const cargo = localStorage.getItem("cargo");

  const items = [];

  if (cargo === "Administrador") {
    items.push("dashboard", "registro", "busqueda", "configuracion");
  } else if (cargo === "Asistente") {
    items.push("dashboard", "registro", "busqueda");
  } else if (cargo === "Supervisor") {
    items.push("dashboard","busqueda");
  }

  const itemComponents = {
    dashboard: { path: "/dashboard", label: "Dashboard", icon: <FaChartBar size={20} /> },
    registro: { path: "/registro", label: "Registro", icon: <FaFileAlt size={20} /> },
    busqueda: { path: "/busqueda", label: "Buscar", icon: <FaSearch size={20} /> }, 
    reportes: { path: "/reportes", label: "Reportes", icon: <FaClipboardList size={20} /> },
    configuracion: { path: "/configuracion", label: "Configuración", icon: <FaCog size={20} /> }
  };

  return (
    <div className="sidebar-wrapper">
      <div id="sidebarMenu" className={isOpen ? 'open' : ''}>
        <ul className="sidebarMenuInner">
          {items.map((itemKey) => {
            const { path, label, icon } = itemComponents[itemKey];
            return (
              <li key={itemKey} className={location.pathname === path ? "active" : ""}>
                <Link to={path}>{icon} <span>{label}</span></Link>
              </li>
            );
          })}
        </ul>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
