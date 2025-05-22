import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Estados = () => {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerEstados = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_estados_admin.php");
      const data = await res.json();
      setEstados(data);
    } catch (err) {
      console.error("Error al obtener estados:", err);
    }
  };

  useEffect(() => {
    obtenerEstados();
  }, []);

  const agregarEstado = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_estado.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEstado),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoEstado({ nombre: "", visible: 1 });
      obtenerEstados();
    } catch (err) {
      console.error("Error al agregar estado:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_estado.php", {
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
      obtenerEstados();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  return (
    <div className="estado-admin">
      <h3>Agregar Estado</h3>
      <form onSubmit={agregarEstado} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoEstado.nombre}
            onChange={(e) => setNuevoEstado({ ...nuevoEstado, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoEstado.visible}
            onChange={(e) => setNuevoEstado({ ...nuevoEstado, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Estado</button>
      </form>

      <h3>Listado de Estados</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.id}>
              <td>
                {editandoId === estado.id ? (
                  <input
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  estado.nombre
                )}
              </td>
              <td>
                {editandoId === estado.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(estado.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(estado.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === estado.id ? (
                  <>
                    <button onClick={() => guardarEdicion(estado.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(estado.id);
                      setNuevoNombre(estado.nombre);
                      setNuevaVisibilidad(Number(estado.visible));
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

export default Estados;
