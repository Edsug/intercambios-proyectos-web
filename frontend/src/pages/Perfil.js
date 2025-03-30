import React, { useState } from "react";
import "../styles/Configuracion.css";

const Configuracion = () => {
  const [userProfile, setUserProfile] = useState({
    nombre: "ADMINISTRADOR",
    password: "",
    rol: "Administrador"
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Perfil actualizado:", userProfile);
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>⚙️ Configuración</h1>
        <p>Administra tu cuenta.</p>
      </div>
      
      <div className="config-container">
        <div className="config-content">
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
        </div>
      </div>
    </div>
  );
};

export default Configuracion;