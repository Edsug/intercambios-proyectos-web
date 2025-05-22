// src/components/configuracion/Usuarios.js
import React, { useEffect, useState } from "react";
import BarraSeguridad from "./BarraSeguridad";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre_usuario: "", contrasena: "", cargo: "Asistente" });
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [subTab, setSubTab] = useState("modificar");

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost/basecambios/obtener_usuarios.php");
      const data = await res.json();
      const filtrados = data.filter(u => u.cargo !== 'Administrador');
      setUsuarios(filtrados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleNuevoUsuarioChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const agregarUsuario = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/basecambios/agregar_usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      const data = await res.json();
      alert(data.message);
      setNuevoUsuario({ nombre_usuario: "", contrasena: "", cargo: "Asistente" });
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await fetch("http://localhost/basecambios/eliminar_usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const iniciarEdicion = (usuario) => {
    setEditandoUsuario(usuario);
    setNuevaContrasena("");
  };

  const cancelarEdicion = () => {
    setEditandoUsuario(null);
    setNuevaContrasena("");
  };

  const guardarEdicion = async () => {
    try {
      const payload = {
        ...editandoUsuario,
        nuevaContrasena: nuevaContrasena.trim() !== "" ? nuevaContrasena : undefined,
      };

      const res = await fetch("http://localhost/basecambios/actualizar_usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(data.message);
      setEditandoUsuario(null);
      setNuevaContrasena("");
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al modificar usuario:", error);
    }
  };

  return (
    <div className="user-admin">
      <div className="config-tabs sub-tabs">
        <button className={`config-tab ${subTab === "modificar" ? "active" : ""}`} onClick={() => setSubTab("modificar")}>Modificar / Eliminar Usuario</button>
        <button className={`config-tab ${subTab === "agregar" ? "active" : ""}`} onClick={() => setSubTab("agregar")}>Agregar Usuario</button>
      </div>

      {subTab === "modificar" && (
        <>
          <h3>Usuarios Registrados</h3>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Cargo</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id}>
                  <td>{editandoUsuario?.id === user.id ? (
                    <input type="text" value={editandoUsuario.nombre_usuario} onChange={(e) => setEditandoUsuario({ ...editandoUsuario, nombre_usuario: e.target.value })} />
                  ) : user.nombre_usuario}</td>
                  <td>{editandoUsuario?.id === user.id ? (
                    <select value={editandoUsuario.cargo} onChange={(e) => setEditandoUsuario({ ...editandoUsuario, cargo: e.target.value })}>
                      <option value="Asistente">Asistente</option>
                      <option value="Supervisor">Supervisor</option>
                    </select>
                  ) : user.cargo}</td>
                  <td>{editandoUsuario?.id === user.id ? (
                    <>
                      <input type="password" placeholder="Nueva contraseña" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} />
                      <BarraSeguridad password={nuevaContrasena} />
                    </>
                  ) : "••••••"}</td>
                  <td>
                    {editandoUsuario?.id === user.id ? (
                      <>
                        <button onClick={guardarEdicion} className="save-button">Guardar</button>
                        <button onClick={cancelarEdicion} className="cancel-button">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => iniciarEdicion(user)} className="edit-button">Editar</button>
                        <button onClick={() => eliminarUsuario(user.id)} className="delete-button">Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {subTab === "agregar" && (
        <>
          <h3>Agregar Usuario</h3>
          <form onSubmit={agregarUsuario} className="config-form">
            <div className="form-group">
              <label>Usuario:</label>
              <input type="text" name="nombre_usuario" value={nuevoUsuario.nombre_usuario} onChange={handleNuevoUsuarioChange} required />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input type="password" name="contrasena" value={nuevoUsuario.contrasena} onChange={handleNuevoUsuarioChange} required />
              <BarraSeguridad password={nuevoUsuario.contrasena} />
            </div>
            <div className="form-group">
              <label>Cargo:</label>
              <select name="cargo" value={nuevoUsuario.cargo} onChange={handleNuevoUsuarioChange}>
                <option value="Asistente">Asistente</option>
                <option value="Administrador consulta">Supervisor</option>
              </select>
            </div>
            <button type="submit" className="save-button">Agregar Usuario</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Usuarios;
