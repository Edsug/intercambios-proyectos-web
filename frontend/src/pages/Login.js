import React from "react";
import "../styles/Login.css"; // Importar el CSS

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña" required />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
