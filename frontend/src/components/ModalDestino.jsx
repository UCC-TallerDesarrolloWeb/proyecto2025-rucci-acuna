import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button.jsx";
import { fmtUSD, fechaValidaNoPasado } from "@/utils/validate.js";
import { addReserva } from "@/utils/storage.js";

/**
 * Modal de detalle + reserva
 */
const ModalDestino = ({ open, onClose, destino }) => {
  const imgs = useMemo(
    () => (Array.isArray(destino.galeria) && destino.galeria.length ? destino.galeria : []),
    [destino]
  );
  const precioDia = Number(destino.precioDia ?? destino.precio ?? 0);
  const imagenFallback = destino.imagen || destino.cardImg || "";

  const [idx, setIdx] = useState(0);
  const [fecha, setFecha] = useState("");
  const [dias, setDias] = useState("");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!open) return;
    setIdx(0);
    setFecha("");
    setDias("");
    setTotal(null);
  }, [open]);

  const next = () => setIdx((i) => (imgs.length ? (i + 1) % imgs.length : 0));
  const prev = () => setIdx((i) => (imgs.length ? (i - 1 + imgs.length) % imgs.length : 0));

  const calcular = () => {
    const nDias = Number(dias);
    if (!fecha || !fechaValidaNoPasado(fecha)) {
      alert("Elegí una fecha válida que no sea anterior a hoy.");
      return;
    }
    if (!Number.isInteger(nDias) || nDias < 1 || nDias > 60) {
      alert("Ingresá una cantidad de días válida (entero entre 1 y 60).");
      return;
    }
    if (!Number.isFinite(precioDia) || precioDia <= 0) {
      alert("No hay precio por día disponible para este destino.");
      return;
    }
    setTotal(nDias * precioDia);
  };

  const reservar = () => {
    if (!total) {
      alert("Primero calculá el costo.");
      return;
    }
    addReserva({
      id: destino.id,
      destino: destino.nombre,
      fecha,
      dias: Number(dias),
      precioDia: Number(precioDia),
      total: Math.round(total),
    });
    alert("¡Reserva guardada en tu Itinerario!");
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-backdrop" onClick={onClose} />
      <section className="modal-card" aria-describedby="modal-desc">
        <button className="modal-close" aria-label="Cerrar detalles" onClick={onClose}>
          ✕
        </button>

        <h3 id="modal-title">{destino.nombre}: Detalle de destino</h3>

        {/* Slider */}
        <div className="slider" aria-label="Galería de imágenes">
          <button className="slider-prev" aria-label="Imagen anterior" onClick={prev}>‹</button>
          <figure className="slider-frame">
            <img
              src={imgs.length ? imgs[idx] : imagenFallback}
              alt={imgs.length ? `Imagen ${idx + 1} de ${destino.nombre}` : destino.nombre}
            />
            <figcaption id="modal-desc" className="sr-only">
              Imágenes ilustrativas del destino.
            </figcaption>
          </figure>
          <button className="slider-next" aria-label="Imagen siguiente" onClick={next}>›</button>
        </div>

        {/* Texto */}
        <article className="modal-info">
          {destino.historia && (
            <>
              <h4 className="modal-sub">Historia</h4>
              <p>{destino.historia}</p>
            </>
          )}

          {destino.atracciones && (
            <>
              <h4 className="modal-sub">Atracciones</h4>
              <p>{destino.atracciones}</p>
            </>
          )}

          <h4 className="modal-sub">Datos útiles</h4>
          <p>
            {destino.duracion && (
              <>
                <strong>Duración sugerida:</strong> {destino.duracion} día
                {Number(destino.duracion) === 1 ? "" : "s"}
                <br />
              </>
            )}
            {destino.temporada && (
              <>
                <strong>Mejor época:</strong> {destino.temporada}
                <br />
              </>
            )}
            <strong>Precio por día aprox.:</strong> USD {fmtUSD(precioDia)}
          </p>

          {/* Reserva */}
          <div className="reserva">
            <h4 className="modal-sub">Reservar</h4>
            <div className="reserva-grid">
              <label htmlFor="res-fecha">Fecha de inicio</label>
              <input
                id="res-fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              <label htmlFor="res-dias">Días</label>
              <input
                id="res-dias"
                type="number"
                min="1"
                value={dias}
                onChange={(e) => setDias(e.target.value)}
              />
            </div>

            <div className="reserva-actions">
              <Button onClick={calcular}>Calcular costo</Button>
              <span id="res-total" className="reserva-total" aria-live="polite">
                {total ? `Costo estimado: USD ${fmtUSD(total)}` : ""}
              </span>
            </div>

            {total ? (
              <Button variant="primary" onClick={reservar} className="btn-reservar">
                Guardar en Itinerario
              </Button>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalDestino;
