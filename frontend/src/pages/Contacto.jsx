import { useState, useEffect } from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import { soloLetras, emailValido } from "@utils/validate";
import "@styles/Contacto.scss";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPais, setErrorPais] = useState("");
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.title = "BRÚJULA - Contacto";
  }, []);

  /* Devuelve el mensaje de error de un campo. */
  const validarCampo = (campo, valor) => {
    if (campo === "nombre" && !soloLetras(valor.trim())) {
      return "El nombre debe tener solo letras y espacios (2 a 40).";
    }
    if (campo === "apellido" && !soloLetras(valor.trim())) {
      return "El apellido debe tener solo letras y espacios (2 a 40).";
    }
    if (campo === "email" && !emailValido(valor.trim())) {
      return "Ingresá un correo electrónico válido (ej: nombre@dominio.com).";
    }
    if (campo === "pais" && valor === "") {
      return "Seleccioná un país.";
    }
    return "";
  };

  /* Actualiza y valida el nombre mientras el usuario escribe. */
  const cambiarNombre = (e) => {
    const valor = e.target.value;
    setNombre(valor);
    setEnviado(false);
    setErrorNombre(validarCampo("nombre", valor));
  };

  /* Actualiza y valida el apellido mientras el usuario escribe. */
  const cambiarApellido = (e) => {
    const valor = e.target.value;
    setApellido(valor);
    setEnviado(false);
    setErrorApellido(validarCampo("apellido", valor));
  };

  /* Actualiza y valida el correo mientras el usuario escribe. */
  const cambiarEmail = (e) => {
    const valor = e.target.value;
    setEmail(valor);
    setEnviado(false);
    setErrorEmail(validarCampo("email", valor));
  };

  /* Actualiza y valida el pais seleccionado. */
  const cambiarPais = (e) => {
    const valor = e.target.value;
    setPais(valor);
    setEnviado(false);
    setErrorPais(validarCampo("pais", valor));
  };

  /* Valida todos los campos y devuelve true si son correctos. */
  const validar = () => {
    const nuevoErrorNombre = validarCampo("nombre", nombre);
    const nuevoErrorApellido = validarCampo("apellido", apellido);
    const nuevoErrorEmail = validarCampo("email", email);
    const nuevoErrorPais = validarCampo("pais", pais);

    setErrorNombre(nuevoErrorNombre);
    setErrorApellido(nuevoErrorApellido);
    setErrorEmail(nuevoErrorEmail);
    setErrorPais(nuevoErrorPais);

    return nuevoErrorNombre === "" &&
      nuevoErrorApellido === "" &&
      nuevoErrorEmail === "" &&
      nuevoErrorPais === "";
  };

  const enviar = (e) => {
    e.preventDefault();
    if (validar()) {
      setEnviado(true);
      setNombre("");
      setApellido("");
      setEmail("");
      setPais("");
    } else {
      setEnviado(false);
    }
  };

  return (
    <div className="page-contacto">
      <section className="wrap contacto-head">
        <header>
          <h2 className="page-title">CONTACTO</h2>
          <p className="page-sub">DEJANOS TUS DATOS</p>
        </header>
      </section>

      <section className="wrap contacto-layout">
        <form className="contacto-form" onSubmit={enviar} noValidate>
          {enviado && (
            <p className="form-success" role="alert">
              ¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.
            </p>
          )}

          <Input
            label="Nombre:"
            id="nombre"
            value={nombre}
            onChange={cambiarNombre}
            placeholder="Ingresa tu nombre"
            maxLength={40}
            error={errorNombre}
            required
            autoComplete="given-name"
          />

          <Input
            label="Apellido:"
            id="apellido"
            value={apellido}
            onChange={cambiarApellido}
            placeholder="Ingresa tu apellido"
            maxLength={40}
            error={errorApellido}
            required
            autoComplete="family-name"
          />

          <Input
            label="Correo electrónico:"
            id="email"
            type="email"
            value={email}
            onChange={cambiarEmail}
            placeholder="ejemplo@correo.com"
            maxLength={60}
            error={errorEmail}
            required
            autoComplete="email"
          />

          <div className="field select">
            <label htmlFor="pais">País</label>
            <select
              id="pais"
              value={pais}
              onChange={cambiarPais}
              className={errorPais ? "is-invalid" : ""}
              required
              aria-invalid={errorPais ? "true" : "false"}
              aria-describedby={errorPais ? "pais-error" : undefined}
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
            {errorPais && (
              <small id="pais-error" className="error-text" role="alert">{errorPais}</small>
            )}
          </div>

          <div className="actions">
            <Button type="submit">Enviar</Button>
          </div>
        </form>

        <aside className="contacto-aside">
          <h3 className="aside-title">CONTACTANOS</h3>

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
              allowFullScreen
              loading="lazy"
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Contacto;
