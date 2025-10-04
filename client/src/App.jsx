import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRouter";
import DirectorPage from "./pages/DirectorPage";

// Páginas de ejemplo (solo las que no tenés todavía)
const SecretarioPage = () => <div><h1>Bienvenido Secretario</h1></div>;
const ProfesorPage = () => <div><h1>Bienvenido Profesor</h1></div>;
const RectorPage = () => <div><h1>Bienvenido Rector</h1></div>;
const TutorPage = () => <div><h1>Bienvenido Tutor</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas privadas según rol */}
        <Route
          path="/director"
          element={
            <PrivateRouter role="director">
              <DirectorPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/secretario"
          element={
            <PrivateRouter role="secretario">
              <SecretarioPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/profesor"
          element={
            <PrivateRouter role="profesor">
              <ProfesorPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/rector"
          element={
            <PrivateRouter role="rector">
              <RectorPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/tutor"
          element={
            <PrivateRouter role="tutor">
              <TutorPage />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
