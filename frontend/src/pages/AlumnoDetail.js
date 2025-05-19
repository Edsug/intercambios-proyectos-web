import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatosPersonales   from "../components/DatosPersonales";
import Programa          from "../components/Programa";
import Movilidad         from "../components/Movilidad";
import BecasSection      from "../components/BecasSection";
import DatosAdicionales  from "../components/DatosAdicionales";
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
        .catch(console.error);
    });
  },[]);

  // 2) Cargar alumno
  useEffect(()=>{
    fetch(`${BASE}/get_alumno.php?codigo=${codigo}`)
      .then(r=>{
        if(!r.ok) throw new Error("No encontrado");
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
        alert(e.message);
        navigate("/");
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
        catch{ throw new Error(`Respuesta no JSON: ${text}`); }
        if (res.ok && json.status==="success") {
          alert("✔️ " + json.message);
        } else {
          throw new Error(json.error || json.message || text);
        }
      })
      .catch(err=>alert("Error: "+err.message))
      .finally(()=>setSaving(false));
  };

  // 5) Eliminar
  const handleDelete = () => {
    if(!window.confirm("¿Eliminar este alumno?")) return;
    fetch(`${BASE}/delete_alumno.php`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ codigo })
    })
    .then(r=>r.json())
    .then(j=>{
      if(j.status==="success"){
        alert("Eliminado 👍");
        navigate("/");
      } else {
        alert("Error: "+j.error||j.message);
      }
    })
    .catch(e=>alert("Error red: "+e.message));
  };

  if (loading) return <p>Cargando alumno…</p>;
  if (!alumno)  return <p>Alumno no encontrado.</p>;

  return (
    <div className="alumno-detail">
      <h1>Ficha de Alumno {alumno.codigo}</h1>
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
      <DatosAdicionales alumno={alumno} onChange={handleChange}/>
      <div className="buttons">
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Guardando…" : "Guardar Cambios"}
        </button>
        <button onClick={handleDelete} className="danger">
          Eliminar Alumno
        </button>
      </div>
    </div>
  );
}
