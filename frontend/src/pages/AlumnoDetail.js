// src/pages/AlumnoDetail.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DatosPersonales  from "../components/detalleAlumno/DatosPersonales";
import Programa         from "../components/detalleAlumno/Programa";
import Movilidad        from "../components/detalleAlumno/Movilidad";
import BecasSection     from "../components/detalleAlumno/BecasSection";
import DatosAdicionales from "../components/detalleAlumno/DatosAdicionales";

import "../styles/AlumnoDetail.css";

const BASE_URL = "http://localhost/basecambios";

export default function AlumnoDetail() {
  const { codigo } = useParams();
  const navigate    = useNavigate();

  const [alumno, setAlumno] = useState(null);
  const [catalogos, setCatalogos] = useState({
    niveles: [], carreras: [], maestrias: [], doctorados: [],
    sexos: [], tipos_sangre: [], nacionalidades: [],
    tipos_movilidad: [], tipos_destino: [], paises: [], estados: [],
    becas_catalogo: [],
    ciclos: [] // ✅ agregado
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1) Cargar catálogos
  useEffect(() => {
    const endpoints = {
      niveles:         "get_niveles_academicos.php",
      carreras:        "get_carreras.php",
      doctorados:      "get_doctorados.php",
      maestrias:       "get_maestrias.php",
      sexos:           "get_sexos.php",
      tipos_sangre:    "get_tipos_sangre.php",
      nacionalidades:  "get_nacionalidades.php",
      tipos_movilidad: "get_tipos_movilidad.php",
      tipos_destino:   "get_tipos_destino.php",
      paises:          "get_paises.php",
      estados:         "get_estados.php",
      becas_catalogo:  "get_becas_catalogo.php",
      ciclos:          "get_ciclos.php" // ✅ agregado
    };
    Object.entries(endpoints).forEach(([key, file]) => {
      fetch(`${BASE_URL}/${file}`)
        .then(res => res.json())
        .then(data => {
          setCatalogos(c => ({ ...c, [key]: data }));
        })
        .catch(() => {});
    });
  }, []);

  // 2) Cargar datos del alumno
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/get_alumno.php?codigo=${codigo}`)
      .then(async res => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Error al cargar alumno");
        }
        return res.json();
      })
      .then(data => {
        data.becas = Array.isArray(data.becas) ? data.becas : [];
        data.codigo_original = data.codigo;
        setAlumno(data);
      })
      .catch(err => {
        setError(err.message);
        setTimeout(() => navigate("/busqueda"), 3000);
      })
      .finally(() => setLoading(false));
  }, [codigo, navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAlumno(a => ({
      ...a,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleBecaChange = (index, field, value) => {
    setAlumno(a => {
      const becas = [...a.becas];
      becas[index][field] = value;
      return { ...a, becas };
    });
  };

  const addBeca = () => {
    setAlumno(a => ({
      ...a,
      becas: [...a.becas, { tipo: "", nombre: "", monto: "", detalles: "" }]
    }));
  };

  const removeBeca = idx => {
    setAlumno(a => ({
      ...a,
      becas: a.becas.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setError("");
    setSuccess("");
    fetch(`${BASE_URL}/update_alumno.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno)
    })
      .then(async res => {
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); }
        catch { throw new Error(`Respuesta inesperada: ${text}`); }
        if (!res.ok || json.status !== "success") {
          throw new Error(json.error || json.message || text);
        }
        setSuccess(json.message || "Datos actualizados correctamente");
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(err => {
        setError("Error: " + err.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .finally(() => setSaving(false));
  };

  const handleDelete = () => {
    if (!window.confirm("¿Confirma eliminar este alumno?")) return;
    setSaving(true);
    setError("");
    setSuccess("");
    fetch(`${BASE_URL}/delete_alumno.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          setSuccess("Alumno eliminado");
          setTimeout(() => navigate("/busqueda"), 2000);
        } else {
          throw new Error(json.error || json.message);
        }
      })
      .catch(err => {
        setError("Error: " + err.message);
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <div className="alumno-detail"><p>Cargando...</p></div>;

  if (!alumno) {
    return (
      <div className="alumno-detail">
        <div className="alerta-formulario error">
          {error || "Alumno no encontrado. Redirigiendo..."}
        </div>
      </div>
    );
  }

  return (
    <div className="alumno-detail">
      <header className="content-header">
        <h1>Ficha de Alumno</h1>
        <p>Código: {alumno.codigo}</p>
      </header>

      {error && <div className="alerta-formulario error">{error}</div>}
      {success && <div className="alerta-formulario exito">{success}</div>}

      <DatosPersonales
        alumno={alumno}
        onChange={handleChange}
        catalogos={{
          niveles: catalogos.niveles,
          carreras: catalogos.carreras,
          doctorados: catalogos.doctorados,
          maestrias: catalogos.maestrias,
          sexos: catalogos.sexos,
          tipos_sangre: catalogos.tipos_sangre,
          nacionalidades: catalogos.nacionalidades
        }}
      />

      <Programa
        alumno={alumno}
        onChange={handleChange}
        catalogos={{
          programas: catalogos.programas || [],
          estados: catalogos.estados
        }}
      />

      <Movilidad
        alumno={alumno}
        onChange={handleChange}
        catalogos={{
          tiposMovilidad: catalogos.tipos_movilidad,
          tiposDestino: catalogos.tipos_destino,
          paises: catalogos.paises,
          estados: catalogos.estados,
          ciclos: catalogos.ciclos // ✅ agregado
        }}
      />

      <BecasSection
        alumno={alumno}
        onAdd={addBeca}
        onBecaChange={handleBecaChange}
        onRemove={removeBeca}
        catalogo={catalogos.becas_catalogo}
      />

      <DatosAdicionales
        alumno={alumno}
        onChange={handleChange}
      />

      <div className="buttons">
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button className="danger" onClick={handleDelete} disabled={saving}>
          Eliminar Alumno
        </button>
      </div>
    </div>
  );
}
