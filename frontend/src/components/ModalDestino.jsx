import { useState, useContext } from "react";
import Button from "@components/Button";
import { fechaValidaNoPasado } from "@utils/validate";
import { ItinerarioContext } from "@components/ItinerarioContext";

/* Modal con el detalle del destino, el slider de imágenes y la reserva. */
const ModalDestino = ({ destino, onCerrar }) => {
  const { guardarReserva } = useContext(ItinerarioContext);
  const [indice, setIndice] = useState(0);
  const [fecha, setFecha] = useState("");
  const [dias, setDias] = useState("");
  const [total, setTotal] = useState(null);
  const galeria = destino.galeria.map((imagen) => imagen.replace(/^\//, ""));

  const anterior = () => {
    if (indice === 0) {
      setIndice(galeria.length - 1);
    } else {
      setIndice(indice - 1);
    }
  };

  const siguiente = () => {
    if (indice === galeria.length - 1) {
      setIndice(0);
    } else {
      setIndice(indice + 1);
    }
  };

  const calcular = () => {
    const cantDias = Number(dias);
    if (fecha === "" || !fechaValidaNoPasado(fecha)) {
      alert("Elegí una fecha válida que no sea anterior a hoy.");
      return;
    }
    if (isNaN(cantDias) || !Number.isInteger(cantDias) || cantDias < 1 || cantDias > 60) {
      alert("Ingresá una cantidad de días válida (entero entre 1 y 60).");
      return;
    }
    setTotal(cantDias * destino.precioDia);
  };

  /* Si cambia la reserva, el costo se debe calcular nuevamente. */
  const cambiarFecha = (e) => {
    setFecha(e.target.value);
    setTotal(null);
  };

  const cambiarDias = (e) => {
    setDias(e.target.value);
    setTotal(null);
  };

  const reservar = () => {
    guardarReserva({
      destino: destino.nombre,
      fecha: fecha,
      dias: Number(dias),
      precioDia: destino.precioDia,
      total: total,
    });
    alert("¡Reserva guardada en tu Itinerario!");
    onCerrar();
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-backdrop" onClick={onCerrar}></div>
      <section className="modal-card">
        <button className="modal-close" aria-label="Cerrar detalles" onClick={onCerrar}>
          ✕
        </button>

        <h3 id="modal-title">{destino.nombre}: Detalle de destino</h3>

        <div className="slider">
          <button className="slider-prev" aria-label="Imagen anterior" onClick={anterior}>
            ‹
          </button>
          <figure className="slider-frame">
            <img src={galeria[indice]} alt={`Imagen ${indice + 1} de ${destino.nombre}`} />
          </figure>
          <button className="slider-next" aria-label="Imagen siguiente" onClick={siguiente}>
            ›
          </button>
        </div>

        <article className="modal-info">
          <h4 className="modal-sub">Historia</h4>
          <p>{destino.historia}</p>

          <h4 className="modal-sub">Atracciones</h4>
          <p>{destino.atracciones}</p>

          <h4 className="modal-sub">Datos útiles</h4>
          <p>
            <strong>Duración sugerida:</strong> {destino.duracion} días<br />
            <strong>Mejor época:</strong> {destino.temporada}<br />
            <strong>Precio por día aprox.:</strong> USD {destino.precioDia}
          </p>

          <div className="reserva">
            <h4 className="modal-sub">Reservar</h4>
            <div className="reserva-grid">
              <label htmlFor="res-fecha">Fecha de inicio</label>
              <input
                id="res-fecha"
                type="date"
                value={fecha}
                onChange={cambiarFecha}
              />
              <label htmlFor="res-dias">Días</label>
              <input
                id="res-dias"
                type="number"
                min="1"
                max="60"
                step="1"
                value={dias}
                onChange={cambiarDias}
              />
            </div>

            <div className="reserva-actions">
              <Button onClick={calcular}>Calcular costo</Button>
              {total !== null && (
                <span className="reserva-total">Costo estimado: USD {total}</span>
              )}
            </div>

            {total !== null && <Button onClick={reservar}>Guardar en Itinerario</Button>}
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalDestino;
