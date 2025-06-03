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
import Paises from "../components/configuracion/paises";
import Nacionalidades from "../components/configuracion/Nacionalidades";
import TiposDestino from "../components/configuracion/TiposDestino";
import Actividades from "../components/configuracion/Actividades";
import Ciclos from "../components/configuracion/Ciclos";
import Discapacidades from "../components/configuracion/Discapacidades";
import EstadosPrograma from "../components/configuracion/EstadosPrograma";

const Configuracion = () => {
  const [currentTab, setCurrentTab] = useState("sistema");
  const [subTab, setSubTab] = useState("carreras");

  // Configuración de tabs principales
  const mainTabs = [
    {
      id: "sistema",
      title: "🔧 Configuración del Sistema",
      description: "Gestiona catálogos y parámetros del sistema"
    },
    {
      id: "usuarios",
      title: "👥 Gestión de Usuarios",
      description: "Administra usuarios y permisos"
    }
  ];

  // Configuración de subtabs del sistema
  const systemSubTabs = [
    { id: "carreras", title: "🎓 Carreras", component: <Carreras /> },
    { id: "maestrias", title: "📚 Maestrías", component: <Maestrias /> },
    { id: "doctorados", title: "🎖️ Doctorados", component: <Doctorados /> },
    { id: "programas", title: "📋 Programas", component: <Programas /> },
    { id: "becas", title: "💰 Becas", component: <Becas /> },
    { id: "estados", title: "🗺️ Estados", component: <Estados /> },
    { id: "paises", title: "🌍 Países", component: <Paises /> },
    { id: "nacionalidades", title: "🏳️ Nacionalidades", component: <Nacionalidades /> },
    { id: "tiposDestino", title: "📍 Tipos de Destino", component: <TiposDestino /> },
    { id: "actividades", title: "🎯 Actividades", component: <Actividades /> },
    { id: "ciclos", title: "📅 Ciclos", component: <Ciclos /> },
    { id: "discapacidades", title: "♿ Discapacidades", component: <Discapacidades /> },
    { id: "estadosPrograma", title: "📑 Estados Programa", component: <EstadosPrograma /> }
  ];

  const handleMainTabChange = (tabId) => {
    setCurrentTab(tabId);
    // Reset subtab cuando cambiamos de tab principal
    if (tabId === "sistema") {
      setSubTab("carreras");
    }
  };

  const getCurrentSubTabComponent = () => {
    const subTabConfig = systemSubTabs.find(tab => tab.id === subTab);
    return subTabConfig ? subTabConfig.component : null;
  };

  return (
    <div className="dashboard-content">
      {/* Cabecera principal con información dinámica */}
      <div className="content-header">
        <h1>⚙️ Configuración del Sistema</h1>
        <p>
          {currentTab === "sistema" 
            ? "Administra catálogos, configuraciones y parámetros del sistema de movilidad estudiantil."
            : "Gestiona usuarios, permisos y accesos al sistema de forma segura."
          }
        </p>
      </div>

      {/* Navegación principal */}
      <div className="config-tabs main-tabs">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            className={`config-tab ${currentTab === tab.id ? "active" : ""}`}
            onClick={() => handleMainTabChange(tab.id)}
            title={tab.description}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="config-content">
        {/* Sección de Usuarios */}
        {currentTab === "usuarios" && (
          <div className="config-container">
            <Usuarios />
          </div>
        )}

        {/* Sección de Sistema con subtabs */}
        {currentTab === "sistema" && (
          <div className="config-container">
            {/* Navegación de subtabs */}
            <div className="config-tabs sub-tabs">
              {systemSubTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`config-tab ${subTab === tab.id ? "active" : ""}`}
                  onClick={() => setSubTab(tab.id)}
                  title={`Gestionar ${tab.title}`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Contenido del subtab activo */}
            <div className="subtab-content">
              {getCurrentSubTabComponent()}
            </div>
          </div>
        )}
      </div>

      {/* Información adicional del contexto */}
      <div className="config-footer">
        <div className="config-info">
          <small style={{ 
            color: 'var(--text-lighter)', 
            fontSize: '0.85rem',
            display: 'block',
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--section-bg)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border-color)'
          }}>
            {currentTab === "sistema" 
              ? `Configurando: ${systemSubTabs.find(t => t.id === subTab)?.title || ''} • ${systemSubTabs.length} módulos disponibles`
              : "Gestión de usuarios • Permisos y accesos del sistema"
            }
          </small>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;