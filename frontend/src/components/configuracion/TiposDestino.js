import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const TiposDestino = () => {
  const [destinos, setDestinos] = useState([]);
  const [nuevoDestino, setNuevoDestino] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerDestinos = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_tipos_destino_admin.php");
      const data = await res.json();
      setDestinos(data);
    } catch (err) {
      console.error("Error al obtener tipos de destino:", err);
    }
  };

  useEffect(() => {
    obtenerDestinos();
  }, []);

  const agregarDestino = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_tipo_destino.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoDestino),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoDestino({ nombre: "", visible: 1 });
      obtenerDestinos();
    } catch (err) {
      console.error("Error al agregar destino:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_tipo_destino.php", {
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
      obtenerDestinos();
    } catch (err) {
      console.error("Error al actualizar destino:", err);
    }
  };

  return (
    <div className="tipos-destino-admin">
      <h3>Agregar Tipo de Destino</h3>
      <form onSubmit={agregarDestino} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoDestino.nombre}
            onChange={(e) => setNuevoDestino({ ...nuevoDestino, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoDestino.visible}
            onChange={(e) => setNuevoDestino({ ...nuevoDestino, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar Tipo</button>
      </form>

      <h3>Listado de Tipos de Destino</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {destinos.map((d) => (
            <tr key={d.id}>
              <td>
                {editandoId === d.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  d.nombre
                )}
              </td>
              <td>
                {editandoId === d.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(d.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(d.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === d.id ? (
                  <>
                    <button onClick={() => guardarEdicion(d.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(d.id);
                      setNuevoNombre(d.nombre);
                      setNuevaVisibilidad(Number(d.visible));
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

export default TiposDestino;
