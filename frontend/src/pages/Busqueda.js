import React, { useState, useEffect } from "react";
import "../styles/Busqueda.css";
// Librerías para exportar Excel y PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
  const [mostrarColumnas, setMostrarColumnas] = useState(false);

  const [columnasPDF, setColumnasPDF] = useState([
    { id: 'codigo', label: 'Código', visible: true },
    { id: 'nombre', label: 'Nombre', visible: true },
    { id: 'apellidos', label: 'Apellidos', visible: true },
    { id: 'nivel_academico', label: 'Nivel', visible: true },
    { id: 'carrera', label: 'Carrera', visible: true },
    { id: 'maestria', label: 'Maestría', visible: true },
    { id: 'semestre', label: 'Semestre', visible: true },
    { id: 'promedio', label: 'Promedio', visible: true },
    { id: 'sexo', label: 'Sexo', visible: true },
    { id: 'fecha_nacimiento', label: 'F. Nac.', visible: true },
    { id: 'tipo_sangre', label: 'Sangre', visible: true },
    { id: 'telefono', label: 'Teléfono', visible: true },
    { id: 'correo', label: 'Correo', visible: true },
    { id: 'contacto_emergencia', label: 'Cont. Emerg.', visible: true },
    { id: 'nombre_contacto_emergencia', label: 'Nom. Cont.', visible: true },
    { id: 'nss', label: 'NSS', visible: true },
    { id: 'programa', label: 'Programa', visible: true },
    { id: 'folio', label: 'Folio', visible: true },
    { id: 'estado_programa', label: 'Est. Programa', visible: true },
    { id: 'actividad', label: 'Actividad', visible: true },
    { id: 'tipo_destino', label: 'Tipo Dest.', visible: true },
    { id: 'pais', label: 'País', visible: true },
    { id: 'institucion', label: 'Institución', visible: true },
    { id: 'fecha_inicio', label: 'F. Inicio', visible: true },
    { id: 'fecha_fin', label: 'F. Fin', visible: true },
    { id: 'movilidades_observaciones', label: 'Obs. Mov.', visible: true },
    { id: 'tiene_beca', label: 'Becado', visible: true },
    { id: 'revalidacion_materias', label: 'Reval. Mat', visible: true },
    { id: 'datos_revalidacion', label: 'Datos Reval.', visible: true },
    { id: 'certificado_calificaciones', label: 'Certif. Calif.', visible: true },
    { id: 'cuenta_discapacidad', label: 'Disp.', visible: true },
    { id: 'datos_discapacidad', label: 'Datos Disp.', visible: true },
    { id: 'seguro_viaje', label: 'Seguro', visible: true },
    { id: 'aseguradora', label: 'Aseguradora', visible: true },
    { id: 'poliza', label: 'Póliza', visible: true },
    { id: 'seguro_inicio', label: 'F. Ini Seg.', visible: true },
    { id: 'seguro_fin', label: 'F. Fin Seg.', visible: true },
    { id: 'obs_seguro', label: 'Obs. Seg.', visible: true },
    { id: 'exp_compartida', label: 'Exp. Compart.', visible: true },
    { id: 'detalles_experiencia', label: 'Det. Exp.', visible: true }
  ]);

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

  const maxBecas = alumnos.reduce((max, a) => {
    if (!a.detalle_becas) return max;
    const count = a.detalle_becas.split('; ').length;
    return count > max ? count : max;
  }, 0);

  //generar excel

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alumnos');
  
    const columnasVisibles = columnasPDF.filter(c => c.visible);
    const header = columnasVisibles.map(col => col.label);
  
    for (let i = 0; i < maxBecas; i++) {
      header.push(`Beca ${i+1} Tipo`, `Beca ${i+1} Nombre`, `Beca ${i+1} Monto`);
    }
  
    worksheet.addRow(header);
  
    const rows = alumnos.map(a => {
      const seleccionados = columnasVisibles.map(c => a[c.id] ?? '');
  
      const becas = a.detalle_becas ? a.detalle_becas.split('; ') : [];
      const parsed = becas.map(str => {
        const [typeName, amount] = str.split(' ($');
        const [tipo, nombre] = typeName.split(': ');
        return [tipo, nombre, amount ? amount.replace(')', '') : ''];
      }).flat();
  
      const blank = Array((maxBecas * 3) - parsed.length).fill('');
      return [...seleccionados, ...parsed, ...blank];
    });
  
    const headerRow = worksheet.getRow(1);
    headerRow.height = 24;
    headerRow.eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '305496' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' }
      };
    });
  
    rows.forEach((row, i) => {
      const newRow = worksheet.addRow(row);
      const fillColor = i % 2 === 0 ? 'F2F2F2' : 'FFFFFF';
      newRow.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: fillColor }
        };
        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
        cell.border = {
          top:    { style: 'thin' },
          left:   { style: 'thin' },
          bottom: { style: 'thin' },
          right:  { style: 'thin' }
        };
      });
    });
  
    worksheet.columns.forEach((col, i) => {
      let maxLength = header[i].length;
      rows.forEach(row => {
        const val = row[i];
        if (val && val.toString().length > maxLength) {
          maxLength = val.toString().length;
        }
      });
      col.width = maxLength + 2;
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'alumnos.xlsx');
  };
  

  //Generar pdf
  
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  
    const columnasVisibles = columnasPDF.filter(c => c.visible);
    const headers = columnasVisibles.map(c => c.label);
  
    const becaHeaders = [];
    for (let i = 0; i < maxBecas; i++) {
      becaHeaders.push(`Beca ${i+1} Tipo`, `Beca ${i+1} Nombre`, `Beca ${i+1} Monto`);
    }
  
    const fullHeaders = [...headers, ...becaHeaders];
  
    const rows = alumnos.map(alumno => {
      const row = columnasVisibles.map(c => alumno[c.id] ?? '');
  
      const becas = alumno.detalle_becas ? alumno.detalle_becas.split('; ') : [];
      const parsed = becas.map(str => {
        const [typeName, amountPart] = str.split(' ($');
        const [tipo, nombre] = typeName.split(': ');
        const monto = amountPart ? amountPart.replace(')', '') : '';
        return [tipo, nombre, monto];
      }).flat();
  
      const blank = Array((maxBecas * 3) - parsed.length).fill('');
      return [...row, ...parsed, ...blank];
    });
  
    const maxColsPerPage = 15;
    const totalPages = Math.ceil(fullHeaders.length / maxColsPerPage);
  
    for (let p = 0; p < totalPages; p++) {
      const start = p * maxColsPerPage;
      const end = start + maxColsPerPage;
  
      const slicedHeaders = fullHeaders.slice(start, end);
      const slicedRows = rows.map(row => row.slice(start, end));
  
      autoTable(doc, {
        head: [slicedHeaders],
        body: slicedRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [33, 37, 41], textColor: 255, fontSize: 8 },
        bodyStyles: { fontSize: 7, valign: 'top' },
        styles: { overflow: 'linebreak', cellPadding: 2, halign: 'left' },
        margin: { top: 40, left: 10, right: 10 },
        didDrawPage: data => {
          doc.setFontSize(12);
          doc.text(`Listado de Alumnos - Página ${p + 1}`, data.settings.margin.left, 30);
        }
      });
  
      if (p < totalPages - 1) doc.addPage();
    }
  
    doc.save('alumnos.pdf');
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>Buscar Alumno</h1>
        <p>Encuentra y filtra alumnos registrados en programas de movilidad.</p>
      </div>
      
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
          <button onClick={handleSearch} disabled={loading}> 
            {loading ? 'Buscando…' : 'Buscar'} 
          </button>

          <button onClick={() => setFiltrosAvanzados(!filtrosAvanzados)}>
            {filtrosAvanzados ? 'Ocultar filtros' : 'Mostrar filtros avanzados'}
          </button>
        </div>

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

      {/* Sección de exportación */}
      {alumnos.length > 0 && (
        <div className="export-section">
          <div className="export-actions">
          {/* Botón de seleccionar columnas va primero */}
          <button 
            onClick={() => setMostrarColumnas(prev => !prev)} 
            className="column-toggle-button"
          >
            <i className={`fas ${mostrarColumnas ? "fa-eye-slash" : "fa-eye"}`}></i>
            {mostrarColumnas ? "Ocultar seleccion de columnas" : "Seleccionar columnas para generar el reporte"}
          </button>

          {/* Luego los botones de exportación */}
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
              <h4>Selecciona las columnas para PDF:</h4>
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
                  <th>Carrera</th>
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
                      <td>{a.carrera}</td>
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