  // config-busqueda.js
  // config-busqueda.js
  import { useState, useEffect } from 'react';
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import ExcelJS from 'exceljs';
  import { saveAs } from 'file-saver';

  const BASE_URL = 'http://localhost/basecambios';
  export function useBusquedaConfig() {
    const [searchType, setSearchType] = useState('nombre');
    const [searchValue, setSearchValue] = useState('');
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [mostrarColumnas, setMostrarColumnas] = useState(false);
    const [catalogos, setCatalogos] = useState({
      carreras: [], programas: [], estados: [], actividades: [],
      semestres: [],
      niveles: [], maestrias: [], sexos: [], destinos: [],
      revalidaciones: ['Sí','No']
    });
    const [filtros, setFiltros] = useState({
      carrera: '', maestria: '', programa: '', estado: '', actividad: '',
      semestre: '', nivel_academico: '', sexo: '',
      tipo_destino: '', revalidacion: '',
      fechaInicioDesde: '', fechaInicioHasta: ''
    });

    // — Columnas para PDF/Excel (visibilidad controlable)
    const [columnasPDF, setColumnasPDF] = useState([
      { id: 'codigo', label: 'Código', visible: true },
      { id: 'nombre', label: 'Nombre', visible: true },
      { id: 'apellidos', label: 'Apellidos', visible: true },
      { id: 'nivel_academico', label: 'Nivel', visible: true },
      { id: 'especialidad', label: 'Especialidad', visible: true },
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
      { id: 'fecha_inicio_movilidad', label: 'F. Inicio movilidad', visible: true },
      { id: 'fecha_fin_movilidad', label: 'F. Fin movilidad', visible: true },
      { id: 'observaciones_movilidad', label: 'Obs. Mov.', visible: true },
      { id: 'tiene_beca', label: 'Becado', visible: true },
      { id: 'revalidacion', label: 'Reval. Mat', visible: true },
      { id: 'datos_revalidacion', label: 'Datos Reval.', visible: true },
      { id: 'certificado_calificaciones', label: 'Certif. Calif.', visible: true },
      { id: 'cuenta_discapacidad', label: 'Disp.', visible: true },
      { id: 'datos_discapacidad', label: 'Datos Disp.', visible: true },
      { id: 'seguro_viaje', label: 'Seguro', visible: true },
      { id: 'aseguradora', label: 'Aseguradora', visible: true },
      { id: 'poliza', label: 'Póliza', visible: true },
      { id: 'seguro_inicio', label: 'F. Ini Seg.', visible: true },
      { id: 'seguro_fin', label: 'F. Fin Seg.', visible: true },
      { id: 'observaciones_seguro', label: 'Obs. Seg.', visible: true },
      { id: 'experiencia_compartida', label: 'Experiencia compartida', visible: true },
      { id: 'detalles_experiencia', label: 'detalles_experiencia', visible: true }
    ]);

    // — Campos dinámicos de filtro
    const selectFields = [
      { l: 'Carreras',        n: 'carrera',      opts: catalogos.carreras },
      { l: 'Maestrías',       n: 'maestria',     opts: catalogos.maestrias },
      { l: 'Programa',        n: 'programa',     opts: catalogos.programas },
      { l: 'Estado',          n: 'estado',       opts: catalogos.estados },
      { l: 'Actividad',       n: 'actividad',    opts: catalogos.actividades },
      { l: 'Nivel Académico', n: 'nivel_academico', opts: catalogos.niveles },
      { l: 'Sexo',            n: 'sexo',         opts: catalogos.sexos },
      { l: 'Tipo Destino',    n: 'tipo_destino', opts: catalogos.destinos },
      { l: 'Revalidación',    n: 'revalidacion', opts: catalogos.revalidaciones }
    ];

    // — Carga inicial de catálogos
    useEffect(() => {
      fetch(`${BASE_URL}/get_catalogos.php`)
        .then(r => r.json())
        .then(data => setCatalogos(prev => ({
          ...prev,
          carreras:      data.carreras       || prev.carreras,
          programas:     data.programas      || prev.programas,
          estados:       data.estados        || prev.estados,
          actividades:   data.actividades    || prev.actividades,
          semestres:     data.semestres      || prev.semestres,
          anios:         data.anios          || prev.anios,
          niveles:       data.niveles        || prev.niveles,
          maestrias:     data.maestrias      || prev.maestrias,
          sexos:         data.sexos          || prev.sexos,
          destinos:      data.destinos       || prev.destinos,
          revalidaciones:data.revalidaciones|| prev.revalidaciones
        })))
        .catch(console.error);
    }, []);

    // — Handler de cambios en filtros
    const handleFilterChange = e => {
      const { name, value } = e.target;
      setFiltros(prev => ({ ...prev, [name]: value }));
    };

    // — Reset de filtros y estado de búsqueda
    const resetFiltros = () => {
      setFiltros({
        carrera: '', maestria: '', programa: '', estado: '', actividad: '',
        semestre: '', anio: '', nivel_academico: '', sexo: '',
        tipo_destino: '', revalidacion: ''
      });
      setSearchValue('');
      setHasSearched(false);
      setAlumnos([]);
    };

    // — Ejecutar búsqueda con parámetros
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
        .catch(err => {
          console.error('Error al buscar:', err);
          setAlumnos([]);
          setHasSearched(true);
        })
        .finally(() => setLoading(false));
    };


    // — Exportar a Excel
    const handleExportExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Alumnos');
    
      const columnasVisibles = columnasPDF.filter(c => c.visible);
      const header = columnasVisibles.map(col => col.label);
    
      // Paso 1: calcular cuántas becas tiene el alumno con más becas
      const maxBecas = alumnos.reduce((max, a) => {
        const becas = a.detalle_becas ? a.detalle_becas.split('; ') : [];
        return Math.max(max, becas.length);
      }, 0);
    
      // Paso 2: columnas dinámicas para becas
      for (let i = 0; i < maxBecas; i++) {
        header.push(`Beca ${i + 1} Tipo`, `Beca ${i + 1} Nombre`, `Beca ${i + 1} Monto`, `Beca ${i + 1} Detalles`);
      }
    
      worksheet.addRow(header);
    
      // Paso 3: agregar datos
      const rows = alumnos.map(a => {
        const seleccionados = columnasVisibles.map(c => {
          if (c.id === 'especialidad') {
            return a.nivel_academico === 'LICENCIATURA'
              ? a.carrera
              : a.nivel_academico === 'MAESTRÍA'
                ? a.maestria
                : '';
          }
          return a[c.id] ?? '';
        });
    
        const becas = a.detalle_becas ? a.detalle_becas.split('; ') : [];
        const parsed = becas.map(str => {
          const match = str.match(/^(.+?): (.+?) \(\$(\d+(?:\.\d+)?)\)(?:- (.*))?$/);
          if (match) {
            const [, tipo, nombre, monto, detalles] = match;
            return [tipo, nombre, monto, detalles ?? ''];
          }
          return ['?', '?', '?', '?'];
        }).flat();
    
        const blank = Array((maxBecas * 4) - parsed.length).fill('');
        return [...seleccionados, ...parsed, ...blank];
      });
    
      // Estilo de encabezado
      const headerRow = worksheet.getRow(1);
      headerRow.height = 24;
      headerRow.eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '305496' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    
      // Filas
      rows.forEach((row, i) => {
        const newRow = worksheet.addRow(row);
        const fillColor = i % 2 === 0 ? 'F2F2F2' : 'FFFFFF';
        newRow.eachCell(cell => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillColor } };
          cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });
    
      // Ajustar ancho de columnas
      worksheet.columns.forEach((col, i) => {
        let maxLength = header[i].length;
        rows.forEach(r => {
          const val = r[i];
          if (val && val.toString().length > maxLength) {
            maxLength = val.toString().length;
          }
        });
        col.width = maxLength + 2;
      });
    
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'alumnos.xlsx');
    };
    

    // — Exportar a PDF
    const handleExportPDF = () => {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const columnasVisibles = columnasPDF.filter(c => c.visible);
      const headers = columnasVisibles.map(c => c.label);
    
      // Determinar el máximo de becas encontradas
      let maxBecas = 0;
      alumnos.forEach(alumno => {
        const becas = alumno.detalle_becas ? alumno.detalle_becas.split('; ') : [];
        if (becas.length > maxBecas) maxBecas = becas.length;
      });
    
      // Generar encabezados dinámicos
      const becaHeaders = [];
      for (let i = 0; i < maxBecas; i++) {
        becaHeaders.push(`Beca ${i + 1} Tipo`, `Beca ${i + 1} Nombre`, `Beca ${i + 1} Monto`, `Beca ${i + 1} Detalles`);
      }
      const fullHeaders = [...headers, ...becaHeaders];
    
      const rows = alumnos.map(alumno => {
        const row = columnasVisibles.map(c => {
          if (c.id === 'especialidad') {
            return alumno.nivel_academico === 'LICENCIATURA'
              ? alumno.carrera
              : alumno.nivel_academico === 'MAESTRÍA'
                ? alumno.maestria
                : '';
          }
          return alumno[c.id] ?? '';
        });
    
        const becas = alumno.detalle_becas ? alumno.detalle_becas.split('; ') : [];
        const parsed = becas.map(str => {
          const match = str.match(/^(.+?): (.+?) \(\$(.+?)\)(?:- (.*))?$/);
          if (match) {
            const [, tipo, nombre, monto, detalles] = match;
            return [tipo, nombre, monto, detalles ?? ''];
          }
          return ['?', '?', '?', '?'];
        }).flat();
    
        const blank = Array((maxBecas * 4) - parsed.length).fill('');
        return [...row, ...parsed, ...blank];
      });
    
      const maxColsPerPage = 15;
      const totalPages = Math.ceil(fullHeaders.length / maxColsPerPage);
    
      for (let p = 0; p < totalPages; p++) {
        const start = p * maxColsPerPage;
        const end = start + maxColsPerPage;
    
        autoTable(doc, {
          head: [fullHeaders.slice(start, end)],
          body: rows.map(r => r.slice(start, end)),
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
    
    
    return {
      // Búsqueda
      searchType, setSearchType,
      searchValue, setSearchValue,
      filtrosAvanzados, setFiltrosAvanzados,
      hasSearched, loading,
      // Datos y columnas
      alumnos, mostrarColumnas, setMostrarColumnas,
      catalogos, filtros,
      columnasPDF, setColumnasPDF,
      selectFields,
      // Handlers
      handleFilterChange,
      resetFiltros,
      handleSearch,
      handleExportExcel,
      handleExportPDF
    };
  }
