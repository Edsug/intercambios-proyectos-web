import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Nacionalidades = () => {
  const [nacionalidades, setNacionalidades] = useState([]);
  const [nuevaNacionalidad, setNuevaNacionalidad] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerNacionalidades = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_nacionalidades_admin.php");
      const data = await res.json();
      setNacionalidades(data);
    } catch (err) {
      console.error("Error al obtener nacionalidades:", err);
    }
  };

  useEffect(() => {
    obtenerNacionalidades();
  }, []);

  const agregarNacionalidad = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_nacionalidad.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaNacionalidad),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaNacionalidad({ nombre: "", visible: 1 });
      obtenerNacionalidades();
    } catch (err) {
      console.error("Error al agregar nacionalidad:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_nacionalidad.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad,
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerNacionalidades();
    } catch (err) {
      console.error("Error al actualizar nacionalidad:", err);
    }
  };

  return (
    <div className="nacionalidad-admin">
      <h3>Agregar Nacionalidad</h3>
      <form onSubmit={agregarNacionalidad} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevaNacionalidad.nombre}
            onChange={(e) => setNuevaNacionalidad({ ...nuevaNacionalidad, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevaNacionalidad.visible}
            onChange={(e) => setNuevaNacionalidad({ ...nuevaNacionalidad, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Nacionalidad</button>
      </form>

      <h3>Listado de Nacionalidades</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {nacionalidades.map((n) => (
            <tr key={n.id}>
              <td>
                {editandoId === n.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  n.nombre
                )}
              </td>
              <td>
                {editandoId === n.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(n.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(n.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === n.id ? (
                  <>
                    <button onClick={() => guardarEdicion(n.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(n.id);
                      setNuevoNombre(n.nombre);
                      setNuevaVisibilidad(Number(n.visible));
                    }}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Nacionalidades;
