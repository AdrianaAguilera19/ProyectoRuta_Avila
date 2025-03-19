import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound"; // Asegúrate de que el nombre del archivo sea correcto
import Navbar from "./components/Navbar";
import Rutes from "./pages/Rutes";
import Conocenos from "./pages/Conocenos";
import RutaDetalles from "./pages/RutaDetalles";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Calendario from "./pages/Calendario";

import Galeria from './pages/Galeria';

import ExploraAprende from "./pages/ExploraAprende";


export default function App() {
  return (
    <PayPalScriptProvider options={{ clientId: "AcSpzb5TqZYoNKDCXzrtCbJ8-KAGQW-HhAyDS9WUBCeNdjoSZq_AP1G0ypieXWM0181spQjyf-yjIefu" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/routes" element={<Rutes />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/ruta/:id" element={<RutaDetalles />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/routes' element={<Rutes />} />
          <Route path='/conocenos' element={<Conocenos />} />
          <Route path='/ruta/:id' element={<RutaDetalles />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path = '/explora-aprende' element={<ExploraAprende />} />
          <Route path = '/calendario' element={<Calendario />} />
          <Route path="/ruta/:id" element={<RutaDetalles />} />

        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}