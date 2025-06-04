import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Sexos() {
  const [sexos, setSexos] = useState([]);
  const [nuevoSexo, setNuevoSexo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");

  // Cargar sexos al montar
  useEffect(() => {
    fetch("http://localhost/basecambios/get_sexos_admin.php")
      .then(r => r.json())
      .then(setSexos)
      .catch(() => toast.error("Error al cargar sexos"));
  }, []);

  // Agregar nuevo sexo
  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevoSexo.trim()) return;
    const res = await fetch("http://localhost/basecambios/agregar_sexo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoSexo.trim() })
    });
    const data = await res.json();
    if (data.success) {
      setSexos([...sexos, { id: data.id, nombre: nuevoSexo.trim() }]);
      setNuevoSexo("");
      toast.success("Sexo agregado");
    } else {
      toast.error(data.error || "Error al agregar");
    }
  };

  // Editar sexo
  const handleEditar = (sexo) => {
    setEditId(sexo.id);
    setEditNombre(sexo.nombre);
  };

  const handleGuardar = async (id) => {
    if (!editNombre.trim()) return;
    const res = await fetch("http://localhost/basecambios/actualizar_sexo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre: editNombre.trim() })
    });
    const data = await res.json();
    if (data.success) {
      setSexos(sexos.map(s => s.id === id ? { ...s, nombre: editNombre.trim() } : s));
      setEditId(null);
      setEditNombre("");
      toast.success("Sexo actualizado");
    } else {
      toast.error(data.error || "Error al actualizar");
    }
  };

  // Eliminar sexo
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este sexo?")) return;
    const res = await fetch("http://localhost/basecambios/eliminar_sexo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) {
      setSexos(sexos.filter(s => s.id !== id));
      toast.success("Sexo eliminado");
    } else {
      toast.error(data.error || "Error al eliminar");
    }
  };

  return (
    <div className="config-table-container">
      <h2>Catálogo de Sexos</h2>
      <form onSubmit={handleAgregar} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nuevo sexo"
          value={nuevoSexo}
          onChange={e => setNuevoSexo(e.target.value)}
          maxLength={32}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <table className="config-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sexos.map(sexo => (
            <tr key={sexo.id}>
              <td>{sexo.id}</td>
              <td>
                {editId === sexo.id ? (
                  <input
                    type="text"
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)}
                    maxLength={32}
                    required
                  />
                ) : (
                  sexo.nombre
                )}
              </td>
              <td>
                {editId === sexo.id ? (
                  <>
                    <button onClick={() => handleGuardar(sexo.id)}>Guardar</button>
                    <button onClick={() => setEditId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>

                    <button className="edit-button" onClick={() => handleEditar(sexo)}>Editar</button>
                    <button className="delete-button"onClick={() => handleEliminar(sexo.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {sexos.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>Sin registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}