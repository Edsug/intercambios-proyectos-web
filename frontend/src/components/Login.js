import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logoImg from "../assets/LetrasCu.png";
import loginIllustration from "../assets/Traveling2.svg"; 

const Login = ({ setIsAuthenticated }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (usuario.trim() === "") {
      setError("Ingrese un nombre de usuario válido.");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/basecambios/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_usuario: usuario, contrasena: password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setIsAuthenticated(true);
        localStorage.setItem("cargo", data.user.cargo); // Guardar el cargo
        navigate("/dashboard");
      } else {
        setError(data.message || "Credenciales incorrectas. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      setError("Error en la conexión con el servidor. Por favor, intente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-info">
          <h1>Bienvenido</h1>
          <p>Accede a todos los recursos de nuestra plataforma</p>
          <div className="illustration-container">
            <img src={loginIllustration} alt="Ilustración de login" />
          </div>
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img src={logoImg} alt="Logo" />
          </div> 
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
