import { useState, useEffect } from "react";
import { getToken } from "../api/auth.api";
import LogoutButton from "./logoutbutton";

function Navbar() {
  const [token, setToken] = useState(getToken());

  // Escucha cambios en localStorage para actualizar el estado
  useEffect(() => {
    const handleStorageChange = () => setToken(getToken());
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav>
      {token && <LogoutButton />}
    </nav>
  );
}

export default Navbar;
