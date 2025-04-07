import React, { useState } from "react";
import "../styles/FrmRegistro.css";

const Registro = () => {
  const [alumno, setAlumno] = useState({
    // Sección Programa
    PROGRAMA: '',
    ACTIVIDAD: '',
    FOLIO: '',
    ESTADO: 'ACTIVO', // Por defecto Activo
    
    // Sección Datos del Alumno
    CODIGO: '',
    NOMBRE: '',
    APELLIDOS: '',
    CARRERA: '',
    SEMESTRE: '',
    PROMEDIO: '',
    SEXO: '',
    FECHA_NACIMIENTO: '',
    
    // Mantenemos los campos originales que podrían necesitarse
    PROMOCION: '',
    PAIS: '',
    INSTITUCION_DESTINO: '',
    BECADO_POR: '',
    CALIFICACIONES: '',
    REVALIDACION: '',
    CALF_SIIAU: '',
    CONTINUA_MOVILIDAD: false,
    RECTORIA: '',
    BECADO_POR_CUSUR: '',
    ORGANISMO_EXTERNO_NOMBRE: '',
    ORGANISMO_EXTERNO_MONTO: '',
    BECADO_POR_LA_SEP: '',
    CGCI_PEA_AMPLIADO: '',
    PROFOCIE_PPE: '',
    ESACIES: '',
    RENUNCIAS: '',
    APOYO_REPATRIACION: '',
    COVID_19: '',
    CUENTA_CON_ALGUNA_DISCAPACIDAD: '',
    PERTENECE_ALGUNA_COMUNIDAD_INDIGENA: ''
  });

  // Lista de carreras disponibles
  const carreras = [
    "INGENIERÍA EN COMPUTACIÓN",
    "MEDICINA",
    "DERECHO",
    "PSICOLOGÍA",
    "ADMINISTRACIÓN DE EMPRESAS",
    "ENFERMERÍA",
    "CONTADURÍA PÚBLICA",
    "TURISMO",
    "NUTRICIÓN",
    "AGRONOMÍA"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAlumno({
      ...alumno,
      [name]: type === 'checkbox' ? checked : value.toUpperCase()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(alumno);
    // Aquí puedes agregar la lógica para enviar el formulario al backend
    alert("Alumno registrado correctamente");
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>📝 REGISTRAR ALUMNO</h1>
        <p>COMPLETE TODOS LOS CAMPOS PARA REGISTRAR UN NUEVO ALUMNO</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registro-form">
        {/* SECCIÓN 1: PROGRAMA */}
        <div className="form-section">
          <h2 className="section-title">Programa</h2>
          <div className="section-content">
            <div className="form-row">
              <label>
                PROGRAMA:
                <input type="text" name="PROGRAMA" value={alumno.PROGRAMA} onChange={handleChange} required />
              </label>
              <label>
                ACTIVIDAD:
                <input type="text" name="ACTIVIDAD" value={alumno.ACTIVIDAD} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                FOLIO:
                <input type="text" name="FOLIO" value={alumno.FOLIO} onChange={handleChange} required />
              </label>
              <label className="select-label">
                ESTADO:
                <select name="ESTADO" value={alumno.ESTADO} onChange={handleChange}>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="CANCELADO">CANCELADO</option>
                  <option value="RECHAZADO">RECHAZADO</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: DATOS DEL ALUMNO */}
        <div className="form-section">
          <h2 className="section-title">Datos del Alumno</h2>
          <div className="section-content">
            <div className="form-row">
              <label>
                CÓDIGO:
                <input type="text" name="CODIGO" value={alumno.CODIGO} onChange={handleChange} required />
              </label>
              <label>
                NOMBRE(S):
                <input type="text" name="NOMBRE" value={alumno.NOMBRE} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                APELLIDOS:
                <input type="text" name="APELLIDOS" value={alumno.APELLIDOS} onChange={handleChange} required />
              </label>
              <label className="select-label">
                CARRERA:
                <select name="CARRERA" value={alumno.CARRERA} onChange={handleChange} required>
                  <option value="">SELECCIONE UNA CARRERA</option>
                  {carreras.map((carrera, index) => (
                    <option key={index} value={carrera}>{carrera}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                SEMESTRE:
                <input type="number" min="1" max="12" name="SEMESTRE" value={alumno.SEMESTRE} onChange={handleChange} required />
              </label>
              <label>
                PROMEDIO:
                <input type="number" step="0.01" min="0" max="10" name="PROMEDIO" value={alumno.PROMEDIO} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label className="select-label">
                SEXO:
                <select name="SEXO" value={alumno.SEXO} onChange={handleChange} required>
                  <option value="">SELECCIONE</option>
                  <option value="M">MASCULINO</option>
                  <option value="F">FEMENINO</option>
                </select>
              </label>
              <label>
                FECHA DE NACIMIENTO:
                <input type="date" name="FECHA_NACIMIENTO" value={alumno.FECHA_NACIMIENTO} onChange={handleChange} required />
              </label>
            </div>
          </div>
        </div>

        {/* Botones del formulario */}
        <div className="form-buttons">
          <button type="submit" className="submit-button">REGISTRAR</button>
          <button type="reset" className="reset-button">LIMPIAR</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;