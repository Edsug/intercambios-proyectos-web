import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import userDefault from "../../assets/user.png";
import logoCompleto from "../../assets/logo_completo.png";

export default function BotonPDFAlumno({ alumno }) {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 20;
    let y = 12;

    // Logo grande (centrado y proporcional)
    const logoImg = new window.Image();
    logoImg.src = logoCompleto;
    await new Promise(resolve => (logoImg.onload = resolve));
    const maxLogoW = 80;
    const logoW = Math.min(maxLogoW, logoImg.width * 0.264583); // px to mm
    const logoH = logoW * (logoImg.height / logoImg.width);
    const logoX = (pageWidth - logoW) / 2;
    doc.addImage(logoCompleto, "PNG", logoX, y, logoW, logoH);
    y += logoH + 4;

    // Logo chico (opcional, arriba izquierda)
    const logoChicoUrl = process.env.PUBLIC_URL + "/logo_ficha.jpg";
    try {
      const res = await fetch(logoChicoUrl);
      if (res.ok) {
        const blob = await res.blob();
        if (blob.type.startsWith("image/")) {
          const imgData = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          doc.addImage(imgData, "JPEG", marginX, 8, 22, 22);
        }
      }
    } catch {}

    // Título
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text("FICHA DE ALUMNO", pageWidth / 2, y + 10, { align: "center" });

    // Foto del alumno centrada
    y += 22;
    const fotoWidth = 40;
    const fotoX = (pageWidth - fotoWidth) / 2;
    let fotoCargada = false;

    if (alumno.codigo) {
      const extensions = ["jpg", "jpeg", "png", "gif"];
      for (let ext of extensions) {
        // USAR AQUI
        const url = `http://localhost/basecambios/ver_foto.php?codigo=${alumno.codigo}&ext=${ext}`;
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
              doc.setDrawColor(52, 152, 219);
              doc.setLineWidth(0.5);
              doc.roundedRect(fotoX, y, fotoWidth, fotoWidth, 4, 4);
              doc.addImage(imgDataResized, "JPEG", fotoX, y, fotoWidth, fotoWidth);
              fotoCargada = true;
              break;
            }
          }
        } catch (e) {
          // Si falla, prueba con la siguiente extensión
        }
      }
    }

    if (!fotoCargada) {
      doc.setDrawColor(200);
      doc.roundedRect(fotoX, y, fotoWidth, fotoWidth, 4, 4);
      doc.addImage(userDefault, "PNG", fotoX, y, fotoWidth, fotoWidth);
    }

    // Función para secciones
    const section = (title, rows) => {
      y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 15 : y + fotoWidth + 10;
      doc.setFontSize(13);
      doc.setTextColor(44, 62, 80);
      doc.text(title, marginX, y);
      doc.autoTable({
        startY: y + 4,
        styles: { fontSize: 10 },
        theme: "grid",
        margin: { left: marginX, right: marginX, bottom: 25 }, // <-- margen inferior para el pie
        tableWidth: 170,
        body: rows.map(([label, val]) => [
          { content: `${label}:`, styles: { fontStyle: "bold" } },
          { content: val || "" }
        ]),
        didDrawPage: (data) => {
          // Pie de página en cada hoja
          const pageHeight = doc.internal.pageSize.getHeight();
          doc.setDrawColor(200);
          doc.setLineWidth(0.2);
          doc.line(marginX, pageHeight - 22, 210 - marginX, pageHeight - 22);
          doc.setFontSize(10);
          doc.setTextColor(120);
          doc.text("Sistema de Intercambios - CUSUR", 105, pageHeight - 15, { align: "center" });
        }
      });
      y = doc.lastAutoTable.finalY + 10;
    };

    // Lógica condicional
    const programaAcademico = () => {
      if (alumno.nivel_academico === "LICENCIATURA") return ["Carrera", alumno.carrera];
      if (alumno.nivel_academico === "MAESTRÍA") return ["Maestría", alumno.maestria];
      if (alumno.nivel_academico === "DOCTORADO") return ["Doctorado", alumno.doctorado];
      return ["Programa", ""];
    };

    const ubicacionDestino = () => {
      if (alumno.tipo_destino === "NACIONAL") return ["Estado", alumno.estado];
      if (alumno.tipo_destino === "INTERNACIONAL") return ["País", alumno.pais];
      return ["Ubicación destino", ""];
    };

    // Secciones
    section("Datos Personales", [
      ["Código", alumno.codigo],
      ["Nombre(s)", alumno.nombre],
      ["Apellidos", alumno.apellidos],
      ["Nivel académico", alumno.nivel_academico],
      programaAcademico(),
      ["Género", alumno.sexo],
      ["Tipo de sangre", alumno.tipo_sangre],
      ["Nacionalidad", alumno.nacionalidad],
      ["Fecha nacimiento", alumno.fecha_nacimiento],
      ["Semestre", alumno.semestre],
      ["Promedio", alumno.promedio],
      ["Discapacidad", alumno.discapacidad],
      ["Comunidad nativa", alumno.pertenece_comunidad ? "Sí" : "No"],
      ["Nombre comunidad", alumno.comunidad_nativa],
      ["Teléfono", alumno.telefono],
      ["Correo", alumno.correo],
      ["Contacto emergencia", alumno.contacto_emergencia],
      ["Nombre contacto emergencia", alumno.nombre_contacto_emergencia],
      ["NSS", alumno.nss]
    ]);

    section("Datos del Programa", [
      ["Programa", alumno.programa],
      ["Folio", alumno.folio],
      ["Estado", alumno.estado_programa],
      ["Fecha", alumno.programa_fecha]
    ]);

    section("Datos de Movilidad", [
      ["Tipo movilidad", alumno.tipo_movilidad],
      ["Tipo destino", alumno.tipo_destino],
      ["Institución destino", alumno.institucion_destino],
      ubicacionDestino(),
      ["Fecha inicio", alumno.fecha_inicio],
      ["Fecha fin", alumno.fecha_fin],
      ["Ciclo", alumno.ciclo],
      ["Observaciones", alumno.observaciones_movilidad]
    ]);

    if (alumno.becas?.length > 0) {
      section("Becas", alumno.becas.map((b, i) => [
        `Beca ${i + 1}`,
        `${b.tipo} - ${b.nombre} | Monto: $${b.monto || 0} | ${b.detalles || ""}`
      ]));
    }

    section("Datos Adicionales", [
      ["Revalidación materias", alumno.revalidacion_materias ? "Sí" : "No"],
      ["Datos revalidacion", alumno.datos_revalidacion],
      ["Certificado calificaciones", alumno.certificado_calificaciones ? "Sí" : "No"],
      ["Seguro de viaje", alumno.seguro_viaje ? "Sí" : "No"],
      ["Nombre aseguradora", alumno.nombre_aseguradora],
      ["Número póliza", alumno.numero_poliza],
      ["Fecha inicio seguro", alumno.fecha_inicio_seguro],
      ["Fecha fin seguro", alumno.fecha_fin_seguro],
      ["Contacto aseguradora", alumno.contacto_aseguradora],
      ["Observaciones seguro", alumno.observaciones_seguro],
      ["Experiencia compartida", alumno.experiencia_compartida ? "Sí" : "No"],
      ["Detalles experiencia", alumno.detalles_experiencia]
    ]);

    doc.save(`alumno_${alumno.codigo || "perfil"}.pdf`);
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

  return (
    <button className="pdf-btn" onClick={handlePDF} style={{ marginBottom: 16 }}>
      Descargar PDF
    </button>
  );
}
