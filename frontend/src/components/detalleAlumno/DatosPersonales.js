import React, { useRef, useState, useEffect } from "react";
import Section from "../common/Section";
import userDefault from "../../assets/user.png";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export default function DatosPersonales({ alumno, onChange, catalogos, onFotoChange }) {
  const {
    niveles,
    carreras,
    maestrias,
    doctorados,
    sexos,
    tipos_sangre: tiposSangre,
    nacionalidades,
    discapacidades // <-- nuevo catálogo
  } = catalogos;

  const fileInputRef = useRef();
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [fotoUrl, setFotoUrl] = useState(userDefault);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (previewUrl) {
      setFotoUrl(previewUrl);
      return;
    }
    if (!alumno.codigo) {
      setFotoUrl(userDefault);
      return;
    }

    const exts = ["jpg", "jpeg", "png", "gif"];
    let found = false;

    exts.reduce((promise, ext) => {
      return promise.then(() => {
        if (found) return;
        return new Promise((resolve) => {
          const testUrl = `${BASE_URL}images/${alumno.codigo}.${ext}?t=${Date.now()}`;
          const img = new window.Image();
          img.onload = () => {
            if (!found) {
              setFotoUrl(testUrl);
              found = true;
            }
            resolve();
          };
          img.onerror = () => resolve();
          img.src = testUrl;
        });
      });
    }, Promise.resolve()).then(() => {
      if (!found) setFotoUrl(userDefault);
    });
  }, [alumno.codigo, previewUrl]);

  // Crop cuadrado
  const cropToSquare = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
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
    if (!file || !alumno.codigo) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato no válido. Usa JPG, PNG o GIF.");
      return;
    }

    cropToSquare(file, (croppedFile, localPreviewUrl) => {
      setPreviewUrl(localPreviewUrl); // Muestra preview antes de guardar
      const formData = new FormData();
      formData.append("foto", croppedFile);
      formData.append("codigo", alumno.codigo);

      setSubiendoFoto(true);
      fetch(`${BASE_URL}upload_foto.php`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success("Foto guardada correctamente.");
            onFotoChange({ target: { name: "FOTO", value: data.ruta } });
            setPreviewUrl(null); // Limpia el preview para volver a cargar desde el servidor
            setFotoUrl(`${BASE_URL}images/${alumno.codigo}.jpg?t=${Date.now()}`);
          } else {
            toast.error(data.error || "Error al subir la foto.");
          }
        })
        .catch(() => {
          toast.error("Error de conexión al subir la foto.");
        })
        .finally(() => {
          setSubiendoFoto(false);
        });
    });
  };

  const handleValidatedChange = (e) => {
    const { name, value, checked } = e.target; // ← elimina 'type'

    // Validación para selects obligatorios
    const requiredSelects = [
      "nivel_academico",
      "carrera",
      "maestria",
      "doctorado",
      "sexo",
      "nacionalidad",
      "discapacidad_id"
    ];
    if (requiredSelects.includes(name) && value === "") {
      toast.error("Este campo es obligatorio.");
      return;
    }

    // Validación para código del alumno: obligatorio y numérico
    if (name === "codigo") {
      if (value === "") {
        toast.error("El código del alumno es obligatorio.");
        return;
      }
      if (!/^\d+$/.test(value)) {
        toast.error("El código del alumno debe ser numérico.");
        return;
      }
    }

    // Validación para promedio: entre 80 y 100
    if (name === "promedio") {
      if (value !== "" && (Number(value) < 80 || Number(value) > 100)) {
        toast.error("El promedio debe estar entre 80 y 100.");
        return;
      }
    }

    // Validación para semestre: entre 0 y 12
    if (name === "semestre") {
      if (value !== "" && (Number(value) < 0 || Number(value) > 12)) {
        toast.error("El semestre debe estar entre 0 y 12.");
        return;
      }
    }

    // Checkbox para comunidad nativa
    if (name === "pertenece_comunidad") {
      onChange({
        target: {
          name,
          value: checked ? 1 : 0
        }
      });
      if (!checked) {
        onChange({
          target: {
            name: "comunidad_nativa",
            value: ""
          }
        });
      }
      return;
    }

    onChange(e);
  };

  return (
    <Section title="Datos Personales" className="datos-personales-section">
      <input
        type="hidden"
        name="codigo_original"
        value={alumno.codigo_original || alumno.codigo || ""}
      />

      <div className="foto-alumno-container">
        <img
          className="foto-alumno-img"
          src={fotoUrl}
          alt="Foto del alumno"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = userDefault;
          }}
        />
        <button
          type="button"
          className="foto-upload-button foto-change-button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          disabled={subiendoFoto}
        >
          {subiendoFoto ? "Subiendo..." : "Cambiar Foto"}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFotoChange}
        />
        <span className="foto-alumno-label">Foto</span>
      </div>

      {/* Campos del formulario: código, nombre, etc. (igual que antes) */}
      <div className="form-row">
        <label>
          CÓDIGO:
          <input
            type="text"
            name="codigo"
            value={alumno.codigo || ""}
            onChange={handleValidatedChange}
            style={{ textTransform: "uppercase" }}
            maxLength={9}
            required
          />
        </label>
        <label>
          NOMBRE(S):
          <input
            type="text"
            name="nombre"
            value={alumno.nombre || ""}
            onChange={onChange}
            style={{ textTransform: "uppercase" }}
            required
          />
        </label>
      </div>

      {/* Apellidos y Nivel académico */}
      <div className="form-row">
        <label>
          APELLIDOS:
          <input
            type="text"
            name="apellidos"
            value={alumno.apellidos || ""}
            onChange={onChange}
            style={{ textTransform: "uppercase" }}
            required
          />
        </label>
        <label>
          NIVEL ACADÉMICO:
          <select
            name="nivel_academico"
            value={alumno.nivel_academico || ""}
            onChange={handleValidatedChange}
            disabled
            required
          >
            <option value="">—Seleccione—</option>
            {niveles.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Carrera, Maestría o Doctorado */}
      {alumno.nivel_academico === "LICENCIATURA" && (
        <div className="form-row">
          <label>
            CARRERA:
            <select
              name="carrera"
              value={alumno.carrera || ""}
              onChange={handleValidatedChange}
              required
            >
              <option value="">—Seleccione—</option>
              {carreras.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {alumno.nivel_academico === "MAESTRÍA" && (
        <div className="form-row">
          <label>
            MAESTRÍA:
            <select
              name="maestria"
              value={alumno.maestria || ""}
              onChange={handleValidatedChange}
              required
            >
              <option value="">—Seleccione—</option>
              {maestrias.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {alumno.nivel_academico === "DOCTORADO" && (
        <div className="form-row">
          <label>
            DOCTORADO:
            <select
              name="doctorado"
              value={alumno.doctorado || ""}
              onChange={handleValidatedChange}
              required
            >
              <option value="">—Seleccione—</option>
              {doctorados.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Género, Tipo de Sangre y Nacionalidad */}
      <div className="form-row">
        <label>
          GÉNERO:
          <select
            name="sexo"
            value={alumno.sexo || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {sexos.map((s, i) => (
              <option key={s.id || i} value={s.nombre}>{s.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          TIPO DE SANGRE:
          <select
            name="tipo_sangre"
            value={alumno.tipo_sangre || ""}
            onChange={onChange}
          >
            <option value="">—Seleccione—</option>
            {tiposSangre.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          NACIONALIDAD:
          <select
            name="nacionalidad"
            value={alumno.nacionalidad || ""}
            onChange={onChange}
            required
          >
            <option value="">—Seleccione—</option>
            {nacionalidades.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Fecha de nacimiento, Semestre y Promedio */}
      <div className="form-row">
        <label>
          FECHA NACIMIENTO:
          <input
            type="date"
            name="fecha_nacimiento"
            value={alumno.fecha_nacimiento || ""}
            onChange={onChange}
            required
          />
        </label>
        <label>
          SEMESTRE:
          <input
            type="number"
            name="semestre"
            value={alumno.semestre || ""}
            onChange={onChange}
            min="0"
            max="12"
          />
        </label>
        <label>
          PROMEDIO:
          <input
            type="number"
            name="promedio"
            value={alumno.promedio || ""}
            onChange={onChange}
            min="80"
            max="100"
            step="any" // Permite decimales y cualquier número dentro del rango
            inputMode="decimal" // Sugerencia para teclado numérico en móviles
            pattern="[0-9]*"   // Permite solo números desde el teclado
          />
        </label>
      </div>

      {/* Discapacidad y Comunidad Nativa */}
      <div className="form-row">
        <label>
          DISCAPACIDAD:
          <select
            name="discapacidad_id"
            value={alumno.discapacidad_id || ""}
            onChange={e => {
              // Si selecciona "NINGUNA", envía null para borrar en la BD
              const value = e.target.value === "" ? null : e.target.value;
              handleValidatedChange({
                target: {
                  name: "discapacidad_id",
                  value: value
                }
              });
            }}
            required
          >
            <option value="">NINGUNA</option>
            {discapacidades.map((d, i) => (
              <option key={i} value={d.id}>{d.nombre}</option>
            ))}
          </select>
        </label>
        
        <div className="checkbox-vertical">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="pertenece_comunidad"
              checked={Boolean(alumno.pertenece_comunidad)}
              onChange={handleValidatedChange}
            />
            <span>¿PERTENECE A COMUNIDAD NATIVA?</span>
          </label>
        </div>
        
        {alumno.pertenece_comunidad ? (
          <label>
            NOMBRE DE LA COMUNIDAD:
            <input
              type="text"
              name="comunidad_nativa"
              value={alumno.comunidad_nativa || ""}
              onChange={onChange}
              style={{ textTransform: "uppercase" }}
              required
            />
          </label>
        ) : null}
      </div>

      {/* Información de contacto */}
      <div className="form-row">
        <label>
          TELÉFONO:
          <input
            type="text"
            name="telefono"
            value={alumno.telefono || ""}
            onChange={onChange}
            placeholder="Número de teléfono"
          />
        </label>
        <label>
          CORREO ELECTRÓNICO:
          <input
            type="email"
            name="correo"
            value={alumno.correo || ""}
            onChange={onChange}
            placeholder="correo@ejemplo.com"
          />
        </label>
      </div>

      {/* Contacto de emergencia */}
      <div className="form-row">
        <label>
          CONTACTO DE EMERGENCIA:
          <input
            type="text"
            name="nombre_contacto_emergencia"
            value={alumno.nombre_contacto_emergencia || ""}
            onChange={onChange}
            placeholder="Nombre del contacto de emergencia"
          />
        </label>
        <label>
          TELÉFONO DE EMERGENCIA:
          <input
            type="text"
            name="contacto_emergencia"
            value={alumno.contacto_emergencia || ""}
            onChange={onChange}
            placeholder="Teléfono de emergencia"
          />
        </label>
        <label>
          NSS:
          <input
            type="text"
            name="nss"
            value={alumno.nss || ""}
            onChange={onChange}
            placeholder="Número de Seguridad Social"
          />
        </label>
      </div>
    </Section>
  );
}