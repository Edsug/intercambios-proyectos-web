import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Maestrias = () => {
  const [maestrias, setMaestrias] = useState([]);
  const [nuevaMaestria, setNuevaMaestria] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerMaestrias = async () => {
    try {
      const res = await fetch(`${BASE_URL}get_maestrias_admin.php`);
      const data = await res.json();
      setMaestrias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener maestrías:", err);
    }
  };

  useEffect(() => {
    obtenerMaestrias();
  }, []);

  const agregarMaestria = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}agregar_maestria.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaMaestria),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaMaestria({ nombre: "", visible: 1 });
      obtenerMaestrias();
    } catch (err) {
      console.error("Error al agregar maestría:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}actualizar_maestria.php`, {
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
      obtenerMaestrias();
    } catch (err) {
      console.error("Error al actualizar maestría:", err);
    }
  };

  const eliminarMaestria = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ Esta acción eliminará permanentemente esta maestría.\n¿Estás seguro que deseas continuar?"
    );
    if (!confirmacion) return;

    try {
      const res = await fetch(`${BASE_URL}eliminar_maestrias.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerMaestrias();
    } catch (err) {
      console.error("Error al eliminar maestría:", err);
    }
  };

  return (
    <div className="maestria-admin">
      <h3>Agregar Maestría</h3>
      <form onSubmit={agregarMaestria} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevaMaestria.nombre}
            onChange={(e) => setNuevaMaestria({ ...nuevaMaestria, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevaMaestria.visible}
            onChange={(e) => setNuevaMaestria({ ...nuevaMaestria, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Maestría</button>
      </form>

      <h3>Listado de Maestrías</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {maestrias.map((m) => (
            <tr key={m.id}>
              <td>
                {editandoId === m.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  m.nombre
                )}
              </td>
              <td>
                {editandoId === m.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(m.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(m.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === m.id ? (
                  <>
                    <button onClick={() => guardarEdicion(m.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(m.id);
                        setNuevoNombre(m.nombre);
                        setNuevaVisibilidad(Number(m.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarMaestria(m.id)}
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

export default Maestrias;
