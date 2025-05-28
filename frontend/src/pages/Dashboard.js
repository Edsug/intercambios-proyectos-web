import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/Dashboard.css";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlumnos: 0,
    nuevosRegistros: 0,
    cursosActivos: 0,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/basecambios/get_dashboard_stats.php")
      .then(res => res.json())
      .then(data => {
        setStats({
          totalAlumnos: data.totalAlumnos,
          nuevosRegistros: data.nuevosRegistros,
          cursosActivos: data.cursosActivos,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Cargar datos para gráfica de niveles académicos
    fetch("http://localhost/basecambios/get_grafica_niveles.php")
      .then(res => res.json())
      .then(data => {
        setNivelesData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por nivel académico",
            data: data.map(d => d.total),
            backgroundColor: ["#3498db", "#2ecc71", "#e67e22"]
          }]
        });
      });

    // Cargar datos para gráfica de promedio por semestre
    fetch("http://localhost/basecambios/get_grafica_promedio_semestre.php")
      .then(res => res.json())
      .then(data => {
        setPromedioSemestreData({
          labels: data.map(d => `Semestre ${d.semestre}`),
          datasets: [{
            label: "Promedio por semestre",
            data: data.map(d => d.promedio),
            backgroundColor: "#9b59b6"
          }]
        });
      });

    // Cargar datos para gráfica de carreras
    fetch("http://localhost/basecambios/get_grafica_carreras.php")
      .then(res => res.json())
      .then(data => {
        setCarrerasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por carrera (Licenciatura)",
            data: data.map(d => d.total),
            backgroundColor: "#2980b9"
          }]
        });
      });

    // Cargar datos para gráfica de maestrías
    fetch("http://localhost/basecambios/get_grafica_maestrias.php")
      .then(res => res.json())
      .then(data => {
        setMaestriasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por maestría",
            data: data.map(d => d.total),
            backgroundColor: "#27ae60"
          }]
        });
      });

    // Cargar datos para gráfica de doctorados
    fetch("http://localhost/basecambios/get_grafica_doctorados.php")
      .then(res => res.json())
      .then(data => {
        setDoctoradosData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por doctorado",
            data: data.map(d => d.total),
            backgroundColor: "#e67e22"
          }]
        });
      });

    // Cargar datos para gráfica de género
    fetch("http://localhost/basecambios/get_grafica_genero.php")
      .then(res => res.json())
      .then(data => {
        setGeneroData({
          labels: data.map(d => d.sexo === "M" ? "Masculino" : "Femenino"),
          datasets: [{
            label: "Alumnos por género",
            data: data.map(d => d.total),
            backgroundColor: ["#2980b9", "#e84393"]
          }]
        });
      });

    // Cargar datos para gráfica de nacionalidad
    fetch("http://localhost/basecambios/get_grafica_nacionalidad.php")
      .then(res => res.json())
      .then(data => {
        setNacionalidadData({
          labels: data.map(d => d.tipo),
          datasets: [{
            label: "Alumnos por nacionalidad",
            data: data.map(d => d.total),
            backgroundColor: ["#8e44ad", "#f39c12"]
          }]
        });
      });

    // Cargar datos para gráfica de estados
    fetch("http://localhost/basecambios/get_grafica_estados.php")
      .then(res => res.json())
      .then(data => {
        setEstadosData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos nacionales por estado",
            data: data.map(d => d.total),
            backgroundColor: "#16a085"
          }]
        });
      });

    // Cargar datos para gráfica de programas
    fetch("http://localhost/basecambios/get_grafica_programas.php")
      .then(res => res.json())
      .then(data => {
        setProgramasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por programa",
            data: data.map(d => d.total),
            backgroundColor: "#8e44ad"
          }]
        });
      });

    // Cargar datos para gráfica de tipos de movilidad
    fetch("http://localhost/basecambios/get_grafica_tipos_movilidad.php")
      .then(res => res.json())
      .then(data => {
        setTiposMovilidadData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por tipo de movilidad",
            data: data.map(d => d.total),
            backgroundColor: "#e84393"
          }]
        });
      });

    // Cargar datos para gráfica de becas
    fetch("http://localhost/basecambios/get_grafica_becas.php")
      .then(res => res.json())
      .then(data => {
        setBecasData({
          labels: data.map(d => d.nombre),
          datasets: [{
            label: "Alumnos por tipo de beca",
            data: data.map(d => d.total),
            backgroundColor: "#f1c40f"
          }]
        });
      });
  }, []);

  // Opciones para mostrar la cantidad en el centro de cada sección del pastel
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        }
      },
      datalabels: {
        color: '#222',
        font: { weight: 'bold', size: 14 },
        formatter: (value, context) => {
          return value;
        },
        anchor: 'center',
        align: 'center',
      }
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
        <div className="stat-card">
          <h3>Cursos activos</h3>
          <p className="stat-number">{stats.cursosActivos}</p>
        </div>
      </div>

      <div className="dashboard-graphics-grid">
        {nivelesData && nivelesData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por nivel académico</h3>
            <Bar data={nivelesData} />
          </div>
        )}
        {promedioSemestreData && promedioSemestreData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Promedio por semestre</h3>
            <Bar data={promedioSemestreData} />
          </div>
        )}
        {carrerasData && carrerasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por carrera (Licenciatura)</h3>
            <Bar data={carrerasData} />
          </div>
        )}
        {maestriasData && maestriasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por maestría</h3>
            <Bar data={maestriasData} />
          </div>
        )}
        {doctoradosData && doctoradosData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por doctorado</h3>
            <Bar data={doctoradosData} />
          </div>
        )}
        {generoData && generoData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por género</h3>
            <Pie data={generoData} options={pieOptions} />
          </div>
        )}
        {nacionalidadData && nacionalidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por nacionalidad</h3>
            <Pie data={nacionalidadData} options={pieOptions} />
          </div>
        )}
        {estadosData && estadosData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos nacionales por estado</h3>
            <Pie data={estadosData} options={pieOptions} />
          </div>
        )}
        {programasData && programasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por programa</h3>
            <Pie data={programasData} options={pieOptions} />
          </div>
        )}
        {tiposMovilidadData && tiposMovilidadData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por tipo de movilidad</h3>
            <Pie data={tiposMovilidadData} options={pieOptions} />
          </div>
        )}
        {becasData && becasData.labels.length > 0 && (
          <div className="dashboard-graphic-card">
            <h3>Alumnos por tipo de beca</h3>
            <Pie data={becasData} options={pieOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
