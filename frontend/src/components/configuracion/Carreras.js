import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Carreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [nuevaCarrera, setNuevaCarrera] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerCarreras = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_carreras_admin.php");
      const data = await res.json();
      setCarreras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener carreras:", err);
    }
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  const agregarCarrera = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_carrera.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCarrera),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevaCarrera({ nombre: "", visible: 1 });
      obtenerCarreras();
    } catch (err) {
      console.error("Error al agregar carrera:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_carrera.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerCarreras();
    } catch (err) {
      console.error("Error al actualizar carrera:", err);
    }
  };

  const eliminarCarrera = async (id) => {
    const confirmacion = window.confirm("⚠️ ¿Estás seguro de eliminar esta carrera? Esta acción es irreversible.");
    if (!confirmacion) return;

    try {
      const res = await fetch("http://localhost/basecambios/eliminar_carreras.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerCarreras();
    } catch (err) {
      console.error("Error al eliminar carrera:", err);
    }
  };

  return (
    <div className="carrera-admin">
      <h3>Agregar Carrera</h3>
      <form onSubmit={agregarCarrera} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevaCarrera.nombre}
            onChange={(e) => setNuevaCarrera({ ...nuevaCarrera, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevaCarrera.visible}
            onChange={(e) => setNuevaCarrera({ ...nuevaCarrera, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Carrera</button>
      </form>

      <h3>Listado de Carreras</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map(carrera => (
            <tr key={carrera.id}>
              <td>
                {editandoId === carrera.id ? (
                  <input
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  carrera.nombre
                )}
              </td>
              <td>
                {editandoId === carrera.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(carrera.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(carrera.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === carrera.id ? (
                  <>
                    <button onClick={() => guardarEdicion(carrera.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(carrera.id);
                        setNuevoNombre(carrera.nombre);
                        setNuevaVisibilidad(Number(carrera.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarCarrera(carrera.id)}
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

export default Carreras;
