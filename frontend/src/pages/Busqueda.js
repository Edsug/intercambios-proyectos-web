import React, { useState } from "react";
import "../styles/Busqueda.css";

const Busqueda = () => {
  // Estado para el tipo de búsqueda
  const [searchType, setSearchType] = useState("nombre");
  const [searchValue, setSearchValue] = useState("");
  
  // Estados para los filtros
  const [filtros, setFiltros] = useState({
    carrera: "",
    programa: "",
    estado: "",
    actividad: "",
    semestre: "",
    pais: "",
    institucion: "",
    becado: "",
    anio: ""
  });
  
  // Estados para control de UI okikiki
  const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
  const [resultadosVisibles, setResultadosVisibles] = useState(true);
  
  // Datos para las opciones de filtros (normalmente vendrían de una API)
  const carreras = [
    "ABOGADO", "AGROBIOTECNOLOGÍA", "AGRONEGOCIOS", "CIRUJANO DENTISTA", 
    "CULTURA FISICA Y DEPORTES", "DESARROLLO TURISTICO SUSTENTABLE", 
    "ENFERMERÍA", "INGENIERIA EN GEOFISICA", "INGENIERIA EN SISTEMAS BIOLOGICOS", 
    "INGENIERIA EN TELEMATICA", "LETRAS HISPANICAS", "MEDICO CIRUJANO Y PARTERO", 
    "MEDICO VETERINARIO Y ZOOTECNISTA", "NEGOCIOS INTERNACIONALES", 
    "ENFERMERIA MODALIDAD NO ESCOLARIZADA", "NUTRICION", "PERIODISMO", 
    "PSICOLOGIA", "SEGURIDAD LABORAL, PROTECCION CIVIL Y EMERGENCIAS", "TRABAJO SOCIAL"
  ];
  
  const programas = [
    "PROGRAMA DE ESTANCIAS ACADÉMICAS (PEA)",
    "PROGRAMA DE MOVILIDAD INTERNACIONAL",
    "PROGRAMA DE MOVILIDAD NACIONAL",
    "VERANO DE INVESTIGACIÓN CIENTÍFICA",
    "PROGRAMA DELFÍN"
  ];
  
  const actividades = [
    "MOVILIDAD ESTUDIANTIL",
    "ESTANCIA DE INVESTIGACIÓN",
    "PRÁCTICAS PROFESIONALES",
    "ESTANCIA CORTA"
  ];
  
  const estados = ["ACTIVO", "CANCELADO", "RECHAZADO", "CONCLUIDO", "EN PROCESO"];
  
  const paises = [
    "MÉXICO", "ESPAÑA", "ESTADOS UNIDOS", "CANADÁ", "ALEMANIA", 
    "FRANCIA", "REINO UNIDO", "ITALIA", "BRASIL", "ARGENTINA", 
    "CHILE", "COLOMBIA", "AUSTRALIA", "JAPÓN", "CHINA", "OTRO"
  ];
  
  const instituciones = [
    "UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO",
    "UNIVERSIDAD DE GUADALAJARA",
    "INSTITUTO POLITÉCNICO NACIONAL",
    "UNIVERSIDAD DE BARCELONA",
    "UNIVERSIDAD COMPLUTENSE DE MADRID",
    "UNIVERSIDAD DE CALIFORNIA",
    "UNIVERSIDAD DE BUENOS AIRES",
    "UNIVERSIDAD DE SAO PAULO",
    "OTRO"
  ];
  
  const semestres = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const anios = ["2025", "2024", "2023", "2022", "2021", "2020"];
  
  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };
  
  // Función para resetear los filtros
  const resetFiltros = () => {
    setFiltros({
      carrera: "",
      programa: "",
      estado: "",
      actividad: "",
      semestre: "",
      pais: "",
      institucion: "",
      becado: "",
      anio: ""
    });
    setSearchValue("");
  };
  
  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Aquí implementarías la lógica de búsqueda con todos los filtros
    console.log("Buscando con:", { 
      searchType, 
      searchValue, 
      filtros 
    });
    
    // Simulación de actualización de resultados
    setResultadosVisibles(true);
  };
  
  // Datos de ejemplo para mostrar en los resultados
  const alumnosEjemplo = [
    {
      codigo: "A12345",
      nombre: "JUAN PÉREZ GARCÍA",
      carrera: "INGENIERIA EN TELEMATICA",
      programa: "PROGRAMA DE ESTANCIAS ACADÉMICAS (PEA)",
      actividad: "MOVILIDAD ESTUDIANTIL",
      semestre: "6",
      promedio: 95.5,
      pais: "ESPAÑA",
      institucion: "UNIVERSIDAD DE BARCELONA",
      estado: "ACTIVO",
      becado: "SÍ",
      becadoPor: "CUSUR"
    },
    {
      codigo: "B67890",
      nombre: "MARÍA LÓPEZ FERNÁNDEZ",
      carrera: "PSICOLOGIA",
      programa: "PROGRAMA DE MOVILIDAD INTERNACIONAL",
      actividad: "ESTANCIA DE INVESTIGACIÓN",
      semestre: "8",
      promedio: 88.7,
      pais: "ESTADOS UNIDOS",
      institucion: "UNIVERSIDAD DE CALIFORNIA",
      estado: "CONCLUIDO",
      becado: "SÍ",
      becadoPor: "SEP"
    },
    {
      codigo: "C24680",
      nombre: "CARLOS RODRÍGUEZ SÁNCHEZ",
      carrera: "MEDICO CIRUJANO Y PARTERO",
      programa: "VERANO DE INVESTIGACIÓN CIENTÍFICA",
      actividad: "ESTANCIA CORTA",
      semestre: "7",
      promedio: 92.3,
      pais: "MÉXICO",
      institucion: "UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO",
      estado: "ACTIVO",
      becado: "NO",
      becadoPor: ""
    }
  ];

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1> Buscar Alumno</h1>
        <p>Encuentra y filtra alumnos registrados en programas de movilidad.</p>
      </div>

      {/* Sección de búsqueda principal */}
      <div className="search-container">
        <div className="search-box">
          <select 
            className="search-type-select" 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="nombre">Nombre</option>
            <option value="codigo">Código</option>
            <option value="folio">Folio</option>
          </select>

          <input 
            type="text" 
            placeholder={`Buscar por ${searchType}...`} 
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Buscar</button>
          
          <button 
            className="filter-toggle-button"
            onClick={() => setFiltrosAvanzados(!filtrosAvanzados)}
          >
            {filtrosAvanzados ? "Ocultar filtros" : "Mostrar filtros avanzados"}
          </button>
        </div>

        {/* Filtros avanzados colapsables */}
        {filtrosAvanzados && (
          <div className="advanced-filters">
            <h3>Filtros Avanzados</h3>
            
            <div className="filter-grid">
              <div className="filter-item">
                <label>Carrera:</label>
                <select 
                  name="carrera" 
                  value={filtros.carrera} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todas las carreras</option>
                  {carreras.map((carrera, index) => (
                    <option key={index} value={carrera}>{carrera}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Programa:</label>
                <select 
                  name="programa" 
                  value={filtros.programa} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos los programas</option>
                  {programas.map((programa, index) => (
                    <option key={index} value={programa}>{programa}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Estado:</label>
                <select 
                  name="estado" 
                  value={filtros.estado} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos los estados</option>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Actividad:</label>
                <select 
                  name="actividad" 
                  value={filtros.actividad} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todas las actividades</option>
                  {actividades.map((actividad, index) => (
                    <option key={index} value={actividad}>{actividad}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Semestre:</label>
                <select 
                  name="semestre" 
                  value={filtros.semestre} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos los semestres</option>
                  {semestres.map((semestre, index) => (
                    <option key={index} value={semestre}>{semestre}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>País:</label>
                <select 
                  name="pais" 
                  value={filtros.pais} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos los países</option>
                  {paises.map((pais, index) => (
                    <option key={index} value={pais}>{pais}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Institución:</label>
                <select 
                  name="institucion" 
                  value={filtros.institucion} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todas las instituciones</option>
                  {instituciones.map((institucion, index) => (
                    <option key={index} value={institucion}>{institucion}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label>Becado:</label>
                <select 
                  name="becado" 
                  value={filtros.becado} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  <option value="SI">Con Beca</option>
                  <option value="NO">Sin Beca</option>
                </select>
              </div>
              
              <div className="filter-item">
                <label>Año:</label>
                <select 
                  name="anio" 
                  value={filtros.anio} 
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Todos los años</option>
                  {anios.map((anio, index) => (
                    <option key={index} value={anio}>{anio}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="filter-buttons">
              <button className="filter-apply" onClick={handleSearch}>Aplicar Filtros</button>
              <button className="filter-reset" onClick={resetFiltros}>Limpiar Filtros</button>
            </div>
          </div>
        )}
      </div>

      {/* Sección de resultados */}
      {resultadosVisibles && (
        <div className="results-container">
          <div className="results-header">
            <h3>Resultados de la búsqueda</h3>
            <div className="results-summary">
              <span>Total encontrados: {alumnosEjemplo.length}</span>
              <button className="export-button">
                <i className="fa fa-download"></i> Exportar a Excel
              </button>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Programa</th>
                  <th>Actividad</th>
                  <th>País</th>
                  <th>Institución</th>
                  <th>Estado</th>
                  <th>Becado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnosEjemplo.map((alumno, index) => (
                  <tr key={index} className={alumno.estado === "ACTIVO" ? "row-active" : alumno.estado === "CANCELADO" ? "row-canceled" : ""}>
                    <td>{alumno.codigo}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.carrera}</td>
                    <td>{alumno.programa}</td>
                    <td>{alumno.actividad}</td>
                    <td>{alumno.pais}</td>
                    <td>{alumno.institucion}</td>
                    <td>
                      <span className={`status-badge status-${alumno.estado.toLowerCase()}`}>
                        {alumno.estado}
                      </span>
                    </td>
                    <td>{alumno.becado}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-button view" title="Ver detalles">
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="action-button edit" title="Editar">
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button className="action-button export" title="Generar reporte">
                          <i className="fa fa-file-pdf-o"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Paginación */}
          <div className="pagination">
            <button className="page-button">&laquo;</button>
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button">&raquo;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Busqueda;