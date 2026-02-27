import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Saga from "./pages/saga";
import Movie from "./pages/movie";
import './App.css'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/saga/:name" element={<Saga />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
