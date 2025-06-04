import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import userDefault from "../../assets/user.png";
import logoCompleto from "../../assets/logo_completo.png";

export default function BotonPDFAlumno({ alumno }) {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 20;
    let y = 15;
    let logoH = 30;

    // Funciones auxiliares
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
          ctx.drawImage(img, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.src = imgDataUrl;
      });
    };
    
     // Declarar logoH aquí para usarlo después
    
    // Logo
    try {
      const logoImg = new window.Image();
      logoImg.src = logoCompleto;
      await new Promise(resolve => (logoImg.onload = resolve));
      logoH = 50; // Puedes ajustar este valor si quieres más pequeño
      const logoAspect = logoImg.width / logoImg.height;
      const logoW = logoH * logoAspect;
      doc.addImage(logoCompleto, "PNG", marginX, y, logoW, logoH);
    } catch (e) {
      console.error("Error cargando logo:", e);
    }
    
    // Título alineado arriba
    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.setFont("helvetica", "bold");
    doc.text("FICHA DE ALUMNO", pageWidth - marginX, y + 12, { align: "right" });
    
    // Ajusta y para que la línea separadora quede justo debajo del logo
    y += logoH + 8;
    
    // Línea separadora
    doc.setDrawColor(33, 150, 243);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;

    // Información del alumno con foto
    const fotoSize = 40;
    const fotoX = marginX;
    const infoX = fotoX + fotoSize + 15;

    // Cargar foto
    let fotoCargada = false;
    if (alumno.codigo) {
      const extensions = ["jpg", "jpeg", "png", "gif"];
      for (let ext of extensions) {
        const url = `http://localhost/basecambios/ver_foto.php?codigo=${alumno.codigo}&ext=${ext}`;
        try {
          const res = await fetch(url, { method: "GET", credentials: "include" });
          if (res.ok) {
            const blob = await res.blob();
            if (blob.type.startsWith("image/") && blob.size > 100) {
              const imgData = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              });
              const imgDataResized = await resizeImage(imgData, 400);
              doc.setDrawColor(200);
              doc.setLineWidth(0.5);
              doc.rect(fotoX, y, fotoSize, fotoSize);
              doc.addImage(imgDataResized, "JPEG", fotoX, y, fotoSize, fotoSize);
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
      doc.setDrawColor(200);
      doc.rect(fotoX, y, fotoSize, fotoSize);
      doc.addImage(userDefault, "PNG", fotoX, y, fotoSize, fotoSize);
    }

    // Información básica al lado de la foto
    let infoY = y + 5;
    
    // Nombre
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    const nombreCompleto = `${alumno.nombre || ''} ${alumno.apellidos || ''}`.trim();
    doc.text(nombreCompleto, infoX, infoY);
    infoY += 8;

    // Código
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Código: ${alumno.codigo || 'N/A'}`, infoX, infoY);
    infoY += 6;

    // Programa
    const programa = getProgramaAcademico();
    if (programa) {
      doc.text(`${programa.label}: ${programa.value}`, infoX, infoY);
      infoY += 6;
    }
        
    // Semestre (solo si existe)
    if (alumno.semestre) {
      doc.text(`${alumno.semestre}° Semestre`, infoX, infoY);
      infoY += 6;
  }
        // ...existing code...
    // Promedio
    if (alumno.promedio) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 150, 243);
      doc.text(`Promedio: ${alumno.promedio}`, infoX, infoY);
    }

    y += fotoSize + 15;

    // Función para crear secciones simples
    const createSection = (title, data) => {
      // Verificar espacio en página
      if (y > pageHeight - 50) {
        doc.addPage();
        y = 20;
      }

      // Filtrar datos vacíos
      const validData = data.filter(([label, value]) => 
        value !== null && value !== undefined && value !== ''
      );

      if (validData.length === 0) return;

      // Título de sección
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 150, 243);
      doc.text(title, marginX, y);
      y += 8;

      // Crear tabla simple
      doc.autoTable({
        startY: y,
        head: [],
        body: validData.map(([label, value]) => [label + ':', value]),
        styles: {
          fontSize: 9,
          cellPadding: 3,
          textColor: [33, 37, 41],
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold' },
          1: { cellWidth: 110 }
        },
        margin: { left: marginX, right: marginX },
        didDrawPage: () => {
          // Pie de página simple
          const footerY = pageHeight - 10;
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text("Sistema de Intercambios - CUSUR", pageWidth / 2, footerY, { align: "center" });
        }
      });

      y = doc.lastAutoTable.finalY + 10;
    };

    // Crear todas las secciones
    
    // Información personal
    createSection("INFORMACIÓN PERSONAL", [
      ["Género", alumno.sexo],
      ["Nacionalidad", alumno.nacionalidad],
      ["Fecha de nacimiento", alumno.fecha_nacimiento],
      ["Tipo de sangre", alumno.tipo_sangre],
      ["Teléfono", alumno.telefono],
      ["Correo electrónico", alumno.correo]
    ]);

    // Contacto de emergencia
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

    // Programa académico
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
        `${beca.tipo || ''} - ${beca.nombre || ''} | Monto: $${beca.monto || 0}${beca.detalles ? ` | ${beca.detalles}` : ''}`
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
    if (alumno.seguro_viaje) seguroItems.push(["Tiene seguro de viaje", "Sí"]);
    if (alumno.nombre_aseguradora) seguroItems.push(["Nombre de la aseguradora", alumno.nombre_aseguradora]);
    if (alumno.numero_poliza) seguroItems.push(["Número de póliza", alumno.numero_poliza]);
    if (alumno.fecha_inicio_seguro) seguroItems.push(["Fecha inicio del seguro", alumno.fecha_inicio_seguro]);
    if (alumno.fecha_fin_seguro) seguroItems.push(["Fecha fin del seguro", alumno.fecha_fin_seguro]);
    if (alumno.contacto_aseguradora) seguroItems.push(["Contacto de la aseguradora", alumno.contacto_aseguradora]);
    if (alumno.observaciones_seguro) seguroItems.push(["Observaciones del seguro", alumno.observaciones_seguro]);

    if (seguroItems.length > 0) {
      createSection("SEGURO DE VIAJE", seguroItems);
    }

    // Experiencia
    const experienciaItems = [];
    if (alumno.experiencia_compartida) experienciaItems.push(["Ha compartido experiencia", "Sí"]);
    if (alumno.detalles_experiencia) experienciaItems.push(["Detalles de la experiencia", alumno.detalles_experiencia]);

    if (experienciaItems.length > 0) {
      createSection("EXPERIENCIA COMPARTIDA", experienciaItems);
    }

    // Guardar PDF
    doc.save(`ficha_alumno_${alumno.codigo || "sin_codigo"}.pdf`);
  };

  return (
    <button 
      className="pdf-btn" 
      onClick={handlePDF} 
      style={{ 
        marginBottom: 16,
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
    >
      📄 Descargar Ficha PDF
    </button>
  );
}