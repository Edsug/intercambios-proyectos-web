import React, { useState } from "react";
import "../styles/Configuracion.css";

const Configuracion = () => {
  const [currentTab, setCurrentTab] = useState('perfil');
  const [userProfile, setUserProfile] = useState({
    nombre: 'ADMINISTRADOR',
    password: '********',
    rol: 'Administrador'
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    language: 'es',
    notificationsEnabled: true,
    autoSave: true
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings({
      ...systemSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", userProfile);
    alert("Perfil actualizado correctamente");
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    console.log("Settings updated:", systemSettings);
    alert("Configuración actualizada correctamente");
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>⚙️ Configuración</h1>
        <p>Administra tu cuenta y configura el sistema.</p>
      </div>
      
      <div className="config-container">
        <div className="config-tabs">
          <button 
            className={`config-tab ${currentTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setCurrentTab('perfil')}
          >
            Perfil de Usuario
          </button>
          <button 
            className={`config-tab ${currentTab === 'sistema' ? 'active' : ''}`}
            onClick={() => setCurrentTab('sistema')}
          >
            Configuración del Sistema
          </button>
        </div>
        
        <div className="config-content">
          {currentTab === 'perfil' && (
            <form onSubmit={handleProfileSubmit} className="config-form">
              <div className="form-group">
                <label>Nombre:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={userProfile.nombre} 
                  onChange={handleProfileChange} 
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input 
                  type="password" 
                  name="password" 
                  value={userProfile.password} 
                  onChange={handleProfileChange} 
                />
              </div>
              <div className="form-group">
                <label>Rol:</label>
                <select 
                  name="rol" 
                  value={userProfile.rol} 
                  onChange={handleProfileChange}
                  disabled
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Editor">Editor</option>
                  <option value="Visualizador">Visualizador</option>
                </select>
              </div>
              <button type="submit" className="save-button">Guardar Cambios</button>
            </form>
          )}
          
          {currentTab === 'sistema' && (
            <form onSubmit={handleSettingsSubmit} className="config-form">
              <div className="form-group">
                <label>Tema:</label>
                <select 
                  name="theme" 
                  value={systemSettings.theme} 
                  onChange={handleSettingsChange}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
              <div className="form-group">
                <label>Idioma:</label>
                <select 
                  name="language" 
                  value={systemSettings.language} 
                  onChange={handleSettingsChange}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="notificationsEnabled" 
                    checked={systemSettings.notificationsEnabled} 
                    onChange={handleSettingsChange} 
                  />
                  Habilitar notificaciones
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="autoSave" 
                    checked={systemSettings.autoSave} 
                    onChange={handleSettingsChange} 
                  />
                  Guardar automáticamente
                </label>
              </div>
              <button type="submit" className="save-button">Guardar Configuración</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracion;

