import React, { useState, useEffect } from "react";
import "../styles/Busqueda.css";
// Librerías para exportar Excel y PDF
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const BASE_URL = "http://localhost/basecambios";

export default function Busqueda() {
  const [searchType, setSearchType] = useState("nombre");
  const [searchValue, setSearchValue] = useState("");
  const [filtros, setFiltros] = useState({
    carrera: "", programa: "", estado: "",
    actividad: "", semestre: "", pais: "",
    institucion: "", becado: "", anio: ""
  });
  const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [catalogos, setCatalogos] = useState({
    carreras: [], programas: [], estados: [],
    actividades: [], paises: [], instituciones: [],
    semestres: [], anios: [], becado: []
  });
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/get_catalogos.php`)
      .then(res => res.json())
      .then(data => setCatalogos(data))
      .catch(console.error);
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const resetFiltros = () => {
    setFiltros({
      carrera: "", programa: "", estado: "",
      actividad: "", semestre: "", pais: "",
      institucion: "", becado: "", anio: ""
    });
    setSearchValue("");
    setHasSearched(false);
    setAlumnos([]);
  };

  const handleSearch = () => {
    setLoading(true);
    setHasSearched(false);
    setAlumnos([]);

    const params = new URLSearchParams({ searchType, searchValue, ...filtros });

    fetch(`${BASE_URL}/get_alumnos.php?${params}`)
      .then(res => res.json())
      .then(data => {
        setAlumnos(data);
        setHasSearched(true);
      })
      .catch(error => {
        console.error('Error al buscar:', error);
        setAlumnos([]);
        setHasSearched(true);
      })
      .finally(() => setLoading(false));
  };

  // Máximo de becas para columnas dinámicas
  const maxBecas = alumnos.reduce((max, a) => {
    if (!a.detalle_becas) return max;
    const count = a.detalle_becas.split('; ').length;
    return count > max ? count : max;
  }, 0);

  // Exportar a Excel
  const handleExportExcel = () => {
    const header = [
      "Código", "Nombre", "Apellidos", "Carrera", "Nivel", "Maestría", "Semestre", "Promedio",
      "Sexo", "F. Nac.", "Sangre", "Teléfono", "Correo", "Cont. Emerg.",
      "Nom. Cont.", "NSS", "Programa", "Folio", "Est. Programa", "Actividad",
      "Tipo Dest.", "País", "Institución", "F. Inicio", "F. Fin", "Obs. Mov.",
      "Becado", ...Array.from({ length: maxBecas }).flatMap((_, i) => [
        `Beca ${i+1} Tipo`, `Beca ${i+1} Nombre`, `Beca ${i+1} Monto`
      ]),
      "Reval. Mat", "Datos Reval.", "Certif. Calif.", "Disp.", "Datos Disp.",
      "Seguro", "Aseguradora", "Póliza", "F. Ini Seg.", "F. Fin Seg.", "Obs. Seg.",
      "Exp. Compart.", "Det. Exp."
    ];

    const data = alumnos.map(a => {
      const becas = a.detalle_becas ? a.detalle_becas.split('; ') : [];
      const parsed = becas.map(str => {
        const [typeName, amount] = str.split(' ($');
        const [tipo, nombre] = typeName.split(': ');
        return [tipo, nombre, amount ? amount.replace(')', '') : ''];
      }).flat();
      const blank = Array((maxBecas*3) - parsed.length).fill('');
      return [
        a.codigo, a.nombre, a.apellidos, a.carrera, a.nivel_academico, a.maestria, a.semestre, a.promedio,
        a.sexo, a.fecha_nacimiento, a.tipo_sangre, a.telefono, a.correo, a.contacto_emergencia,
        a.nombre_contacto_emergencia, a.nss, a.programa, a.folio, a.estado_programa, a.actividad,
        a.tipo_destino, a.pais, a.institucion, a.fecha_inicio, a.fecha_fin, a.movilidades_observaciones,
        a.tiene_beca, ...parsed, ...blank,
        a.revalidacion_materias ? 'Sí' : 'No', a.datos_revalidacion,
        a.certificado_calificaciones ? 'Sí' : 'No',
        a.cuenta_discapacidad ? 'Sí' : 'No', a.datos_discapacidad,
        a.seguro_viaje ? 'Sí' : 'No', a.aseguradora, a.poliza,
        a.seguro_inicio, a.seguro_fin, a.obs_seguro,
        a.exp_compartida ? 'Sí' : 'No', a.detalles_experiencia
      ];
    });

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet([header, ...data]);
    utils.book_append_sheet(wb, ws, 'Alumnos');

    // Estilizar cabecera
    const range = utils.decode_range(ws['!ref']);
    for (let C=range.s.c; C<=range.e.c; ++C) {
      const cell = ws[utils.encode_cell({r:0, c:C})];
      if (cell) cell.s = { fill: { fgColor:{rgb:'DDEBF7'} }, font:{bold:true} };
    }
    writeFile(wb, 'alumnos.xlsx', { cellStyles: true });
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({orientation:'landscape', unit:'pt', format:'A4'});
    const ths = [...document.querySelectorAll('#alumnos-table thead th')].map(el=>el.textContent);
    const trs = [...document.querySelectorAll('#alumnos-table tbody tr')].map(row=>
      [...row.children].map(td=>td.textContent)
    );
    autoTable(doc, {
      head:[ths], body:trs,
      startY:40, theme:'grid',
      headStyles:{fillColor:[40,167,69], textColor:255, fontSize:8, halign:'center'},
      bodyStyles:{fontSize:7, valign:'top'},
      styles:{overflow:'linebreak', cellPadding:2, halign:'left'},
      margin:{top:40, left:10, right:10},
      didDrawPage: (data)=>{
        doc.setFontSize(12);
        doc.text('Listado de Alumnos', data.settings.margin.left, 30);
      }
    });
    doc.save('alumnos.pdf');
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>Buscar Alumno</h1>
        <p>Encuentra y filtra alumnos registrados en programas de movilidad.</p>
      </div>
      {/* Búsqueda simple */}
      <div className="search-container">
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
          <button onClick={handleSearch} disabled={loading}> {loading ? 'Buscando…' : 'Buscar'} </button>
          <button onClick={() => setFiltrosAvanzados(!filtrosAvanzados)}>
            {filtrosAvanzados ? 'Ocultar filtros' : 'Mostrar filtros avanzados'}
          </button>
        </div>
        {/* Filtros avanzados */}
        {filtrosAvanzados && (
          <div className="advanced-filters">
            <h3>Filtros Avanzados</h3>
            <div className="filter-grid">
              {[
                { label:'Carrera', name:'carrera', options:catalogos.carreras },
                { label:'Programa', name:'programa', options:catalogos.programas },
                { label:'Estado', name:'estado', options:catalogos.estados },
                { label:'Actividad', name:'actividad', options:catalogos.actividades },
                { label:'Semestre', name:'semestre', options:catalogos.semestres },
                { label:'País', name:'pais', options:catalogos.paises },
                { label:'Institución', name:'institucion', options:catalogos.instituciones },
                { label:'Becado', name:'becado', options:catalogos.becado },
                { label:'Año', name:'anio', options:catalogos.anios }
              ].map(({label,name,options},i)=>(
                <div className="filter-item" key={i}>
                  <label>{label}:</label>
                  <select name={name} value={filtros[name]} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {options.map((opt,j)=><option key={j} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="filter-buttons">
              <button onClick={handleSearch} disabled={loading}>Aplicar Filtros</button>
              <button onClick={resetFiltros}>Limpiar Filtros</button>
            </div>
          </div>
        )}
      </div>
      {/* Exportación */}
      {alumnos.length>0 && (
        <div className="export-buttons">
          <button onClick={handleExportExcel}>Exportar a Excel</button>
          <button onClick={handleExportPDF}>Exportar a PDF</button>
        </div>
      )}

      {/* Resultados */}
      <div className="results-container">
        <div className="results-header">
          <h3>Resultados ({alumnos.length})</h3>
        </div>
        {loading && <p className="loading-msg">Cargando resultados...</p>}
        {!loading && hasSearched && alumnos.length === 0 && (
          <p className="no-results">No se encontraron alumnos con los criterios especificados.</p>
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
                  <th>Maestría</th>
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
                  <th>País</th>
                  <th>Institución</th>
                  <th>F. Inicio</th>
                  <th>F. Fin</th>
                  <th>Obs. Mov.</th>
                  <th>Becado</th>
                  {Array.from({ length: maxBecas }).flatMap((_, idx) => [
                    <th key={`tipo-${idx}`}>{`Beca ${idx+1} Tipo`}</th>,
                    <th key={`nom-${idx}`}>{`Beca ${idx+1} Nombre`}</th>,
                    <th key={`mont-${idx}`}>{`Beca ${idx+1} Monto`}</th>
                  ])}
                  <th>Reval. Mat</th>
                  <th>Datos Reval.</th>
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
                  <th>Ver Alumno</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((a, i) => {
                  const becasArray = a.detalle_becas ? a.detalle_becas.split('; ') : [];
                  const parsed = becasArray.map(str => {
                    const [typeName, amountPart] = str.split(' ($');
                    const [tipo, nombre] = typeName.split(': ');
                    const monto = amountPart ? amountPart.replace(')', '') : '';
                    return { tipo, nombre, monto };
                  });
                  return (
                    <tr key={i}>
                      <td>{a.codigo}</td>
                      <td>{a.nombre}</td>
                      <td>{a.apellidos}</td>
                      <td>{a.nivel_academico}</td>
                      <td>{a.maestria}</td>
                      <td>{a.semestre}</td>
                      <td>{a.promedio}</td>
                      <td>{a.sexo}</td>
                      <td>{a.fecha_nacimiento}</td>
                      <td>{a.tipo_sangre}</td>
                      <td>{a.telefono}</td>
                      <td>{a.correo}</td>
                      <td>{a.contacto_emergencia}</td>
                      <td>{a.nombre_contacto_emergencia}</td>
                      <td>{a.nss}</td>
                      <td>{a.programa}</td>
                      <td>{a.folio}</td>
                      <td>{a.estado_programa}</td>
                      <td>{a.actividad}</td>
                      <td>{a.tipo_destino}</td>
                      <td>{a.pais}</td>
                      <td>{a.institucion}</td>
                      <td>{a.fecha_inicio}</td>
                      <td>{a.fecha_fin}</td>
                      <td>{a.movilidades_observaciones}</td>
                      <td>{a.tiene_beca}</td>
                      {parsed.map((b, idx) => (
                        <React.Fragment key={`becaVal-${i}-${idx}`}>
                          <td>{b.tipo}</td>
                          <td>{b.nombre}</td>
                          <td>{b.monto}</td>
                        </React.Fragment>
                      ))}
                      {/* Rellenar celdas vacías si hay menos becas que el máximo */}
                      {Array.from({ length: maxBecas - parsed.length }).map((_, idx) => (
                        <React.Fragment key={`empty-${i}-${idx}`}>
                          <td></td>
                          <td></td>
                          <td></td>
                        </React.Fragment>
                      ))}
                      <td>{a.revalidacion_materias ? 'Sí' : 'No'}</td>
                      <td>{a.datos_revalidacion}</td>
                      <td>{a.certificado_calificaciones ? 'Sí' : 'No'}</td>
                      <td>{a.cuenta_discapacidad ? 'Sí' : 'No'}</td>
                      <td>{a.datos_discapacidad}</td>
                      <td>{a.seguro_viaje ? 'Sí' : 'No'}</td>
                      <td>{a.aseguradora}</td>
                      <td>{a.poliza}</td>
                      <td>{a.seguro_inicio}</td>
                      <td>{a.seguro_fin}</td>
                      <td>{a.obs_seguro}</td>
                      <td>{a.exp_compartida ? 'Sí' : 'No'}</td>
                      <td>{a.detalles_experiencia}</td>
                      <td>
                        <a href={`/alumno/${a.codigo}`} className="action-button view" title="Ver alumno">
                          Ver Alumno
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}