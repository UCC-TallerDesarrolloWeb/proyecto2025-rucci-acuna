import { createContext, useState } from "react";

/* Contexto para compartir las reservas del itinerario entre las páginas. */
// eslint-disable-next-line react-refresh/only-export-components
export const ItinerarioContext = createContext();

/* Lee las reservas guardadas en localStorage. */
const leerStorage = () => {
  const data = localStorage.getItem("itinerario");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
};

const ItinerarioProvider = ({ children }) => {
  const [reservas, setReservas] = useState(leerStorage);

  /* Agrega una reserva y la guarda en localStorage. */
  const guardarReserva = (reserva) => {
    const nuevas = [...reservas, reserva];
    setReservas(nuevas);
    localStorage.setItem("itinerario", JSON.stringify(nuevas));
  };

  /* Elimina la reserva que está en la posición indicada. */
  const eliminarReserva = (indice) => {
    const nuevas = reservas.filter((reserva, i) => i !== indice);
    setReservas(nuevas);
    localStorage.setItem("itinerario", JSON.stringify(nuevas));
  };

  /* Borra todas las reservas. */
  const vaciarItinerario = () => {
    setReservas([]);
    localStorage.removeItem("itinerario");
  };

  return (
    <ItinerarioContext.Provider
      value={{ reservas, guardarReserva, eliminarReserva, vaciarItinerario }}
    >
      {children}
    </ItinerarioContext.Provider>
  );
};

export default ItinerarioProvider;
