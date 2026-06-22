import { useEffect, useState } from "react";
import {
  isOnlyLettersAndSpaces,
  isValidEmail,
  setFieldError,
} from "@utils/validate.js";

/** @type {{ nombre: string, apellido: string, email: string, pais: string }} */
const EMPTY_ERRORS = { nombre: "", apellido: "", email: "", pais: "" };

/**
 * Página de Contacto con validación React controlada.
 * Los errores se muestran inline; no usa alert() ni window.initContacto().
 * @returns {JSX.Element}
 */
const Contacto = () => {
  const [nombre,   setNombre]   = useState("");
  const [apellido, setApellido] = useState("");
  const [email,    setEmail]    = useState("");
  const [pais,     setPais]     = useState("");
  const [errores,  setErrores]  = useState(EMPTY_ERRORS);
  const [exito,    setExito]    = useState(false);

  useEffect(() => {
    document.title = "BRÚJULA - Contacto";
    window.scrollTo(0, 0);
  }, []);

  /**
   * Borra el error de un campo cuando el usuario empieza a editarlo.
   * @param {keyof typeof EMPTY_ERRORS} campo
   * @returns {void}
   */
  const clearError = (campo) =>
    setErrores((prev) => ({ ...prev, [campo]: "" }));

  /**
   * Valida todos los campos y devuelve un objeto con los mensajes de error.
   * @returns {typeof EMPTY_ERRORS}
   */
  const validar = () => {
    const errs = { ...EMPTY_ERRORS };
    const nom = nombre.trim();
    const ape = apellido.trim();
    const em  = email.trim();

    if (!nom)
      errs.nombre = 'El campo "Nombre" es obligatorio.';
    else if (!isOnlyLettersAndSpaces(nom))
      errs.nombre = '"Nombre" debe tener solo letras y espacios (2 a 40 caracteres).';

    if (!ape)
      errs.apellido = 'El campo "Apellido" es obligatorio.';
    else if (!isOnlyLettersAndSpaces(ape))
      errs.apellido = '"Apellido" debe tener solo letras y espacios (2 a 40 caracteres).';

    if (!em)
      errs.email = 'El campo "Correo electrónico" es obligatorio.';
    else if (!isValidEmail(em))
      errs.email = 'Ingresá un correo electrónico válido (ej: nombre@dominio.com).';

    if (!pais)
      errs.pais = 'Seleccioná un país.';

    return errs;
  };

  /**
   * Maneja el envío: valida, muestra errores inline o mensaje de éxito.
   * @param {React.FormEvent<HTMLFormElement>} e
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.values(errs).some(Boolean)) {
      setErrores(errs);
      setExito(false);
      return;
    }
    setExito(true);
    setNombre("");
    setApellido("");
    setEmail("");
    setPais("");
    setErrores(EMPTY_ERRORS);
  };

  return (
    <div className="page-contacto">
      {/* Encabezado */}
      <section className="wrap contacto-head">
        <header>
          <h2 className="page-title">CONTACTO</h2>
          <p className="page-sub">DEJANOS TUS DATOS</p>
        </header>
      </section>

      <section className="wrap contacto-layout" aria-label="Formulario y datos de contacto">

        {/* Formulario */}
        <form
          id="form-contacto"
          className="contacto-form"
          noValidate
          aria-labelledby="titulo-form"
          onSubmit={handleSubmit}
        >
          <h3 id="titulo-form" className="sr-only">Formulario de contacto</h3>

          {exito && (
            <p className="form-success" role="alert">
              ¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.
            </p>
          )}

          {/* Nombre */}
          <div className="field">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); clearError("nombre"); }}
              placeholder="Ingresa tu nombre"
              maxLength={40}
              autoComplete="given-name"
              required
              aria-invalid={errores.nombre ? "true" : "false"}
              aria-describedby={errores.nombre ? "err-nombre" : undefined}
              className={errores.nombre ? "is-invalid" : ""}
            />
            {errores.nombre && (
              <small id="err-nombre" className="error-text" role="alert">
                {errores.nombre}
              </small>
            )}
          </div>

          {/* Apellido */}
          <div className="field">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              onChange={(e) => { setApellido(e.target.value); clearError("apellido"); }}
              placeholder="Ingresa tu apellido"
              maxLength={40}
              autoComplete="family-name"
              required
              aria-invalid={errores.apellido ? "true" : "false"}
              aria-describedby={errores.apellido ? "err-apellido" : undefined}
              className={errores.apellido ? "is-invalid" : ""}
            />
            {errores.apellido && (
              <small id="err-apellido" className="error-text" role="alert">
                {errores.apellido}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
              placeholder="ejemplo@correo.com"
              maxLength={60}
              autoComplete="email"
              required
              aria-invalid={errores.email ? "true" : "false"}
              aria-describedby={errores.email ? "err-email" : undefined}
              className={errores.email ? "is-invalid" : ""}
            />
            {errores.email && (
              <small id="err-email" className="error-text" role="alert">
                {errores.email}
              </small>
            )}
          </div>

          {/* País */}
          <div className="field select">
            <label htmlFor="pais">País</label>
            <select
              id="pais"
              name="pais"
              value={pais}
              onChange={(e) => { setPais(e.target.value); clearError("pais"); }}
              required
              aria-invalid={errores.pais ? "true" : "false"}
              aria-describedby={errores.pais ? "err-pais" : undefined}
              className={errores.pais ? "is-invalid" : ""}
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Perú</option>
              <option value="Otro">Otro</option>
            </select>
            {errores.pais && (
              <small id="err-pais" className="error-text" role="alert">
                {errores.pais}
              </small>
            )}
          </div>

          <div className="actions">
            <button type="submit" className="btn">Enviar</button>
          </div>
        </form>

        {/* Datos y Mapa */}
        <aside className="contacto-aside" aria-labelledby="titulo-aside">
          <h3 id="titulo-aside" className="aside-title">CONTACTANOS</h3>

          <ul className="contacto-list">
            <li>
              <strong>Teléfono:</strong>{" "}
              <a href="tel:3517338697">3517338697</a>
            </li>
            <li><strong>Email:</strong> lueisa@gmail.com</li>
            <li>
              <strong>Dirección:</strong> Av. Armada Argentina 3555, Córdoba, Argentina
            </li>
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
