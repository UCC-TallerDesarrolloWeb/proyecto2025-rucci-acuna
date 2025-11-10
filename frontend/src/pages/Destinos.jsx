import { useEffect, useMemo } from "react";
import data from "@data/db.json";
import CardDestino from "@components/CardDestino";
import { initBuscar, initFiltrosOverlay } from "@utils/funcionalidades";

export default function Destinos() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "BRÚJULA - Destinos";

    // El buscador ahora vive en el Header con el mismo id="form-buscar"
    // y el input id="q", así que initBuscar lo engancha ahí.
    setTimeout(() => {
      initBuscar();
      initFiltrosOverlay();
    }, 0);
  }, []);

  const destinos = useMemo(() => {
    const arr = Array.isArray(data?.destinos) ? data.destinos : [];
    return arr.map((d) => ({
      id: d.id,
      nombre: d.nombre,
      cardImg: d.imagen,
      precio: d.precioDia,
      categorias: d.categorias ?? [],
      duracion: d.duracion,
      temporada: d.temporada,
      historia: d.historia,
      atracciones: d.atracciones,
      imgs: d.galeria ?? [],
    }));
  }, []);

  return (
    <div className="page-destinos">
      {/* Encabezado de la página */}
      <section className="wrap destinos-head">
        <header>
          <h2 className="page-title">DESTINOS</h2>
          <p className="page-sub">Encontrá tu próxima aventura</p>
        </header>

        <div className="destinos-actions">
          <button
            id="btnFiltros"
            className="btn-filtro"
            aria-controls="filtrosOverlay"
            aria-expanded="false"
            type="button"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              tune
            </span>
            FILTROS
          </button>
        </div>
      </section>

      {/* GRID DE DESTINOS */}
      <section className="wrap destinos-layout">
        <div className="destinos-grid" id="destinosGrid" aria-live="polite">
          {destinos.map((destino) => (
            <CardDestino key={destino.id} destino={destino} />
          ))}
        </div>
      </section>

      {/* FILTROS (overlay) */}
      <div id="filtrosOverlay" className="filtros-overlay" hidden>
        <div className="filtros-backdrop" data-close="1"></div>
        <section
          className="filtros-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-filtros"
        >
          <button
            type="button"
            className="filtros-close"
            aria-label="Cerrar filtros"
          >
            ✕
          </button>

          <h3 id="titulo-filtros">
            <span className="material-symbols-outlined" aria-hidden="true">
              filter_alt
            </span>
            Filtros
          </h3>

          <form id="form-filtros" className="filtros-form" noValidate>
            <div className="filtro-item">
              <label htmlFor="rangoPrecio">Precio por día (USD)</label>
              <div className="range-wrap">
                <input
                  type="range"
                  id="rangoPrecio"
                  min="50"
                  max="300"
                  defaultValue="300"
                />
                <output id="precioOut">300</output>
              </div>
            </div>

            <div className="filtro-item">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" defaultValue="todas">
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
              <select id="orden" defaultValue="asc">
                <option value="asc">Ascendente (A-Z)</option>
                <option value="desc">Descendente (Z-A)</option>
              </select>
            </div>

            <div className="filtro-actions">
              <button className="btn" type="submit">Aplicar</button>
              <button className="btn btn-sec" type="reset">Limpiar</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
