import React, { useEffect, useState } from "react";

function DirectorPage() {
  const [empleados, setEmpleados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDni, setEditingDni] = useState(null);
  const [formData, setFormData] = useState({
    dni_empleado: "",
    nombre_empleado: "",
    apellido_empleado: "",
    telefono_empleado: "",
    correo_empleado: "",
    genero_empleado: "M",
    id_rol: "",
    estado_empleado: "Activo",
  });

  const token = localStorage.getItem("token");

  // 🔹 Función de cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // 🔹 Cargar empleados
  const fetchEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login/empleados/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) {
        setError("No tenés permisos para acceder a empleados");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setEmpleados(data);
      setLoading(false);
    } catch {
      setError("Error al cargar empleados");
      setLoading(false);
    }
  };

  // 🔹 Cargar roles
  const fetchRoles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login/roles/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRoles(data);
    } catch {
      setError("Error al cargar roles");
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchEmpleados();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login/empleados/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al registrar empleado");
      const newEmpleado = await res.json();
      setEmpleados([...empleados, newEmpleado]);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (emp) => {
    setEditingDni(emp.dni_empleado);
    setFormData({
      dni_empleado: emp.dni_empleado,
      nombre_empleado: emp.nombre_empleado,
      apellido_empleado: emp.apellido_empleado,
      telefono_empleado: emp.telefono_empleado || "",
      correo_empleado: emp.correo_empleado || "",
      genero_empleado: emp.genero_empleado,
      id_rol: emp.id_rol,
      estado_empleado: emp.estado_empleado,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8000/api/login/empleados/${editingDni}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar empleado");
      await fetchEmpleados();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (dni) => {
    if (!window.confirm("¿Seguro que querés eliminar este empleado?")) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/login/empleados/${dni}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Error al eliminar empleado");
      setEmpleados(empleados.filter((emp) => emp.dni_empleado !== dni));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setEditingDni(null);
    setFormData({
      dni_empleado: "",
      nombre_empleado: "",
      apellido_empleado: "",
      telefono_empleado: "",
      correo_empleado: "",
      genero_empleado: "M",
      id_rol: "",
      estado_empleado: "Activo",
    });
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <h1>Gestión de Empleados</h1>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cerrar Sesión
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Cargando empleados...</p>
      ) : (
        <>
          <h2>{editingDni ? "Editar Empleado" : "Registrar Nuevo Empleado"}</h2>
          <form onSubmit={editingDni ? handleUpdate : handleCreate} style={{ marginBottom: "20px" }}>
            <input type="text" name="dni_empleado" placeholder="DNI" value={formData.dni_empleado} onChange={handleChange} required disabled={!!editingDni} />
            <input type="text" name="nombre_empleado" placeholder="Nombre" value={formData.nombre_empleado} onChange={handleChange} required />
            <input type="text" name="apellido_empleado" placeholder="Apellido" value={formData.apellido_empleado} onChange={handleChange} required />
            <input type="text" name="telefono_empleado" placeholder="Teléfono" value={formData.telefono_empleado} onChange={handleChange} />
            <input type="email" name="correo_empleado" placeholder="Correo" value={formData.correo_empleado} onChange={handleChange} />
            <select name="genero_empleado" value={formData.genero_empleado} onChange={handleChange}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <select name="id_rol" value={formData.id_rol} onChange={handleChange} required>
              <option value="">Seleccionar rol</option>
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</option>
              ))}
            </select> 
            {editingDni && (
              <select
                name="estado_empleado"
                value={formData.estado_empleado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            )}
            <button type="submit">{editingDni ? "Guardar Cambios" : "Registrar"}</button>
            {editingDni && <button type="button" onClick={resetForm}>Cancelar</button>}
          </form>

          <h2>Lista de Empleados</h2>
          {empleados.length === 0 ? (
            <p>No hay empleados registrados</p>
          ) : (
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((emp) => (
                  <tr key={emp.dni_empleado}>
                    <td>{emp.dni_empleado}</td>
                    <td>{emp.nombre_empleado}</td>
                    <td>{emp.apellido_empleado}</td>
                    <td>{emp.rol_nombre}</td>
                    <td>{emp.estado_empleado}</td>
                    <td>
                      <button onClick={() => handleEdit(emp)}>Editar</button>
                      <button onClick={() => handleDelete(emp.dni_empleado)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default DirectorPage;
