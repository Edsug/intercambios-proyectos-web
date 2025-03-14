import React from "react";
import { Link } from "react-router-dom";
import { 
  FaBars,
  FaTimes,
  FaChartBar, 
  FaFileAlt, 
  FaSearch, 
  FaClipboardList, 
  FaCog 
} from "react-icons/fa"; 
import "../styles/SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul>
        <li>
          <Link to="/dashboard" onClick={toggleSidebar}>
            <FaChartBar /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/registro" onClick={toggleSidebar}>
            <FaFileAlt /> {isOpen && "Registro"}
          </Link>
        </li>
        <li>
          <Link to="/busqueda" onClick={toggleSidebar}>
            <FaSearch /> {isOpen && "Buscar"}
          </Link>
        </li>
        <li>
          <Link to="/reportes" onClick={toggleSidebar}>
            <FaClipboardList /> {isOpen && "Reportes"}
          </Link>
        </li>
        <li>
          <Link to="/configuracion" onClick={toggleSidebar}>
            <FaCog /> {isOpen && "Configuración"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
