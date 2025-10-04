import { useNavigate } from "react-router-dom";
import { logoutUser} from "../api/auth.api"; // funciones que borren token y rol
import "../style/logout.css"
function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Limpiar token y rol
    logoutUser();

    // 2. Redirigir al login/menu
    navigate("/", { replace: true });
  };

  return (
    <div className="cerrar-sesion">
      <button onClick={handleLogout}>
      Cerrar sesión
    </button>
    </div>
    );  
}

export default Logout;
