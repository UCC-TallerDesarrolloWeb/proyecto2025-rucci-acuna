
const KEY = "itinerario";

/** Lee lista completa del itinerario (array) */
export const readItinerario = () => {
  try {
    const raw = localStorage.getItem(KEY) || "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/** Sobrescribe el itinerario con el array provisto */
export const writeItinerario = (items = []) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};

/**
 * Agrega una reserva con:
 * { destino, fecha, dias, precioDia, total }
 */
export const addReserva = (item) => {
  const curr = readItinerario();
  curr.push({
    destino: item?.destino ?? "Destino",
    fecha: item?.fecha ?? "",
    dias: Number(item?.dias ?? 0),
    precioDia: Number(item?.precioDia ?? 0),
    total: Number(item?.total ?? 0)
  });
  writeItinerario(curr);
  return curr;
};

/** Elimina por índice */
export const removeReservaByIndex = (idx) => {
  const curr = readItinerario();
  if (idx >= 0 && idx < curr.length) {
    curr.splice(idx, 1);
    writeItinerario(curr);
  }
  return curr;
};

/** Vacía todo el itinerario */
export const clearItinerario = () => localStorage.removeItem(KEY);
