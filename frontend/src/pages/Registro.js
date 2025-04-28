import React, { useState } from "react";
import "../styles/FrmRegistro.css";

const Registro = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState({
    // Sección Programa
    PROGRAMA: '',
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
    BECADO: false,
    BECADO_POR: '',
    BECADO_POR_CUSUR: '',
    ORGANISMO_EXTERNO_NOMBRE: '',
    ORGANISMO_EXTERNO_MONTO: '',
    BECADO_POR_LA_SEP: '',
    
    // Sección Datos Adicionales
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

  // Lista de tipos de movilidad
  const tiposMovilidad = [
    "ESTANCIA PARA CURSAR ASIGNATURAS",
    "ESTANCIA DE INVESTIGACIÓN",
    "ESTANCIA PARA PRÁCTICAS PROFESIONALES",
    "ESTANCIA CORTA DE INVESTIGACIÓN"
  ];

  // Lista de actividades de movilidad
  const actividadesMovilidad = [
    "MOVILIDAD ESTUDIANTIL",
    "INTERCAMBIO ACADÉMICO",
    "PRÁCTICAS PROFESIONALES",
    "INVESTIGACIÓN",
    "SERVICIO SOCIAL",
    "OTRO"
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
    "OTRO"
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

  // Lista de programas de beca
  const programasBeca = [
    "NINGUNO",
    "COORDINACIÓN DE INTERNACIONALIZACIÓN (CI)",
    "SEP",
    "CUSUR",
    "DELFIN",
    "ORGANISMO EXTERNO",
    "OTRO"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'text' ? value.toUpperCase() : val
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar el formulario al backend
    alert("Alumno registrado correctamente para programa de movilidad");
  };

  const nextSection = () => {
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

  const resetForm = () => {
    setFormData({
      // Reset all fields to their default values
      PROGRAMA: '',
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
                <label>
                  PROGRAMA:
                  <input 
                    type="text" 
                    name="PROGRAMA" 
                    value={formData.PROGRAMA} 
                    onChange={handleChange} 
                    placeholder="Ej. PROGRAMA DE ESTANCIAS ACADÉMICAS (PEA)"
                    required 
                  />
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
              <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
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
                    {tiposMovilidad.map((tipo, index) => (
                      <option key={index} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </label>
                <label className="select-label">
                  ACTIVIDAD:
                  <select name="ACTIVIDAD" value={formData.ACTIVIDAD} onChange={handleChange} required>
                    <option value="">SELECCIONE LA ACTIVIDAD</option>
                    {actividadesMovilidad.map((actividad, index) => (
                      <option key={index} value={actividad}>{actividad}</option>
                    ))}
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
                  <label className="select-label">
                    PAÍS:
                    <select name="PAIS" value={formData.PAIS} onChange={handleChange} required>
                      <option value="">SELECCIONE UN PAÍS</option>
                      {paises.map((pais, index) => (
                        <option key={index} value={pais}>{pais}</option>
                      ))}
                    </select>
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
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="BECADO" 
                    checked={formData.BECADO} 
                    onChange={handleChange} 
                  />
                  ¿CUENTA CON BECA?
                </label>
              </div>
              
              {formData.BECADO && (
                <>
                  <div className="form-row">
                    <label className="select-label">
                      BECADO POR:
                      <select name="BECADO_POR" value={formData.BECADO_POR} onChange={handleChange}>
                        <option value="">SELECCIONE</option>
                        {programasBeca.map((programa, index) => (
                          <option key={index} value={programa}>{programa}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  
                  {formData.BECADO_POR === "CUSUR" && (
                    <div className="form-row">
                      <label>
                        TIPO DE BECA CUSUR:
                        <input 
                          type="text" 
                          name="BECADO_POR_CUSUR" 
                          value={formData.BECADO_POR_CUSUR} 
                          onChange={handleChange} 
                          placeholder="Especifique el tipo de beca CUSUR"
                        />
                      </label>
                    </div>
                  )}
                  
                  {formData.BECADO_POR === "ORGANISMO EXTERNO" && (
                    <>
                      <div className="form-row">
                        <label>
                          NOMBRE DEL ORGANISMO:
                          <input 
                            type="text" 
                            name="ORGANISMO_EXTERNO_NOMBRE" 
                            value={formData.ORGANISMO_EXTERNO_NOMBRE} 
                            onChange={handleChange} 
                            placeholder="Nombre del organismo externo"
                          />
                        </label>
                      </div>
                      <div className="form-row">
                        <label>
                          MONTO OTORGADO:
                          <input 
                            type="number" 
                            name="ORGANISMO_EXTERNO_MONTO" 
                            value={formData.ORGANISMO_EXTERNO_MONTO} 
                            onChange={handleChange} 
                            placeholder="Monto en MXN"
                          />
                        </label>
                      </div>
                    </>
                  )}
                  
                  {formData.BECADO_POR === "SEP" && (
                    <div className="form-row">
                      <label>
                        PROGRAMA SEP:
                        <input 
                          type="text" 
                          name="BECADO_POR_LA_SEP" 
                          value={formData.BECADO_POR_LA_SEP} 
                          onChange={handleChange} 
                          placeholder="Especifique el programa SEP"
                        />
                      </label>
                    </div>
                  )}
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
              <div className="form-row">
                <label>
                  PROMOCIÓN:
                  <input 
                    type="text" 
                    name="PROMOCION" 
                    value={formData.PROMOCION} 
                    onChange={handleChange} 
                    placeholder="Promoción (opcional)"
                  />
                </label>
                <label>
                  CALIFICACIONES:
                  <input 
                    type="text" 
                    name="CALIFICACIONES" 
                    value={formData.CALIFICACIONES} 
                    onChange={handleChange} 
                    placeholder="Calificaciones (opcional)"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  REVALIDACIÓN:
                  <input 
                    type="text" 
                    name="REVALIDACION" 
                    value={formData.REVALIDACION} 
                    onChange={handleChange} 
                    placeholder="Revalidación (opcional)"
                  />
                </label>
                <label>
                  CALIFICACIONES SIIAU:
                  <input 
                    type="text" 
                    name="CALF_SIIAU" 
                    value={formData.CALF_SIIAU} 
                    onChange={handleChange} 
                    placeholder="Calificaciones SIIAU (opcional)"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  CGCI PEA AMPLIADO:
                  <input 
                    type="text" 
                    name="CGCI_PEA_AMPLIADO" 
                    value={formData.CGCI_PEA_AMPLIADO} 
                    onChange={handleChange} 
                    placeholder="CGCI PEA Ampliado (opcional)"
                  />
                </label>
                <label>
                  PROFOCIE PPE:
                  <input 
                    type="text" 
                    name="PROFOCIE_PPE" 
                    value={formData.PROFOCIE_PPE} 
                    onChange={handleChange} 
                    placeholder="PROFOCIE PPE (opcional)"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  ESACIES:
                  <input 
                    type="text" 
                    name="ESACIES" 
                    value={formData.ESACIES} 
                    onChange={handleChange} 
                    placeholder="ESACIES (opcional)"
                  />
                </label>
                <label>
                  RENUNCIAS:
                  <input 
                    type="text" 
                    name="RENUNCIAS" 
                    value={formData.RENUNCIAS} 
                    onChange={handleChange} 
                    placeholder="Renuncias (opcional)"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  APOYO REPATRIACIÓN:
                  <input 
                    type="text" 
                    name="APOYO_REPATRIACION" 
                    value={formData.APOYO_REPATRIACION} 
                    onChange={handleChange} 
                    placeholder="Apoyo Repatriación (opcional)"
                  />
                </label>
                <label>
                  COVID-19:
                  <input 
                    type="text" 
                    name="COVID_19" 
                    value={formData.COVID_19} 
                    onChange={handleChange} 
                    placeholder="Información COVID-19 (opcional)"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  RECTORÍA:
                  <input 
                    type="text" 
                    name="RECTORIA" 
                    value={formData.RECTORIA} 
                    onChange={handleChange} 
                    placeholder="Rectoría (opcional)"
                  />
                </label>
              </div>
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="CONTINUA_MOVILIDAD" 
                    checked={formData.CONTINUA_MOVILIDAD} 
                    onChange={handleChange} 
                  />
                  CONTINÚA EN MOVILIDAD
                </label>
              </div>
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="CUENTA_CON_ALGUNA_DISCAPACIDAD" 
                    checked={formData.CUENTA_CON_ALGUNA_DISCAPACIDAD === 'SI'} 
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        CUENTA_CON_ALGUNA_DISCAPACIDAD: e.target.checked ? 'SI' : 'NO'
                      });
                    }} 
                  />
                  CUENTA CON ALGUNA DISCAPACIDAD
                </label>
              </div>
              <div className="form-row checkbox-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="PERTENECE_ALGUNA_COMUNIDAD_INDIGENA" 
                    checked={formData.PERTENECE_ALGUNA_COMUNIDAD_INDIGENA === 'SI'} 
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        PERTENECE_ALGUNA_COMUNIDAD_INDIGENA: e.target.checked ? 'SI' : 'NO'
                      });
                    }} 
                  />
                  PERTENECE A ALGUNA COMUNIDAD INDÍGENA
                </label>
              </div>
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