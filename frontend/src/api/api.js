
// Obtiene todos los destinos desde el JSON local
export async function getDestinos() {
  const response = await fetch("/data/db.json");
  const data = await response.json();
  return data.destinos || [];
}

// Obtiene un destino por ID
export async function getDestinoById(id) {
  const response = await fetch("/data/db.json");
  const data = await response.json();
  return data.destinos.find((d) => d.id === id);
}

// Ejemplo si quisieras guardar algo en localStorage (itinerario)
export function saveItinerario(itinerario) {
  localStorage.setItem("itinerario", JSON.stringify(itinerario));
}

export function getItinerario() {
  return JSON.parse(localStorage.getItem("itinerario") || "[]");
}
