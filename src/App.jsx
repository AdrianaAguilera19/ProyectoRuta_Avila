import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";
import Navbar from "./components/Navbar";
import Rutes from "./pages/Rutes";
import Conocenos from "./pages/Conocenos";
import Forum from "./components/Forum";

function AppContent() {
  const location = useLocation(); 
  const topic = location.pathname; 
  const [showForum, setShowForum] = useState(false); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/routes" element={<Rutes />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Botón para mostrar/ocultar el foro */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={() => setShowForum(!showForum)}>
          {showForum ? "Cerrar Foro" : "Abrir Foro"}
        </button>
      </div>

      {/* Mostrar el foro solo si el usuario lo abre */}
      {showForum && <Forum topic={topic} />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}