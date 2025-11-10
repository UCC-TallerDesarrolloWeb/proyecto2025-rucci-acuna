import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/**
 * Header de la página BRÚJULA
 * - Muestra el buscador solo en la ruta /destinos
 */
const Header = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const { pathname } = useLocation();

  const showSearch = pathname === "/destinos";

  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) close();
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-grid">
        {/* Brand */}
        <Link className="brand" to="/" aria-label="Volver al inicio">
          <img src="/imagenes/logo.png" alt="Logo de BRÚJULA" width="40" height="40" />
          <div className="brand-text">
            <h1 className="brand-title">BRÚJULA</h1>
            <span className="brand-sub">Agencia de viajes</span>
          </div>
        </Link>

        <div className="top-actions">
          {/* Buscador solo en /destinos */}
          {showSearch && (
            <form
              id="form-buscar"
              className="search"
              role="search"
              aria-label="Buscar destinos"
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="q" className="sr-only">Buscar</label>
              <input
                id="q"
                name="q"
                type="search"
                placeholder="Buscar"
                size={18}
                maxLength={32}
                spellCheck="false"
              />
              <button type="submit" aria-label="Buscar">
                <span className="material-symbols-outlined" aria-hidden="true">
                  search
                </span>
              </button>
            </form>
          )}

          {/* Menú */}
          <div
            className={`menu-wrapper ${open ? "is-open" : ""}`}
            id="menuWrapper"
            ref={wrapperRef}
          >
            <button
              id="btnMenu"
              ref={btnRef}
              className="btn-hamb"
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-controls="panelMenu"
              aria-expanded={open ? "true" : "false"}
              onClick={toggle}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {open ? "close" : "menu"}
              </span>
            </button>

            <nav id="panelMenu" className="panel-menu" aria-label="Menú principal">
              <ul className="menu-list" onClick={close}>
                <li>
                  <NavLink to="/">
                    <span className="material-symbols-outlined" aria-hidden="true">home</span>
                    INICIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/destinos">
                    <span className="material-symbols-outlined" aria-hidden="true">map</span>
                    DESTINOS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/itinerario">
                    <span className="material-symbols-outlined" aria-hidden="true">calendar_add_on</span>
                    ITINERARIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contacto">
                    <span className="material-symbols-outlined" aria-hidden="true">contact_page</span>
                    CONTACTO
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
