import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import userDefault from "../../assets/user.png";
import logoCompleto from "../../assets/logo_completo.png";
import { BASE_URL } from "../../config";

export default function BotonPDFAlumno({ alumno }) {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 25;
    const marginY = 20;
    let y = marginY;

    // Paleta de colores mejorada
    const colors = {
      primary: [31, 81, 255], // Azul moderno
      secondary: [100, 116, 139], // Gris azulado
      accent: [16, 185, 129], // Verde esmeralda
      text: [15, 23, 42], // Gris muy oscuro
      textLight: [71, 85, 105], // Gris medio
      border: [226, 232, 240], // Gris muy claro
      background: [248, 250, 252] // Fondo muy claro
    };

    // Funciones auxiliares mejoradas
    const getProgramaAcademico = () => {
      if (alumno.nivel_academico === "LICENCIATURA" && alumno.carrera) 
        return { label: "Carrera", value: alumno.carrera };
      if (alumno.nivel_academico === "MAESTRÍA" && alumno.maestria) 
        return { label: "Maestría", value: alumno.maestria };
      if (alumno.nivel_academico === "DOCTORADO" && alumno.doctorado) 
        return { label: "Doctorado", value: alumno.doctorado };
      return null;
    };

    const getUbicacionDestino = () => {
      if (alumno.tipo_destino === "NACIONAL" && alumno.estado) 
        return { label: "Estado", value: alumno.estado };
      if (alumno.tipo_destino === "INTERNACIONAL" && alumno.pais) 
        return { label: "País", value: alumno.pais };
      return null;
    };

    const resizeImage = (imgDataUrl, maxSize = 400) => {
      return new Promise(resolve => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = Math.min(maxSize, img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          // Añadir bordes redondeados
          ctx.beginPath();
          ctx.roundRect(0, 0, size, size, size * 0.1);
          ctx.clip();
          ctx.drawImage(img, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
        img.src = imgDataUrl;
      });
    };

    // Función para añadir encabezado en cada página
    const addHeader = () => {
      // Quita o comenta la siguiente línea para eliminar el fondo gris/azulado del header
      // doc.setFillColor(...colors.background);
      // doc.rect(0, 0, pageWidth, 15, 'F');
      
      // Línea decorativa superior (ELIMINAR O COMENTAR ESTAS LÍNEAS)
      // doc.setDrawColor(...colors.primary);
      // doc.setLineWidth(2);
      // doc.line(0, 15, pageWidth, 15);
    };

    // Función para añadir pie de página
    const addFooter = (pageNum, totalPages) => {
      const footerY = pageHeight - 15;
      
      // Línea decorativa inferior
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.line(marginX, footerY - 5, pageWidth - marginX, footerY - 5);
      
      // Texto del pie de página
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colors.textLight);
      
      // Fecha de generación
      const fecha = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.text(`Generado el ${fecha}`, marginX, footerY);
      
      // Número de página
      doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - marginX, footerY, { align: "right" });
      
      // Logo institucional pequeño
      doc.text("Sistema de Intercambios - CUSUR", pageWidth / 2, footerY, { align: "center" });
    };

    // Header principal con logo y título mejorado
    addHeader();
    y = 25;

    try {
      const logoImg = new window.Image();
      logoImg.src = logoCompleto;
      await new Promise(resolve => (logoImg.onload = resolve));
      
      const logoH = 35;
      const logoAspect = logoImg.width / logoImg.height;
      const logoW = logoH * logoAspect;

      // Card container para el header
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.roundedRect(marginX, y, pageWidth - 2 * marginX, 55, 3, 3, 'FD');

      // Logo
      doc.addImage(logoCompleto, "PNG", marginX + 15, y + 10, logoW, logoH);

      // Título principal
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.primary);
      doc.text("FICHA DE ESTUDIANTE", marginX + logoW + 30, y + 25);
      
      // Subtítulo
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colors.secondary);
      doc.text("Programa de Intercambio Académico", marginX + logoW + 30, y + 35);

      y += 70;
    } catch (e) {
      console.error("Error cargando logo:", e);
      y += 20;
    }

    // Sección de información principal del estudiante
    const fotoSize = 50;
    const cardY = y;
    
    // Card principal del estudiante
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.5);
    doc.roundedRect(marginX, cardY, pageWidth - 2 * marginX, 70, 5, 5, 'FD');

    // Foto del estudiante
    let fotoCargada = false;
    if (alumno.codigo) {
      const extensions = ["jpg", "jpeg", "png", "gif"];
      for (let ext of extensions) {
        const url = `${BASE_URL}ver_foto.php?codigo=${alumno.codigo}&ext=${ext}`;
        try {
          const res = await fetch(url, { method: "GET" });
          if (res.ok) {
            const blob = await res.blob();
            if (blob.type.startsWith("image/") && blob.size > 100) {
              const imgData = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              });
              const imgDataResized = await resizeImage(imgData, 400);

              let imgType = "JPEG";
              if (blob.type === "image/png") imgType = "PNG";
              if (blob.type === "image/gif") imgType = "GIF";

              // Foto con sombra sutil
              doc.setFillColor(0, 0, 0, 0.1);
              doc.roundedRect(marginX + 17, cardY + 12, fotoSize, fotoSize, 8, 8, 'F');
              doc.addImage(imgDataResized, imgType, marginX + 15, cardY + 10, fotoSize, fotoSize);
              fotoCargada = true;
              break;
            }
          }
        } catch (e) {
          // Continuar con la siguiente extensión
        }
      }
    }

    if (!fotoCargada) {
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(marginX + 15, cardY + 10, fotoSize, fotoSize, 8, 8, 'F');
      doc.addImage(userDefault, "PNG", marginX + 15, cardY + 10, fotoSize, fotoSize);
    }

    // Información principal del estudiante
    const infoX = marginX + fotoSize + 30;
    let infoY = cardY + 20;

    // Nombre prominente
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.text);
    const nombreCompleto = `${alumno.nombre || ''} ${alumno.apellidos || ''}`.trim();
    doc.text(nombreCompleto, infoX, infoY);
    infoY += 12;

    // Código con estilo badge
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(...colors.accent);
    const codigoText = `CÓDIGO: ${alumno.codigo || 'N/A'}`;
    const codigoWidth = doc.getTextWidth(codigoText) + 8;
    doc.roundedRect(infoX, infoY - 6, codigoWidth, 10, 2, 2, 'F');
    doc.text(codigoText, infoX + 4, infoY);
    infoY += 15;

    // Programa académico
    const programa = getProgramaAcademico();
    if (programa) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colors.textLight);
      doc.text(`${programa.label}: `, infoX, infoY);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.text);
      doc.text(programa.value, infoX + doc.getTextWidth(`${programa.label}: `), infoY);
      infoY += 8;
    }

    // Semestre y promedio en línea
    const extraInfo = [];
    if (alumno.semestre) extraInfo.push(`${alumno.semestre}° Semestre`);
    if (alumno.promedio) extraInfo.push(`Promedio: ${alumno.promedio}`);
    
    if (extraInfo.length > 0) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colors.secondary);
      doc.text(extraInfo.join(' • '), infoX, infoY);
    }

    y = cardY + 85;

    // Función mejorada para crear secciones
    const createSection = (title, data, icon = "•") => {
      // Verificar espacio en página
      if (y > pageHeight - 80) {
        doc.addPage();
        addHeader();
        y = 35;
      }

      // Filtrar datos vacíos
      const validData = data.filter(([label, value]) => 
        value !== null && value !== undefined && value !== '' && value !== 'N/A'
      );

      if (validData.length === 0) return;

      // Encabezado de sección con diseño mejorado
      doc.setFillColor(...colors.primary);
      doc.roundedRect(marginX, y, pageWidth - 2 * marginX, 12, 2, 2, 'F');
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`${icon} ${title}`, marginX + 8, y + 8);
      y += 20;

      // Crear tabla con diseño moderno
      doc.autoTable({
        startY: y,
        head: [],
        body: validData.map(([label, value]) => [label, value]),
        styles: {
          fontSize: 9,
          cellPadding: 6,
          textColor: colors.text,
          lineColor: colors.border,
          lineWidth: 0.3,
          font: 'helvetica'
        },
        headStyles: {
          fillColor: colors.background,
          textColor: colors.text,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [252, 252, 253]
        },
        columnStyles: {
          0: { 
            cellWidth: 50, 
            fontStyle: 'bold',
            textColor: colors.secondary,
            fillColor: [248, 250, 252]
          },
          1: { 
            cellWidth: 110,
            textColor: colors.text
          }
        },
        margin: { left: marginX, right: marginX, bottom: 25 }, // <-- RESERVA ESPACIO PARA EL PIE DE PÁGINA
        tableLineColor: colors.border,
        tableLineWidth: 0.3,
        didDrawCell: (data) => {
          // Añadir bordes redondeados a las celdas (efecto visual)
          if (data.row.index === 0 && data.column.index === 0) {
            // Primera celda - esquina superior izquierda
          }
        }
      });

      y = doc.lastAutoTable.finalY + 15;
    };

    // Crear todas las secciones con símbolos compatibles
    createSection("INFORMACIÓN PERSONAL", [
      ["Género", alumno.sexo],
      ["Nacionalidad", alumno.nacionalidad],
      ["Fecha de nacimiento", alumno.fecha_nacimiento],
      ["Tipo de sangre", alumno.tipo_sangre],
      ["Teléfono", alumno.telefono],
      ["Correo electrónico", alumno.correo]
    ]);

    createSection("CONTACTO DE EMERGENCIA", [
      ["Contacto de emergencia", alumno.nombre_contacto_emergencia],
      ["Teléfono de emergencia", alumno.contacto_emergencia],
      ["NSS", alumno.nss]
    ]);

    // Información adicional
    const infoAdicional = [];
    if (alumno.discapacidad) infoAdicional.push(["Discapacidad", alumno.discapacidad]);
    if (alumno.pertenece_comunidad) infoAdicional.push(["Pertenece a comunidad nativa", "Sí"]);
    if (alumno.comunidad_nativa) infoAdicional.push(["Nombre de la comunidad", alumno.comunidad_nativa]);
    
    if (infoAdicional.length > 0) {
      createSection("INFORMACIÓN ADICIONAL", infoAdicional);
    }

    createSection("PROGRAMA ACADÉMICO", [
      ["Programa", alumno.programa],
      ["Folio", alumno.folio],
      ["Estado del programa", alumno.estado_programa],
      ["Fecha del programa", alumno.programa_fecha]
    ]);

    // Movilidad
    const ubicacion = getUbicacionDestino();
    const datosMovilidad = [
      ["Tipo de movilidad", alumno.tipo_movilidad],
      ["Tipo de destino", alumno.tipo_destino],
      ["Institución destino", alumno.institucion_destino],
      ubicacion ? [ubicacion.label, ubicacion.value] : null,
      ["Fecha de inicio", alumno.fecha_inicio],
      ["Fecha de fin", alumno.fecha_fin],
      ["Ciclo", alumno.ciclo],
      ["Observaciones", alumno.observaciones_movilidad]
    ].filter(item => item !== null);
    
    if (datosMovilidad.length > 0) {
      createSection("INFORMACIÓN DE MOVILIDAD", datosMovilidad);
    }

    // Becas
    if (alumno.becas && alumno.becas.length > 0) {
      const becasData = alumno.becas.map((beca, index) => [
        `Beca ${index + 1}`,
        `${beca.tipo || ''} - ${beca.nombre || ''} | Monto: ${beca.monto || 0}${beca.detalles ? ` | ${beca.detalles}` : ''}`
      ]);
      createSection("BECAS Y APOYOS ECONÓMICOS", becasData);
    }

    // Información académica
    const infoAcademica = [];
    if (alumno.revalidacion_materias) infoAcademica.push(["Revalidación de materias", "Sí"]);
    if (alumno.datos_revalidacion) infoAcademica.push(["Datos de revalidación", alumno.datos_revalidacion]);
    if (alumno.certificado_calificaciones) infoAcademica.push(["Certificado de calificaciones", "Sí"]);

    if (infoAcademica.length > 0) {
      createSection("INFORMACIÓN ACADÉMICA", infoAcademica);
    }

    // Seguro de viaje
    const seguroItems = [];
    if (alumno.seguro_viaje) {
      const isValid = val =>
        !!val &&
        val !== "0000-00-00" &&
        val !== "null" &&
        val !== "undefined" &&
        val !== "-";
      if (isValid(alumno.nombre_aseguradora)) seguroItems.push(["Aseguradora", alumno.nombre_aseguradora]);
      if (isValid(alumno.numero_poliza)) seguroItems.push(["Número de póliza", alumno.numero_poliza]);
      if (isValid(alumno.fecha_inicio_seguro)) seguroItems.push(["Inicio del seguro", alumno.fecha_inicio_seguro]);
      if (isValid(alumno.fecha_fin_seguro)) seguroItems.push(["Fin del seguro", alumno.fecha_fin_seguro]);
      if (isValid(alumno.contacto_aseguradora)) seguroItems.push(["Contacto aseguradora", alumno.contacto_aseguradora]);
      if (isValid(alumno.observaciones_seguro)) seguroItems.push(["Observaciones", alumno.observaciones_seguro]);

      if (seguroItems.length > 0) {
        createSection("SEGURO DE VIAJE", seguroItems, "◊");
      }
    }

    // Experiencia
    const experienciaItems = [];
    if (alumno.experiencia_compartida) experienciaItems.push(["Ha compartido experiencia", "Sí"]);
    if (alumno.detalles_experiencia) experienciaItems.push(["Detalles", alumno.detalles_experiencia]);

    if (experienciaItems.length > 0) {
      createSection("EXPERIENCIA COMPARTIDA", experienciaItems);
    }

    // Añadir pie de página a todas las páginas
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i, totalPages);
    }

    // Guardar PDF con nombre más descriptivo
    const fecha = new Date().toISOString().split('T')[0];
    doc.save(`ficha_estudiante_${alumno.codigo || "sin_codigo"}_${fecha}.pdf`);
  };

  return (
    <button 
      className="pdf-btn" 
      onClick={handlePDF} 
      style={{ 
        marginBottom: 16,
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #1f51ff 0%, #1e40af 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(31, 81, 255, 0.3)',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(31, 81, 255, 0.4)'
        }
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 16px rgba(31, 81, 255, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(31, 81, 255, 0.3)';
      }}
    >
      <span style={{ fontSize: '14px' }}>▼</span>
      Descargar Ficha PDF
    </button>
  );
}