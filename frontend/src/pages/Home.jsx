import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import "@styles/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "BRÚJULA - Agencia de viajes | Inicio";
  }, []);

  return (
    <section className="hero" aria-label="Presentación BRÚJULA">
      <video className="hero-video" src="imagenes/videofondo.mp4" autoPlay muted loop playsInline />
      <div className="hero-overlay" aria-hidden="true" />

      <header className="hero-content wrap">
        <div className="logo">
          <img src="imagenes/logo.png" alt="Logo de BRÚJULA" width="90" height="90" />
          <div className="logo-title">BRÚJULA</div>
          <div className="logo-sub">Agencia de viajes</div>
        </div>

        <h1 className="hero-title">
          Es hora de tu <span className="strong">próxima aventura</span>
        </h1>
        <p className="hero-sub">Dejanos planearlo para vos</p>

        <div className="cta">
          <Button onClick={() => navigate("/destinos")}>Destinos</Button>
          <Button onClick={() => navigate("/itinerario")}>Itinerario</Button>
          <Button onClick={() => navigate("/contacto")}>Contacto</Button>
        </div>
      </header>
    </section>
  );
};

export default Home;
