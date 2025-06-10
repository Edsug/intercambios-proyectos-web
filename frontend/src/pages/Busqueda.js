// Busqueda.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Busqueda.css';
import '../styles/graficas.css'; // <--- Ya está importado
import { useBusquedaConfig } from '../config/config-busqueda';
import { Bar, Pie } from 'react-chartjs-2';
import {
  getNivelesData,
  getPromedioSemestreData,
  getCarrerasData,
  getMaestriasData,
  getDoctoradosData,
  getGeneroData,
  getNacionalidadData,
  getEstadosData,
  getProgramasData,
  getBecasData,
  getDiscapacidadData,
  getComunidadData,
  barOptions
} from '../config/graficasBusqueda';

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

  const userRole = localStorage.getItem("cargo"); // corregido

  // Estado para mostrar/ocultar gráficas
  const [mostrarGraficas, setMostrarGraficas] = React.useState(false);

  const nivelesData = alumnos.length > 0 ? getNivelesData(alumnos) : null;
  const promedioSemestreData = alumnos.length > 0 ? getPromedioSemestreData(alumnos) : null;
  const carrerasData = alumnos.length > 0 ? getCarrerasData(alumnos) : null;
  const maestriasData = alumnos.length > 0 ? getMaestriasData(alumnos) : null;
  const doctoradosData = alumnos.length > 0 ? getDoctoradosData(alumnos) : null;
  const generoData = alumnos.length > 0 ? getGeneroData(alumnos) : null;
  const nacionalidadData = alumnos.length > 0 ? getNacionalidadData(alumnos) : null;
  const estadosData = alumnos.length > 0 ? getEstadosData(alumnos) : null;
  const programasData = alumnos.length > 0 ? getProgramasData(alumnos) : null;
  const becasData = alumnos.length > 0 ? getBecasData(alumnos) : null;
  const discapacidadData = alumnos.length > 0 ? getDiscapacidadData(alumnos) : null;
  const comunidadData = alumnos.length > 0 ? getComunidadData(alumnos) : null;

  const pieOptions = {
    plugins: {
      legend: { display: true, position: "bottom" }
    }
  };


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
                  <option value="">Todos</option>
                  <option value="SI">Sí (con discapacidad)</option>
                  <option value="NO">No (sin discapacidad)</option>
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

      {/* Botón para mostrar/ocultar gráficas, solo si hay alumnos */}
      {alumnos.length > 0 && (
        <section className="graficas-toggle-section" style={{ textAlign: "right", marginBottom: "1.5rem" }}>
          <button
            className="btn btn-info"
            onClick={() => setMostrarGraficas(g => !g)}
            style={{ minWidth: 180 }}
          >
            {mostrarGraficas ? "Ocultar gráficas" : "Mostrar gráficas"}
          </button>
        </section>
      )}

      {/* Sección especial de gráficas, solo visible si mostrarGraficas es true */}
      {alumnos.length > 0 && mostrarGraficas && (
        <section className="busqueda-graphics">
          <h3>Resumen de los resultados encontrados</h3>
          <div className="dashboard-graphics-grid">
            {nivelesData && nivelesData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por nivel académico</h4>
                <Bar data={nivelesData} options={barOptions(nivelesData.labels.length)} height={220} />
              </div>
            )}
            {promedioSemestreData && promedioSemestreData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Promedio por semestre</h4>
                <Bar data={promedioSemestreData} options={barOptions} height={220} />
              </div>
            )}
            {carrerasData && carrerasData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por carrera (Licenciatura)</h4>
                <Bar data={carrerasData} options={barOptions} height={220} />
              </div>
            )}
            {maestriasData && maestriasData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por maestría</h4>
                <div className="chart-container">
                  <Bar
                    data={maestriasData}
                    options={barOptions(maestriasData.labels.length)}
                    height={220}
                    width={Math.max(400, maestriasData.labels.length * 40)} // 40px por etiqueta
                  />
                </div>
              </div>
            )}
            {doctoradosData && doctoradosData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por doctorado</h4>
                <Bar data={doctoradosData} options={barOptions} height={220} />
              </div>
            )}
            {generoData && generoData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por género</h4>
                <Pie data={generoData} options={pieOptions} height={220} />
              </div>
            )}
            {nacionalidadData && nacionalidadData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por nacionalidad</h4>
                <Pie data={nacionalidadData} options={pieOptions} height={220} />
              </div>
            )}
            {estadosData && estadosData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos nacionales por estado</h4>
                <Pie data={estadosData} options={pieOptions} height={220} />
              </div>
            )}
            {programasData && programasData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por programa</h4>
                <Pie data={programasData} options={pieOptions} height={220} />
              </div>
            )}
            {/* Elimina este bloque:
            {tiposMovilidadData && tiposMovilidadData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por tipo de movilidad</h4>
                <Pie data={tiposMovilidadData} options={pieOptions} height={220} />
              </div>
            )} 
            */}
            {becasData && becasData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos por tipo de beca</h4>
                <Pie data={becasData} options={pieOptions} height={220} />
              </div>
            )}
            {discapacidadData && discapacidadData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos con discapacidad</h4>
                <Pie data={discapacidadData} options={pieOptions} height={220} />
              </div>
            )}
            {comunidadData && comunidadData.labels.length > 0 && (
              <div className="dashboard-graphic-card">
                <h4>Alumnos de comunidad nativa</h4>
                <Pie data={comunidadData} options={pieOptions} height={220} />
              </div>
            )}
          </div>
          {/* Elemento oculto para exponer la paleta de colores al JS si se requiere */}
          <div className="chart-color-palette" />
        </section>
      )}

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
                        <div className="actions-cell">
                          {(userRole === "Supervisor" || userRole === "Administrador") ? (
                            <Link to={`/alumno/${a.codigo}`} className="btn btn-sm btn-primary" title="Ver alumno">
                              <i className="fas fa-eye"></i> Ver
                            </Link>
                          ) : (
                            <span className="action-button disabled" title="Sin permiso">
                              <i className="fas fa-eye-slash"></i> Ver
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {console.log(alumnos.map(a => a.tipo_movilidad))}
    </div>
  );
}
