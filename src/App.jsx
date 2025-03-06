import { BrowserRouter, Routes,Route } from "react-router";
import Login from "./pages/Login";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
  </BrowserRouter>
  )
}