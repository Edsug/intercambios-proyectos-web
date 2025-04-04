import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import "../styles/Header.css";
import headerImage from "../assets/header.png";

const Header = ({ toggleSidebar, isOpen }) => {
  return (
    <>
      <div className="top-banner">
        <img src={headerImage} alt="Banner" className="header-banner-image" />
      </div>

      <header className="header">
        <button 
          className="hamburger-button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <div className="header-center">
          <h1 className="app-title">
            Sistema para la gestión de alumnos área de intercambios
          </h1>
        </div>
      </header>

      {/* 🚀 Aquí se renderiza la barra de navegación */}
      <Navbar />
    </>
  );
};

export default Header;
