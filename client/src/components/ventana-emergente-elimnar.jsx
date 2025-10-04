import React from "react";
import "../style/SecretarioCss/confirmacio.css";

function Ventana_Emergente_Eliminar({ visible, message = "¿Desea eliminar?", onClose }) {
  if (!visible) return null;
  return (
    <div className="overlay">
      <div className="modal">
        <h2 id="mensaje">{message}</h2>
        <button onClick={onClose}>Eliminar</button>
        <button onClick={onClose} id="btn-eliminar">Cancelar</button>
      </div>
    </div>
  );
}
export default Ventana_Emergente_Eliminar;