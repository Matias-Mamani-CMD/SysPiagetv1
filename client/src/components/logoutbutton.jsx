import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.api";
import "../style/logout.css"

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Limpia token y rol
    navigate("/", { replace: true }); //redirige al login
  };

  return (
    <div className="cerrar-sesion">
      <button onClick={handleLogout}>
      Cerrar sesión
    </button>
    </div>
    );
}

export default LogoutButton;
