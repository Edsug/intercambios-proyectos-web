import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaKey, FaUserEdit, FaBars } from "react-icons/fa";

import "../styles/Header.css";
import logo from "../assets/logo.png"; // Importa logo
import letrasCu from "../assets/LetrasCu.png"; // Match the exact filename


const Header = ({ toggleSidebar }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    closeUserMenu();
    window.location.reload(); // Recarga la página
  };

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="menu-btn">
          <FaBars size={50} />
        </button>
      </div>

      {/* Contenedor central para imágenes */}
      <div className="header-center">
        <img src={logo} alt="Logo" className="header-logo" />
        <img src={letrasCu} alt="Letras CU" className="header-letters" />
      </div>

      <div className="user-section">
        <button onClick={toggleUserMenu} className="user-btn">
          <FaUserCircle size={60} />
        </button>

        {userMenuOpen && (
          <div className="user-menu">
            <button onClick={closeUserMenu}><FaUserEdit /> Editar Perfil</button>
            <button onClick={closeUserMenu}><FaKey /> Cambiar Contraseña</button>
            <button onClick={handleLogout}><FaSignOutAlt /> Cerrar Sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
