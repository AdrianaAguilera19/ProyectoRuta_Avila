import { BrowserRouter, Routes,Route } from "react-router";
import Login from "./pages/Login";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";
import Navbar from "./components/Navbar";
import Rutes from "./pages/Rutes";
import Reserva from "./pages/Reserva";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App() {
  return (
    <PayPalScriptProvider options={{ clientId: "AcSpzb5TqZYoNKDCXzrtCbJ8-KAGQW-HhAyDS9WUBCeNdjoSZq_AP1G0ypieXWM0181spQjyf-yjIefu" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/routes' element={<Rutes />} />
          <Route path='/reserva' element={<Reserva />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}