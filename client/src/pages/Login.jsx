import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveUserData } from "../api/auth.api";
import "../style/login.css";
import showIcon from "../style/logos_e_imagenes/show.png";
import hideIcon from "../style/logos_e_imagenes/hidden.png";

function Login({ onSuccess }) {
  const navigate = useNavigate();

  // Login
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // ----- Login -----
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // limpiar mensaje

    try {
      const data = await loginUser(dni, password);

      if (!data.access) {
        setMessage("No se recibió token. Revisar credenciales.");
        return;
      }

      // Guardar access y refresh tokens
      saveUserData(data);

      const rol = (data.rol || "").toLowerCase();
      if (!rol) {
        setMessage("No se pudo determinar el rol del usuario");
        return;
      }

      switch (rol) {
        case "tutor": navigate("/tutor"); break;
        case "secretario": navigate("/secretario"); break;
        case "profesor": navigate("/profesor"); break;
        case "director": navigate("/director"); break;
        case "rector": navigate("/rector"); break;
        default: setMessage("Rol desconocido: " + rol);
      }

      onSuccess && onSuccess();
    } catch (error) {
      setMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-row">
        {/* Columna izquierda */}
        <div className="login-left">
          <div className="login-institute">
            <img
              src="https://iili.io/KTpR0j1.png"
              alt="Logo Instituto"
              className="logo"
            />
            <h2>Instituto Jean Piaget</h2>
            <p className="institute-number">N°8048</p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="login-right">
          <div className="login-header">INICIAR SESIÓN</div>

          {message && <p className="message">{message}</p>}

          <form onSubmit={handleLogin} className="login-form">
            <label>USUARIO</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? showIcon : hideIcon}
                  alt={showPassword ? "Mostrar" : "Ocultar"}
                  className={"eye-icon" + (showPassword ? " show " : "")}
                />
              </button>
            </div>

            <button type="submit" className="btn-red">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
