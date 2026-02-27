import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="hero">
        <h1>¿Qué vamos a ver hoy?</h1>
        <p>Explora nuestro catálogo de películas y disfruta de tus sagas favoritas</p>
      </div>

      <div className="grid grid-2 flex-center" style={{ gap: "40px" }}>
        <div 
          className="movie-card" 
          onClick={() => navigate("/saga/harry-potter")}
          style={{ maxWidth: "300px" }}
        >
          <img 
            src="https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg" 
            alt="Harry Potter" 
          />
          <div className="content">
            <h4>Harry Potter</h4>
            <p style={{ fontSize: "14px", color: "#a0a0a0" }}>
              La magia espera...
            </p>
          </div>
        </div>

        <div 
          className="movie-card" 
          onClick={() => navigate("/saga/crepusculo")}
          style={{ maxWidth: "300px" }}
        >
          <img 
            src="https://cdn.milenio.com/uploads/media/2022/10/31/crepusculo-especial.jpg" 
            alt="Crepúsculo" 
          />
          <div className="content">
            <h4>Crepúsculo</h4>
            <p style={{ fontSize: "14px", color: "#a0a0a0" }}>
              Amor eterno...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
