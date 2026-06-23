/* Letras permitidas para validar nombre y apellido (incluye acentos y ñ). */
const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

/**
 * Indica si el texto tiene solo letras y espacios (entre 2 y 40 caracteres).
 * @method soloLetras
 * @param {string} texto - Texto a validar.
 * @return {boolean} true si es válido.
 */
export const soloLetras = (texto) => {
  if (texto.length < 2 || texto.length > 40) {
    return false;
  }
  for (let i = 0; i < texto.length; i++) {
    const ch = texto[i].toLowerCase();
    if (ch !== " " && LETTERS.indexOf(ch) === -1) {
      return false;
    }
  }
  return true;
};

/**
 * Indica si un correo tiene un formato básico válido.
 * @method emailValido
 * @param {string} email - Correo a validar.
 * @return {boolean} true si el formato es correcto.
 */
export const emailValido = (email) => {
  const arroba = email.indexOf("@");
  const punto = email.lastIndexOf(".");
  return arroba > 0 && punto > arroba + 1 && punto < email.length - 1;
};

/**
 * Valida que una fecha (texto YYYY-MM-DD) no sea anterior a hoy.
 * @method fechaValidaNoPasado
 * @param {string} fecha - Fecha en formato YYYY-MM-DD.
 * @return {boolean} true si la fecha es hoy o futura.
 */
export const fechaValidaNoPasado = (fecha) => {
  const partes = fecha.split("-");
  const f = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return f.getTime() >= hoy.getTime();
};
