import { useState } from "react";
import ModalDestino from "@components/ModalDestino";

/* Tarjeta de un destino. Al tocar "Detalles" abre el modal. */
const CardDestino = (props) => {
  const destino = props.destino;
  const [abierto, setAbierto] = useState(false);

  return (
    <article className="card">
      <img src={destino.imagen} alt={destino.nombre} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{destino.nombre}</h3>
        <button
          type="button"
          className="btn btn-detalles"
          onClick={() => setAbierto(true)}
        >
          Detalles
        </button>
      </div>

      {abierto && (
        <ModalDestino destino={destino} onCerrar={() => setAbierto(false)} />
      )}
    </article>
  );
};

export default CardDestino;
