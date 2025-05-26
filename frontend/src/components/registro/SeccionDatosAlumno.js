import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function SeccionDatosAlumno({
  formData,
  handleChange,
  setFormData,
  errores,
  prevSection,
  nextSection
}) {
  const [carreras, setCarreras] = useState([]);
  const [maestria, setMaestrias] = useState([]);
  const [doctorados, setDoctorados] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [previewFoto, setPreviewFoto] = useState(formData.FOTO ? URL.createObjectURL(formData.FOTO) : null);

  const handleFotoChange = (e) => {
  const file = e.target.files[0];
  
  if (file) {
    // Validar tamaño de archivo (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('El archivo es demasiado grande. El tamaño máximo es 5MB.');
      e.target.value = '';
      return;
    }
    
    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato de archivo no válido. Use JPG, PNG o GIF.');
      e.target.value = '';
      return;
    }
    
    setFormData(prev => ({ ...prev, FOTO: file }));
    setPreviewFoto(URL.createObjectURL(file));
  }
};

  useEffect(() => {
    fetch('http://localhost/basecambios/get_carreras.php')
      .then(r => r.json()).then(setCarreras).catch(console.error);
    fetch('http://localhost/basecambios/get_maestrias.php')
      .then(r => r.json()).then(setMaestrias).catch(console.error);
    fetch('http://localhost/basecambios/get_doctorados.php')
      .then(r => r.json()).then(setDoctorados).catch(console.error);
    fetch('http://localhost/basecambios/get_nacionalidades.php')
      .then(r => r.json()).then(setNacionalidades).catch(console.error);
  }, []);

  return (
    <div className="form-section">
      <h2 className="section-title">Datos del Alumno</h2>
      <div className="section-content">

        {/* 1️⃣ Código / Nombre(s) */}
        <div className="form-row">
          <label style={{ alignItems: "center" }}>
            FOTO DEL ALUMNO:
            <div className={`foto-upload-container ${previewFoto ? 'has-image' : ''}`}>
              {!previewFoto ? (
                <div>
                  <button 
                    type="button" 
                    className="foto-upload-button"
                    onClick={() => document.querySelector('input[name="FOTO"]').click()}
                  >
                    <svg className="foto-upload-icon" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    Seleccionar Foto
                  </button>
                  <div className="foto-upload-text">
                    Formatos soportados: JPG, PNG, GIF<br/>
                    Tamaño máximo: 5MB
                  </div>
                </div>
              ) : (
                <div className="foto-preview-container">
                  <img
                    src={previewFoto}
                    alt="Vista previa"
                    className="foto-preview"
                  />
                  <div className="foto-success-indicator">
                    <svg className="foto-check-icon" viewBox="0 0 24 24">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                    </svg>
                    Foto cargada correctamente
                  </div>
                  <button 
                    type="button" 
                    className="foto-upload-button foto-change-button"
                    onClick={() => document.querySelector('input[name="FOTO"]').click()}
                  >
                    <svg className="foto-upload-icon" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z"/>
                    </svg>
                    Cambiar Foto
                  </button>
                </div>
              )}
            
              <input
                type="file"
                name="FOTO"
                accept="image/*"
                onChange={handleFotoChange}
                className="foto-input-hidden"
                required
              />
            </div>             
            {errores.FOTO && <span className="error-message">{errores.FOTO}</span>}
          </label> 
        </div>
        <div className="form-row">
          <label>
            CÓDIGO:
            <input
              type="text" name="CODIGO"
              value={formData.CODIGO}
              onChange={handleChange}
              style={{ textTransform: "uppercase" }}
              maxLength={9} required />
            {errores.CODIGO && <span className="error-message">{errores.CODIGO}</span>}
          </label>
          <label>
            NOMBRE(S):
            <input
              type="text" name="NOMBRE"
              style={{ textTransform: "uppercase" }}
              value={formData.NOMBRE}
              onChange={handleChange} required />
            {errores.NOMBRE && <span className="error-message">{errores.NOMBRE}</span>}
          </label>
        </div>

        {/* 2️⃣ Apellidos / Nivel Académico */}
        <div className="form-row">
          <label>
            APELLIDOS:
            <input
              type="text" name="APELLIDOS"
              value={formData.APELLIDOS}
              style={{ textTransform: "uppercase" }}
              onChange={handleChange} required />
            {errores.APELLIDOS && <span className="error-message">{errores.APELLIDOS}</span>}
          </label>
          <label className="select-label">
            NIVEL ACADÉMICO:
            <select
              name="NIVEL_ACADEMICO"
              value={formData.NIVEL_ACADEMICO}
              onChange={e => {
                const v = e.target.value;
                setFormData({
                  ...formData,
                  NIVEL_ACADEMICO: v,
                  CARRERA: '',
                  MAESTRIA: '',
                  DOCTORADO: ''
                });
              }}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="LICENCIATURA">LICENCIATURA</option>
              <option value="MAESTRÍA">MAESTRÍA</option>
              <option value="DOCTORADO">DOCTORADO</option>
            </select>

            {errores.NIVEL_ACADEMICO && <span className="error-message">{errores.NIVEL_ACADEMICO}</span>}
          </label>
        </div>

        {/* 3️⃣ Carrera o Maestría */}
        {formData.NIVEL_ACADEMICO === 'LICENCIATURA' && (
          <div className="form-row">
            <label className="select-label">
              CARRERA:
              <select
                name="CARRERA"
                value={formData.CARRERA}
                onChange={handleChange}
                required
              >
                <option value="">—Seleccione—</option>
                {carreras.map((c,i) => <option key={i} value={c}>{c}</option>)}
              </select>
              {errores.CARRERA && <span className="error-message">{errores.CARRERA}</span>}
            </label>
          </div>
        )}
        {formData.NIVEL_ACADEMICO === 'MAESTRÍA' && (
          <div className="form-row">
            <label className="select-label">
              MAESTRÍA:
              <select
                name="MAESTRIA"
                value={formData.MAESTRIA}
                onChange={handleChange}
                required
              >
                <option value="">—Seleccione—</option>
                {maestria.map((m,i) => <option key={i} value={m}>{m}</option>)}
              </select>
              {errores.MAESTRIA && <span className="error-message">{errores.MAESTRIA}</span>}
            </label>
          </div>
        )}

        {formData.NIVEL_ACADEMICO === 'DOCTORADO' && (
          <div className="form-row">
            <label className="select-label">
              DOCTORADO:
              <select
                name="DOCTORADO"
                value={formData.DOCTORADO}
                onChange={handleChange}
                required
              >
                <option value="">—Seleccione—</option>
                {doctorados.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
              {errores.DOCTORADO && <span className="error-message">{errores.DOCTORADO}</span>}
            </label>
          </div>
        )}


        {/* 4️⃣ Nacionalidad */}
        <div className="form-row">
          <label className="select-label">
            NACIONALIDAD:
            <select
              name="NACIONALIDAD"
              value={formData.NACIONALIDAD}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              {nacionalidades.map((n,i) => <option key={i} value={n}>{n}</option>)}
            </select>
            {errores.NACIONALIDAD && <span className="error-message">{errores.NACIONALIDAD}</span>}
          </label>
        </div>

        {/* 5️⃣ Semestre / Promedio */}
        <div className="form-row">
          <label>
            SEMESTRE:
            <input
              type="number" name="SEMESTRE"
              value={formData.SEMESTRE}
              onChange={handleChange}
              min="3" max="10" required />
            {errores.SEMESTRE && <span className="error-message">{errores.SEMESTRE}</span>}
          </label>
          <label>
            PROMEDIO:
            <input
              type="number" name="PROMEDIO"
              value={formData.PROMEDIO}
              onChange={handleChange}
              step="0.01" min="0" max="100" required />
            {errores.PROMEDIO && <span className="error-message">{errores.PROMEDIO}</span>}
          </label>
        </div>

        {/* 6️⃣ Género / Fecha de nacimiento */}
        <div className="form-row">
          <label className="select-label">
            GÉNERO:
            <select
              name="SEXO"
              value={formData.SEXO}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="M">MASCULINO</option>
              <option value="F">FEMENINO</option>
            </select>
            {errores.SEXO && <span className="error-message">{errores.SEXO}</span>}
          </label>
          <label>
            FECHA DE NACIMIENTO:
            <input
              type="date" name="FECHA_NACIMIENTO"
              value={formData.FECHA_NACIMIENTO}
              onChange={handleChange}
              required
            />
            {errores.FECHA_NACIMIENTO && <span className="error-message">{errores.FECHA_NACIMIENTO}</span>}
          </label>
        </div>

        {/* 7️⃣ Tipo de sangre / Teléfono */}
        <div className="form-row">
          <label className="select-label">
            TIPO DE SANGRE:
            <select
              name="TIPO_SANGRE"
              value={formData.TIPO_SANGRE}
              onChange={handleChange}
              required
            >
              <option value="">—Seleccione—</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errores.TIPO_SANGRE && <span className="error-message">{errores.TIPO_SANGRE}</span>}
          </label>
          <label>
            TELÉFONO:
            <input
              type="tel" name="TELEFONO"
              value={formData.TELEFONO}
              onChange={handleChange}
              maxLength={10} required
            />
            {errores.TELEFONO && <span className="error-message">{errores.TELEFONO}</span>}
          </label>
        </div>

        {/* 8️⃣ Correo / Contacto emergencia */}
        <div className="form-row">
          <label>
            CORREO:
            <input
              type="email" name="CORREO"
              value={formData.CORREO}
              onChange={handleChange}
              required
            />
            {errores.CORREO && <span className="error-message">{errores.CORREO}</span>}
          </label>
          <label>
            CONTACTO EMERGENCIA:
            <input
              type="tel" name="CONTACTO_EMERGENCIA"
              value={formData.CONTACTO_EMERGENCIA}
              onChange={handleChange}
              maxLength={10} required
            />
            {errores.CONTACTO_EMERGENCIA && <span className="error-message">{errores.CONTACTO_EMERGENCIA}</span>}
          </label>
        </div>

        {/* 9️⃣ Nombre contacto emergencia (si existe teléfono) */}
        {formData.CONTACTO_EMERGENCIA && (
          <div className="form-row">
            <label>
              NOMBRE CONTACTO:
              <input
                style={{ textTransform: "uppercase" }}
                type="text" name="NOMBRE_CONTACTO_EMERGENCIA"
                value={formData.NOMBRE_CONTACTO_EMERGENCIA}
                onChange={handleChange}
                required
              />
              {errores.NOMBRE_CONTACTO_EMERGENCIA &&
               <span className="error-message">{errores.NOMBRE_CONTACTO_EMERGENCIA}</span>}
            </label>
          </div>
        )}

        {/* 🔟 NSS */}
        <div className="form-row">
          <label>
            NÚMERO DE SEGURO SOCIAL (NSS):
            <input
              style={{ textTransform: "uppercase" }}
              type="text" name="NSS"
              value={formData.NSS}
              onChange={handleChange}
              maxLength={11} required
            />
            {errores.NSS && <span className="error-message">{errores.NSS}</span>}
          </label>
        </div>

      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">
          Anterior
        </button>
        <button type="button" onClick={nextSection} className="next-button">
          Siguiente
        </button>
      </div>
    </div>
  );
}
