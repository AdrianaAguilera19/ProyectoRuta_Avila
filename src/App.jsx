import { BrowserRouter, Routes,Route } from "react-router";
import Login from "./pages/Login";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";
import Navbar from "./components/Navbar";
import Rutes from "./pages/Rutes";
export default function App() {
  
  return (
  
    <BrowserRouter>
    <Navbar />
      <Routes>
        
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path= '/routes' element ={<Rutes/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        
      </Routes>
    </BrowserRouter>
  
  )
}