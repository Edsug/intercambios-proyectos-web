// Busqueda.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Busqueda.css';
import { useBusquedaConfig } from '../config/config-busqueda';

export default function Busqueda() {
  const {
    searchType, setSearchType,
    searchValue, setSearchValue,
    filtrosAvanzados, setFiltrosAvanzados,
    hasSearched, loading,
    alumnos, mostrarColumnas, setMostrarColumnas,
    selectFields, filtros,
    handleFilterChange,
    resetFiltros,
    handleSearch,
    handleExportExcel,
    handleExportPDF,
    columnasPDF, setColumnasPDF
  } = useBusquedaConfig();

  return (
    <div className="dashboard-content">
      <header className="content-header">
        <h1>Buscar Alumno</h1>
        <p>Encuentra y filtra alumnos en movilidad.</p>
      </header>

      <section className="search-container">
        <div className="search-box">
          <select
            value={searchType}
            onChange={e => setSearchType(e.target.value)}
          >
            <option value="nombre">Nombre</option>
            <option value="codigo">Código</option>
            <option value="folio">Folio</option>
          </select>

          <input
            type="text"
            placeholder={`Buscar por ${searchType}...`}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando…' : 'Buscar'}
          </button>

          <button onClick={() => setFiltrosAvanzados(prev => !prev)}>
            {filtrosAvanzados ? 'Ocultar filtros' : 'Mostrar filtros avanzados'}
          </button>
        </div>

        {filtrosAvanzados && (
          <div className="advanced-filters">
            <h3>Filtros Avanzados</h3>
            <div className="filter-grid">
              {selectFields.map(({ l, n, opts }) => (
                <div className="filter-item" key={n}>
                  <label>{l}:</label>
                  <select
                    name={n}
                    value={filtros[n]}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    {opts.map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="filter-buttons">
              <button onClick={handleSearch} disabled={loading}>
                Aplicar filtros
              </button>
              <button onClick={resetFiltros}>Limpiar filtros</button>
            </div>
          </div>
        )}
      </section>

      {alumnos.length > 0 && (
        <section className="export-section">
          <div className="export-section-title">Generación de reporte</div>
          <div className="export-actions">
            <button
              onClick={() => setMostrarColumnas(prev => !prev)}
              className="column-toggle-button"
            >
              <i className={`fas ${mostrarColumnas ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              {mostrarColumnas
                ? 'Ocultar selección de columnas'
                : 'Habilitar selección de columnas'}
            </button>
            <div className="export-buttons">
              <button onClick={handleExportExcel} className="export-button">
                <i className="fas fa-file-excel"></i> Exportar a Excel
              </button>
              <button onClick={handleExportPDF} className="export-button">
                <i className="fas fa-file-pdf"></i> Exportar a PDF
              </button>
            </div>
          </div>
          {mostrarColumnas && (
            <div className="column-selector">
              <h4>Selección de columnas:</h4>
              <div className="column-grid">
                {columnasPDF.map((col, idx) => (
                  <label key={idx} className="column-option">
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => {
                        const updated = [...columnasPDF];
                        updated[idx].visible = !updated[idx].visible;
                        setColumnasPDF(updated);
                      }}
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="results-container">
        <div className="results-header">
          <h3>Resultados ({alumnos.length})</h3>
        </div>
        {loading && <p className="loading-msg">Cargando resultados…</p>}
        {!loading && hasSearched && alumnos.length === 0 && (
          <p className="no-results">
            No se encontraron alumnos con los criterios especificados.
          </p>
        )}
        {alumnos.length > 0 && (
          <div className="table-responsive">
            <table id="alumnos-table" className="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Nivel</th>
                  <th>Especialidad</th>
                  <th>Semestre</th>
                  <th>Promedio</th>
                  <th>Sexo</th>
                  <th>F. Nac.</th>
                  <th>Sangre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Cont. Emerg.</th>
                  <th>Nom. Cont.</th>
                  <th>NSS</th>
                  <th>Programa</th>
                  <th>Folio</th>
                  <th>Est. Programa</th>
                  <th>Actividad</th>
                  <th>Tipo Dest.</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((al, i) => (
                  <tr key={i}>
                    <td>{al.codigo}</td>
                    <td>{al.nombre}</td>
                    <td>{al.apellidos}</td>
                    <td>{al.nivel_academico}</td>
                    <td>
                      {al.nivel_academico === 'LICENCIATURA'
                        ? al.carrera
                        : al.nivel_academico === 'MAESTRÍA'
                        ? al.maestria
                        : ''}
                    </td>
                    <td>{al.semestre}</td>
                    <td>{al.promedio}</td>
                    <td>{al.sexo}</td>
                    <td>{al.fecha_nacimiento}</td>
                    <td>{al.tipo_sangre}</td>
                    <td>{al.telefono}</td>
                    <td>{al.correo}</td>
                    <td>{al.contacto_emergencia}</td>
                    <td>{al.nombre_contacto_emergencia}</td>
                    <td>{al.nss}</td>
                    <td>{al.programa}</td>
                    <td>{al.folio}</td>
                    <td>{al.estado_programa}</td>
                    <td>{al.actividad}</td>
                    <td>{al.tipo_destino}</td>
                    <td>
                          <Link to={`/alumno/${al.codigo}`} className="action-button view" title="Ver alumno">
                            <i className="fas fa-eye"></i> Ver
                          </Link>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        )}
      </section>
    </div>
  );
}
