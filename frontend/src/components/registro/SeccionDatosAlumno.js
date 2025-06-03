import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userDefault from '../../assets/user.png';

export default function SeccionDatosAlumno({
  formData,
  handleChange,
  setFormData,
  errores,
  prevSection,
  nextSection,
  correoLocal,
  setCorreoLocal,
  correoDominio,
  setCorreoDominio,
  otroDominio,
  setOtroDominio,
  dominios,
  fotoFile,
  setFotoFile
}) {
  const [carreras, setCarreras] = useState([]);
  const [maestria, setMaestrias] = useState([]);
  const [doctorados, setDoctorados] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [discapacidades, setDiscapacidades] = useState([]);
  const [previewFoto, setPreviewFoto] = useState(userDefault);
  const [sexos, setSexos] = useState([]);

  // Siempre que el input código cambie y no esté vacío, intenta cargar la imagen del servidor
  useEffect(() => {
    // Si hay código, siempre busca la foto en el servidor
    if (formData.CODIGO && String(formData.CODIGO).trim() !== "") {
      const exts = ["jpg", "jpeg", "png", "gif"];
      let found = false;
      let cancelled = false;

      const testImage = (testUrl) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            if (!found && !cancelled) {
              setPreviewFoto(testUrl);
              found = true;
            }
            resolve();
          };
          img.onerror = () => resolve();
          img.src = testUrl;
        });

      (async () => {
        for (let ext of exts) {
          const testUrl = `http://localhost/basecambios/images/${formData.CODIGO}.${ext}?t=${Date.now()}`;
          await testImage(testUrl);
          if (found) break;
        }
        if (!found && !cancelled) setPreviewFoto(userDefault);
      })();
      return () => { cancelled = true; };
    }

    // Si no hay código, muestra la foto local si existe
    if (fotoFile instanceof File) {
      const url = URL.createObjectURL(fotoFile);
      setPreviewFoto(url);
      return () => URL.revokeObjectURL(url);
    }
    if (formData.FOTO instanceof File) {
      const url = URL.createObjectURL(formData.FOTO);
      setPreviewFoto(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof formData.FOTO === "string" && formData.FOTO) {
      setPreviewFoto(formData.FOTO);
      return;
    }

    setPreviewFoto(userDefault);
  // Solo depende de formData.CODIGO, fotoFile y formData.FOTO
  }, [formData.CODIGO, fotoFile, formData.FOTO]);

  // Recorta la imagen a cuadrado usando canvas
  const cropToSquare = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new window.Image();
      img.onload = function () {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        );
        canvas.toBlob(blob => {
          const croppedFile = new File([blob], file.name, { type: file.type });
          callback(croppedFile, URL.createObjectURL(blob));
        }, file.type);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('El archivo es demasiado grande. El tamaño máximo es 5MB.');
      e.target.value = '';
      return;
    }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato de archivo no válido. Use JPG, PNG o GIF.');
      e.target.value = '';
      return;
    }

    cropToSquare(file, (croppedFile, previewUrl) => {
      setFormData(prev => ({ ...prev, FOTO: croppedFile }));
      setPreviewFoto(previewUrl);
      if (setFotoFile) setFotoFile(croppedFile);

      // Si ya hay código, sube la foto automáticamente
      if (formData.CODIGO && String(formData.CODIGO).trim() !== "") {
        subirFotoServidor(croppedFile, formData.CODIGO);
      }
    });
  };

  const subirFotoServidor = async (file, codigo) => {
    const formData = new FormData();
    formData.append('foto', file);
    formData.append('codigo', codigo);

    try {
      const res = await fetch('http://localhost/basecambios/upload_foto.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setPreviewFoto(`http://localhost/basecambios/${data.ruta}?t=${Date.now()}`);
        setFormData(prev => ({ ...prev, FOTO: data.ruta }));
        if (setFotoFile) setFotoFile(null); // Limpia el file local si quieres
        toast.success('Foto subida correctamente');
      } else {
        toast.error(data.error || 'Error al subir la foto');
      }
    } catch (err) {
      toast.error('Error de red al subir la foto');
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
      .then(r => r.json())
      .then(data => {
        setNacionalidades(data);
        if (!formData.NACIONALIDAD && data.includes("MEXICANA")) {
          setFormData(prev => ({ ...prev, NACIONALIDAD: "MEXICANA" }));
        }
      })
      .catch(console.error);

    fetch('http://localhost/basecambios/get_discapacidades.php')
      .then(r => r.json()).then(setDiscapacidades).catch(console.error);

    fetch('http://localhost/basecambios/get_sexos.php')
      .then(r => r.json()).then(setSexos).catch(console.error);
  }, [formData.NACIONALIDAD, setFormData]);

  // La foto ya no es obligatoria
  const handleNext = async () => {
    if (!formData.CODIGO || !/^\d{9}$/.test(formData.CODIGO)) {
      toast.error("El código debe tener exactamente 9 dígitos numéricos.");
      return;
    }
    if (formData.FOTO instanceof File) {
      await subirFotoServidor(formData.FOTO, formData.CODIGO);
    }
    nextSection();
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Datos del Alumno</h2>
      <div className="section-content">

        {/* 1️⃣ Código / Nombre(s) */}
        <div className="form-row">
          <label style={{ alignItems: "center" }}>
            FOTO DEL ALUMNO:
            <div className={`foto-upload-container ${previewFoto !== userDefault ? 'has-image' : ''}`}>
              <div className="foto-preview-container">
                <img
                  src={previewFoto}
                  alt="Vista previa"
                  className="foto-preview"
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: "2px solid #3498db",
                    background: "#f4f8fb",
                    boxShadow: "0 2px 8px rgba(52, 152, 219, 0.08)",
                    marginBottom: "8px",
                    transition: "box-shadow 0.2s"
                  }}
                  onError={e => { e.target.src = userDefault; }}
                />
                <button
                  type="button"
                  className="foto-upload-button foto-change-button"
                  onClick={() => document.querySelector('input[name="FOTO"]').click()}
                >
                  Cambiar Foto
                </button>
              </div>
              <input
                type="file"
                name="FOTO"
                accept="image/*"
                onChange={handleFotoChange}
                className="foto-input-hidden"
                style={{ display: "none" }}
              />
            </div>
            {errores.FOTO && <span className="error-message">{errores.FOTO}</span>}
          </label>
        </div>
        <div className="form-row">
          <label>
            CÓDIGO:
            <input
              type="text"
              name="CODIGO"
              value={formData.CODIGO}
              onChange={e => {
                // Solo permitir números y máximo 9 caracteres
                const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                handleChange({ target: { name: "CODIGO", value } });
              }}
              style={{ textTransform: "uppercase" }}
              maxLength={9}
              required
              inputMode="numeric"
              pattern="\d{9}"
              autoComplete="off"
            />
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

        {/* 4️⃣ BIS: Discapacidad y Comunidad Nativa */}
        <div className="form-row">
          <label className="select-label">
            DISCAPACIDAD:
            <select
              name="DISCAPACIDAD_ID"
              value={formData.DISCAPACIDAD_ID || ""}
              onChange={handleChange}
            >
              <option value="">NINGUNA</option>
              {discapacidades.map((d, i) => (
                <option key={i} value={d.id}>{d.nombre}</option>
              ))}
            </select>
            {errores.DISCAPACIDAD_ID && <span className="error-message">{errores.DISCAPACIDAD_ID}</span>}
          </label>
          <label>
            <input
              type="checkbox"
              name="PERTENECE_COMUNIDAD"
              checked={!!formData.PERTENECE_COMUNIDAD}
              onChange={e => setFormData(prev => ({
                ...prev,
                PERTENECE_COMUNIDAD: e.target.checked,
                COMUNIDAD_NATIVA: e.target.checked ? prev.COMUNIDAD_NATIVA : ""
              }))}
            />
            ¿PERTENECE A COMUNIDAD NATIVA?
          </label>
          {formData.PERTENECE_COMUNIDAD && (
            <label>
              NOMBRE DE LA COMUNIDAD:
              <input
                type="text"
                name="COMUNIDAD_NATIVA"
                value={formData.COMUNIDAD_NATIVA || ""}
                onChange={handleChange}
                style={{ textTransform: "uppercase" }}
                required
              />
              {errores.COMUNIDAD_NATIVA && <span className="error-message">{errores.COMUNIDAD_NATIVA}</span>}
            </label>
          )}
        </div>

        {/* 5️⃣ Semestre / Promedio */}
        <div className="form-row">
          <label>
            SEMESTRE:
            <input
              type="number" name="SEMESTRE"
              value={formData.SEMESTRE}
              onChange={handleChange}
              min="0" max="12" required />
            {errores.SEMESTRE && <span className="error-message">{errores.SEMESTRE}</span>}
          </label>
          <label>
            PROMEDIO:
            <input
              type="number" name="PROMEDIO"
              value={formData.PROMEDIO}
              onChange={handleChange}
              step="0.01" min="" max="100" required />
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
              {sexos.map((s, i) => (
                <option key={s.id || i} value={s.nombre}>{s.nombre}</option>
              ))}
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
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                name="CORREO_LOCAL"
                placeholder="usuario"
                value={correoLocal}
                onChange={e => setCorreoLocal(e.target.value)}
                required
                style={{ flex: 2 }}
              />
              <select
                name="CORREO_DOMINIO"
                value={correoDominio}
                onChange={e => setCorreoDominio(e.target.value)}
                style={{ flex: 2 }}
              >
                {dominios.map((dom, i) => (
                  <option key={i} value={dom}>{dom === 'Otro' ? 'Otro...' : dom}</option>
                ))}
              </select>
              {correoDominio === 'Otro' && (
                <input
                  type="text"
                  name="OTRO_DOMINIO"
                  placeholder="dominio.com"
                  value={otroDominio}
                  onChange={e => setOtroDominio(e.target.value)}
                  required
                  style={{ flex: 2 }}
                />
              )}
            </div>
            {errores.CORREO && <span className="error-message">{errores.CORREO}</span>}
          </label>
         
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

                {/* 9️⃣ Nombre contacto emergencia (si existe teléfono) */}
        <div className="form-row">
          <label>
            NOMBRE CONTACTO DE EMERGENCIA:
            <input
              style={{ textTransform: "uppercase" }}
              type="text"
              name="NOMBRE_CONTACTO_EMERGENCIA"
              value={formData.NOMBRE_CONTACTO_EMERGENCIA}
              onChange={handleChange}
              required
            />
            {errores.NOMBRE_CONTACTO_EMERGENCIA &&
              <span className="error-message">{errores.NOMBRE_CONTACTO_EMERGENCIA}</span>}
          </label>
          {formData.NOMBRE_CONTACTO_EMERGENCIA && (
            <label>
              CONTACTO EMERGENCIA:
              <input
                type="tel"
                name="CONTACTO_EMERGENCIA"
                value={formData.CONTACTO_EMERGENCIA}
                onChange={handleChange}
                maxLength={10}
                required
              />
              {errores.CONTACTO_EMERGENCIA &&
                <span className="error-message">{errores.CONTACTO_EMERGENCIA}</span>}
            </label>
          )}
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">
          Anterior
        </button>
        <button type="button" onClick={handleNext} className="next-button">
          Siguiente
        </button>
      </div>
    </div>
  );
}
