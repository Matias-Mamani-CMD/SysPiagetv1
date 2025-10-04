import React, { useEffect, useState } from "react";
import "../style/perfil.css";
import Navbar from "./navbar";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(user);
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
      {/* Logo */}
      <div className="logo-perf">
        <img src="https://iili.io/KTpR0j1.png" alt="Instituto Jean Piaget" />
      </div>

      {/* Nombre instituto */}
      <div>
              <b className="instituto">Instituto  </b>
              <b className="jeanpiaget">Jean Piaget </b> 
              <b className="nro">Nº8048</b>
            </div>
      </div>
      <div className="nivel">
            <span>Nivel: secundario</span>
        </div>
      {/* Perfil + Logout */}
      <div className="usuario">
        <span>{usuario ? `Perfil: ${usuario.username}` : "Invitado"}</span>
        <Navbar />
      </div>
    </header>
  );
}

export default Perfil;
