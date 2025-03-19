import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";
import Navbar from "./components/Navbar";
import Rutes from "./pages/Rutes";
import Conocenos from "./pages/Conocenos";
import RutaDetalles from "./pages/RutaDetalles";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ExploraAprende from "./pages/ExploraAprende";
import AccountSettings from "./pages/PerfilUsuario";
import Galeria from './pages/Galeria';
import FeedbackSection from './pages/FeedbackSection';

export default function App() {
  return (
    <PayPalScriptProvider options={{ clientId: "AcSpzb5TqZYoNKDCXzrtCbJ8-KAGQW-HhAyDS9WUBCeNdjoSZq_AP1G0ypieXWM0181spQjyf-yjIefu" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/routes' element={<Rutes />} />
          <Route path='/conocenos' element={<Conocenos />} />
          <Route path='/ruta/:id' element={<RutaDetalles />} />
          <Route path = '/explora-aprende' element={<ExploraAprende />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path="/perfil" element={<AccountSettings />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/feedback" element={<FeedbackSection />} />        
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}