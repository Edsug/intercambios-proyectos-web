import React, { useState, useEffect } from "react";
import "../styles/FrmRegistro.css";
import { initialFormData, REGEX } from "../config/config";
import SeccionPrograma          from "../components/SeccionPrograma";
import SeccionDatosAlumno       from "../components/SeccionDatosAlumno";
import SeccionMovilidad         from "../components/SeccionMovilidad";
import SeccionDatosBeca         from "../components/SeccionDatosBeca";
import SeccionDatosAdicionales  from "../components/SeccionDatosAdicionales";

const Registro = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  useEffect(() => {
    if (tipoMensaje === 'exito') {
    setMensaje('');
    setTipoMensaje('');
    }
  }, [activeSection, tipoMensaje]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      let newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === "TIPO_DESTINO") {
        if (value === "NACIONAL") {
          newData.PAIS = "";
        } else if (value === "INTERNACIONAL") {
          newData.ESTADO_REPUBLICA = "";
        }
      }
      return newData;
    });
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    let primeraSeccionConError = null;

    // Sección 1: Programa
    if (!formData.PROGRAMA) {
    nuevosErrores.PROGRAMA = 'Seleccione un programa.';
    if (!primeraSeccionConError) primeraSeccionConError = 1;
  }
  if (!formData.FOLIO) {
    nuevosErrores.FOLIO = 'Ingrese el folio.';
    if (!primeraSeccionConError) primeraSeccionConError = 1;
  }

    // Sección 2: Datos del Alumno
    if (!formData.CODIGO) {
      nuevosErrores.CODIGO = 'Ingrese el código.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (!REGEX.CODIGO.test(formData.CODIGO)) {
      nuevosErrores.CODIGO = 'El código debe tener 9 dígitos.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.NOMBRE) {
      nuevosErrores.NOMBRE = 'Ingrese el nombre.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.APELLIDOS) { 
      nuevosErrores.APELLIDOS = 'Ingrese los apellidos.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.NIVEL_ACADEMICO) {
      nuevosErrores.NIVEL_ACADEMICO = 'Seleccione el nivel académico.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (formData.NIVEL_ACADEMICO === 'LICENCIATURA' && !formData.CARRERA) {
      nuevosErrores.CARRERA = 'Seleccione la carrera.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (formData.NIVEL_ACADEMICO === 'MAESTRÍA' && !formData.MAESTRIA) {
      nuevosErrores.MAESTRIA = 'Seleccione la maestría.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.SEMESTRE) {
      nuevosErrores.SEMESTRE = 'Ingrese el semestre.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.PROMEDIO) {
      nuevosErrores.PROMEDIO = 'Ingrese el promedio.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.GENERO) {
      nuevosErrores.GENERO = 'Seleccione el género.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.FECHA_NACIMIENTO) {
      nuevosErrores.FECHA_NACIMIENTO = 'Ingrese la fecha de nacimiento.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.TELEFONO) {
      nuevosErrores.TELEFONO = 'Ingrese el teléfono.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (!REGEX.TELEFONO.test(formData.TELEFONO)) {
      nuevosErrores.TELEFONO = 'El teléfono debe tener 10 dígitos.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.CORREO) {
      nuevosErrores.CORREO = 'Ingrese el correo institucional.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.CONTACTO_EMERGENCIA) {
      nuevosErrores.CONTACTO_EMERGENCIA = 'Ingrese teléfono de emergencia.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (!REGEX.TELEFONO.test(formData.CONTACTO_EMERGENCIA)) {
      nuevosErrores.CONTACTO_EMERGENCIA = 'El teléfono debe tener 10 dígitos.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (formData.CONTACTO_EMERGENCIA && !formData.NOMBRE_CONTACTO_EMERGENCIA) {
      nuevosErrores.NOMBRE_CONTACTO_EMERGENCIA = 'Ingrese el nombre del contacto.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    }
    if (!formData.NSS) {
      nuevosErrores.NSS = 'Ingrese el NSS.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } else if (!REGEX.NSS.test(formData.NSS)) {
      nuevosErrores.NSS = 'El NSS debe tener 11 dígitos.';
      if (!primeraSeccionConError) primeraSeccionConError = 2;
    } 
    // Sección 3: Movilidad
    if (!formData.TIPO_MOVILIDAD) {
      nuevosErrores.TIPO_MOVILIDAD = 'Seleccione el tipo de movilidad.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }
    if (!formData.ACTIVIDAD) {
      nuevosErrores.ACTIVIDAD = 'Ingrese la actividad.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }
    if (!formData.INSTITUCION_DESTINO) {
      nuevosErrores.INSTITUCION_DESTINO = 'Ingrese institución destino.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }

    if (!formData.TIPO_DESTINO) {
      nuevosErrores.TIPO_DESTINO = 'Seleccione el tipo de destino.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }

    // Validación condicional según el tipo de movilidad
    if (formData.TIPO_DESTINO === "NACIONAL") {
      if (!formData.ESTADO_REPUBLICA) {
        nuevosErrores.ESTADO_REPUBLICA = 'Seleccione estado.';
        if (!primeraSeccionConError) primeraSeccionConError = 3;
      }
    } else if (formData.TIPO_DESTINO === "INTERNACIONAL") {
      if (!formData.PAIS) {
        nuevosErrores.PAIS = 'Seleccione país.';
        if (!primeraSeccionConError) primeraSeccionConError = 3;
      }
    }

    if (!formData.FECHA_INICIO) {
      nuevosErrores.FECHA_INICIO = 'Ingrese fecha de inicio.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }
    if (!formData.FECHA_FIN) {
      nuevosErrores.FECHA_FIN = 'Ingrese fecha de fin.';
      if (!primeraSeccionConError) primeraSeccionConError = 3;
    }
    // Sección 4: Becas
    if (formData.BECADO_CUSUR && !formData.MONTO_CUSUR) {
      nuevosErrores.MONTO_CUSUR = 'Ingrese monto CUSUR.';
      if (!primeraSeccionConError) primeraSeccionConError = 4;
    }
    if (formData.BECADO_CGCI && !formData.NUMERO_BECAS_CGCI) {
      nuevosErrores.NUMERO_BECAS_CGCI = 'Ingrese número de becas CGCI.';
      if (!primeraSeccionConError) primeraSeccionConError = 4;
    }
    if (formData.BECADO_EXTERNO && !formData.NUMERO_BECAS_EXTERNAS) {
      nuevosErrores.NUMERO_BECAS_EXTERNAS = 'Ingrese número de becas externas.';
      if (!primeraSeccionConError) primeraSeccionConError = 4;
    }


    setErrores(nuevosErrores);
    return { esValido: Object.keys(nuevosErrores).length === 0, primeraSeccionConError };
  };

  const nextSection = () => setActiveSection(prev => prev + 1);
  const prevSection = () => setActiveSection(prev => prev - 1);
  const resetForm = () => { setFormData(initialFormData); setActiveSection(1); setErrores({}); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { esValido, primeraSeccionConError } = validarCampos();

    if (!esValido) {
      setMensaje('Por favor, complete todos los campos obligatorios para registrar al alumno.');
      setTipoMensaje('error');
      if (primeraSeccionConError) setActiveSection(primeraSeccionConError);
      window.scrollTo(0, 0);
      return;
    }
    setMensaje('¡Alumno registrado correctamente para programa de movilidad!');
    setTipoMensaje('exito');
    console.log(formData);
    resetForm();
    window.scrollTo(0, 0);
    setTimeout(() => setMensaje(''), 3000); // Solo borra el mensaje de éxito
  };

  const handleChangeDynamic = (e, index, prefix) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [`${prefix}_${index}`]: value
    }));
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1> REGISTRAR ALUMNO </h1>
        <p>COMPLETE TODOS LOS CAMPOS PARA REGISTRAR UN NUEVO ALUMNO EN EL PROGRAMA DE MOVILIDAD</p>
      </div>
        
      <div className="form-progress">
        <div 
          className={`progress-step ${activeSection >= 1 ? 'active' : ''} ${activeSection > 1 ? 'completed' : ''}`}
          data-title="Programa"
        >1</div>
        <div 
          className={`progress-step ${activeSection >= 2 ? 'active' : ''} ${activeSection > 2 ? 'completed' : ''}`}
          data-title="Datos del Alumno"
        >2</div>
        <div 
          className={`progress-step ${activeSection >= 3 ? 'active' : ''} ${activeSection > 3 ? 'completed' : ''}`}
          data-title="Datos de Movilidad"
        >3</div>
        <div 
          className={`progress-step ${activeSection >= 4 ? 'active' : ''} ${activeSection > 4 ? 'completed' : ''}`}
          data-title="Datos de Beca"
        >4</div>
        <div 
          className={`progress-step ${activeSection >= 5 ? 'active' : ''}`}
          data-title="Datos Adicionales"
        >5</div>
      </div>

      
      
      <form className="registro-form" onSubmit={handleSubmit}>
        {mensaje && (
          <div className={`alerta-formulario ${tipoMensaje}`}>
            {mensaje}
          </div>
        )}
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
            handleChangeDynamic={handleChangeDynamic}
            prevSection={prevSection}
            nextSection={nextSection}
            errores={errores}
          />
        )}

        {activeSection === 5 && (
          <SeccionDatosAdicionales
            formData={formData}
            setFormData={setFormData}
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
