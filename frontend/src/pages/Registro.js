import React, { useState, useEffect } from "react";
import "../styles/FrmRegistro.css";

const Registro = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState({
    // Sección Programa
    PROGRAMA: '',
    PROGRAMA_OTRO: '',
    FOLIO: '',
    ESTADO: 'ACTIVO',
    
    // Sección Datos del Alumno
    CODIGO: '',
    NOMBRE: '',
    APELLIDOS: '',
    CARRERA: '',
    SEMESTRE: '',
    PROMEDIO: '',
    SEXO: '',
    FECHA_NACIMIENTO: '',
    TIPO_SANGRE: '',
    NSS: '',
    TELEFONO: '',
    CORREO: '',
    CONTACTO_EMERGENCIA: '',
    NOMBRE_CONTACTO_EMERGENCIA: '',
    
    // Sección Datos de Movilidad
    TIPO_MOVILIDAD: '',
    ACTIVIDAD: '', // Movido de la sección Programa a Datos de Movilidad
    TIPO_DESTINO: 'NACIONAL', // Nueva propiedad para determinar si es nacional o internacional
    INSTITUCION_DESTINO: '',
    PAIS: '',
    ESTADO_REPUBLICA: '', // Nueva propiedad para movilidad nacional
    FECHA_INICIO: '',
    FECHA_FIN: '',
    OBSERVACIONES: '', // Nuevo campo para observaciones
    
    // Sección Datos de Beca
    BECADO_CUSUR: false,
    MONTO_CUSUR: '',
    DETALLES_CUSUR: '',
    BECADO_CGCI: false,
    NUMERO_BECAS_CGCI: 0,
    BECADO_PROGRAMA: false,
    MONTO_PROGRAMA: '',
    DETALLES_PROGRAMA: '',
    BECADO_EXTERNO: false,
    NUMERO_BECAS_EXTERNAS: 0,
    
    
    // Sección Datos Adicionales
  REVALIDACION_MATERIAS: false,
  DATOS_REVALIDACION: '',
  CERTIFICADO_CALIFICACIONES: null,
  CUENTA_CON_ALGUNA_DISCAPACIDAD: false,
  DATOS_DISCAPACIDAD: '',
  SEGURO_VIAJE: false,
  NOMBRE_ASEGURADORA: '',
  NUMERO_POLIZA: '',
  FECHA_INICIO_SEGURO: '',
  FECHA_FIN_SEGURO: '',
  CONTACTO_ASEGURADORA: '',
  OBSERVACIONES_SEGURO: '',
  EXPERIENCIA_COMPARTIDA: false,
  DETALLES_EXPERIENCIA: '',

  });

  // Lista de programas predefinidos
  const programasPredefinidos = [
    "PILA",
    "PAME",
    "PIMA",
    "UAM",
    "LLEIDA",
    "RED MARCO UNIVERSIDADES",
    "PROGRAMA DELFIN", 
    "PROGRAMA DE MOVILIDAD NACIONAL E INTERNACIONAL"
  ];

  // Estado para almacenar programas personalizados
  const [programasPersonalizados, setProgramasPersonalizados] = useState([]);
  // Estado para mostrar sugerencias de programas similares
  const [sugerenciasProgramas, setSugerenciasProgramas] = useState([]);
  // Estado para controlar si se muestra el campo de otro programa
  const [mostrarOtroCampo, setMostrarOtroCampo] = useState(false);
  // Estado para indicar si un programa es similar a uno existente
  const [programaSimilarExiste, setProgramaSimilarExiste] = useState(false);
  // Estado para guardar programa en lista
  const [guardarPrograma, setGuardarPrograma] = useState(false);
  // Estado para mensaje de error
  const [errorMensaje, setErrorMensaje] = useState('');

  // Efecto para cargar programas personalizados guardados anteriormente
  useEffect(() => {
    // En una aplicación real, esto se cargaría desde una base de datos o localStorage
    const programasGuardados = localStorage.getItem('programasPersonalizados');
    if (programasGuardados) {
      setProgramasPersonalizados(JSON.parse(programasGuardados));
    }
  }, []);

  // Lista de carreras disponibles
  const carreras = [
    "ABOGADO",
    "AGROBIOTECNOLOGÍA",
    "AGRONEGOCIOS",
    "CIRUJANO DENTISTA",
    "CULTURA FISICA Y DEPORTES",
    "DESARROLLO TURISTICO SUSTENTABLE",
    "EMFERMERÍA",
    "INGENIERIA EN GEOFISICA",
    "INGENIERIA EN SISTEMAS BIOLOGICOS",
    "INGENIERIA EN TELEMATICA",
    "LETRAS HISPANICAS",
    "MEDICO CIRUJANO Y PARTERO",
    "MEDICO VETERINARIO Y ZOOTECNISTA",
    "NEGOCIOS INTERNACIONALES",
    "ENFERMERIA MODALIDAD NO ESCOLARIZADA",
    "NUTRICION",
    "PERIODISMO",
    "PSICOLOGIA",
    "SEGURIDAD LABORAL, PROTECCION CIVIL Y EMERGENCIAS",
    "TRABAJO SOCIAL"
  ];
  
  // Lista de países para movilidad internacional
  const paises = [
    "ESPAÑA",
    "ESTADOS UNIDOS",
    "CANADÁ",
    "ALEMANIA",
    "FRANCIA",
    "REINO UNIDO",
    "ITALIA",
    "BRASIL",
    "ARGENTINA",
    "CHILE",
    "COLOMBIA",
    "AUSTRALIA",
    "JAPÓN",
    "CHINA",
  ];

  // Lista de estados de la república mexicana
  const estadosRepublica = [
    "AGUASCALIENTES",
    "BAJA CALIFORNIA",
    "BAJA CALIFORNIA SUR",
    "CAMPECHE",
    "CHIAPAS",
    "CHIHUAHUA",
    "CIUDAD DE MÉXICO",
    "COAHUILA",
    "COLIMA",
    "DURANGO",
    "ESTADO DE MÉXICO",
    "GUANAJUATO",
    "GUERRERO",
    "HIDALGO",
    "JALISCO",
    "MICHOACÁN",
    "MORELOS",
    "NAYARIT",
    "NUEVO LEÓN",
    "OAXACA",
    "PUEBLA",
    "QUERÉTARO",
    "QUINTANA ROO",
    "SAN LUIS POTOSÍ",
    "SINALOA",
    "SONORA",
    "TABASCO",
    "TAMAULIPAS",
    "TLAXCALA",
    "VERACRUZ",
    "YUCATÁN",
    "ZACATECAS"
  ];

  // Función para normalizar texto (quitar acentos, convertir a mayúsculas, quitar espacios extras)
  const normalizarTexto = (texto) => {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .trim()
      .replace(/\s+/g, " ");
  };

  // Función para buscar programas similares
  const buscarProgramasSimilares = (texto) => {
    if (!texto || texto.length < 3) {
      setSugerenciasProgramas([]);
      setProgramaSimilarExiste(false);
      setErrorMensaje('');
      return;
    }

    const normalizado = normalizarTexto(texto);
    // Combinar programas predefinidos y personalizados
    const todosLosProgramas = [...programasPredefinidos, ...programasPersonalizados];
    
    const similares = todosLosProgramas.filter(programa => {
      const programaNormalizado = normalizarTexto(programa);
      
      // Verificar si el programa contiene el texto o viceversa
      return programaNormalizado.includes(normalizado) || 
             normalizado.includes(programaNormalizado) ||
             // Verificar si hay palabras en común
             programaNormalizado.split(" ").some(palabra => 
               normalizado.split(" ").includes(palabra) && palabra.length > 3
             );
    });
    
    setSugerenciasProgramas(similares);
    
    // Verificar si existe un programa idéntico
    const existeExacto = todosLosProgramas.some(
      programa => normalizarTexto(programa) === normalizado
    );
    
    setProgramaSimilarExiste(existeExacto);
    
    if (existeExacto) {
      setErrorMensaje('Este programa ya existe en la lista. Por favor selecciónelo de las opciones disponibles.');
    } else {
      setErrorMensaje('');
    }
  };

  // Función para agregar un nuevo programa personalizado
  const agregarProgramaPersonalizado = (nuevoPrograma) => {
    if (!nuevoPrograma || nuevoPrograma.trim() === "") return;
    
    const programaNormalizado = normalizarTexto(nuevoPrograma);
    
    // Verificar si ya existe un programa similar
    const todosLosProgramas = [...programasPredefinidos, ...programasPersonalizados];
    const yaExiste = todosLosProgramas.some(
      programa => normalizarTexto(programa) === programaNormalizado
    );
    
    if (yaExiste) {
      setErrorMensaje("Ya existe un programa similar en la lista.");
      return null;
    }
    
    // Solo agregar a la lista de programas personalizados si se ha marcado el checkbox
    if (guardarPrograma) {
      const nuevosPersonalizados = [...programasPersonalizados, programaNormalizado];
      setProgramasPersonalizados(nuevosPersonalizados);
      
      // Guardar en localStorage (en una aplicación real esto iría a una base de datos)
      localStorage.setItem('programasPersonalizados', JSON.stringify(nuevosPersonalizados));
    }
    
    return programaNormalizado;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
    
    // Lógica especial para el campo PROGRAMA
    if (name === "PROGRAMA") {
      if (value === "OTRO") {
        setMostrarOtroCampo(true);
        // Resetear campos relacionados con el programa otro
        setGuardarPrograma(false);
        setProgramaSimilarExiste(false);
        setErrorMensaje('');
      } else {
        setMostrarOtroCampo(false);
        setSugerenciasProgramas([]);
        setErrorMensaje('');
      }
    }
    
    // Lógica para el campo PROGRAMA_OTRO
    if (name === "PROGRAMA_OTRO") {
      buscarProgramasSimilares(value);
    }
    
    // Lógica para el checkbox de guardar programa
    if (name === "GUARDAR_PROGRAMA") {
      setGuardarPrograma(checked);
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : type === 'text' ? value.toUpperCase() : val
      });
    }
  };

  const handleSelectSugerencia = (programa) => {
    setFormData({
      ...formData,
      PROGRAMA: programa,
      PROGRAMA_OTRO: ''
    });
    setMostrarOtroCampo(false);
    setSugerenciasProgramas([]);
    setErrorMensaje('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Si se seleccionó "OTRO" y se ingresó un programa personalizado, verificar si es válido
    if (formData.PROGRAMA === "OTRO" && formData.PROGRAMA_OTRO) {
      if (programaSimilarExiste) {
        alert("Este programa ya existe. Por favor selecciónelo de la lista o ingrese uno diferente.");
        return;
      }
      
      const programaNormalizado = agregarProgramaPersonalizado(formData.PROGRAMA_OTRO);
      if (programaNormalizado) {
        setFormData({
          ...formData,
          PROGRAMA: programaNormalizado
        });
      } else {
        return; // No continuar si hubo un error
      }
    }
    
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar el formulario al backend
    alert("Alumno registrado correctamente para programa de movilidad");
    
    // Opcional: Resetear el formulario después de enviar
    resetForm();
  };

  const nextSection = () => {
    // Validación específica para sección 1 si se seleccionó "OTRO"
    if (activeSection === 1 && formData.PROGRAMA === "OTRO" && formData.PROGRAMA_OTRO) {
      if (programaSimilarExiste) {
        alert("Este programa ya existe. Por favor selecciónelo de la lista o ingrese uno diferente.");
        return;
      }
    }
    
    if (activeSection < 5) {
      setActiveSection(activeSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleChangeDynamic = (e, index, fieldPrefix) => {
  const { value } = e.target;
  setFormData({
    ...formData,
    [`${fieldPrefix}_${index}`]: value,
  });
};

  const resetForm = () => {
    setFormData({
      // Reset all fields to their default values
      PROGRAMA: '',
      PROGRAMA_OTRO: '',
      FOLIO: '',
      ESTADO: 'ACTIVO',
      CODIGO: '',
      NOMBRE: '',
      APELLIDOS: '',
      CARRERA: '',
      SEMESTRE: '',
      PROMEDIO: '',
      SEXO: '',
      FECHA_NACIMIENTO: '',
      TIPO_MOVILIDAD: '',
      ACTIVIDAD: '',
      TIPO_DESTINO: 'NACIONAL',
      INSTITUCION_DESTINO: '',
      PAIS: '',
      ESTADO_REPUBLICA: '',
      FECHA_INICIO: '',
      FECHA_FIN: '',
      OBSERVACIONES: '',
      BECADO: false,
      BECADO_POR: '',
      BECADO_POR_CUSUR: '',
      ORGANISMO_EXTERNO_NOMBRE: '',
      ORGANISMO_EXTERNO_MONTO: '',
      BECADO_POR_LA_SEP: '',
      PROMOCION: '',
      CALIFICACIONES: '',
      REVALIDACION: '',
      CALF_SIIAU: '',
      CONTINUA_MOVILIDAD: false,
      RECTORIA: '',
      CGCI_PEA_AMPLIADO: '',
      PROFOCIE_PPE: '',
      ESACIES: '',
      RENUNCIAS: '',
      APOYO_REPATRIACION: '',
      COVID_19: '',
      CUENTA_CON_ALGUNA_DISCAPACIDAD: '',
      PERTENECE_ALGUNA_COMUNIDAD_INDIGENA: ''
    });
    setMostrarOtroCampo(false);
    setSugerenciasProgramas([]);
    setGuardarPrograma(false);
    setProgramaSimilarExiste(false);
    setErrorMensaje('');
    setActiveSection(1);
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
      
      <form onSubmit={handleSubmit} className="registro-form">
        {/* SECCIÓN 1: PROGRAMA */}
        {activeSection === 1 && (
          <div className="form-section">
            <h2 className="section-title">Programa</h2>
            <div className="section-content">
              <div className="form-row">
                <label className="select-label">
                  PROGRAMA:
                  <select 
                    name="PROGRAMA" 
                    value={formData.PROGRAMA} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">SELECCIONE UN PROGRAMA</option>
                    {programasPredefinidos.map((programa, index) => (
                      <option key={`predefinido-${index}`} value={programa}>{programa}</option>
                    ))}
                    {programasPersonalizados.map((programa, index) => (
                      <option key={`personalizado-${index}`} value={programa}>{programa}</option>
                    ))}
                    <option value="OTRO">OTRO</option>
                  </select>
                </label>
                <label>
                  FOLIO:
                  <input 
                    type="text" 
                    name="FOLIO" 
                    value={formData.FOLIO} 
                    onChange={handleChange} 
                    placeholder="Ej. MOV-2025A-001"
                    required 
                  />
                </label>
              </div>
              
              {mostrarOtroCampo && (
                <div className="form-section-otro">
                  <div className="form-row">
                    <label>
                      ESPECIFIQUE OTRO PROGRAMA:
                      <input 
                        type="text" 
                        name="PROGRAMA_OTRO" 
                        value={formData.PROGRAMA_OTRO} 
                        onChange={handleChange} 
                        placeholder="Ingrese el nombre del programa"
                        required={formData.PROGRAMA === "OTRO"}
                        className={programaSimilarExiste ? "input-error" : ""}
                      />
                    </label>
                  </div>
                  
                  {errorMensaje && (
                    <div className="error-mensaje">
                      {errorMensaje}
                    </div>
                  )}
                  
                  {!programaSimilarExiste && formData.PROGRAMA_OTRO.trim() !== "" && (
                    <div className="form-row checkbox-row">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="GUARDAR_PROGRAMA" 
                          checked={guardarPrograma} 
                          onChange={handleChange} 
                        />
                        ¿DESEAS GUARDAR ESTE NUEVO PROGRAMA PARA FUTURAS SELECCIONES?
                      </label>
                    </div>
                  )}
                </div>
              )}
              
              {sugerenciasProgramas.length > 0 && (
                <div className="sugerencias-container">
                  <p>¿Quizás quiso decir?</p>
                  <div className="sugerencias-lista">
                    {sugerenciasProgramas.map((programa, index) => (
                      <button 
                        key={index} 
                        type="button" 
                        className="sugerencia-btn"
                        onClick={() => handleSelectSugerencia(programa)}
                      >
                        {programa}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="form-row">
                <label className="select-label">
                  ESTADO:
                  <select name="ESTADO" value={formData.ESTADO} onChange={handleChange}>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    <option value="RECHAZADO">RECHAZADO</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="form-navigation">
              <button 
                type="button" 
                onClick={nextSection} 
                className="next-button"
                disabled={formData.PROGRAMA === "OTRO" && programaSimilarExiste}
              >Siguiente</button>
            </div>
          </div>
        )}

                     {/* SECCIÓN 2: DATOS DEL ALUMNO */}
              {activeSection === 2 && (
                <div className="form-section">
                  <h2 className="section-title">Datos del Alumno</h2>
                  <div className="section-content">
                    <div className="form-row">
                      <label>
                        CÓDIGO:
                        <input 
                          type="text" 
                          name="CODIGO" 
                          value={formData.CODIGO} 
                          onChange={handleChange} 
                          placeholder="Código del alumno"
                          required 
                        />
                      </label>
                      <label>
                        NOMBRE(S):
                        <input 
                          type="text" 
                          name="NOMBRE" 
                          value={formData.NOMBRE} 
                          onChange={handleChange} 
                          placeholder="Nombre(s) del alumno"
                          required 
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        APELLIDOS:
                        <input 
                          type="text" 
                          name="APELLIDOS" 
                          value={formData.APELLIDOS} 
                          onChange={handleChange} 
                          placeholder="Apellidos del alumno"
                          required 
                        />
                      </label>
                      <label className="select-label">
                        CARRERA:
                        <select name="CARRERA" value={formData.CARRERA} onChange={handleChange} required>
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
                        <input 
                          type="number" 
                          min="1" 
                          max="12" 
                          name="SEMESTRE" 
                          value={formData.SEMESTRE} 
                          onChange={handleChange} 
                          placeholder="Semestre actual"
                          required 
                        />
                      </label>
                      <label>
                        PROMEDIO:
                        <input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          max="100" 
                          name="PROMEDIO" 
                          value={formData.PROMEDIO} 
                          onChange={handleChange} 
                          placeholder="Promedio general"
                          required 
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label className="select-label">
                        GÉNERO:
                        <select name="SEXO" value={formData.SEXO} onChange={handleChange} required>
                          <option value="">SELECCIONE</option>
                          <option value="M">MASCULINO</option>
                          <option value="F">FEMENINO</option>
                        </select>
                      </label>
                      <label>
                        FECHA DE NACIMIENTO:
                        <input 
                          type="date" 
                          name="FECHA_NACIMIENTO" 
                          value={formData.FECHA_NACIMIENTO} 
                          onChange={handleChange} 
                          required 
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label className="select-label">
                        TIPO DE SANGRE:
                        <select name="TIPO_SANGRE" value={formData.TIPO_SANGRE} onChange={handleChange} required>
                          <option value="">SELECCIONE</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </label>
                      <label>
                        NÚMERO DE TELÉFONO:
                        <input 
                          type="tel" 
                          name="TELEFONO" 
                          value={formData.TELEFONO} 
                          onChange={handleChange} 
                          placeholder="Número de teléfono"
                          required 
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        CORREO INSTITUCIONAL:
                        <input 
                          type="email" 
                          name="CORREO" 
                          value={formData.CORREO} 
                          onChange={handleChange} 
                          placeholder="Correo institucional"
                          required 
                        />
                      </label>
                      <label>
                        CONTACTO DE EMERGENCIA (TELÉFONO):
                        <input 
                          type="tel" 
                          name="CONTACTO_EMERGENCIA" 
                          value={formData.CONTACTO_EMERGENCIA} 
                          onChange={handleChange} 
                          placeholder="Teléfono de emergencia"
                          required 
                        />
                      </label>
                    </div>
                    {formData.CONTACTO_EMERGENCIA && (
                      <div className="form-row">
                        <label>
                          NOMBRE DEL CONTACTO DE EMERGENCIA:
                          <input 
                            type="text" 
                            name="NOMBRE_CONTACTO_EMERGENCIA" 
                            value={formData.NOMBRE_CONTACTO_EMERGENCIA} 
                            onChange={handleChange} 
                            placeholder="Nombre del contacto de emergencia"
                            required 
                          />
                        </label>
                      </div>
                    )}
                    <div className="form-row">
                      <label>
                        NÚMERO DE SEGURO SOCIAL (NSS):
                        <input 
                          type="text" 
                          name="NSS" 
                          value={formData.NSS} 
                          onChange={handleChange} 
                          placeholder="Número de Seguro Social"
                          required 
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-navigation">
                    <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
                    <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
                  </div>
                </div>
              )}

                {/* SECCIÓN 3: DATOS DE MOVILIDAD */}
        {activeSection === 3 && (
          <div className="form-section">
            <h2 className="section-title">Datos de Movilidad</h2>
            <div className="section-content">
              <div className="form-row">
                <label className="select-label">
                  TIPO DE MOVILIDAD:
                  <select name="TIPO_MOVILIDAD" value={formData.TIPO_MOVILIDAD} onChange={handleChange} required>
                    <option value="">SELECCIONE EL TIPO DE MOVILIDAD</option>
                    <option value="ESTACIA ACADEMICA">ESTACIA ACADEMICA</option>
                    <option value="ESTANCIA DE INVESTIGACION">ESTANCIA DE INVESTIGACION</option>  
                    <option value="ESTANCIA PARA PRACTICAS PROFESIONALES">ESTANCIA PARA PRACTICAS PROFESIONALES</option>
                    <option value="ESTANCIAS CORTAS (CURSO DE VERANO O INVIERNO)">ESTANCIAS CORTAS (CURSO DE VERANO O INVIERNO)</option>
                    <option value="ESTANCIAS CORTAS PARA INVESTIGACION DE POSGRADOS">ESTANCIAS CORTAS PARA INVESTIGACION DE POSGRADOS</option>
                  </select>
                </label>
              </div>
        
              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="TIPO_DESTINO"
                    value="NACIONAL"
                    checked={formData.TIPO_DESTINO === "NACIONAL"}
                    onChange={handleChange}
                  />
                  MOVILIDAD NACIONAL
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="TIPO_DESTINO"
                    value="INTERNACIONAL"
                    checked={formData.TIPO_DESTINO === "INTERNACIONAL"}
                    onChange={handleChange}
                  />
                  MOVILIDAD INTERNACIONAL
                </label>
              </div>
        
              <div className="form-row">
                <label>
                  INSTITUCIÓN DESTINO:
                  <input 
                    type="text" 
                    name="INSTITUCION_DESTINO" 
                    value={formData.INSTITUCION_DESTINO} 
                    onChange={handleChange} 
                    placeholder="Nombre de la institución destino"
                    required 
                  />
                </label>
                
                {formData.TIPO_DESTINO === "INTERNACIONAL" ? (
                  <label>
                    PAÍS:
                    <input 
                      type="text" 
                      name="PAIS" 
                      value={formData.PAIS} 
                      onChange={(e) => {
                        const inputPais = e.target.value.toUpperCase();
                        const paisEncontrado = paises.find(pais => pais.toUpperCase() === inputPais);
                        setFormData({
                          ...formData,
                          PAIS: paisEncontrado || inputPais // Si coincide, usa el predefinido; si no, usa el ingresado
                        });
                      }} 
                      placeholder="Escriba o seleccione un país"
                      list="paises-list"
                      required 
                    />
                    <datalist id="paises-list">
                      {paises.map((pais, index) => (
                        <option key={index} value={pais} />
                      ))}
                    </datalist>
                  </label>
                ) : (
                  <label className="select-label">
                    ESTADO:
                    <select name="ESTADO_REPUBLICA" value={formData.ESTADO_REPUBLICA} onChange={handleChange} required>
                      <option value="">SELECCIONE UN ESTADO</option>
                      {estadosRepublica.map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
        
              <div className="form-row">
                <label>
                  FECHA DE INICIO:
                  <input 
                    type="date" 
                    name="FECHA_INICIO" 
                    value={formData.FECHA_INICIO} 
                    onChange={handleChange} 
                    required 
                  />
                </label>
                <label>
                  FECHA DE FIN:
                  <input 
                    type="date" 
                    name="FECHA_FIN" 
                    value={formData.FECHA_FIN} 
                    onChange={handleChange} 
                    required 
                  />
                </label>
              </div>
        
              <div className="form-row">
                <label>
                  OBSERVACIONES:
                  <textarea 
                    name="OBSERVACIONES" 
                    value={formData.OBSERVACIONES} 
                    onChange={handleChange} 
                    placeholder="Agregue cualquier observación relevante sobre la movilidad"
                    rows="3"
                  />
                </label>
              </div>
            </div>
            <div className="form-navigation">
              <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
              <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
            </div>
          </div>
        )}

                {/* SECCIÓN 4: DATOS DE BECA */}
        {activeSection === 4 && (
          <div className="form-section">
            <h2 className="section-title">Datos de Beca</h2>
            <div className="section-content">
              
              {/* Opción 1: Beca Cusur */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="BECADO_CUSUR" 
                    checked={formData.BECADO_CUSUR} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON BECA CUSUR?
                </label>
              </div>
              {formData.BECADO_CUSUR && (
                <div className="form-row">
                  <label>
                    MONTO OBTENIDO:
                    <input 
                      type="number" 
                      name="MONTO_CUSUR" 
                      value={formData.MONTO_CUSUR} 
                      onChange={handleChange} 
                      placeholder="Monto en MXN"
                      required 
                    />
                  </label>
                  <label>
                    DETALLES EXTRAS:
                    <textarea 
                      name="DETALLES_CUSUR" 
                      value={formData.DETALLES_CUSUR} 
                      onChange={handleChange} 
                      placeholder="Detalles adicionales sobre la beca"
                      rows="3"
                    />
                  </label>
                </div>
              )}
        
              {/* Opción 2: Becas CGCI */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="BECADO_CGCI" 
                    checked={formData.BECADO_CGCI} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON BECAS CGCI?
                </label>
              </div>
              {formData.BECADO_CGCI && (
                <>
                  <div className="form-row">
                    <label>
                      ¿CUÁNTAS BECAS TIENE?
                      <input 
                        type="number" 
                        name="NUMERO_BECAS_CGCI" 
                        value={formData.NUMERO_BECAS_CGCI} 
                        onChange={handleChange} 
                        placeholder="Número de becas"
                        min="1"
                        required 
                      />
                    </label>
                  </div>
                  {Array.from({ length: formData.NUMERO_BECAS_CGCI || 0 }).map((_, index) => (
                    <div key={index} className="form-row">
                      <label>
                        TIPO DE BECA:
                        <select 
                          name={`TIPO_BECA_CGCI_${index}`} 
                          value={formData[`TIPO_BECA_CGCI_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'TIPO_BECA_CGCI')}
                          required
                        >
                          <option value="">SELECCIONE</option>
                          <option value="PAEME">PAEME</option>
                          <option value="AMES">AMES</option>
                          <option value="ESACIES">ESACIES</option>
                          <option value="OTRO">OTRO</option>
                        </select>
                      </label>
                      {formData[`TIPO_BECA_CGCI_${index}`] === "OTRO" && (
                        <label>
                          NOMBRE DEL PROGRAMA:
                          <input 
                            type="text" 
                            name={`NOMBRE_BECA_CGCI_${index}`} 
                            value={formData[`NOMBRE_BECA_CGCI_${index}`] || ''} 
                            onChange={(e) => handleChangeDynamic(e, index, 'NOMBRE_BECA_CGCI')}
                            placeholder="Nombre del programa"
                            required 
                          />
                        </label>
                      )}
                      <label>
                        MONTO OBTENIDO:
                        <input 
                          type="number" 
                          name={`MONTO_BECA_CGCI_${index}`} 
                          value={formData[`MONTO_BECA_CGCI_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'MONTO_BECA_CGCI')}
                          placeholder="Monto en MXN"
                          required 
                        />
                      </label>
                      <label>
                        DETALLES EXTRAS:
                        <textarea 
                          name={`DETALLES_BECA_CGCI_${index}`} 
                          value={formData[`DETALLES_BECA_CGCI_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'DETALLES_BECA_CGCI')}
                          placeholder="Detalles adicionales"
                          rows="3"
                        />
                      </label>
                    </div>
                  ))}
                </>
              )}
        
              {/* Opción 3: Beca del Programa de Movilidad */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="BECADO_PROGRAMA" 
                    checked={formData.BECADO_PROGRAMA} 
                    onChange={handleChange} 
                  />
                  ¿EL PROGRAMA INCLUYE BECA?
                </label>
              </div>
              {formData.BECADO_PROGRAMA && (
                <div className="form-row">
                  <label>
                    PROGRAMA:
                    <input 
                      type="text" 
                      value={formData.PROGRAMA} 
                      readOnly 
                      disabled 
                    />
                  </label>
                  <label>
                    MONTO OBTENIDO:
                    <input 
                      type="number" 
                      name="MONTO_PROGRAMA" 
                      value={formData.MONTO_PROGRAMA} 
                      onChange={handleChange} 
                      placeholder="Monto en MXN"
                      required 
                    />
                  </label>
                  <label>
                    DETALLES EXTRAS:
                    <textarea 
                      name="DETALLES_PROGRAMA" 
                      value={formData.DETALLES_PROGRAMA} 
                      onChange={handleChange} 
                      placeholder="Detalles adicionales sobre la beca"
                      rows="3"
                    />
                  </label>
                </div>
              )}

             {/* Opción 4: Becas Externas */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="BECADO_EXTERNO" 
                    checked={formData.BECADO_EXTERNO} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON BECAS EXTERNAS?
                </label>
              </div>
              {formData.BECADO_EXTERNO && (
                <>
                  <div className="form-row">
                    <label>
                      TIPO DE MOVILIDAD:
                      <input 
                        type="text" 
                        value={formData.TIPO_DESTINO === "NACIONAL" ? "NACIONAL" : "INTERNACIONAL"} 
                        readOnly 
                        disabled 
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      ¿CUÁNTAS BECAS EXTERNAS TIENE?
                      <input 
                        type="number" 
                        name="NUMERO_BECAS_EXTERNAS" 
                        value={formData.NUMERO_BECAS_EXTERNAS} 
                        onChange={handleChange} 
                        placeholder="Número de becas externas"
                        min="1"
                        required 
                      />
                    </label>
                  </div>
                  {Array.from({ length: formData.NUMERO_BECAS_EXTERNAS || 0 }).map((_, index) => (
                    <div key={index} className="form-row">
                      <label>
                        NOMBRE DE LA BECA:
                        <select 
                          name={`TIPO_BECA_EXTERNA_${index}`} 
                          value={formData[`TIPO_BECA_EXTERNA_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'TIPO_BECA_EXTERNA')}
                          required
                        >
                          <option value="">SELECCIONE</option>
                          {formData.TIPO_DESTINO === "NACIONAL" ? (
                            <>
                              <option value="BECA DE EXCELENCIA DE LA SEP">BECA DE EXCELENCIA DE LA SEP</option>
                              <option value="FIBERH">FIBERH</option>
                              <option value="FUNED">FUNED</option>
                              <option value="ALIANZA DEL PACIFICO">ALIANZA DEL PACIFICO</option>
                              <option value="OTRO">OTRO</option>
                            </>
                          ) : (
                            <>
                              <option value="DAAD">DAAD (Alemania)</option>
                              <option value="COMEXUS">COMEXUS (EE.UU)</option>
                              <option value="JASSO">JASSO (Japón)</option>
                              <option value="CAMPUS FRANCE">CAMPUS FRANCE (Francia)</option>
                              <option value="Erasmus+">Erasmus+ (Unión Europea)</option>
                              <option value="Chevening">Chevening (Reino Unido)</option>
                              <option value="OTRO">OTRO</option>
                            </>
                          )}
                        </select>
                      </label>
                      {formData[`TIPO_BECA_EXTERNA_${index}`] === "OTRO" && (
                        <label>
                          NOMBRE DEL PROGRAMA:
                          <input 
                            type="text" 
                            name={`NOMBRE_BECA_EXTERNA_${index}`} 
                            value={formData[`NOMBRE_BECA_EXTERNA_${index}`] || ''} 
                            onChange={(e) => handleChangeDynamic(e, index, 'NOMBRE_BECA_EXTERNA')}
                            placeholder="Nombre del programa"
                            required 
                          />
                        </label>
                      )}
                      <label>
                        MONTO OBTENIDO:
                        <input 
                          type="number" 
                          name={`MONTO_BECA_EXTERNA_${index}`} 
                          value={formData[`MONTO_BECA_EXTERNA_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'MONTO_BECA_EXTERNA')}
                          placeholder="Monto en MXN"
                          required 
                        />
                      </label>
                      <label>
                        DETALLES EXTRAS:
                        <textarea 
                          name={`DETALLES_BECA_EXTERNA_${index}`} 
                          value={formData[`DETALLES_BECA_EXTERNA_${index}`] || ''} 
                          onChange={(e) => handleChangeDynamic(e, index, 'DETALLES_BECA_EXTERNA')}
                          placeholder="Detalles adicionales"
                          rows="3"
                        />
                      </label>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="form-navigation">
              <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
              <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
            </div>
          </div>
        )}
        

                {/* SECCIÓN 5: DATOS ADICIONALES */}
        {activeSection === 5 && (
          <div className="form-section">
            <h2 className="section-title">Datos Adicionales</h2>
            <div className="section-content">
        
              {/* Revalidación de materias */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="REVALIDACION_MATERIAS" 
                    checked={formData.REVALIDACION_MATERIAS} 
                    onChange={handleChange} 
                  />
                  ¿HUBO REVALIDACIÓN DE MATERIAS?
                </label>
              </div>
              {formData.REVALIDACION_MATERIAS && (
                <div className="form-row">
                  <label>
                    DATOS EXTRA:
                    <textarea 
                      name="DATOS_REVALIDACION" 
                      value={formData.DATOS_REVALIDACION} 
                      onChange={handleChange} 
                      placeholder="Ingrese detalles sobre la revalidación"
                      rows="3"
                    />
                  </label>
                  <label>
                    ADJUNTAR CERTIFICADO DE CALIFICACIONES (PDF):
                    <input 
                      type="file" 
                      name="CERTIFICADO_CALIFICACIONES" 
                      accept=".pdf" 
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        CERTIFICADO_CALIFICACIONES: e.target.files[0] 
                      })} 
                    />
                  </label>
                </div>
              )}
        
              {/* Discapacidad */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="CUENTA_CON_ALGUNA_DISCAPACIDAD" 
                    checked={formData.CUENTA_CON_ALGUNA_DISCAPACIDAD} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON ALGUNA DISCAPACIDAD?
                </label>
              </div>
              {formData.CUENTA_CON_ALGUNA_DISCAPACIDAD && (
                <div className="form-row">
                  <label>
                    DATOS EXTRA:
                    <textarea 
                      name="DATOS_DISCAPACIDAD" 
                      value={formData.DATOS_DISCAPACIDAD} 
                      onChange={handleChange} 
                      placeholder="Ingrese detalles sobre la discapacidad"
                      rows="3"
                    />
                  </label>
                </div>
              )}
        
              {/* Seguro de viaje */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="SEGURO_VIAJE" 
                    checked={formData.SEGURO_VIAJE} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON SEGURO DE VIAJE?
                </label>
              </div>
              {formData.SEGURO_VIAJE && (
                <div className="form-row">
                  <label>
                    NOMBRE DE LA ASEGURADORA:
                    <input 
                      type="text" 
                      name="NOMBRE_ASEGURADORA" 
                      value={formData.NOMBRE_ASEGURADORA} 
                      onChange={handleChange} 
                      placeholder="Nombre de la aseguradora"
                      required 
                    />
                  </label>
                  <label>
                    NÚMERO DE PÓLIZA:
                    <input 
                      type="text" 
                      name="NUMERO_POLIZA" 
                      value={formData.NUMERO_POLIZA} 
                      onChange={handleChange} 
                      placeholder="Número de póliza"
                      required 
                    />
                  </label>
                </div>
              )}
              {formData.SEGURO_VIAJE && (
                <div className="form-row">
                  <label>
                    FECHA DE INICIO DE LA COBERTURA:
                    <input 
                      type="date" 
                      name="FECHA_INICIO_SEGURO" 
                      value={formData.FECHA_INICIO_SEGURO} 
                      onChange={handleChange} 
                      required 
                    />
                  </label>
                  <label>
                    FECHA DE FIN DE LA COBERTURA:
                    <input 
                      type="date" 
                      name="FECHA_FIN_SEGURO" 
                      value={formData.FECHA_FIN_SEGURO} 
                      onChange={handleChange} 
                      required 
                    />
                  </label>
                </div>
              )}
              {formData.SEGURO_VIAJE && (
                <div className="form-row">
                  <label>
                    TELÉFONO O CONTACTO DE EMERGENCIAS DE LA ASEGURADORA:
                    <input 
                      type="tel" 
                      name="CONTACTO_ASEGURADORA" 
                      value={formData.CONTACTO_ASEGURADORA} 
                      onChange={handleChange} 
                      placeholder="Teléfono de emergencias"
                      required 
                    />
                  </label>
                  <label>
                    OBSERVACIONES:
                    <textarea 
                      name="OBSERVACIONES_SEGURO" 
                      value={formData.OBSERVACIONES_SEGURO} 
                      onChange={handleChange} 
                      placeholder="Ingrese observaciones adicionales"
                      rows="3"
                    />
                  </label>
                </div>
              )}
        
              {/* Experiencia compartida */}
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="EXPERIENCIA_COMPARTIDA" 
                    checked={formData.EXPERIENCIA_COMPARTIDA} 
                    onChange={handleChange} 
                  />
                  ¿EL ALUMNO PRESENTÓ Y COMPARTIÓ SU EXPERIENCIA?
                </label>
              </div>
              {formData.EXPERIENCIA_COMPARTIDA && (
                <div className="form-row">
                  <label>
                    DETALLES:
                    <textarea 
                      name="DETALLES_EXPERIENCIA" 
                      value={formData.DETALLES_EXPERIENCIA} 
                      onChange={handleChange} 
                      placeholder="Ingrese detalles sobre la experiencia compartida"
                      rows="3"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="form-navigation">
              <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
              <button type="submit" className="submit-button">REGISTRAR</button>
              <button type="button" className="reset-button" onClick={resetForm}>LIMPIAR</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Registro;