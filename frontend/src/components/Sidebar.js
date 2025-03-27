import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaChartBar, 
  FaFileAlt, 
  FaSearch, 
  FaClipboardList, 
  FaCog
} from "react-icons/fa"; 
import "../styles/SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <div className="sidebar-wrapper">
      <div id="sidebarMenu" className={isOpen ? 'open' : ''}>
        <ul className="sidebarMenuInner">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard" onClick={toggleSidebar}>
              <FaChartBar size={20} /> <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/registro" ? "active" : ""}>
            <Link to="/registro" onClick={toggleSidebar}>
              <FaFileAlt size={20} /> <span>Registro</span>
            </Link>
          </li>
          <li className={location.pathname === "/busqueda" ? "active" : ""}>
            <Link to="/busqueda" onClick={toggleSidebar}>
              <FaSearch size={20} /> <span>Buscar</span>
            </Link>
          </li>
          <li className={location.pathname === "/reportes" ? "active" : ""}>
            <Link to="/reportes" onClick={toggleSidebar}>
              <FaClipboardList size={20} /> <span>Reportes</span>
            </Link>
          </li>
          <li className={location.pathname === "/configuracion" ? "active" : ""}>
            <Link to="/configuracion" onClick={toggleSidebar}>
              <FaCog size={20} /> <span>Configuración</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
