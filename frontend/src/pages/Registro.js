import React, { useState } from "react";
import "../styles/FrmRegistro.css";

const Registro = () => {
  const [alumno, setAlumno] = useState({
    CODIGO: '',
    NOMBRE: '',
    CARRERA: '',
    PROMEDIO: '',
    SEXO: '',
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
        <p>AQUÍ SE PODRÁ REGISTRAR A LOS ALUMNOS.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registro-form">
        <div className="form-row">
          <label>
            CÓDIGO:
            <input type="text" name="CODIGO" value={alumno.CODIGO} onChange={handleChange} required />
          </label>
          <label>
            NOMBRE:
            <input type="text" name="NOMBRE" value={alumno.NOMBRE} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            CARRERA:
            <input type="text" name="CARRERA" value={alumno.CARRERA} onChange={handleChange} />
          </label>
          <label>
            PROMEDIO:
            <input type="number" step="0.01" name="PROMEDIO" value={alumno.PROMEDIO} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            SEXO:
            <input type="text" name="SEXO" value={alumno.SEXO} onChange={handleChange} />
          </label>
          <label>
            PROMOCIÓN:
            <input type="text" name="PROMOCION" value={alumno.PROMOCION} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            PAÍS:
            <input type="text" name="PAIS" value={alumno.PAIS} onChange={handleChange} />
          </label>
          <label>
            INSTITUCIÓN DESTINO:
            <input type="text" name="INSTITUCION_DESTINO" value={alumno.INSTITUCION_DESTINO} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            BECADO POR:
            <input type="text" name="BECADO_POR" value={alumno.BECADO_POR} onChange={handleChange} />
          </label>
          <label>
            CALIFICACIONES:
            <textarea name="CALIFICACIONES" value={alumno.CALIFICACIONES} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            REVALIDACIÓN:
            <textarea name="REVALIDACION" value={alumno.REVALIDACION} onChange={handleChange} />
          </label>
          <label>
            CALIFICACIÓN SIIAU:
            <input type="number" step="0.01" name="CALF_SIIAU" value={alumno.CALF_SIIAU} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label className="checkbox-label">
            ¿CONTINÚA MOVILIDAD?
            <input type="checkbox" name="CONTINUA_MOVILIDAD" checked={alumno.CONTINUA_MOVILIDAD} onChange={handleChange} />
            <span className="checkbox-custom"></span>
          </label>
        </div>
        <div className="form-row">
          <label>
            RECTORÍA:
            <input type="number" step="0.01" name="RECTORIA" value={alumno.RECTORIA} onChange={handleChange} />
          </label>
          <label>
            BECADO POR CUSUR:
            <input type="number" step="0.01" name="BECADO_POR_CUSUR" value={alumno.BECADO_POR_CUSUR} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            ORGANISMO EXTERNO NOMBRE:
            <input type="text" name="ORGANISMO_EXTERNO_NOMBRE" value={alumno.ORGANISMO_EXTERNO_NOMBRE} onChange={handleChange} />
          </label>
          <label>
            ORGANISMO EXTERNO MONTO:
            <input type="number" step="0.01" name="ORGANISMO_EXTERNO_MONTO" value={alumno.ORGANISMO_EXTERNO_MONTO} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            BECADO POR LA SEP:
            <input type="number" step="0.01" name="BECADO_POR_LA_SEP" value={alumno.BECADO_POR_LA_SEP} onChange={handleChange} />
          </label>
          <label>
            CGCI PEA AMPLIADO:
            <input type="number" step="0.01" name="CGCI_PEA_AMPLIADO" value={alumno.CGCI_PEA_AMPLIADO} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            PROFOCIE PPE:
            <input type="number" step="0.01" name="PROFOCIE_PPE" value={alumno.PROFOCIE_PPE} onChange={handleChange} />
          </label>
          <label>
            ESACIES:
            <input type="number" step="0.01" name="ESACIES" value={alumno.ESACIES} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            RENUNCIAS:
            <input type="text" name="RENUNCIAS" value={alumno.RENUNCIAS} onChange={handleChange} />
          </label>
          <label>
            APOYO REPATRIACIÓN:
            <input type="number" step="0.01" name="APOYO_REPATRIACION" value={alumno.APOYO_REPATRIACION} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            COVID-19:
            <input type="number" step="0.01" name="COVID_19" value={alumno.COVID_19} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            ¿CUENTA CON ALGUNA DISCAPACIDAD?
            <input type="text" name="CUENTA_CON_ALGUNA_DISCAPACIDAD" value={alumno.CUENTA_CON_ALGUNA_DISCAPACIDAD} onChange={handleChange} />
          </label>
          <label>
            ¿PERTENECE A ALGUNA COMUNIDAD INDÍGENA?
            <input type="text" name="PERTENECE_ALGUNA_COMUNIDAD_INDIGENA" value={alumno.PERTENECE_ALGUNA_COMUNIDAD_INDIGENA} onChange={handleChange} />
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">REGISTRAR</button>
          <button type="reset" className="reset-button">LIMPIAR</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;