import { getChartColors } from './getChartColors';

// Paletas de colores para las gráficas
const palette1 = [
  "#8e44ad", "#e84393", "#f1c40f", "#16a085", "#2980b9", "#e67e22", "#2ecc71", "#9b59b6", "#f39c12", "#27ae60", "#3498db"
];
const palette2 = [
  "#ff7675", "#00b894", "#fdcb6e", "#0984e3", "#fd79a8", "#636e72", "#00cec9", "#fab1a0", "#6c5ce7", "#d35400", "#b2bec3"
];

export function getNivelesData(alumnos) {
  const niveles = {};
  alumnos.forEach(a => {
    const n = a.nivel_academico || "Sin dato";
    niveles[n] = (niveles[n] || 0) + 1;
  });
  const labels = Object.keys(niveles);
  return {
    labels,
    datasets: [{
      label: "Alumnos por nivel académico",
      data: Object.values(niveles),
      backgroundColor: getChartColors(labels.length) // Un color por barra
    }]
  };
}

export function getPromedioSemestreData(alumnos) {
  // Agrupa por semestre y calcula promedio
  const semestres = {};
  alumnos.forEach(a => {
    const s = a.semestre || "Sin dato";
    if (!semestres[s]) semestres[s] = [];
    if (a.promedio) semestres[s].push(Number(a.promedio));
  });
  const labels = Object.keys(semestres).sort((a, b) => a - b);
  return {
    labels: labels.map(s => `Semestre ${s}`),
    datasets: [{
      label: "Promedio por semestre",
      data: labels.map(s => {
        const arr = semestres[s];
        if (!arr.length) return 0;
        return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
      }),
      backgroundColor: getChartColors(labels.length)
    }]
  };
}

export function getCarrerasData(alumnos) {
  const carreras = {};
  alumnos.forEach(a => {
    if (a.nivel_academico === "LICENCIATURA") {
      const c = a.carrera || "Sin dato";
      carreras[c] = (carreras[c] || 0) + 1;
    }
  });
  return {
    labels: Object.keys(carreras),
    datasets: [{
      label: "Alumnos por carrera (Licenciatura)",
      data: Object.values(carreras),
      backgroundColor: getChartColors(Object.keys(carreras).length)
    }]
  };
}

export function getMaestriasData(alumnos) {
  const maestrias = {};
  alumnos.forEach(a => {
    if (a.nivel_academico === "MAESTRÍA") {
      const m = a.maestria || "Sin dato";
      maestrias[m] = (maestrias[m] || 0) + 1;
    }
  });
  return {
    labels: Object.keys(maestrias),
    datasets: [{
      label: "Alumnos por maestría",
      data: Object.values(maestrias),
      backgroundColor: getChartColors(Object.keys(maestrias).length)
    }]
  };
}

export function getDoctoradosData(alumnos) {
  const doctorados = {};
  alumnos.forEach(a => {
    if (a.nivel_academico === "DOCTORADO") {
      const d = a.doctorado || "Sin dato";
      doctorados[d] = (doctorados[d] || 0) + 1;
    }
  });
  return {
    labels: Object.keys(doctorados),
    datasets: [{
      label: "Alumnos por doctorado",
      data: Object.values(doctorados),
      backgroundColor: getChartColors(Object.keys(doctorados).length)
    }]
  };
}

export function getGeneroData(alumnos) {
  const generos = {};
  alumnos.forEach(a => {
    const g = (a.sexo || "Sin dato").trim();
    generos[g] = (generos[g] || 0) + 1;
  });
  const labels = Object.keys(generos);
  return {
    labels,
    datasets: [{
      label: "Alumnos por género",
      data: Object.values(generos),
      backgroundColor: palette1.slice(0, labels.length)
    }]
  };
}

export function getNacionalidadData(alumnos) {
  const nacionalidades = {};
  alumnos.forEach(a => {
    const n = a.nacionalidad || "Sin dato";
    nacionalidades[n] = (nacionalidades[n] || 0) + 1;
  });
  return {
    labels: Object.keys(nacionalidades),
    datasets: [{
      label: "Alumnos por nacionalidad",
      data: Object.values(nacionalidades),
      backgroundColor: ["#8e44ad", "#f39c12"]
    }]
  };
}

export function getEstadosData(alumnos) {
  const estados = {};
  alumnos.forEach(a => {
    if (a.tipo_destino === "NACIONAL") {
      const e = a.estado_destino || "Sin dato";
      estados[e] = (estados[e] || 0) + 1;
    }
  });
  return {
    labels: Object.keys(estados),
    datasets: [{
      label: "Alumnos nacionales por estado",
      data: Object.values(estados),
      backgroundColor: "#16a085"
    }]
  };
}

export function getProgramasData(alumnos) {
  const programas = {};
  alumnos.forEach(a => {
    const p = a.programa || "Sin dato";
    programas[p] = (programas[p] || 0) + 1;
  });
  return {
    labels: Object.keys(programas),
    datasets: [{
      label: "Alumnos por programa",
      data: Object.values(programas),
      backgroundColor: palette1.slice(0, Object.keys(programas).length)
    }]
  };
}

export function getTiposMovilidadData(alumnos) {
  const tipos = {};
  alumnos.forEach(a => {
    const t = a.tipo_movilidad || "Sin dato";
    tipos[t] = (tipos[t] || 0) + 1;
  });
  return {
    labels: Object.keys(tipos),
    datasets: [{
      label: "Alumnos por tipo de movilidad",
      data: Object.values(tipos),
      backgroundColor: palette2.slice(0, Object.keys(tipos).length)
    }]
  };
}

export function getBecasData(alumnos) {
  const becas = {};
  alumnos.forEach(a => {
    if (a.detalle_becas) {
      a.detalle_becas.split("; ").forEach(b => {
        const tipo = b.split(":")[0] || "Sin dato";
        becas[tipo] = (becas[tipo] || 0) + 1;
      });
    }
  });
  return {
    labels: Object.keys(becas),
    datasets: [{
      label: "Alumnos por tipo de beca",
      data: Object.values(becas),
      backgroundColor: palette1.slice(0, Object.keys(becas).length)
    }]
  };
}

export function getDiscapacidadData(alumnos) {
  const discapacidad = {};
  alumnos.forEach(a => {
    const tipo = a.discapacidad ? "Con discapacidad" : "Sin discapacidad";
    discapacidad[tipo] = (discapacidad[tipo] || 0) + 1;
  });
  return {
    labels: Object.keys(discapacidad),
    datasets: [{
      label: "Alumnos con discapacidad",
      data: Object.values(discapacidad),
      backgroundColor: palette2.slice(0, Object.keys(discapacidad).length)
    }]
  };
}

export function getComunidadData(alumnos) {
  const comunidad = {};
  alumnos.forEach(a => {
    const tipo = a.pertenece_comunidad === 1 || a.pertenece_comunidad === "1" ? "Sí" : "No";
    comunidad[tipo] = (comunidad[tipo] || 0) + 1;
  });
  return {
    labels: Object.keys(comunidad),
    datasets: [{
      label: "Alumnos de comunidad nativa",
      data: Object.values(comunidad),
      backgroundColor: palette1.slice(0, Object.keys(comunidad).length)
    }]
  };
}