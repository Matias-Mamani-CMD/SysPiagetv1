import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole, logoutUser, default as api } from "../api/auth.api";

function PrivateRouter({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

useEffect(() => {
  const validateToken = async () => {
    try {
      await api.get("/login/auth/check/"); // Llama al endpoint que creamos
      const userRole = (getUserRole() || "").toLowerCase();
      if (!role || role.toLowerCase() === userRole) setIsValid(true);
    } catch (err) {
      logoutUser(); // token inválido → limpiar storage
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };
  validateToken();
}, [role]);

  if (loading) return <div>Cargando...</div>;
  if (!isValid) return <Navigate to="/" replace />;

  return children;
}

export default PrivateRouter;
