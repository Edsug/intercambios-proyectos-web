import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Programas = () => {
  const [programas, setProgramas] = useState([]);
  const [nuevoPrograma, setNuevoPrograma] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerProgramas = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_programas_admin.php");
      const data = await res.json();
      setProgramas(data);
    } catch (err) {
      console.error("Error al obtener programas:", err);
    }
  };

  useEffect(() => {
    obtenerProgramas();
  }, []);

  const agregarPrograma = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_programa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPrograma),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoPrograma({ nombre: "", visible: 1 });
      obtenerProgramas();
    } catch (err) {
      console.error("Error al agregar programa:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_programa.php", {
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
      obtenerProgramas();
    } catch (err) {
      console.error("Error al actualizar programa:", err);
    }
  };

  return (
    <div className="programa-admin">
      <h3>Agregar Programa</h3>
      <form onSubmit={agregarPrograma} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoPrograma.nombre}
            onChange={(e) => setNuevoPrograma({ ...nuevoPrograma, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoPrograma.visible}
            onChange={(e) => setNuevoPrograma({ ...nuevoPrograma, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Programa</button>
      </form>

      <h3>Listado de Programas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((p) => (
            <tr key={p.id}>
              <td>
                {editandoId === p.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  p.nombre
                )}
              </td>
              <td>
                {editandoId === p.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(p.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(p.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === p.id ? (
                  <>
                    <button onClick={() => guardarEdicion(p.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(p.id);
                      setNuevoNombre(p.nombre);
                      setNuevaVisibilidad(Number(p.visible));
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

export default Programas;
