// src/utils/excelExporter.js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/**
 * Genera y descarga un archivo Excel con la lista de alumnos.
 *
 * @param {Array} alumnos       — Array de objetos alumno.
 * @param {Array} columnasPDF   — Array de columnas { id, label, visible }.
 * @param {number} maxBecas     — Número máximo de becas a mostrar.
 * @param {string} filename     — Nombre de archivo (por defecto 'alumnos.xlsx').
 */
export async function exportExcel(alumnos, columnasPDF, maxBecas, filename = 'alumnos.xlsx') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Alumnos');

  // 1) Cabeceras visibles + dinámicas de becas
  const columnasVisibles = columnasPDF.filter(c => c.visible);
  const header = columnasVisibles.map(col => col.label);
  for (let i = 0; i < maxBecas; i++) {
    header.push(`Beca ${i+1} Tipo`, `Beca ${i+1} Nombre`, `Beca ${i+1} Monto`);
  }
  worksheet.addRow(header);

  // 2) Construir filas
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

  // 3) Estilos de la cabecera
  const headerRow = worksheet.getRow(1);
  headerRow.height = 24;
  headerRow.eachCell(cell => {
    cell.font      = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: '305496' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border    = {
      top: { style: 'thin' }, left: { style: 'thin' },
      bottom: { style: 'thin' }, right: { style: 'thin' }
    };
  });

  // 4) Filas con zebrados y bordes
  rows.forEach((row, i) => {
    const newRow = worksheet.addRow(row);
    const fillColor = i % 2 === 0 ? 'F2F2F2' : 'FFFFFF';
    newRow.eachCell(cell => {
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillColor } };
      cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      cell.border    = {
        top: { style: 'thin' }, left: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' }
      };
    });
  });

  // 5) Ajuste de anchos de columna
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

  // 6) Generar y descargar
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), filename);
}
