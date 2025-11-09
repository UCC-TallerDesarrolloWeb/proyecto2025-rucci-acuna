
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "@styles/Home.scss"; 

const Home = () => {
  useEffect(() => {
    document.title = "BRÚJULA - Agencia de viajes | Inicio";
  }, []);

  return (
    <main id="main">
      <section className="hero" aria-label="Presentación BRÚJULA">
        <video
          className="hero-video"
          src="/imagenes/videofondo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="hero-content wrap">
          <div className="logo" aria-label="Brújula - Agencia de viajes">
            <img
              src="/imagenes/logo.png"
              alt="Logo de BRÚJULA"
              width="90"
              height="90"
            />
            <div className="logo-title">BRÚJULA</div>
            <div className="logo-sub">Agencia de viajes</div>
          </div>

          <h1 className="hero-title">
            Es hora de tu <span className="strong">próxima aventura</span>
          </h1>
          <p className="hero-sub">Dejanos planearlo para vos</p>

          <div className="cta" role="group" aria-label="Acciones principales">
            <Link className="btn" to="/destinos">Destinos</Link>
            <Link className="btn" to="/itinerario">Itinerario</Link>
            <Link className="btn" to="/contacto">Contacto</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
