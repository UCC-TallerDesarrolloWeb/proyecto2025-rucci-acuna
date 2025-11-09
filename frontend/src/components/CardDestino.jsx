import { useState } from "react";
import ModalDestino from "@/components/ModalDestino.jsx";

export default function CardDestino({ destino }) {
  const [open, setOpen] = useState(false);
  if (!destino) return null;

  return (
    <>
      <article
        className="card"
        data-id={destino.id}
        data-nombre={destino.nombre}
        data-precio={destino.precio}
        data-categorias={(destino.categorias || []).join(",")}
      >
        <img
          src={destino.cardImg}
          alt={destino.nombre}
          className="card-img"
        />
        <div className="card-body">
          <h3 className="card-title">{destino.nombre}</h3>
          <button className="btn btn-detalles" onClick={() => setOpen(true)}>
            Detalles
          </button>
        </div>
      </article>

      {open && (
        <ModalDestino open={open} onClose={() => setOpen(false)} destino={destino} />
      )}
    </>
  );
}
