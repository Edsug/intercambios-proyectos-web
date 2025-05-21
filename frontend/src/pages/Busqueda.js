import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Busqueda.css';
import { useBusquedaConfig } from '../config/config-busqueda';

export default function Busqueda() {
  const {
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
    filtrosAvanzados,
    setFiltrosAvanzados,
    filtros,
    handleFilterChange,
    resetFiltros,
    handleSearch,
    alumnos,
    hasSearched,
    loading,
    mostrarColumnas,
    setMostrarColumnas,
    handleExportExcel,
    handleExportPDF,
    selectFields,
    columnasPDF,
    setColumnasPDF
  } = useBusquedaConfig();

  return (
    <div className="dashboard-content">
      {/* Encabezado */}
      <header className="content-header">
        <h1>Búsqueda de Alumnos</h1>
        <p>Encuentra y filtra información de alumnos en movilidad académica</p>
      </header>

      {/* Controles de búsqueda */}
      <section className="search-container">
        <div className="search-box">
          <select value={searchType} onChange={e => setSearchType(e.target.value)}>
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
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i> Buscar
          </button>
          <button onClick={() => setFiltrosAvanzados(!filtrosAvanzados)}>
            <i className="fas fa-filter"></i> {filtrosAvanzados ? 'Ocultar filtros' : 'Filtros avanzados'}
          </button>
          <button onClick={resetFiltros}>
            <i className="fas fa-undo"></i> Restablecer
          </button>
        </div>

        {filtrosAvanzados && (
          <div className="advanced-filters">
            <div className="filter-grid">
              {filtros.map(f => (
                <div key={f.name} className="filter-item">
                  <label>{f.label}</label>
                  <input
                    type="text"
                    name={f.name}
                    value={f.value}
                    onChange={handleFilterChange}
                    placeholder={`Filtrar por ${f.label}`}
                  />
                </div>
              ))}
            </div>
            <div className="filter-buttons">
              <button onClick={handleSearch}>Aplicar filtros</button>
              <button onClick={resetFiltros}>Limpiar filtros</button>
            </div>
          </div>
        )}
      </section>

      {/* Exportación y selección de columnas */}
      {alumnos.length > 0 && (
        <section className="export-section">
          <button onClick={handleExportExcel}>
            <i className="fas fa-file-excel"></i> Exportar Excel
          </button>
          <button onClick={handleExportPDF}>
            <i className="fas fa-file-pdf"></i> Exportar PDF
          </button>
          <button onClick={() => setMostrarColumnas(!mostrarColumnas)}>
            <i className="fas fa-columns"></i> {mostrarColumnas ? 'Ocultar columnas' : 'Seleccionar columnas'}
          </button>
        </section>
      )}

      {/* Panel de selección de columnas */}
      {mostrarColumnas && alumnos.length > 0 && (
        <section className="columns-panel">
          <h3>Seleccionar Columnas</h3>
          <div className="columns-list">
            {selectFields.map(({ l: label, n: name }) => (
              <label className="column-toggle" key={name}>
                <input
                  type="checkbox"
                  name={name}
                  checked={columnasPDF.includes(name)}
                  onChange={() => {
                    const nuevaSeleccion = columnasPDF.includes(name)
                      ? columnasPDF.filter(c => c !== name)
                      : [...columnasPDF, name];
                    setColumnasPDF(nuevaSeleccion);
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Sección de Resultados Mejorada */}
      <div className="results-container">
        <div className="results-header">
          <h3>Resultados de búsqueda</h3>
          <span className="results-counter">{alumnos.length} registros encontrados</span>
        </div>

        {loading && (
          <div className="loading-msg">
            <div className="loading-spinner"></div>
            <p>Cargando resultados...</p>
          </div>
        )}

        {!loading && hasSearched && alumnos.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>No se encontraron alumnos con los criterios especificados. Intente con diferentes términos de búsqueda o filtros.</p>
          </div>
        )}

        {alumnos.length > 0 && (
          <>
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
                    <th>Disp.</th>
                    <th>Datos Disp.</th>
                    <th>Seguro</th>
                    <th>Aseguradora</th>
                    <th>Póliza</th>
                    <th>F. Ini Seg.</th>
                    <th>F. Fin Seg.</th>
                    <th>Obs. Seg.</th>
                    <th>Exp. Compart.</th>
                    <th>Det. Exp.</th>
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
                          {a.certificado_calificaciones ? (
                            <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                          ) : (
                            <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                          )}
                        </td>
                        <td>
                          {a.cuenta_discapacidad ? (
                            <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                          ) : (
                            <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                          )}
                        </td>
                        <td>
                          {a.datos_discapacidad ? (
                            <span className="truncate-text" title={a.datos_discapacidad}>
                              {a.datos_discapacidad}
                            </span>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </td>
                        <td>
                          {a.seguro_viaje ? (
                            <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                          ) : (
                            <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                          )}
                        </td>
                        <td>{a.aseguradora || <span className="empty-cell">-</span>}</td>
                        <td>{a.poliza || <span className="empty-cell">-</span>}</td>
                        <td>{a.seguro_inicio || <span className="empty-cell">-</span>}</td>
                        <td>{a.seguro_fin || <span className="empty-cell">-</span>}</td>
                        <td>
                          {a.obs_seguro ? (
                            <span className="truncate-text" title={a.obs_seguro}>
                              {a.obs_seguro}
                            </span>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </td>
                        <td>
                          {a.exp_compartida ? (
                            <span className="indicator yes"><i className="fas fa-check-circle"></i> Sí</span>
                          ) : (
                            <span className="indicator no"><i className="fas fa-times-circle"></i> No</span>
                          )}
                        </td>
                        <td>
                          {a.detalles_experiencia ? (
                            <span className="truncate-text" title={a.detalles_experiencia}>
                              {a.detalles_experiencia}
                            </span>
                          ) : (
                            <span className="empty-cell">-</span>
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
            <div className="pagination-container">
              <div className="pagination-info">
                Mostrando <b>1-{Math.min(10, alumnos.length)}</b> de <b>{alumnos.length}</b> resultados
              </div>
              <div className="pagination-controls">
                <button disabled><i className="fas fa-chevron-left"></i></button>
                <button className="active">1</button>
                {alumnos.length > 10 && <button>2</button>}
                {alumnos.length > 20 && <button>3</button>}
                {alumnos.length > 30 && <button>...</button>}
                <button><i className="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
