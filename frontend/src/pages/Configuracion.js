import React, { useState } from "react";
import "../styles/Configuracion.css";

// Tabs principales
import Usuarios from "../components/configuracion/Usuarios";

// Subtabs de sistema
import Carreras from "../components/configuracion/Carreras";
import Maestrias from "../components/configuracion/Maestrias";
import Doctorados from "../components/configuracion/Doctorado";
import Programas from "../components/configuracion/Programas";
import Becas from "../components/configuracion/Becas";
import Estados from "../components/configuracion/Estados";
import Paises from "../components/configuracion/Paises";
import Nacionalidades from "../components/configuracion/Nacionalidades";
import TiposDestino from "../components/configuracion/TiposDestino";
import Actividades from "../components/configuracion/Actividades";
import Ciclos from "../components/configuracion/Ciclos"; // <-- Nuevo import

const Configuracion = () => {
  const [currentTab, setCurrentTab] = useState("sistema");
  const [subTab, setSubTab] = useState("carreras");

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>⚙️ Configuración</h1>
        <p>Administra tu cuenta y configura el sistema.</p>
      </div>

      {/* Tabs principales */}
      <div className="config-tabs main-tabs">
        <button
          className={`config-tab ${currentTab === "sistema" ? "active" : ""}`}
          onClick={() => setCurrentTab("sistema")}
        >
          Configuración del Sistema
        </button>
        <button
          className={`config-tab ${currentTab === "usuarios" ? "active" : ""}`}
          onClick={() => setCurrentTab("usuarios")}
        >
          Gestión de Usuarios
        </button>
      </div>

      {/* Contenido */}
      <div className="config-content">
        {currentTab === "usuarios" && <Usuarios />}

        {currentTab === "sistema" && (
          <div className="config-container">
            <div className="config-tabs sub-tabs">
              <button className={`config-tab ${subTab === "carreras" ? "active" : ""}`} onClick={() => setSubTab("carreras")}>Carreras</button>
              <button className={`config-tab ${subTab === "maestrias" ? "active" : ""}`} onClick={() => setSubTab("maestrias")}>Maestrías</button>
              <button className={`config-tab ${subTab === "doctorados" ? "active" : ""}`} onClick={() => setSubTab("doctorados")}>Doctorados</button>
              <button className={`config-tab ${subTab === "programas" ? "active" : ""}`} onClick={() => setSubTab("programas")}>Programas</button>
              <button className={`config-tab ${subTab === "becas" ? "active" : ""}`} onClick={() => setSubTab("becas")}>Becas</button>
              <button className={`config-tab ${subTab === "estados" ? "active" : ""}`} onClick={() => setSubTab("estados")}>Estados</button>
              <button className={`config-tab ${subTab === "paises" ? "active" : ""}`} onClick={() => setSubTab("paises")}>Países</button>
              <button className={`config-tab ${subTab === "nacionalidades" ? "active" : ""}`} onClick={() => setSubTab("nacionalidades")}>Nacionalidades</button>
              <button className={`config-tab ${subTab === "tiposDestino" ? "active" : ""}`} onClick={() => setSubTab("tiposDestino")}>Tipos de Destino</button>
              <button className={`config-tab ${subTab === "actividades" ? "active" : ""}`} onClick={() => setSubTab("actividades")}>Actividades</button>
              <button className={`config-tab ${subTab === "ciclos" ? "active" : ""}`} onClick={() => setSubTab("ciclos")}>Ciclos</button> {/* Nuevo tab */}
            </div>

            <div className="subtab-content">
              {subTab === "carreras" && <Carreras />}
              {subTab === "maestrias" && <Maestrias />}
              {subTab === "doctorados" && <Doctorados />}
              {subTab === "programas" && <Programas />}
              {subTab === "becas" && <Becas />}
              {subTab === "estados" && <Estados />}
              {subTab === "paises" && <Paises />}
              {subTab === "nacionalidades" && <Nacionalidades />}
              {subTab === "tiposDestino" && <TiposDestino />}
              {subTab === "actividades" && <Actividades />}
              {subTab === "ciclos" && <Ciclos />} {/* Nuevo contenido */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configuracion;
