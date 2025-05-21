import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatosPersonales   from "../components/busqueda/DatosPersonales";
import Programa          from "../components/busqueda/Programa";
import Movilidad         from "../components/busqueda/Movilidad";
import BecasSection      from "../components/busqueda/BecasSection";
import DatosAdicionales  from "../components/busqueda/DatosAdicionales";
import "../styles/AlumnoDetail.css";

const BASE = "http://localhost/basecambios";

export default function AlumnoDetail() {
  const { codigo } = useParams();
  const navigate    = useNavigate();
  const [alumno, setAlumno]     = useState(null);
  const [catalogos, setCatalogos] = useState({
    carreras:[], maestrias:[], nacionalidades:[], niveles:[],
    paises:[], estados:[], estados_geo:[],
    programas:[], sexos:[], tiposDestino:[],
    tiposMovilidad:[], tiposSangre:[], catalogoBecas:[]
  });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1) Cargar catálogos
  useEffect(()=>{
    const eps = [
      ["carreras","get_carreras.php"],
      ["maestrias","get_maestrias.php"],
      ["nacionalidades","get_nacionalidades.php"],
      ["niveles","get_niveles_academicos.php"],
      ["paises","get_paises.php"],
      ["estados","get_estados.php"],
      ["estados_geo","get_estadogeo.php"],
      ["programas","get_programas.php"],
      ["sexos","get_sexos.php"],
      ["tiposDestino","get_tipos_destino.php"],
      ["tiposMovilidad","get_tipos_movilidad.php"],
      ["tiposSangre","get_tipos_sangre.php"],
      ["catalogoBecas","get_becas.php"]
    ];
    eps.forEach(([k,f])=>{
      fetch(`${BASE}/${f}`)
        .then(r=>r.json())
        .then(data=>setCatalogos(c=>({...c,[k]:data})))
        .catch(err => {
          console.error("Error cargando catálogo", k, err);
          setError(`Error cargando catálogo ${k}`);
        });
    });
  },[]);

  // 2) Cargar alumno
  useEffect(()=>{
    fetch(`${BASE}/get_alumno.php?codigo=${codigo}`)
      .then(r=>{
        if(!r.ok) throw new Error("Alumno no encontrado");
        return r.json();
      })
      .then(data=>{
        if(data.error) throw new Error(data.error);
        const becas = data.detalle_becas
          ? data.detalle_becas.split("; ").map(item => {
              const [tp,amt] = item.split(" ($");
              const [tipo,nombre] = tp.split(": ");
              return { tipo, nombre, monto: amt?.replace(")","")||"" };
            })
          : [];
        setAlumno({...data, becas});
      })
      .catch(e=>{
        setError(e.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .finally(()=>setLoading(false));
  },[codigo,navigate]);

  // 3) Handlers genéricos
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setAlumno(a=>({
      ...a,
      [name]: type==="checkbox" ? checked : value
    }));
  };
  
  const handleBecaChange = (i,field,val) => {
    setAlumno(a=>{
      const b = [...a.becas];
      b[i][field] = val;
      return {...a, becas:b};
    });
  };
  
  const addBeca = () => setAlumno(a=>({
    ...a,
    becas:[...a.becas,{tipo:"",nombre:"",monto:""}]
  }));
  
  const removeBeca = i => setAlumno(a=>({
    ...a,
    becas:a.becas.filter((_,j)=>j!==i)
  }));

  // 4) Guardar
  const handleSave = () => {
    setSaving(true);
    setError("");
    setSuccess("");
    
    const detalle_becas = alumno.becas
      .map(b=>`${b.tipo}: ${b.nombre} ($${b.monto})`)
      .join("; ");
    const payload = { ...alumno, detalle_becas };
    delete payload.becas;

    fetch(`${BASE}/update_alumno.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async res=>{
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); }
        catch{ throw new Error(`Respuesta no válida: ${text}`); }
        
        if (res.ok && json.status==="success") {
          setSuccess(json.message || "Información actualizada correctamente");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          throw new Error(json.error || json.message || text);
        }
      })
      .catch(err => {
        setError("Error: " + err.message);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .finally(()=>setSaving(false));
  };

  // 5) Eliminar
  const handleDelete = () => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este alumno? Esta acción no se puede deshacer.")) return;
  
    setSaving(true);
    setError("");
    setSuccess("");
  
    fetch(`${BASE}/delete_alumno.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo })
    })
      .then(r => r.json())
      .then(j => {
        if (j.status === "success") {
          setSuccess("Alumno eliminado correctamente");
          setTimeout(() => {
            navigate("/busqueda");  // 🔁 Aquí redirige a la página de búsqueda
          }, 2000);
        } else {
          setError("Error: " + (j.error || j.message));
        }
      })
      .catch(e => setError("Error de conexión: " + e.message))
      .finally(() => setSaving(false));
  };
  
  if (loading) return (
    <div className="alumno-detail">
      <div className="loading">Cargando información del alumno</div>
    </div>
  );
  
  if (!alumno) return (
    <div className="alumno-detail">
      <div className="alerta-formulario error">
        Alumno no encontrado. Redirigiendo...
      </div>
    </div>
  );

  return (
    <div className="alumno-detail">
      <div className="content-header">
        <h1>Ficha de Alumno</h1>
        <p>Información detallada del alumno con código: {alumno.codigo}</p>
      </div>
      
      {error && (
        <div className="alerta-formulario error">
          {error}
        </div>
      )}
      
      {success && (
        <div className="alerta-formulario exito">
          {success}
        </div>
      )}
      
      <DatosPersonales
        alumno={alumno}
        onChange={handleChange}
        catalogos={catalogos}
      />
      
      <Programa
        alumno={alumno}
        onChange={handleChange}
        catalogos={catalogos}
      />
      
      <Movilidad
        alumno={alumno}
        onChange={handleChange}
        catalogos={catalogos}
      />
      
      <BecasSection
        alumno={alumno}
        onAdd={addBeca}
        onBecaChange={handleBecaChange}
        onRemove={removeBeca}
      />
      
      <DatosAdicionales 
        alumno={alumno} 
        onChange={handleChange}
      />
      
      <div className="buttons">
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="save-btn"
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button 
          onClick={handleDelete} 
          disabled={saving}
          className="danger"
        >
          Eliminar Alumno
        </button>
      </div>
    </div>
  );
}