import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./paginas/Home";
import Dashboard from "./paginas/Dashboard";
import Registrar from "./paginas/Registrar";
import Visor from "./paginas/VisorMoleculas.jsx";
import ProtectedRoute from "./componentes/ProtectedRoutes.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<Registrar />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visor"
          element={
            <ProtectedRoute>
              <Visor />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
