/* UTILIDADES  */

/**
 * Conjunto de letras permitidas (minúsculas con acentos y ñ).
 * @constant
 * @type {string}
 */
const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

/**
 * Devuelve true si la cadena tiene por lo menos una letra (A–Z con acentos).
 * @method hasAnyLetter
 * @param {string} str - Texto a analizar.
 * @returns {boolean} True si contiene al menos una letra.
 */
const hasAnyLetter = (str) => {
  const s = (str || "").toLowerCase();
  for (let i = 0; i < s.length; i++) {
    if (LETTERS.indexOf(s[i]) !== -1) return true;
  }
  return false;
};

/**
 * Verifica si el texto contiene solo letras y espacios (2–40 caracteres).
 * @method isOnlyLettersAndSpaces
 * @param {string} str - Cadena a validar.
 * @returns {boolean} True si el texto cumple el patrón.
 */
const isOnlyLettersAndSpaces = (str) => {
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
 * Normaliza los espacios dentro de un texto, dejando solo uno entre palabras.
 * @method normalizeSpaces
 * @param {string} str - Texto original.
 * @returns {string} Texto limpio sin espacios múltiples.
 */
const normalizeSpaces = (str) => {
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
 * Verifica si una dirección de correo electrónico es válida.
 * @method isValidEmail
 * @param {string} s - Correo a validar.
 * @returns {boolean} True si el correo tiene formato válido.
 */
const isValidEmail = (s) => {
  const v = s || "";
  if (!v || v.length > 60) return false;
  const at = v.indexOf("@");
  if (at <= 0) return false;
  if (v.indexOf("@", at + 1) !== -1) return false;
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
 * Formatea un número a dos decimales como cadena USD.
 * @method fmtUSD
 * @param {number} n - Monto numérico.
 * @returns {string} Monto formateado.
 */
const fmtUSD = (n) =>
  Number.isFinite(n) ? (Math.round(n * 100) / 100).toString() : "0";

/**
 * Parsea un JSON con control de errores.
 * @method safeJSONParse
 * @param {string} txt - Texto JSON.
 * @param {*} fallback - Valor de retorno si falla el parseo.
 * @returns {*} Objeto parseado o valor por defecto.
 */
const safeJSONParse = (txt, fallback) => {
  try {
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
};

/**
 * Marca o limpia un campo con error accesible.
 * @method setFieldError
 * @param {HTMLElement} el - Elemento del campo.
 * @param {boolean} hasError - True si hay error.
 */
const setFieldError = (el, hasError) => {
  if (!el) return;
  el.setAttribute("aria-invalid", hasError ? "true" : "false");
  el.classList.toggle("is-invalid", !!hasError);
};

/**
 * Aplica clase “is-single” si hay una sola tarjeta visible.
 * @method syncSingleGridClass
 * @param {HTMLElement} grid - Contenedor de las tarjetas.
 */
const syncSingleGridClass = (grid) => {
  if (!grid) return;
  const visibles = [...grid.querySelectorAll(".card")].filter(
    (c) => c.style.display !== "none"
  );
  grid.classList.toggle("is-single", visibles.length === 1);
};

/*  FOOTER */

/**
 * Muestra el año actual en el footer.
 * @method initAnio
 */
const initAnio = () => {
  const span = document.getElementById("anio");
  if (span) span.textContent = String(new Date().getFullYear());
};

/* MENÚ */

/**
 * Inicializa el menú responsive (hamburguesa).
 * @method initMenu
 */
const initMenu = () => {
  const btn = document.getElementById("btnMenu");
  const wrapper = document.getElementById("menuWrapper");
  const panel = document.getElementById("panelMenu");
  if (!btn || !wrapper || !panel) return;

  const icon = btn.querySelector(".material-symbols-outlined");

  const setExpanded = (v) => {
    btn.setAttribute("aria-expanded", String(v));
    wrapper.classList.toggle("is-open", v);
    if (icon) icon.textContent = v ? "close" : "menu";
  };

  btn.addEventListener("click", () =>
    setExpanded(!wrapper.classList.contains("is-open"))
  );

  document.addEventListener("click", (ev) => {
    if (wrapper.classList.contains("is-open") && !wrapper.contains(ev.target))
      setExpanded(false);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && wrapper.classList.contains("is-open")) {
      setExpanded(false);
      btn.focus();
    }
  });
};

/* BÚSQUEDA */

/**
 * Inicializa el buscador de destinos con validación.
 * @method initBuscar
 */
const initBuscar = () => {
  const form = document.getElementById("form-buscar");
  const q = document.getElementById("q");
  const grid = document.getElementById("destinosGrid");
  if (!form || !q || !grid) return;

  /** @type {HTMLDivElement|null} */
  let emptyEl = null;

  const showEmpty = (noHay) => {
    if (noHay) {
      if (!emptyEl) {
        emptyEl = document.createElement("div");
        emptyEl.className = "empty-msg";
        emptyEl.textContent = "No se encontraron destinos. ";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "link-reset";
        btn.textContent = "Ver todos";
        btn.addEventListener("click", resetear);
        emptyEl.appendChild(btn);
        grid.before(emptyEl);
      }
    } else {
      if (emptyEl) emptyEl.remove();
      emptyEl = null;
    }
  };

  const filtrar = (txt) => {
    const term = normalizeSpaces((txt || "").toLowerCase());
    let visibles = 0;
    [...grid.querySelectorAll(".card")].forEach((card) => {
      const nombre = (
        (card.dataset.nombre ||
          card.querySelector(".card-title")?.textContent ||
          "") + ""
      ).toLowerCase();
      const show = !term || nombre.indexOf(term) !== -1;
      card.style.display = show ? "" : "none";
      if (show) visibles++;
    });
    showEmpty(visibles === 0);
    syncSingleGridClass(grid);
  };

  const resetear = () => {
    [...grid.querySelectorAll(".card")].forEach((c) => (c.style.display = ""));
    q.value = "";
    const rango = document.getElementById("rangoPrecio");
    const cat = document.getElementById("categoria");
    const ord = document.getElementById("orden");
    if (rango) rango.value = rango.max || "300";
    if (cat) cat.value = "todas";
    if (ord) ord.value = "asc";
    setFieldError(q, false);
    showEmpty(false);
    syncSingleGridClass(grid);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = normalizeSpaces(q.value);
    if (term && !hasAnyLetter(term)) {
      alert("Ingresá letras para buscar un destino.");
      q.value = "";
      setFieldError(q, true);
      q.focus();
      showEmpty(false);
      return;
    }
    setFieldError(q, false);
    filtrar(term);
  });

  document.getElementById("btnVerTodo")?.addEventListener("click", resetear);
};

/* FILTROS */

/**
 * Inicializa el panel de filtros de precios y categorías.
 * @method initFiltrosOverlay
 */
const initFiltrosOverlay = () => {
  // ...
};
