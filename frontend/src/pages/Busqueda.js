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
    incluirBecas, setIncluirBecas
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

          <div className="search-actions">
            <button 
              className="btn btn-primary" 
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
                  max="12"
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

              {/* Nuevo filtro: Discapacidad */}
              <div className="filter-item">
                <label>Discapacidad:</label>
                <select
                  name="discapacidad"
                  value={filtros.discapacidad || ''}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas</option>
                  <option value="NINGUNA">Ninguna</option>
                  {/* Si tienes un catálogo de discapacidades, mapea aquí */}
                  {/* {discapacidades.map(d => (
                    <option key={d.id} value={d.id}>{d.nombre}</option>
                  ))} */}
                </select>
              </div>

              {/* Nuevo filtro: Comunidad nativa */}
              <div className="filter-item">
                <label>Comunidad Nativa:</label>
                <select
                  name="pertenece_comunidad"
                  value={filtros.pertenece_comunidad || ''}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
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
                      setIncluirBecas(!allVisible);
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

                  {/* Checkbox para becas */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '8px 0' }}>
                    <input
                      type="checkbox"
                      checked={incluirBecas}
                      onChange={e => setIncluirBecas(e.target.checked)}
                    />
                    Mostrar becas en reporte
                  </label>
                  {/* Checkbox para discapacidad */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '8px 0' }}>
                    <input
                      type="checkbox"
                      checked={!!columnasPDF.find(c => c.key === 'discapacidad' && c.visible)}
                      onChange={e => {
                        const updated = columnasPDF.map(col =>
                          col.key === 'discapacidad'
                            ? { ...col, visible: e.target.checked }
                            : col
                        );
                        setColumnasPDF(updated);
                      }}
                    />
                    Mostrar discapacidad
                  </label>
                  {/* Checkbox para comunidad nativa */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '8px 0' }}>
                    <input
                      type="checkbox"
                      checked={!!columnasPDF.find(c => c.key === 'comunidad_nativa' && c.visible)}
                      onChange={e => {
                        const updated = columnasPDF.map(col =>
                          col.key === 'comunidad_nativa'
                            ? { ...col, visible: e.target.checked }
                            : col
                        );
                        setColumnasPDF(updated);
                      }}
                    />
                    Mostrar comunidad nativa
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
                  <th>Discapacidad</th>
                  <th>Comunidad Nativa</th>
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
                        {a.discapacidad
                          ? a.discapacidad
                          : <span className="empty-cell">-</span>}
                      </td>
                      <td>
                        {a.pertenece_comunidad === 1 && a.comunidad_nativa
                          ? a.comunidad_nativa
                          : a.pertenece_comunidad === 1
                          ? 'Sí'
                          : <span className="empty-cell">-</span>}
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
