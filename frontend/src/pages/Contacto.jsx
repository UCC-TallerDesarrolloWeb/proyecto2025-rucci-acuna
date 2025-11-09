
import { useEffect } from "react";

const Contacto = () => {
  useEffect(() => {
    document.title = "BRÚJULA - Contacto";
    window.scrollTo(0, 0);
    // Vuelve a vincular validaciones
    if (typeof window !== "undefined" && typeof window.initContacto === "function") {
      window.initContacto();
    }
  }, []);

  return (
    <div className="page-contacto">
      {/* Encabezado */}
      <section className="wrap contacto-head">
        <header>
          <h2 className="page-title">CONTACTO</h2>
          <p className="page-sub">DEJANOS TUS DATOS</p>
        </header>
      </section>

      {/* Formulario  */}
      <section className="wrap contacto-layout" aria-label="Formulario y datos de contacto">
        {/* Formulario  */}
        <form id="form-contacto" className="contacto-form" noValidate aria-labelledby="titulo-form">
          <h3 id="titulo-form" className="sr-only">Formulario de contacto</h3>

          <div className="field">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              size={36}
              maxLength={40}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingresa tu apellido"
              size={36}
              maxLength={40}
              autoComplete="family-name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              size={36}
              maxLength={60}
              autoComplete="email"
              required
            />
          </div>

          <div className="field select">
            <label htmlFor="pais">País</label>
            <select id="pais" name="pais" required defaultValue="">
              <option value="" disabled>Seleccione una opción</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Perú</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="actions">
            <button type="submit" className="btn">Enviar</button>
          </div>
        </form>

        {/* Datos y Mapa */}
        <aside className="contacto-aside" aria-labelledby="titulo-aside">
          <h3 id="titulo-aside" className="aside-title">CONTACTANOS</h3>

          <ul className="contacto-list">
            <li><strong>Teléfono:</strong> 3517338697</li>
            <li><strong>Email:</strong> lueisa@gmail.com</li>
            <li><strong>Dirección:</strong> Av. Armada Argentina 3555, Córdoba, Argentina</li>
          </ul>

          <div className="mapa">
            <iframe
              title="Ubicación BRÚJULA - Córdoba"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218198.9361962344!2d-64.43249685141848!3d-31.2938385269709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a3df896024af%3A0xfac12a594425f547!2sUniversidad%20Cat%C3%B3lica%20de%20C%C3%B3rdoba%20-%20Campus%20Universitario!5e0!3m2!1ses!2sar!4v1759517661560!5m2!1ses!2sar"
              width="600"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Contacto;
