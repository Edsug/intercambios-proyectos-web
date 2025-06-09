import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";
import { BASE_URL } from "../../config"; // Importa la URL base

const Ciclos = () => {
  const [ciclos, setCiclos] = useState([]);
  const [nuevoCiclo, setNuevoCiclo] = useState({ anio: "", ab: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerCiclos = async () => {
    try {
      const res = await fetch(`${BASE_URL}get_ciclos_admin.php`);
      const data = await res.json();
      setCiclos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener ciclos:", err);
    }
  };

  useEffect(() => {
    obtenerCiclos();
  }, []);

  const agregarCiclo = async (e) => {
    e.preventDefault();
    const nombre = `${nuevoCiclo.anio}${nuevoCiclo.ab}`;
    try {
      const res = await fetch(`${BASE_URL}agregar_ciclo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, visible: nuevoCiclo.visible }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoCiclo({ anio: "", ab: "", visible: 1 });
      obtenerCiclos();
    } catch (err) {
      console.error("Error al agregar ciclo:", err);
    }
  };

  const guardarEdicion = async (id) => {
    const cicloOriginal = ciclos.find(c => c.id === id);
    if (!cicloOriginal) return;

    try {
      const res = await fetch(`${BASE_URL}actualizar_ciclo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreAnterior: cicloOriginal.nombre,
          nombre: nuevoNombre,
          visible: nuevaVisibilidad
        }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setEditandoId(null);
      obtenerCiclos();
    } catch (err) {
      console.error("Error al actualizar ciclo:", err);
    }
  };

  const eliminarCiclo = async (id) => {
    const confirmacion = window.confirm("\u26a0\ufe0f ¿Estás seguro de eliminar este ciclo? Esta acción es irreversible.");
    if (!confirmacion) return;

    try {
      const res = await fetch(`${BASE_URL}eliminar_ciclo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerCiclos();
    } catch (err) {
      console.error("Error al eliminar ciclo:", err);
    }
  };

  return (
    <div className="carrera-admin">
      <h3>Agregar Ciclo</h3>
      <form onSubmit={agregarCiclo} className="config-form">
        <div className="form-group">
          <label>Año:</label>
          <input
            type="number"
            min="2010"
            value={nuevoCiclo.anio}
            onChange={(e) => setNuevoCiclo({ ...nuevoCiclo, anio: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Semestre:</label>
          <select
            value={nuevoCiclo.ab}
            onChange={(e) => setNuevoCiclo({ ...nuevoCiclo, ab: e.target.value })}
            required
          >
            <option value="">--</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoCiclo.visible}
            onChange={(e) => setNuevoCiclo({ ...nuevoCiclo, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Ciclo</button>
      </form>

      <h3>Listado de Ciclos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ciclos.map(ciclo => (
            <tr key={ciclo.id}>
              <td>
                {editandoId === ciclo.id ? (
                  <input
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  ciclo.nombre
                )}
              </td>
              <td>
                {editandoId === ciclo.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(ciclo.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(ciclo.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === ciclo.id ? (
                  <>
                    <button onClick={() => guardarEdicion(ciclo.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(ciclo.id);
                        setNuevoNombre(ciclo.nombre);
                        setNuevaVisibilidad(Number(ciclo.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarCiclo(ciclo.id)}
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

export default Ciclos;