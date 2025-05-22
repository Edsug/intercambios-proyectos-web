import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerActividades = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_tipos_movilidad_admin.php");
      const data = await res.json();
      setActividades(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener actividades:", err);
    }
  };

  useEffect(() => {
    obtenerActividades();
  }, []);

  const agregarActividad = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_tipo_movilidad.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaActividad),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaActividad({ nombre: "", visible: 1 });
      obtenerActividades();
    } catch (err) {
      console.error("Error al agregar actividad:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_tipo_movilidad.php", {
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
      obtenerActividades();
    } catch (err) {
      console.error("Error al actualizar actividad:", err);
    }
  };

  const eliminarActividad = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ Esta acción eliminará la actividad de forma permanente.\n¿Estás completamente seguro?"
    );
    if (!confirmacion) return;

    try {
      const res = await fetch("http://localhost/basecambios/eliminar_tipo_movilidad.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerActividades();
    } catch (err) {
      console.error("Error al eliminar actividad:", err);
    }
  };

  return (
    <div className="actividad-admin">
      <h3>Agregar Actividad</h3>
      <form onSubmit={agregarActividad} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevaActividad.nombre}
            onChange={(e) => setNuevaActividad({ ...nuevaActividad, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevaActividad.visible}
            onChange={(e) => setNuevaActividad({ ...nuevaActividad, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Actividad</button>
      </form>

      <h3>Listado de Actividades</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((act) => (
            <tr key={act.id}>
              <td>
                {editandoId === act.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  act.nombre
                )}
              </td>
              <td>
                {editandoId === act.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(act.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(act.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === act.id ? (
                  <>
                    <button onClick={() => guardarEdicion(act.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(act.id);
                        setNuevoNombre(act.nombre);
                        setNuevaVisibilidad(Number(act.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarActividad(act.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Actividades;
