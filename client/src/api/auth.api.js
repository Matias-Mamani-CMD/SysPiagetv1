import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Cliente Axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para enviar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para manejar refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("token", res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          logoutUser(); // si falla refresh, cerrar sesión
          return Promise.reject(err);
        }
      }
    }

    const customError =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Error de conexión con el servidor";
    return Promise.reject(new Error(customError));
  }
);

// ----- Funciones -----

export const loginUser = async (dni, password) => {
  const response = await api.post("/login/login/", { dni, password });
  return response.data;
};

export const registerUser = async (name, dni, password) => {
  const response = await api.post("/login/register/", { nombre: name, dni, password });
  return response.data;
};

export const saveUserData = (data) => {
  if (data.access) localStorage.setItem("token", data.access);
  if (data.refresh) localStorage.setItem("refresh", data.refresh);
  if (data.rol) localStorage.setItem("rol", data.rol.toLowerCase());
  if (data.username) localStorage.setItem("name", data.username);
};

export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("rol");

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("rol");
  localStorage.removeItem("name");
};

export default api;
