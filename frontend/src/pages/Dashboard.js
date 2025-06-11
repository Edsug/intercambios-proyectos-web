import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/Dashboard.css";
import "../styles/graficas.css"; // Usa graficas.css para el diseño de gráficas
import { BASE_URL } from "../config";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Helper para obtener colores desde CSS (usando la clase oculta oculta chart-color-palette)
function getChartColors(count = 10) {
  const palette = getComputedStyle(document.documentElement)
    .getPropertyValue('--chart-colors')
    .replace(/[\[\]']/g, "") // eslint-disable-line no-useless-escape
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);
  // Fallback si no encuentra la variable CSS
  if (!palette.length || palette[0].startsWith('--')) {
    return [
      '#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b',
      '#ff6b6b', '#4ecdc4', '#f7971e', '#a18cd1', '#fbc2eb',
      '#ff9a9e', '#fecfef', '#fad0c4', '#ffd1ff', '#a8edea',
      '#fed6e3', '#ffecd2', '#fcb69f', '#f5576c', '#00f2fe',
      '#38f9d7', '#fa709a', '#fee140', '#ff9472', '#f2709c',
      '#b721ff', '#21d4fd', '#56ab2f', '#a8e6cf', '#2980b9'
    ];
  }
  return palette.slice(0, count);
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlumnos: 0,
    nuevosRegistros: 0,
  });
  const [nivelesData, setNivelesData] = useState(null);
  const [promedioSemestreData, setPromedioSemestreData] = useState(null);
  const [carrerasData, setCarrerasData] = useState(null);
  const [maestriasData, setMaestriasData] = useState(null);
  const [doctoradosData, setDoctoradosData] = useState(null);
  const [generoData, setGeneroData] = useState(null);
  const [nacionalidadData, setNacionalidadData] = useState(null);
  const [estadosData, setEstadosData] = useState(null);
  const [programasData, setProgramasData] = useState(null);
  const [tiposMovilidadData, setTiposMovilidadData] = useState(null);
  const [becasData, setBecasData] = useState(null);
  const [discapacidadData, setDiscapacidadData] = useState(null);
  const [comunidadData, setComunidadData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}get_dashboard_stats.php`)
      .then(res => res.json())
      .then(data => {
        setStats({
          totalAlumnos: data.totalAlumnos,
          nuevosRegistros: data.nuevosRegistros,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch(`${BASE_URL}get_grafica_niveles.php`)
      .then(res => res.json())
      .then(data => {
        setNivelesData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por nivel académico",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_promedio_semestre.php`)
      .then(res => res.json())
      .then(data => {
        setPromedioSemestreData({
          labels: data.map(d => `Semestre ${d.semestre}`),
          datasets: [{
            label: "Promedio por semestre",
            data: data.map(d => d.promedio),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_carreras.php`)
      .then(res => res.json())
      .then(data => {
        setCarrerasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por carrera (Licenciatura)",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_maestrias.php`)
      .then(res => res.json())
      .then(data => {
        setMaestriasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por maestría",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_doctorados.php`)
      .then(res => res.json())
      .then(data => {
        setDoctoradosData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por doctorado",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_genero.php`)
      .then(res => res.json())
      .then(data => {
        const resumen = {};
        data.forEach(d => {
          const genero = d.sexo.trim();
          if (!resumen[genero]) {
            resumen[genero] = 0;
          }
          resumen[genero] += parseInt(d.total);
        });
        const labels = Object.keys(resumen);
        const valores = Object.values(resumen);
        setGeneroData({
          labels,
          datasets: [{
            label: "Alumnos por género",
            data: valores,
            backgroundColor: getChartColors(labels.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_nacionalidad.php`)
      .then(res => res.json())
      .then(data => {
        setNacionalidadData({
          labels: data.map(d => d.tipo),
          datasets: [{
            label: "Alumnos por nacionalidad",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_estados.php`)
      .then(res => res.json())
      .then(data => {
        setEstadosData({
          labels: data.map(d => d.nombre), // Ahora usa 'nombre'
          datasets: [{
            label: "Alumnos nacionales por estado",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_programas.php`)
      .then(res => res.json())
      .then(data => {
        setProgramasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por programa",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_tipos_movilidad.php`)
      .then(res => res.json())
      .then(data => {
        setTiposMovilidadData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por tipo de movilidad",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_becas.php`)
      .then(res => res.json())
      .then(data => {
        setBecasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por tipo de beca",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_discapacidad.php`)
      .then(res => res.json())
      .then(data => {
        setDiscapacidadData({
          labels: data.map(d => d.tipo),
          datasets: [{
            label: "Alumnos con discapacidad",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });

    fetch(`${BASE_URL}get_grafica_comunidad.php`)
      .then(res => res.json())
      .then(data => {
        setComunidadData({
          labels: data.map(d => d.tipo),
          datasets: [{
            label: "Alumnos de comunidad nativa",
            data: data.map(d => d.total),
            backgroundColor: getChartColors(data.length)
          }]
        });
      });
  }, []);

  const carrerasLabelsCount = carrerasData && carrerasData.labels ? carrerasData.labels.length : 0;

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top", labels: { font: { size: 16 } } },
      tooltip: { enabled: true, bodyFont: { size: 14 } }
    },
    scales: {
      x: {
        ticks: {
          font: { size: carrerasLabelsCount > 10 ? 10 : 14 },
          callback: function(value, index, ticks) {
            const label = this.getLabelForValue(value);
            return label ? label.match(/.{1,16}/g) : value;
          }
        }
      },
      y: { ticks: { font: { size: 14 } }, beginAtZero: true }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom", labels: { font: { size: 16 } } },
      tooltip: { enabled: true, bodyFont: { size: 14 } }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <p>Cargando estadísticas…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-welcome">
        <h1>📊 Bienvenido al Dashboard</h1>
        <p>Aquí verás un resumen de los alumnos registrados y las últimas acciones.</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de alumnos</h3>
          <p className="stat-number">{stats.totalAlumnos}</p>
        </div>
        <div className="stat-card">
          <h3>Registros nuevos (últ. 7d)</h3>
          <p className="stat-number">{stats.nuevosRegistros}</p>
        </div>
      </div>

      <div className="dashboard-graphics-grid">
        {nivelesData && nivelesData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por nivel académico</h3>
            <Bar data={nivelesData} options={barOptions} height={220} />
          </div>
        )}
        {promedioSemestreData && promedioSemestreData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Promedio por semestre</h3>
            <Bar data={promedioSemestreData} options={barOptions} height={220} />
          </div>
        )}
        {carrerasData && carrerasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por carrera (Licenciatura)</h3>
            <div className="chart-container">
              <Bar
                data={carrerasData}
                options={barOptions}
                height={220}
                width={Math.max(400, carrerasData.labels.length * 40)} // 40px por etiqueta
              />
            </div>
          </div>
        )}
        {maestriasData && maestriasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por maestría</h3>
            <Bar data={maestriasData} options={barOptions} height={220} />
          </div>
        )}
        {doctoradosData && doctoradosData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por doctorado</h3>
            <Bar data={doctoradosData} options={barOptions} height={220} />
          </div>
        )}
        {generoData && generoData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por género</h3>
            <Pie data={generoData} options={pieOptions} height={220} />
          </div>
        )}
        {nacionalidadData && nacionalidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por nacionalidad</h3>
            <Pie data={nacionalidadData} options={pieOptions} height={220} />
          </div>
        )}
        {estadosData && estadosData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por estado del programa</h3>
            <Pie data={estadosData} options={pieOptions} height={220} />
          </div>
        )}
        {programasData && programasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por programa</h3>
            <Pie data={programasData} options={pieOptions} height={220} />
          </div>
        )}
        {tiposMovilidadData && tiposMovilidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por tipo de movilidad</h3>
            <Pie data={tiposMovilidadData} options={pieOptions} height={220} />
          </div>
        )}
        {becasData && becasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por tipo de beca</h3>
            <Pie data={becasData} options={pieOptions} height={220} />
          </div>
        )}
        {discapacidadData && discapacidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos con discapacidad</h3>
            <Pie data={discapacidadData} options={pieOptions} height={220} />
          </div>
        )}
        {comunidadData && comunidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos de comunidad nativa</h3>
            <Pie data={comunidadData} options={pieOptions} height={220} />
          </div>
        )}
      </div>
      {/* Elemento oculto para exponer la paleta de colores al JS si se requiere */}
      <div className="chart-color-palette" />
    </div>
  );
};

export default Dashboard;
