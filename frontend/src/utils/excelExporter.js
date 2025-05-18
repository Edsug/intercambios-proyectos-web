// src/utils/pdfExporter.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Genera y descarga un PDF con la lista de alumnos.
 * @param {Array} alumnos       Array de objetos alumno.
 * @param {Array} columnasPDF   Array de columnas con { id, label, visible }.
 * @param {number} maxBecas     Número máximo de becas a mostrar.
 * @param {string} filename     Nombre de archivo (opcional, por defecto 'alumnos.pdf').
 */
export function exportPDF(alumnos, columnasPDF, maxBecas, filename = 'alumnos.pdf') {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  // 1) Cabeceras estáticas
  const columnasVisibles = columnasPDF.filter(c => c.visible);
  const headers = columnasVisibles.map(c => c.label);

  // 2) Cabeceras dinámicas para becas
  const becaHeaders = [];
  for (let i = 0; i < maxBecas; i++) {
    becaHeaders.push(
      `Beca ${i+1} Tipo`,
      `Beca ${i+1} Nombre`,
      `Beca ${i+1} Monto`
    );
  }

  const fullHeaders = [...headers, ...becaHeaders];

  // 3) Filas de datos
  const rows = alumnos.map(alumno => {
    // datos de columnas fijas
    const row = columnasVisibles.map(c => alumno[c.id] ?? '');

    // parseo de detalle_becas: "Tipo: Nombre ($Monto)"
    const becas = alumno.detalle_becas
      ? alumno.detalle_becas.split('; ')
      : [];
    const parsed = becas.map(str => {
      const [typeName, amountPart] = str.split(' ($');
      const [tipo, nombre] = typeName.split(': ');
      const monto = amountPart
        ? amountPart.replace(')', '')
        : '';
      return [tipo, nombre, monto];
    }).flat();

    // espacios en blanco si hay menos de maxBecas
    const blank = Array((maxBecas * 3) - parsed.length).fill('');
    return [...row, ...parsed, ...blank];
  });

  // 4) Paginación de columnas si son muchísimas
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
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: 255,
        fontSize: 8
      },
      bodyStyles: { fontSize: 7, valign: 'top' },
      styles: { overflow: 'linebreak', cellPadding: 2, halign: 'left' },
      margin: { top: 40, left: 10, right: 10 },
      didDrawPage: data => {
        doc.setFontSize(12);
        doc.text(
          `Listado de Alumnos - Página ${p + 1}`,
          data.settings.margin.left,
          30
        );
      }
    });

    if (p < totalPages - 1) doc.addPage();
  }

  // 5) Guardar
  doc.save(filename);
}
