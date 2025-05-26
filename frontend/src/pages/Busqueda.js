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
    columnasPDF, setColumnasPDF,
    incluirBecas, setIncluirBecas // ← ✅ AÑADE ESTO
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
                  min="3"
                  max="10"
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

            <div className="filter-actions">
              <button
                className="btn btn-success"
                onClick={handleSearch}
                disabled={loading}
              >
                <i className="fas fa-check"></i> Aplicar Filtros
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={resetFiltros}
              >
                <i className="fas fa-times"></i> Limpiar Filtros
              </button>
            </div>
          </div>
      )}
      </section>

      {alumnos.length > 0 && (
        <section className="export-section">
          <div className="export-header">
            <div className="export-title">
              <i className="fas fa-download"></i>
              Generación de Reportes
            </div>
            <div className="results-count">
              {alumnos.length} registros encontrados
            </div>
          </div>
          <div className="export-content">
            <div className="export-controls">
              <button
                className="btn column-toggle-btn"
                onClick={() => setMostrarColumnas(prev => !prev)}
              >
                <i className={`fas ${mostrarColumnas ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                {mostrarColumnas
                  ? ' Ocultar selección de columnas'
                  : ' Mostrar selección de columnas'}
              </button>
              <div className="export-buttons">
                <button
                  className="export-btn export-btn-excel"
                  onClick={handleExportExcel}
                >
                  <div className="export-btn-icon">
                    <i className="fas fa-file-excel"></i>
                  </div>
                  <div className="export-btn-text">Exportar a Excel</div>
                  <div className="export-btn-desc">
                    Descarga los datos en formato XLSX para análisis avanzado
                  </div>
                </button>
                <button
                  className="export-btn export-btn-pdf"
                  onClick={handleExportPDF}
                >
                  <div className="export-btn-icon">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div className="export-btn-text">Exportar a PDF</div>
                  <div className="export-btn-desc">
                    Genera un reporte imprimible con formato profesional
                  </div>
                </button>
              </div>
            </div>



            {mostrarColumnas && (
              <div className="column-selector">
                <div className="column-controls">
                  <h4>
                    <i className="fas fa-columns"></i> Configurar Columnas
                  </h4>
                  <hr className="column-controls-separator" />
                  <p className="column-controls-desc">
                    Selecciona las columnas que deseas mostrar en la tabla de resultados.
                  </p>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      const allVisible = columnasPDF.every(c => c.visible) && incluirBecas;
                      const updated = columnasPDF.map(col => ({
                        ...col,
                        visible: !allVisible
                      }));
                      setColumnasPDF(updated);
                      setIncluirBecas(!allVisible); // también alternar el checkbox de becas
                    }}
                  >
                    <i className="fas fa-check-square"></i>{" "}
                    {columnasPDF.every(c => c.visible) && incluirBecas
                      ? "Deseleccionar todo"
                      : "Seleccionar todo"}
                  </button>
                </div>

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

                  {/* ✅ Checkbox para becas */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '8px 0' }}>
                    <input
                      type="checkbox"
                      checked={incluirBecas}
                      onChange={e => setIncluirBecas(e.target.checked)}
                    />
                    Mostrar becas en reporte
                  </label>
                </div>
              </div>
            )}





          </div>
        </section>
      )}

      <section className="results-container">
        <div className="results-header">
          <div className="results-title">
            <i className="fas fa-table"></i>
            Resultados de Búsqueda
          </div>
          <div className="results-count">
            {alumnos.length} alumnos
          </div>
        </div>
        {loading && (
          <div className="loading-msg">
            <div className="loading-spinner" />
            <p>Cargando resultados…</p>
          </div>
        )}
        {!loading && hasSearched && alumnos.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>No se encontraron alumnos con los criterios especificados.</p>
          </div>
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
                <th>Ciclo</th> 
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
                    : a.nivel_academico === 'DOCTORADO'
                    ? a.doctorado
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
                    <td>{a.ciclo || <span className="empty-cell">-</span>}</td>
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
