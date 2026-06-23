import { useState, useEffect } from "react";
import data from "@data/db.json";
import CardDestino from "@components/CardDestino";
import Button from "@components/Button";
import "@styles/Destinos.scss";

const Destinos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [maxPrecio, setMaxPrecio] = useState(300);
  const [categoria, setCategoria] = useState("todas");
  const [orden, setOrden] = useState("asc");
  const [filtrosAbierto, setFiltrosAbierto] = useState(false);

  useEffect(() => {
    document.title = "BRÚJULA - Destinos";
  }, []);

  /* Filtra los destinos por nombre, precio y categoría. */
  const destinos = data.destinos.filter((d) => {
    const pasaNombre = d.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const pasaPrecio = d.precioDia <= maxPrecio;
    const pasaCategoria = categoria === "todas" || d.categorias.includes(categoria);
    return pasaNombre && pasaPrecio && pasaCategoria;
  });

  /* Ordena la lista por nombre. */
  if (orden === "asc") {
    destinos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else {
    destinos.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }

  const limpiar = () => {
    setBusqueda("");
    setMaxPrecio(300);
    setCategoria("todas");
    setOrden("asc");
  };

  return (
    <div className="page-destinos">
      <section className="wrap destinos-head">
        <header>
          <h2 className="page-title">DESTINOS</h2>
        </header>

        <div className="destinos-actions">
          <label htmlFor="buscarDestino" className="sr-only">Buscar destinos</label>
          <input
            id="buscarDestino"
            className="buscar-destino"
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn-filtro" type="button" onClick={() => setFiltrosAbierto(true)}>
            <span className="material-symbols-outlined" aria-hidden="true">tune</span> FILTROS
          </button>
        </div>
      </section>

      <section className="wrap destinos-layout">
        <div className="destinos-grid">
          {destinos.length === 0 && <p className="empty-msg">No se encontraron destinos.</p>}
          {destinos.map((destino) => (
            <CardDestino key={destino.id} destino={destino} />
          ))}
        </div>
      </section>

      {filtrosAbierto && (
        <div className="filtros-overlay">
          <div className="filtros-backdrop" onClick={() => setFiltrosAbierto(false)}></div>
          <section className="filtros-panel">
            <button
              className="filtros-close"
              aria-label="Cerrar filtros"
              onClick={() => setFiltrosAbierto(false)}
            >
              ✕
            </button>
            <h3>
              <span className="material-symbols-outlined" aria-hidden="true">filter_alt</span> Filtros
            </h3>

            <div className="filtro-item">
              <label htmlFor="rangoPrecio">Precio por día (USD)</label>
              <div className="range-wrap">
                <input
                  id="rangoPrecio"
                  type="range"
                  min="50"
                  max="300"
                  value={maxPrecio}
                  onChange={(e) => setMaxPrecio(Number(e.target.value))}
                />
                <output>{maxPrecio}</output>
              </div>
            </div>

            <div className="filtro-item">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="todas">Todas</option>
                <option value="playa">Playa</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="cultural">Cultural</option>
                <option value="historica">Histórica</option>
                <option value="urbana">Urbana</option>
                <option value="romantica">Romántica</option>
                <option value="fiesta">Fiesta</option>
                <option value="aventura">Aventura</option>
                <option value="exotica">Exótica</option>
                <option value="moderna">Moderna</option>
                <option value="tecnologica">Tecnológica</option>
              </select>
            </div>

            <div className="filtro-item">
              <label htmlFor="orden">Orden alfabético</label>
              <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="asc">Ascendente (A-Z)</option>
                <option value="desc">Descendente (Z-A)</option>
              </select>
            </div>

            <div className="filtro-actions">
              <Button onClick={() => setFiltrosAbierto(false)}>Aplicar</Button>
              <Button variante="secundario" onClick={limpiar}>Limpiar</Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Destinos;
