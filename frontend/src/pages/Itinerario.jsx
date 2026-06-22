import { useEffect, useState } from "react";
import {
  readItinerario,
  writeItinerario,
  removeReservaByIndex,
  clearItinerario,
} from "@utils/storage.js";

/**
 * Formatea número como "USD 1,234".
 * @param {number} n
 * @returns {string}
 */
const toUSD = (n) => `USD ${Number(n || 0).toLocaleString("en-US")}`;

/**
 * URL del mapa embebido para un destino.
 * @param {string} dest
 * @returns {string}
 */
const srcMapa = (dest) =>
  `https://www.google.com/maps?q=${encodeURIComponent(dest || "")}&output=embed`;

/**
 * Página de Itinerario: muestra, expande y elimina reservas guardadas en localStorage.
 * @returns {JSX.Element}
 */
const Itinerario = () => {
  const [items, setItems] = useState(() => readItinerario());
  const [abiertos, setAbiertos] = useState(new Set());

  useEffect(() => {
    document.title = "BRÚJULA - Itinerario";
    window.scrollTo(0, 0);
  }, []);

  /**
   * Alterna la visibilidad del panel de detalles de una card.
   * @param {number} idx - Índice del item en la lista.
   * @returns {void}
   */
  const toggleDetalle = (idx) => {
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  /**
   * Elimina una reserva por índice tras confirmación y actualiza el estado.
   * @param {number} idx - Índice del item a eliminar.
   * @returns {void}
   */
  const handleEliminar = (idx) => {
    if (!confirm(`¿Eliminar "${items[idx]?.destino ?? "este destino"}" del itinerario?`)) return;
    setItems(removeReservaByIndex(idx));
    setAbiertos(new Set());
  };

  /**
   * Vacía todo el itinerario tras confirmación.
   * @returns {void}
   */
  const handleVaciar = () => {
    if (!confirm("¿Vaciar todo el itinerario?")) return;
    clearItinerario();
    setItems([]);
    setAbiertos(new Set());
  };

  return (
    <div className="page-itinerario">
      {/* Encabezado */}
      <section className="wrap itinerario-head">
        <header>
          <h1 className="page-title">ITINERARIO</h1>
          <p className="page-sub">Tus reservas guardadas y recorridos sugeridos.</p>
        </header>
      </section>

      {/* Lista de reservas */}
      <section className="wrap" aria-label="Mis reservas">
        <div className="itinerario-cards">

          {items.length === 0 && (
            <p className="notice mb-10">
              Aún no agregaste reservas. Abrí Destinos, elegí un lugar, y en el modal usá{" "}
              <em>Calcular costo</em> → Guardar en Itinerario.
            </p>
          )}

          <div className="lista-itinerario" aria-live="polite">
            {items.map((item, idx) => {
              const destino  = item.destino  ?? "Destino";
              const fecha    = item.fecha    ?? "—";
              const dias     = item.dias     ?? "—";
              const precioDia = item.precioDia ?? 0;
              const total    = Number(item.dias ?? 0) * Number(item.precioDia ?? 0);
              const estaAbierto = abiertos.has(idx);

              return (
                <article key={idx} className={`it-card${estaAbierto ? " open" : ""}`}>
                  <div className="it-card-body">
                    <h3 className="it-card-titulo">{destino}</h3>
                    <p className="it-card-linea"><strong>DESTINO:</strong> {destino}</p>
                    <p className="it-card-linea"><strong>FECHA:</strong> {fecha}</p>

                    <button
                      type="button"
                      className="btn btn-detalles"
                      onClick={() => toggleDetalle(idx)}
                    >
                      DETALLES
                    </button>

                    {estaAbierto && (
                      <div className="it-card-detalles">
                        <div className="det-grid">
                          <div>
                            <span>DÍAS</span>
                            <strong>{dias}</strong>
                          </div>
                          <div>
                            <span>USD/día</span>
                            <strong>{toUSD(precioDia)}</strong>
                          </div>
                          <div>
                            <span>Total</span>
                            <strong>{toUSD(total)}</strong>
                          </div>
                        </div>
                        <div className="det-acciones">
                          <button
                            type="button"
                            className="btn btn-sec"
                            onClick={() => handleEliminar(idx)}
                          >
                            ELIMINAR
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="it-card-media">
                    <iframe
                      className="it-mapa"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={srcMapa(destino)}
                      title={`Mapa de ${destino}`}
                      aria-label={`Mapa ${destino}`}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {items.length > 0 && (
            <div className="acciones-globales">
              <button
                type="button"
                id="btnVaciarRes"
                className="btn btn-sec"
                onClick={handleVaciar}
              >
                VACIAR ITINERARIO
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Itinerario;
