
export const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

/**
 * Indica si el string contiene al menos una letra (incluye acentos y ñ).
 * @method hasAnyLetter
 * @param {string} str - Texto a evaluar.
 * @returns {boolean} True si encuentra alguna letra.
 */
export const hasAnyLetter = (str) => {
  const s = (str || "").toLowerCase();
  for (let i = 0; i < s.length; i++) {
    if (LETTERS.indexOf(s[i]) !== -1) return true;
  }
  return false;
};

/**
 * Valida que el texto tenga solo letras+espacios y largo 2–40.
 * @method isOnlyLettersAndSpaces
 * @param {string} str - Texto a validar.
 * @returns {boolean}
 */
export const isOnlyLettersAndSpaces = (str) => {
  const s = str || "";
  if (s.length < 2 || s.length > 40) return false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i].toLowerCase();
    if (ch === " " || LETTERS.indexOf(ch) !== -1) continue;
    return false;
  }
  return true;
};

/**
 * Normaliza espacios múltiples a uno.
 * @method normalizeSpaces
 * @param {string} str
 * @returns {string}
 */
export const normalizeSpaces = (str) => {
  const s = str || "";
  let out = "";
  let prevSpace = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const isSpace = ch === " " || ch === "\t" || ch === "\n";
    if (isSpace) {
      if (!prevSpace) out += " ";
      prevSpace = true;
    } else {
      out += ch;
      prevSpace = false;
    }
  }
  while (out.startsWith(" ")) out = out.slice(1);
  while (out.endsWith(" ")) out = out.slice(0, -1);
  return out;
};

/**
 * Valida formato básico de email.
 * @method isValidEmail
 * @param {string} s
 * @returns {boolean}
 */
export const isValidEmail = (s) => {
  const v = s || "";
  if (!v || v.length > 60) return false;
  const at = v.indexOf("@");
  if (at <= 0) return false;
  if (v.indexOf("@", at + 1) !== -1) return false; // otra @
  const local = v.slice(0, at);
  const domain = v.slice(at + 1);
  if (!local || !domain) return false;
  const dot = domain.lastIndexOf(".");
  if (dot <= 0 || dot === domain.length - 1) return false;
  const tld = domain.slice(dot + 1);
  if (tld.length < 2) return false;
  return true;
};

/**
 * Formatea a 2 decimales y retorna string para USD.
 * @method fmtUSD
 * @param {number} n
 * @returns {string}
 */
export const fmtUSD = (n) =>
  Number.isFinite(n) ? (Math.round(n * 100) / 100).toString() : "0";

/**
 * Parsea JSON con fallback ante errores.
 * @method safeJSONParse
 * @template T
 * @param {string} txt
 * @param {T} fallback - Valor por defecto si falla el parseo.
 * @returns {T}
 */
export const safeJSONParse = (txt, fallback) => {
  try {
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
};

/**
 * Marca/limpia estado de error accesible en un campo.
 * (OJO: toca el DOM; útil si un page/comp usa inputs nativos)
 * @method setFieldError
 * @param {HTMLElement|null} el - Elemento input/select.
 * @param {boolean} hasError
 * @returns {void}
 */
export const setFieldError = (el, hasError) => {
  if (!el) return;
  el.setAttribute("aria-invalid", hasError ? "true" : "false");
  el.classList.toggle("is-invalid", !!hasError);
};

/**
 * Aplica clase de grid “is-single” si queda una sola card visible.
 * (DOM helper usado por filtros/búsqueda)
 * @method syncSingleGridClass
 * @param {HTMLElement|null} grid - Contenedor del listado de destinos.
 * @returns {void}
 */
export const syncSingleGridClass = (grid) => {
  if (!grid) return;
  const visibles = [...grid.querySelectorAll(".card")].filter(
    (c) => c.style.display !== "none"
  );
  grid.classList.toggle("is-single", visibles.length === 1);
};

/**
 * Valida fecha YYYY-MM-DD y que no sea anterior a hoy.
 * @method fechaValidaNoPasado
 * @param {string} yyyy_mm_dd
 * @returns {boolean}
 */
export const fechaValidaNoPasado = (yyyy_mm_dd) => {
  const s = yyyy_mm_dd || "";
  const parts = s.split("-");
  if (parts.length !== 3) return false;
  if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2)
    return false;
  const y = Number(parts[0]),
    m = Number(parts[1]),
    d = Number(parts[2]);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d))
    return false;
  const f = new Date(y, m - 1, d);
  if (f.getFullYear() !== y || f.getMonth() !== m - 1 || f.getDate() !== d)
    return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return f.getTime() >= hoy.getTime();
};
