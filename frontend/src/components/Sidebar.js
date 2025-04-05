import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaFileAlt, FaSearch, FaClipboardList, FaCog } from "react-icons/fa"; 
import "../styles/SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className="sidebar-wrapper">
      <div id="sidebarMenu" className={isOpen ? 'open' : ''}>
        <ul className="sidebarMenuInner">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <FaChartBar size={20} /> <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/registro" ? "active" : ""}>
            <Link to="/registro">
              <FaFileAlt size={20} /> <span>Registro</span>
            </Link>
          </li>
          <li className={location.pathname === "/busqueda" ? "active" : ""}>
            <Link to="/busqueda">
              <FaSearch size={20} /> <span>Buscar</span>
            </Link>
          </li>
          <li className={location.pathname === "/reportes" ? "active" : ""}>
            <Link to="/reportes">
              <FaClipboardList size={20} /> <span>Reportes</span>
            </Link>
          </li>
          <li className={location.pathname === "/configuracion" ? "active" : ""}>
            <Link to="/configuracion">
              <FaCog size={20} /> <span>Configuración</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* Overlay para cerrar sidebar en móviles */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;