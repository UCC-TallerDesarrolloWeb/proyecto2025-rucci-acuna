import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";

const Header = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-grid">
        <Link className="brand" to="/">
          <img src={logo} alt="Logo de BRÚJULA" width="40" height="40" />
          <div className="brand-text">
            <h1 className="brand-title">BRÚJULA</h1>
            <span className="brand-sub">Agencia de viajes</span>
          </div>
        </Link>

        <div className="top-actions">
          <div className="menu-wrapper">
            <button
              id="btnMenu"
              className="btn-hamb"
              type="button"
              onClick={() => setAbierto(!abierto)}
            >
              <span className="material-symbols-outlined">
                {abierto ? "close" : "menu"}
              </span>
            </button>

            {abierto && (
              <nav id="panelMenu" className="panel-menu">
                <ul className="menu-list" onClick={() => setAbierto(false)}>
                  <li>
                    <Link to="/">
                      <span className="material-symbols-outlined">home</span> INICIO
                    </Link>
                  </li>
                  <li>
                    <Link to="/destinos">
                      <span className="material-symbols-outlined">map</span> DESTINOS
                    </Link>
                  </li>
                  <li>
                    <Link to="/itinerario">
                      <span className="material-symbols-outlined">calendar_add_on</span> ITINERARIO
                    </Link>
                  </li>
                  <li>
                    <Link to="/contacto">
                      <span className="material-symbols-outlined">contact_page</span> CONTACTO
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
