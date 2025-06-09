import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Doctorados = () => {
  const [doctorados, setDoctorados] = useState([]);
  const [nuevoDoctorado, setNuevoDoctorado] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerDoctorados = async () => {
    try {
      const res = await fetch(`${BASE_URL}get_doctorados_admin.php`);
      const data = await res.json();
      setDoctorados(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener doctorados:", err);
    }
  };

  useEffect(() => {
    obtenerDoctorados();
  }, []);

  const agregarDoctorado = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}agregar_doctorado.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoDoctorado),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoDoctorado({ nombre: "", visible: 1 });
      obtenerDoctorados();
    } catch (err) {
      console.error("Error al agregar doctorado:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}actualizar_doctorado.php`, {
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
      obtenerDoctorados();
    } catch (err) {
      console.error("Error al actualizar doctorado:", err);
    }
  };

  const eliminarDoctorado = async (id) => {
    const confirmacion = window.confirm("⚠️ ¿Estás seguro de eliminar este doctorado? Esta acción es irreversible.");
    if (!confirmacion) return;

    try {
      const res = await fetch(`${BASE_URL}eliminar_doctorado.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerDoctorados();
    } catch (err) {
      console.error("Error al eliminar doctorado:", err);
    }
  };

  return (
    <div className="carrera-admin">
      <h3>Agregar Doctorado</h3>
      <form onSubmit={agregarDoctorado} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoDoctorado.nombre}
            onChange={(e) => setNuevoDoctorado({ ...nuevoDoctorado, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoDoctorado.visible}
            onChange={(e) => setNuevoDoctorado({ ...nuevoDoctorado, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Doctorado</button>
      </form>

      <h3>Listado de Doctorados</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {doctorados.map(doctorado => (
            <tr key={doctorado.id}>
              <td>
                {editandoId === doctorado.id ? (
                  <input
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  doctorado.nombre
                )}
              </td>
              <td>
                {editandoId === doctorado.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(doctorado.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(doctorado.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === doctorado.id ? (
                  <>
                    <button onClick={() => guardarEdicion(doctorado.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(doctorado.id);
                        setNuevoNombre(doctorado.nombre);
                        setNuevaVisibilidad(Number(doctorado.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarDoctorado(doctorado.id)}
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

export default Doctorados;
