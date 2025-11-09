
import { useEffect } from "react";

const Itinerario = () => {
  useEffect(() => {
    document.title = "BRÚJULA - Itinerario";
    window.scrollTo(0, 0);

    if (typeof window !== "undefined" && typeof window.initItinerario === "function") {
      window.initItinerario();
    }
  }, []);

  return (
    <div className="page-itinerario">
      {/* Encabezado */}
      <section className="wrap itinerario-head">
        <header>
          <h1 className="page-title">ITINERARIO</h1>
          <p className="page-sub">Tus reservas guardadas y recorridos sugeridos.</p>
        </header>
      </section>

      {/* Lista en tarjetas */}
      <section className="wrap" aria-label="Mis reservas">
        <div className="itinerario-cards">
          {/* Estado vacío */}
          <p id="res-empty" className="notice mb-10" hidden>
            Aún no agregaste reservas. Abrí Destinos, elegí un lugar, y en el modal usá <em>Calcular costo</em> → Guardar en Itinerario.
          </p>

          <section id="lista-itinerario" className="lista-itinerario" aria-live="polite"></section>

          {/* Acciones globales */}
          <div id="acciones-globales" className="acciones-globales">
            <button type="button" id="btnVaciarRes" className="btn btn-sec">
              VACIAR ITINERARIO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itinerario;
