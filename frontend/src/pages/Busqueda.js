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

          <div class="search-actions">
            <button 
              class="btn btn-primary" 
              onClick={handleSearch} 
              disabled={loading}
            >
              {loading ? 'Buscando…' : (
                <><i className="fas fa-search"></i> Buscar</>
              )}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setFiltrosAvanzados(prev => !prev)}
            >
              <i className={`fas ${filtrosAvanzados ? 'fa-times' : 'fa-filter'}`}></i>
              {filtrosAvanzados ? ' Ocultar filtros' : ' Filtros Avanzados'}
            </button>
          </div>
        </div>

        {filtrosAvanzados && (
          <div className="advanced-filters">
            <div className="filters-header">
              <i className="fas fa-sliders-h"></i>
              Filtros Avanzados
            </div>
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

              {/* Semestre como input numérico */}
              <div className="filter-item">
                <label>Semestre:</label>
                <input
                  type="number"
                  name="semestre"
                  value={filtros.semestre}
                  onChange={handleFilterChange}
                  min="1"
                  max="20"
                />
              </div>

              {/* Filtros de fecha */}
              <div className="filter-item">
                <label>Fecha Registro Desde:</label>
                <input
                  type="date"
                  name="fechaInicioDesde"
                  value={filtros.fechaInicioDesde || ''}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-item">
                <label>Fecha Registro Hasta:</label>
                <input
                  type="date"
                  name="fechaInicioHasta"
                  value={filtros.fechaInicioHasta || ''}
                  onChange={handleFilterChange}
                />
              </div>
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
                <th>Certif. Calif.</th>
                <th>Seguro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a, i) => {
                const especialidad =
                  a.nivel_academico === 'LICENCIATURA'
                    ? a.carrera
                    : a.nivel_academico === 'MAESTRÍA'
                    ? a.maestria
                    : '';
                const esVerdadero = val => parseInt(val) === 1;

                return (
                  <tr key={i}>
                    <td className="highlight-cell">{a.codigo || <span className="empty-cell">-</span>}</td>
                    <td>{a.nombre || <span className="empty-cell">-</span>}</td>
                    <td>{a.apellidos || <span className="empty-cell">-</span>}</td>
                    <td>{a.nivel_academico || <span className="empty-cell">-</span>}</td>
                    <td>{especialidad || <span className="empty-cell">-</span>}</td>
                    <td>{a.semestre || <span className="empty-cell">-</span>}</td>
                    <td>{a.promedio || <span className="empty-cell">-</span>}</td>
                    <td>
                      {esVerdadero(a.certificado_calificaciones) ? (
                        <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                      ) : (
                        <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                      )}
                    </td>
                    <td>
                      {esVerdadero(a.seguro_viaje) ? (
                        <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                      ) : (
                        <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/alumno/${a.codigo}`} className="action-button view" title="Ver alumno">
                        <i className="fas fa-eye"></i> Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>

          </table>
        </div>
        )}
      </section>
    </div>
  );
}
