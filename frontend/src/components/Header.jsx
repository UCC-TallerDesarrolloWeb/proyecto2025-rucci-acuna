import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@assets/logo.png";

const Header = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-grid">
        <Link className="brand" to="/" aria-label="Volver al inicio">
          <img src={logo} alt="Logo de BRÚJULA" width="40" height="40" />
          <div className="brand-text">
            <h1 className="brand-title">BRÚJULA</h1>
            <span className="brand-sub">Agencia de viajes</span>
          </div>
        </Link>

        <div className="top-actions">
          <div className={abierto ? "menu-wrapper is-open" : "menu-wrapper"}>
            <button
              id="btnMenu"
              className="btn-hamb"
              type="button"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-controls="panelMenu"
              aria-expanded={abierto}
              onClick={() => setAbierto(!abierto)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {abierto ? "close" : "menu"}
              </span>
            </button>

            <nav id="panelMenu" className="panel-menu" aria-label="Menú principal">
              <ul className="menu-list" onClick={() => setAbierto(false)}>
                <li>
                  <NavLink to="/">
                    <span className="material-symbols-outlined" aria-hidden="true">home</span> INICIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/destinos">
                    <span className="material-symbols-outlined" aria-hidden="true">map</span> DESTINOS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/itinerario">
                    <span className="material-symbols-outlined" aria-hidden="true">calendar_add_on</span> ITINERARIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contacto">
                    <span className="material-symbols-outlined" aria-hidden="true">contact_page</span> CONTACTO
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
