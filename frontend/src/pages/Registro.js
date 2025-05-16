import React, { useState, useEffect } from "react";
import "../styles/FrmRegistro.css";
import { initialFormData, REGEX } from "../config/config";
import SeccionPrograma from "../components/SeccionPrograma";
import SeccionDatosAlumno from "../components/SeccionDatosAlumno";
import SeccionMovilidad from "../components/SeccionMovilidad";
import SeccionDatosBeca from "../components/SeccionDatosBeca";
import SeccionDatosAdicionales from "../components/SeccionDatosAdicionales";

const Registro = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState({
    ...initialFormData,
    BECAS: []
  });
  const [errores, setErrores] = useState({});

  useEffect(() => setErrores({}), [activeSection]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "NIVEL_ACADEMICO") {
        next.CARRERA = "";
        next.MAESTRIA = "";
      }
      return next;
    });
  };

  const handleAddBeca = (beca) => {
    setFormData(prev => ({
      ...prev,
      BECAS: [...prev.BECAS, beca]
    }));
  };

  const handleRemoveBeca = (index) => {
    setFormData(prev => ({
      ...prev,
      BECAS: prev.BECAS.filter((_, i) => i !== index)
    }));
  };

  const validarSeccion = (section) => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const intlPhoneRegex = /^\+?[1-9]\d{1,14}$/;

    switch (section) {
      case 1:
        if (!formData.PROGRAMA) errs.PROGRAMA = "Seleccione un programa.";
        if (!formData.FOLIO) errs.FOLIO = "Ingrese el folio.";
        break;
      case 2:
        if (!formData.CODIGO) errs.CODIGO = "Ingrese el código.";
        if (!formData.NOMBRE) errs.NOMBRE = "Ingrese el nombre.";
        if (!formData.APELLIDOS) errs.APELLIDOS = "Ingrese los apellidos.";
        if (!formData.NIVEL_ACADEMICO) errs.NIVEL_ACADEMICO = "Seleccione nivel académico.";
        if (formData.NIVEL_ACADEMICO === "LICENCIATURA" && !formData.CARRERA) errs.CARRERA = "Seleccione carrera.";
        if (formData.NIVEL_ACADEMICO === "MAESTRÍA" && !formData.MAESTRIA) errs.MAESTRIA = "Seleccione maestría.";
        if (!formData.SEMESTRE) errs.SEMESTRE = "Ingrese semestre.";
        if (!formData.PROMEDIO) errs.PROMEDIO = "Ingrese promedio.";
        if (!formData.SEXO) errs.SEXO = "Seleccione género.";
        if (!formData.FECHA_NACIMIENTO) errs.FECHA_NACIMIENTO = "Ingrese fecha de nacimiento.";
        if (!formData.TIPO_SANGRE) errs.TIPO_SANGRE = "Seleccione tipo de sangre.";
        if (!formData.TELEFONO) errs.TELEFONO = "Ingrese teléfono.";
        else if (!REGEX.TELEFONO.test(formData.TELEFONO) && !intlPhoneRegex.test(formData.TELEFONO))
          errs.TELEFONO = "Teléfono inválido.";
        if (!formData.CORREO) errs.CORREO = "Ingrese correo institucional.";
        else if (!emailRegex.test(formData.CORREO)) errs.CORREO = "Correo inválido.";
        if (!formData.CONTACTO_EMERGENCIA) errs.CONTACTO_EMERGENCIA = "Ingrese teléfono de emergencia.";
        else if (!REGEX.TELEFONO.test(formData.CONTACTO_EMERGENCIA) && !intlPhoneRegex.test(formData.CONTACTO_EMERGENCIA))
          errs.CONTACTO_EMERGENCIA = "Teléfono inválido.";
        if (formData.CONTACTO_EMERGENCIA && !formData.NOMBRE_CONTACTO_EMERGENCIA)
          errs.NOMBRE_CONTACTO_EMERGENCIA = "Ingrese nombre de contacto.";
        if (!formData.NSS) errs.NSS = "Ingrese NSS.";
        break;
      case 3:
        if (!formData.TIPO_MOVILIDAD) errs.TIPO_MOVILIDAD = "Seleccione tipo de movilidad.";
        if (!formData.INSTITUCION_DESTINO) errs.INSTITUCION_DESTINO = "Ingrese institución destino.";
        if (formData.TIPO_DESTINO === "INTERNACIONAL" && !formData.PAIS) errs.PAIS = "Seleccione país.";
        if (formData.TIPO_DESTINO === "NACIONAL" && (!formData.ESTADO_REPUBLICA || formData.ESTADO_REPUBLICA === "0" || formData.ESTADO_REPUBLICA.trim() === "")) {
          errs.ESTADO_REPUBLICA = "Seleccione estado.";
        }
        if (!formData.FECHA_INICIO) errs.FECHA_INICIO = "Ingrese fecha inicio.";
        if (!formData.FECHA_FIN) errs.FECHA_FIN = "Ingrese fecha fin.";
        else if (formData.FECHA_FIN < formData.FECHA_INICIO) errs.FECHA_FIN = "La fecha fin debe ser posterior.";
        break;
      case 4:
        if (!formData.BECAS || formData.BECAS.length === 0) {
          errs.BECAS = "Debe agregar al menos una beca.";
        } else {
          formData.BECAS.forEach((beca, idx) => {
            if (!beca.tipo) errs[`BECAS_${idx}_tipo`] = "Seleccione tipo de beca.";
            if (beca.tipo === "CUSUR" && (!beca.monto || isNaN(beca.monto))) errs[`BECAS_${idx}_monto`] = "Monto inválido.";
            if ((beca.tipo === "CGCI" || beca.tipo === "EXTERNA") && !beca.nombre) errs[`BECAS_${idx}_nombre`] = "Nombre requerido.";
          });
        }
        break;
      default:
        break;
    }

    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const validarCampos = () =>
    validarSeccion(1) &&
    validarSeccion(2) &&
    validarSeccion(3) &&
    validarSeccion(4);

  const nextSection = () => {
    if (!validarSeccion(activeSection)) {
      window.scrollTo(0, 0);
      return;
    }
    setActiveSection(prev => prev + 1);
  };

  const prevSection = () => setActiveSection(prev => prev - 1);

  const resetForm = () => {
    setFormData({ ...initialFormData, BECAS: [] });
    setActiveSection(1);
    setErrores({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      window.scrollTo(0, 0);
      return;
    }
    try {
      const resp = await fetch("http://localhost/basecambios/registro_alumno.php", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const text = await resp.text();
      if (!resp.ok) {
        alert(`Error HTTP ${resp.status}: ${text}`);
        return;
      }
      const data = JSON.parse(text);
      if (data.status === "success") {
        alert("Alumno registrado correctamente");
        resetForm();
      } else {
        alert("Error al registrar: " + data.message);
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>REGISTRAR ALUMNO</h1>
        <p>COMPLETE TODOS LOS CAMPOS PARA REGISTRAR UN NUEVO ALUMNO</p>
      </div>

      <div className="form-progress">
        {[1, 2, 3, 4, 5].map(step => (
          <div
            key={step}
            className={`progress-step ${activeSection >= step ? "active" : ""} ${activeSection > step ? "completed" : ""}`}
            data-title={["Programa", "Datos del Alumno", "Datos de Movilidad", "Datos de Beca", "Datos Adicionales"][step - 1]}
          >
            {step}
          </div>
        ))}
      </div>

      <form className="registro-form" onSubmit={handleSubmit}>
        {activeSection === 1 && (
          <SeccionPrograma
            formData={formData}
            handleChange={handleChange}
            nextSection={nextSection}
            errores={errores}
          />
        )}
        {activeSection === 2 && (
          <SeccionDatosAlumno
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            prevSection={prevSection}
            nextSection={nextSection}
            errores={errores}
          />
        )}
        {activeSection === 3 && (
          <SeccionMovilidad
            formData={formData}
            handleChange={handleChange}
            prevSection={prevSection}
            nextSection={nextSection}
            errores={errores}
          />
        )}
        {activeSection === 4 && (
          <SeccionDatosBeca
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            prevSection={prevSection}
            nextSection={nextSection}
            errores={errores}
            onAddBeca={handleAddBeca}
            onRemoveBeca={handleRemoveBeca}
          />
        )}
        {activeSection === 5 && (
          <SeccionDatosAdicionales
            formData={formData}
            handleChange={handleChange}
            prevSection={prevSection}
            handleSubmit={handleSubmit}
            errores={errores}
          />
        )}
      </form>
    </div>
  );
};

export default Registro;
