import React from "react";
import "../style/SecretarioCss/confirmacio.css";

function SuccessModal({ visible, message = "¡Finalizado con éxito!", onClose }) {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2 id="mensaje">{message}</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default SuccessModal;