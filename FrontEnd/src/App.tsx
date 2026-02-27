import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Saga from './pages/saga';
import Movie from './pages/movie';  // Importa el componente, no el tipo
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saga/:name" element={<Saga />} />
        <Route path="/movie/:id" element={<Movie />} /> {/* Aquí Movie es un componente React */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;