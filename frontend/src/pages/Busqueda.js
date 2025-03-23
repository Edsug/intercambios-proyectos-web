import React from "react";
import "../styles/Dashboard.css";

const Busqueda = () => {
  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>🔍 Buscar Alumnos</h1>
        <p>Aquí se podrán buscar los alumnos registrados.</p>
      </div>
      
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Buscar por nombre, código o carrera..." 
            className="search-input"
          />
          <button className="search-button">Buscar</button>
        </div>
        
        <div className="filter-options">
          <select className="filter-select">
            <option value="">Todas las carreras</option>
            <option value="informatica">Informática</option>
            <option value="sistemas">Sistemas</option>
            <option value="negocios">Negocios</option>
          </select>
          
          <select className="filter-select">
            <option value="">Todos los años</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      
      <div className="results-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Promedio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A12345</td>
              <td>JUAN PÉREZ</td>
              <td>INFORMÁTICA</td>
              <td>95.5</td>
              <td>
                <button className="action-button view">Ver</button>
                <button className="action-button edit">Editar</button>
              </td>
            </tr>
            <tr>
              <td>B67890</td>
              <td>MARÍA LÓPEZ</td>
              <td>SISTEMAS</td>
              <td>88.7</td>
              <td>
                <button className="action-button view">Ver</button>
                <button className="action-button edit">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Busqueda;