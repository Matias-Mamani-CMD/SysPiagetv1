function Advertencia({ mostrar }) {
  if (!mostrar) {
    return null;
  }
  return <p style={{ color: "red" }}>Advertencia importante</p>;
}

{isLoggedIn ? <h2>Bienvenido</h2> : <button>Iniciar Sesión</button>}

{isLoading ? <p>Cargando...</p> : <DatosUsuario />}


{status === "success" && <p style={{color:"green"}}>Acción exitosa </p>}
{status === "error" && <p style={{color:"red"}}>Hubo un error </p>}
