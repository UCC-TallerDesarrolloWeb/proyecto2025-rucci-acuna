import { useState, useEffect, useContext } from "react";
import Button from "@components/Button";
import { ItinerarioContext } from "@components/ItinerarioContext";
import "@styles/Itinerario.scss";

const Itinerario = () => {
  const itinerario = useContext(ItinerarioContext);
  const reservas = itinerario.reservas;
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    document.title = "BRÚJULA - Itinerario";
  }, []);

  /* Muestra u oculta el detalle de una reserva. */
  const verDetalle = (indice) => {
    if (abierto === indice) {
      setAbierto(null);
    } else {
      setAbierto(indice);
    }
  };

  /* Arma la URL del mapa embebido para un destino. */
  const mapaSrc = (destino) =>
    `https://www.google.com/maps?q=${encodeURIComponent(destino)}&output=embed`;

  const confirmarEliminar = (indice) => {
    if (confirm(`¿Eliminar "${reservas[indice].destino}" del itinerario?`)) {
      itinerario.eliminarReserva(indice);
      setAbierto(null);
    }
  };

  const confirmarVaciar = () => {
    if (confirm("¿Vaciar todo el itinerario?")) {
      itinerario.vaciarItinerario();
      setAbierto(null);
    }
  };

  return (
    <div className="page-itinerario">
      <section className="wrap itinerario-head">
        <header>
          <h2 className="page-title">ITINERARIO</h2>
          <p className="page-sub">Tus reservas guardadas y recorridos sugeridos.</p>
        </header>
      </section>

      <section className="wrap">
        <div className="itinerario-cards">
          {reservas.length === 0 && (
            <p className="notice">
              Aún no agregaste reservas. Abrí Destinos, elegí un lugar, calculá el costo y
              guardalo en el itinerario.
            </p>
          )}

          <div className="lista-itinerario">
            {reservas.map((item, indice) => (
              <article key={indice} className={abierto === indice ? "it-card open" : "it-card"}>
                <div className="it-card-body">
                  <h3 className="it-card-titulo">{item.destino}</h3>
                  <p className="it-card-linea"><strong>DESTINO:</strong> {item.destino}</p>
                  <p className="it-card-linea"><strong>FECHA:</strong> {item.fecha}</p>
                  <button className="btn btn-detalles" onClick={() => verDetalle(indice)}>
                    DETALLES
                  </button>

                  {abierto === indice && (
                    <div className="it-card-detalles">
                      <div className="det-grid">
                        <div><span>DÍAS</span><strong>{item.dias}</strong></div>
                        <div><span>USD/día</span><strong>USD {item.precioDia}</strong></div>
                        <div><span>Total</span><strong>USD {item.total}</strong></div>
                      </div>
                      <div className="det-acciones">
                        <Button variante="secundario" onClick={() => confirmarEliminar(indice)}>
                          ELIMINAR
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="it-card-media">
                  <iframe
                    className="it-mapa"
                    loading="lazy"
                    src={mapaSrc(item.destino)}
                    title={`Mapa de ${item.destino}`}
                  />
                </div>
              </article>
            ))}
          </div>

          {reservas.length > 0 && (
            <div className="acciones-globales">
              <Button variante="secundario" onClick={confirmarVaciar}>VACIAR ITINERARIO</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Itinerario;
