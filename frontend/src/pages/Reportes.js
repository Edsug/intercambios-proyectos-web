import React, { useState } from "react";
import "../styles/Dashboard.css";

const Reportes = () => {
  const [reportType, setReportType] = useState('general');

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>📊 Generar Reportes</h1>
        <p>Aquí se podrán generar y exportar reportes.</p>
      </div>
      
      <div className="report-container">
        <div className="report-options">
          <h3>Tipo de Reporte</h3>
          <div className="report-type-selector">
            <button 
              className={`report-type-button ${reportType === 'general' ? 'active' : ''}`}
              onClick={() => setReportType('general')}
            >
              General
            </button>
            <button 
              className={`report-type-button ${reportType === 'becas' ? 'active' : ''}`}
              onClick={() => setReportType('becas')}
            >
              Becas
            </button>
            <button 
              className={`report-type-button ${reportType === 'carreras' ? 'active' : ''}`}
              onClick={() => setReportType('carreras')}
            >
              Por Carrera
            </button>
            <button 
              className={`report-type-button ${reportType === 'paises' ? 'active' : ''}`}
              onClick={() => setReportType('paises')}
            >
              Por País
            </button>
          </div>
          
          <div className="report-filters">
            <h3>Filtros</h3>
            <div className="filter-row">
              <label>
                Período:
                <select className="filter-select">
                  <option value="2024A">2024A</option>
                  <option value="2023B">2023B</option>
                  <option value="2023A">2023A</option>
                </select>
              </label>
              
              <label>
                Formato:
                <select className="filter-select">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </label>
            </div>
          </div>
          
          <button className="generate-report-button">Generar Reporte</button>
        </div>
        
        <div className="report-preview">
          <h3>Vista Previa</h3>
          <div className="preview-container">
            {reportType === 'general' && (
              <div className="report-chart">
                <p>Gráfico de estadísticas generales</p>
                {/* Aquí podrías incluir un componente de gráfico real */}
                <div className="placeholder-chart">
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '80%'}}></div>
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                </div>
              </div>
            )}
            
            {reportType === 'becas' && (
              <div className="report-chart">
                <p>Distribución de becas</p>
                <div className="placeholder-pie-chart">
                  <div className="pie-segment segment1"></div>
                  <div className="pie-segment segment2"></div>
                  <div className="pie-segment segment3"></div>
                </div>
              </div>
            )}
            
            {reportType === 'carreras' && (
              <div className="report-chart">
                <p>Alumnos por carrera</p>
                <div className="placeholder-chart">
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '75%'}}></div>
                  <div className="chart-bar" style={{height: '40%'}}></div>
                </div>
              </div>
            )}
            
            {reportType === 'paises' && (
              <div className="report-chart">
                <p>Destinos internacionales</p>
                <div className="placeholder-world-map">
                  <div className="map-placeholder"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;