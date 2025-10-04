import React from "react";
import Final from "./final";
import "../style/SecretarioCss/home.css";

function Home() {
  return (
    <div>
      <div className="saludo">
          <h2>Bienvenido al Instituto Jean Piaget</h2>
          <p>Brindamos educación secundaria de calidad.</p>
      </div>
      <div id="mover">
            <a href="/ListaAlumno-create" className="boton">Registrar Estudiante</a>  
            <a href="/ListaAlumno" className="boton">Modificar Alumno</a>
      </div>
      <Final />
    </div>
  );
}

export default Home;
