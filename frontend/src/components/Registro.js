import React, { useState, useEffect } from "react";
import "../styles/FrmRegistro.css";
import { initialFormData, REGEX } from "../config";
import SeccionPrograma from "./components/SeccionPrograma";
import SeccionDatosAlumno from "./components/SeccionDatosAlumno";
import SeccionMovilidad from "./components/SeccionMovilidad";
import SeccionDatosBeca from "./components/SeccionDatosBeca";
import SeccionDatosAdicionales from "./components/SeccionDatosAdicionales";

const Registro = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    // Si necesitas cargar datos guardados, hazlo aquí
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validarCampos = () => {
    const nuevosErrores = {};

    // Sección 1: Programa
    if (!formData.PROGRAMA) nuevosErrores.PROGRAMA = 'Seleccione un programa.';
    if (!formData.FOLIO) nuevosErrores.FOLIO = 'Ingrese el folio.';

    // Sección 2: Datos del Alumno
    if (!formData.CODIGO) nuevosErrores.CODIGO = 'Ingrese el código.';
    else if (!REGEX.CODIGO.test(formData.CODIGO)) nuevosErrores.CODIGO = 'El código debe tener 9 dígitos.';
    if (!formData.NOMBRE) nuevosErrores.NOMBRE = 'Ingrese el nombre.';
    if (!formData.APELLIDOS) nuevosErrores.APELLIDOS = 'Ingrese los apellidos.';
    if (!formData.NIVEL_ACADEMICO) nuevosErrores.NIVEL_ACADEMICO = 'Seleccione el nivel académico.';
    else if (formData.NIVEL_ACADEMICO === 'LICENCIATURA' && !formData.CARRERA) nuevosErrores.CARRERA = 'Seleccione la carrera.';
    else if (formData.NIVEL_ACADEMICO === 'MAESTRÍA' && !formData.MAESTRIA) nuevosErrores.MAESTRIA = 'Seleccione la maestría.';
    if (!formData.SEMESTRE) nuevosErrores.SEMESTRE = 'Ingrese el semestre.';
    if (!formData.PROMEDIO) nuevosErrores.PROMEDIO = 'Ingrese el promedio.';
    if (!formData.SEXO) nuevosErrores.SEXO = 'Seleccione el género.';
    if (!formData.FECHA_NACIMIENTO) nuevosErrores.FECHA_NACIMIENTO = 'Ingrese la fecha de nacimiento.';
    if (!formData.TELEFONO) nuevosErrores.TELEFONO = 'Ingrese el teléfono.';
    else if (!REGEX.TELEFONO.test(formData.TELEFONO)) nuevosErrores.TELEFONO = 'El teléfono debe tener 10 dígitos.';
    if (!formData.CORREO) nuevosErrores.CORREO = 'Ingrese el correo institucional.';
    if (!formData.CONTACTO_EMERGENCIA) nuevosErrores.CONTACTO_EMERGENCIA = 'Ingrese teléfono de emergencia.';
    else if (!REGEX.TELEFONO.test(formData.CONTACTO_EMERGENCIA)) nuevosErrores.CONTACTO_EMERGENCIA = 'El teléfono debe tener 10 dígitos.';
    if (formData.CONTACTO_EMERGENCIA && !formData.NOMBRE_CONTACTO_EMERGENCIA) nuevosErrores.NOMBRE_CONTACTO_EMERGENCIA = 'Ingrese el nombre del contacto.';
    if (!formData.NSS) nuevosErrores.NSS = 'Ingrese el NSS.';
    else if (!REGEX.NSS.test(formData.NSS)) nuevosErrores.NSS = 'El NSS debe tener 11 dígitos.';

    // Sección 3: Movilidad
    if (!formData.TIPO_MOVILIDAD) nuevosErrores.TIPO_MOVILIDAD = 'Seleccione el tipo de movilidad.';
    if (!formData.ACTIVIDAD) nuevosErrores.ACTIVIDAD = 'Ingrese la actividad.';
    if (!formData.INSTITUCION_DESTINO) nuevosErrores.INSTITUCION_DESTINO = 'Ingrese institución destino.';
    if (!formData.PAIS) nuevosErrores.PAIS = 'Seleccione país.';
    if (!formData.ESTADO_REPUBLICA) nuevosErrores.ESTADO_REPUBLICA = 'Seleccione estado.';
    if (!formData.FECHA_INICIO) nuevosErrores.FECHA_INICIO = 'Ingrese fecha de inicio.';
    if (!formData.FECHA_FIN) nuevosErrores.FECHA_FIN = 'Ingrese fecha de fin.';

    // Sección 4: Becas
    if (formData.BECADO_CUSUR && !formData.MONTO_CUSUR) nuevosErrores.MONTO_CUSUR = 'Ingrese monto CUSUR.';
    if (formData.BECADO_CGCI && !formData.NUMERO_BECAS_CGCI) nuevosErrores.NUMERO_BECAS_CGCI = 'Ingrese número de becas CGCI.';
    if (formData.BECADO_EXTERNO && !formData.NUMERO_BECAS_EXTERNAS) nuevosErrores.NUMERO_BECAS_EXTERNAS = 'Ingrese número de becas externas.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const nextSection = () => setActiveSection(prev => prev + 1);
  const prevSection = () => setActiveSection(prev => prev - 1);
  const resetForm = () => { setFormData(initialFormData); setActiveSection(1); setErrores({}); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarCampos()) { window.scrollTo(0, 0); return; }
    console.log(formData);
    alert("Alumno registrado correctamente para programa de movilidad");
    resetForm();
  };

  return (
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
          prevSection={prevSection}
          nextSection={nextSection}
          errores={errores}
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
  );
};

export default Registro;
