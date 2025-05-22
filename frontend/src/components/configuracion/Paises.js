import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Paises = () => {
  const [paises, setPaises] = useState([]);
  const [nuevoPais, setNuevoPais] = useState({ nombre: "", visible: 1 });
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaVisibilidad, setNuevaVisibilidad] = useState(1);

  const obtenerPaises = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/get_paises_admin.php");
      const data = await res.json();
      setPaises(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al obtener países:", err);
    }
  };

  useEffect(() => {
    obtenerPaises();
  }, []);

  const agregarPais = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_pais.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPais),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      setNuevoPais({ nombre: "", visible: 1 });
      obtenerPaises();
    } catch (err) {
      console.error("Error al agregar país:", err);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch("http://localhost/basecambios/actualizar_pais.php", {
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
      obtenerPaises();
    } catch (err) {
      console.error("Error al actualizar país:", err);
    }
  };

  const eliminarPais = async (id) => {
    const confirmacion = window.confirm(
      "⚠️ Esta acción eliminará el país permanentemente.\n¿Estás completamente seguro?"
    );
    if (!confirmacion) return;

    try {
      const res = await fetch("http://localhost/basecambios/eliminar_paises.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      alert(data.message || data.error || "Error desconocido");
      obtenerPaises();
    } catch (err) {
      console.error("Error al eliminar país:", err);
    }
  };

  return (
    <div className="pais-admin">
      <h3>Agregar País</h3>
      <form onSubmit={agregarPais} className="config-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoPais.nombre}
            onChange={(e) => setNuevoPais({ ...nuevoPais, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Visible:</label>
          <select
            value={nuevoPais.visible}
            onChange={(e) => setNuevoPais({ ...nuevoPais, visible: parseInt(e.target.value) })}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="save-button">Agregar País</button>
      </form>

      <h3>Listado de Países</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Visible</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td>
                {editandoId === pais.id ? (
                  <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                ) : (
                  pais.nombre
                )}
              </td>
              <td>
                {editandoId === pais.id ? (
                  <select
                    value={nuevaVisibilidad}
                    onChange={(e) => setNuevaVisibilidad(parseInt(e.target.value))}
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <span className={`etiqueta ${Number(pais.visible) === 1 ? "etiqueta-si" : "etiqueta-no"}`}>
                    {Number(pais.visible) === 1 ? "Sí" : "No"}
                  </span>
                )}
              </td>
              <td>
                {editandoId === pais.id ? (
                  <>
                    <button onClick={() => guardarEdicion(pais.id)}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditandoId(pais.id);
                        setNuevoNombre(pais.nombre);
                        setNuevaVisibilidad(Number(pais.visible));
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => eliminarPais(pais.id)}
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

export default Paises;
