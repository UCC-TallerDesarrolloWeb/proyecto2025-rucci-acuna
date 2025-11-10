/**
 * @file BRÚJULA – 

/**
 * Tarjeta de destino 
 * @typedef {HTMLElement & { dataset: DOMStringMap }} DestinationCard
 */

/**
 * Item de reserva 
 * @typedef {Object} ItinerarioItem
 * @property {string} destino
 * @property {string} fecha
 * @property {number} dias
 * @property {number} precioDia
 * @property {number} total
 */

/* UTILIDADES */

/** Conjunto de letras permitidas (minúsculas con acentos y ñ). */
const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

/**
 * Indica si el string contiene al menos una letra (incluye acentos y ñ).
 * @method hasAnyLetter
 * @param {string} str - Texto a evaluar.
 * @returns {boolean} True si encuentra alguna letra.
 */
const hasAnyLetter = (str) => {
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
 * Normaliza espacios múltiples a uno 
 * @method normalizeSpaces
 * @param {string} str
 * @returns {string}
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
 * Valida formato básico de email 
 * @method isValidEmail
 * @param {string} s
 * @returns {boolean}
 */
const isValidEmail = (s) => {
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
const fmtUSD = (n) =>
  Number.isFinite(n) ? (Math.round(n * 100) / 100).toString() : "0";

/**
 * Parsea JSON con fallback ante errores.
 * @method safeJSONParse
 * @template T
 * @param {string} txt
 * @param {T} fallback - Valor por defecto si falla el parseo.
 * @returns {T}
 */
const safeJSONParse = (txt, fallback) => {
  try {
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
};

/**
 * Marca/limpia estado de error accesible en un campo.
 * @method setFieldError
 * @param {HTMLElement|null} el - Elemento input/select.
 * @param {boolean} hasError
 * @returns {void}
 */
const setFieldError = (el, hasError) => {
  if (!el) return;
  el.setAttribute("aria-invalid", hasError ? "true" : "false");
  el.classList.toggle("is-invalid", !!hasError);
};

/**
 * Aplica clase de grid “is-single” si queda una sola card visible.
 * @method syncSingleGridClass
 * @param {HTMLElement|null} grid - Contenedor del listado de destinos.
 * @returns {void}
 */
const syncSingleGridClass = (grid) => {
  if (!grid) return;
  const visibles = [...grid.querySelectorAll(".card")].filter(
    (c) => c.style.display !== "none"
  );
  grid.classList.toggle("is-single", visibles.length === 1);
};

/* FOOTER */

/**
 * Inserta el año actual en el span#anio del footer.
 * @method initAnio
 * @returns {void}
 */
const initAnio = () => {
  const span = document.getElementById("anio");
  if (span) span.textContent = String(new Date().getFullYear());
};

/* MENÚ */

/**
 * Inicializa el menú (abrir/cerrar, accesible, ESC).
 * @method initMenu
 * @returns {void}
 */
const initMenu = () => {
  const btn = document.getElementById("btnMenu");
  const wrapper = document.getElementById("menuWrapper");
  const panel = document.getElementById("panelMenu");
  if (!btn || !wrapper || !panel) return;

  const icon = btn.querySelector(".material-symbols-outlined");

  /**
   * Cambia el estado expandido del menú.
   * @private
   * @param {boolean} v
   * @returns {void}
   */
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

/* BÚSQUEDA (Destinos)*/

/**
 * Activa el formulario de búsqueda de destinos.
 * Filtra .card por nombre y muestra mensaje “vacío”.
 * @method initBuscar
 * @returns {void}
 */
const initBuscar = () => {
  const form = document.getElementById("form-buscar");
  const q = document.getElementById("q");
  const grid = document.getElementById("destinosGrid");
  if (!form || !q || !grid) return;

  // Evitar inicialización duplicada al volver a /destinos
  if (form.dataset.inited === "1") return;
  form.dataset.inited = "1";

  // Remover restos de inits anteriores (barra de estado previa, si quedó)
  document.querySelectorAll(".search-status").forEach(el => el.remove());

  // Barra de estado con "Ver todos"
  const statusEl = document.createElement("div");
  statusEl.className = "search-status";
  statusEl.style.display = "none";
  const statusText = document.createElement("span");
  const btnVerTodo = document.createElement("button");
  btnVerTodo.type = "button";
  btnVerTodo.className = "link-reset";
  btnVerTodo.textContent = "Ver todos";
  statusEl.appendChild(statusText);
  statusEl.appendChild(document.createTextNode(" "));
  statusEl.appendChild(btnVerTodo);
  grid.before(statusEl);

  const showStatus = (term, count) => {
    if (!term) { statusEl.style.display = "none"; return; }
    statusText.textContent =
      count === 0 ? "No se encontraron destinos." :
      count === 1 ? "1 destino encontrado." :
      `${count} destinos encontrados.`;
    statusEl.style.display = "block";
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
      const show = !term || nombre.includes(term);
      card.style.display = show ? "" : "none";
      if (show) visibles++;
    });
    syncSingleGridClass(grid);
    return visibles;
  };

  function resetear() {
    q.value = "";
    [...grid.querySelectorAll(".card")].forEach((c) => (c.style.display = ""));
    const rango = document.getElementById("rangoPrecio");
    const cat = document.getElementById("categoria");
    const ord = document.getElementById("orden");
    if (rango) rango.value = rango.max || "300";
    if (cat) cat.value = "todas";
    if (ord) ord.value = "asc";
    setFieldError(q, false);
    statusEl.style.display = "none";
    syncSingleGridClass(grid);
  }

  // Buscar al enviar (Enter/botón)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const typed = normalizeSpaces(q.value);

    // Si no hay letras (solo números/símbolos), limpiar y restaurar
    if (typed && !hasAnyLetter(typed)) {
      q.value = "";
      setFieldError(q, true);
      resetear();
      return;
    }

    setFieldError(q, false);

    // Filtrar usando lo que escribió el usuario
    const count = filtrar(typed);

    if (typed && count === 0) {
      // Mostrar “No se encontraron destinos.” y dejar el botón Ver todos
      showStatus(typed, 0);
      // Limpiar el input, pero mantener visible el estado (con el term previo)
      q.value = "";
      return;
    }

    // Si hay resultados o no hay término, mostrar/ocultar estado según corresponda
    showStatus(typed, count);
  });

  // “Ver todos” siempre limpia la búsqueda
  btnVerTodo.addEventListener("click", resetear);
};


/* FILTROS */

/**
 * Inicializa overlay de filtros (precio, categoría y orden).
 * @method initFiltrosOverlay
 * @returns {void}
 */
const initFiltrosOverlay = () => {
  const btnOpen = document.getElementById("btnFiltros");
  const overlay = document.getElementById("filtrosOverlay");
  const form = document.getElementById("form-filtros");
  if (!btnOpen || !overlay || !form) return;

  const grid = document.getElementById("destinosGrid");
  const rango = document.getElementById("rangoPrecio");
  const out = document.getElementById("precioOut");
  const categoria = document.getElementById("categoria");
  const orden = document.getElementById("orden");

  /**
   * Abre/cierra overlay.
   * @private
   * @param {boolean} v
   * @returns {void}
   */
  const setOpen = (v) => {
    overlay.hidden = !v;
    document.body.style.overflow = v ? "hidden" : "";
    btnOpen.setAttribute("aria-expanded", String(v));
  };

  btnOpen.addEventListener("click", () => setOpen(true));
  overlay
    .querySelector(".filtros-close")
    ?.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", (e) => {
    if (e.target.dataset.close === "1") setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) setOpen(false);
  });

  /**
   * Refresca el output del rango de precio.
   * @private
   * @returns {void}
   */
  const writeOut = () => {
    if (out && rango) out.textContent = rango.value;
  };
  rango?.addEventListener("input", writeOut);
  writeOut();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!grid || !rango || !categoria || !orden) return;

    const maxPrecio = Number(rango.value);
    const cat = (categoria.value || "todas").toLowerCase();
    const cards = [...grid.querySelectorAll(".card")];

    cards.forEach((card) => {
      const precio = Number(card.dataset.precio || "999999");
      const cats = (card.dataset.categorias || "")
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const pasaPrecio = Number.isFinite(precio) ? precio <= maxPrecio : true;
      const pasaCat = cat === "todas" ? true : cats.indexOf(cat) !== -1;
      card.style.display = pasaPrecio && pasaCat ? "" : "none";
    });

    const visibles = cards.filter((c) => c.style.display !== "none");
    visibles.sort((a, b) => {
      const an = (a.dataset.nombre || "").toLowerCase();
      const bn = (b.dataset.nombre || "").toLowerCase();
      return orden.value === "asc"
        ? an.localeCompare(bn)
        : bn.localeCompare(an);
    });
    visibles.forEach((c) => grid.appendChild(c));

    syncSingleGridClass(grid);
    setOpen(false);
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      if (!grid) return;
      grid.querySelectorAll(".card").forEach((c) => (c.style.display = ""));
      writeOut();
      syncSingleGridClass(grid);
    }, 0);
  });
};

/* DETALLES y RESERVA */

/** @type {number} */
let sliderIndex = 0;
/** @type {string[]} */
let sliderPaths = [];
/** @type {number|null} */
let precioDiaActual = null;
/** @type {string|null} */
let destinoActual = null;

/**
 * Obtiene paths de galería para una card 
 * @method getGaleria
 * @param {DestinationCard} card
 * @returns {string[]} Rutas de imágenes.
 */
const getGaleria = (card) => {
  const direct = ["img1", "img2", "img3"]
    .map((k) => card.dataset[k])
    .filter(Boolean);
  if (direct.length) return direct;
  const EXT = ["jpg", "jpeg", "webp", "avif"];
  const id = card.dataset.id;
  const bases = [1, 2, 3].map((n) => `imagenes/destinos/detalle/${id}${n}`);
  const combos = [];
  for (let i = 0; i < bases.length; i++) {
    for (let j = 0; j < EXT.length; j++) combos.push(`${bases[i]}.${EXT[j]}`);
  }
  return combos;
};

/**
 * Abre modal de detalle, carga textos e inicializa slider.
 * @method abrirModal
 * @param {DestinationCard} card
 * @returns {void}
 */
const abrirModal = (card) => {
  const nombre =
    card.dataset.nombre ||
    card.querySelector(".card-title")?.textContent ||
    "Destino";
  destinoActual = nombre;
  precioDiaActual = Number(card.dataset.precio || 0);

  const modal = document.getElementById("modal");
  const img = document.getElementById("slider-img");
  const h3 = document.getElementById("modal-title");
  const pHist = document.getElementById("modal-historia");
  const pAtr = document.getElementById("modal-atracciones");
  const pExtra = document.getElementById("modal-extra");

  sliderIndex = 0;
  sliderPaths = getGaleria(card);

  if (img && sliderPaths.length) {
    /**
     * Cambia la imagen del slider al índice dado.
     * @private
     * @param {number} i
     * @returns {void}
     */
    const setSrc = (i) => {
      sliderIndex = i % sliderPaths.length;
      img.src = sliderPaths[sliderIndex];
      img.alt = `Imagen ${sliderIndex + 1} de ${nombre}`;
    };
    img.onerror = () => {
      setSrc((sliderIndex + 1) % sliderPaths.length);
    };
    setSrc(0);
  }

  if (h3) h3.textContent = `${nombre}: Detalle de destino`;
  const hist = (card.dataset.historia || "").trim();
  const atr = (card.dataset.atracciones || "").trim();
  const dur = (card.dataset.duracion || "").trim();
  const temp = (card.dataset.temporada || "").trim();
  if (pHist)
    pHist.textContent =
      hist || `Historia breve de ${nombre}. (Reemplazar con contenido real.)`;
  if (pAtr)
    pAtr.textContent =
      atr ||
      `Atracciones principales de ${nombre}. (Reemplazar con contenido real.)`;

  if (pExtra) {
    const partes = [];
    if (dur)
      partes.push(
        `<strong>Duración sugerida:</strong> ${dur} día${
          !isNaN(dur) &&
          String(parseInt(dur, 10)) === String(dur) &&
          Number(dur) !== 1
            ? "s"
            : ""
        }`
      );
    if (temp) partes.push(`<strong>Mejor época:</strong> ${temp}`);
    partes.push(
      `<strong>Precio por día aprox.:</strong> USD ${
        Number.isFinite(precioDiaActual) && precioDiaActual > 0
          ? fmtUSD(precioDiaActual)
          : "—"
      }`
    );
    pExtra.innerHTML = partes.join("<br>");
  }

  // Limpiar reserva
  const f = document.getElementById("res-fecha");
  const d = document.getElementById("res-dias");
  const out = document.getElementById("res-total");
  const btnRes = document.getElementById("btnReservar");
  if (f) {
    f.value = "";
    setFieldError(f, false);
  }
  if (d) {
    d.value = "";
    setFieldError(d, false);
  }
  if (out) out.textContent = "";
  if (btnRes) btnRes.hidden = true;

  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
};

/**
 * Cierra el modal de detalles y restablece el scroll del body.
 * @method cerrarModal
 * @returns {void}
 */
const cerrarModal = () => {
  const modal = document.getElementById("modal");
  if (modal) modal.hidden = true;
  document.body.style.overflow = "";
};

/**
 * Avanza/retrocede el slider de imágenes.
 * @method moverSlider
 * @param {number} dir - -1 izquierda, 1 derecha.
 * @returns {void}
 */
const moverSlider = (dir) => {
  const img = document.getElementById("slider-img");
  if (!img || sliderPaths.length === 0) return;
  sliderIndex = (sliderIndex + dir + sliderPaths.length) % sliderPaths.length;
  img.src = sliderPaths[sliderIndex];
  img.alt = `Imagen ${sliderIndex + 1} de ${destinoActual || "Destino"}`;
};

/**
 * Valida fecha YYYY-MM-DD y que no sea anterior a hoy.
 * @method fechaValidaNoPasado
 * @param {string} yyyy_mm_dd
 * @returns {boolean}
 */
const fechaValidaNoPasado = (yyyy_mm_dd) => {
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

/**
 * Conecta botones de “Detalles” y lógica de reserva/calculadora.
 * @method initDetalles
 * @returns {void}
 */
const initDetalles = () => {
  const grid = document.getElementById("destinosGrid");
  if (!grid) return;

  grid.querySelectorAll(".btn-detalles").forEach((btn) => {
    btn.addEventListener("click", () => abrirModal(btn.closest(".card")));
  });

  const modal = document.getElementById("modal");
  document
    .getElementById("modal-close")
    ?.addEventListener("click", cerrarModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.dataset.close === "1") cerrarModal();
  });
  document
    .querySelector(".slider-prev")
    ?.addEventListener("click", () => moverSlider(-1));
  document
    .querySelector(".slider-next")
    ?.addEventListener("click", () => moverSlider(1));
  document.addEventListener("keydown", (ev) => {
    if (!modal || modal.hidden) return;
    if (ev.key === "Escape") cerrarModal();
    if (ev.key === "ArrowLeft") moverSlider(-1);
    if (ev.key === "ArrowRight") moverSlider(1);
  });

  // Reserva
  const MAX_DIAS = 60;
  const btnCalcular = document.getElementById("btnCalcular");
  const btnReservar = document.getElementById("btnReservar");
  const inpFecha = document.getElementById("res-fecha");
  const inpDias = document.getElementById("res-dias");
  const outTotal = document.getElementById("res-total");

  btnCalcular?.addEventListener("click", () => {
    const fecha = inpFecha?.value || "";
    const dias = Number(inpDias?.value);

    setFieldError(inpFecha, false);
    setFieldError(inpDias, false);

    if (!fecha || !fechaValidaNoPasado(fecha)) {
      alert("Elegí una fecha válida que no sea anterior a hoy.");
      setFieldError(inpFecha, true);
      inpFecha?.focus();
      return;
    }
    if (!Number.isInteger(dias) || dias < 1 || dias > MAX_DIAS) {
      alert(
        `Ingresá una cantidad de días válida (entero entre 1 y ${MAX_DIAS}).`
      );
      setFieldError(inpDias, true);
      inpDias?.focus();
      return;
    }
    if (!Number.isFinite(precioDiaActual) || precioDiaActual <= 0) {
      alert("No hay precio por día disponible para este destino.");
      return;
    }

    const total = dias * precioDiaActual;
    if (outTotal) outTotal.textContent = `Costo estimado: USD ${fmtUSD(total)}`;
    if (btnReservar) {
      btnReservar.hidden = false;
      btnReservar.dataset.total = String(total);
      btnReservar.dataset.dias = String(dias);
      btnReservar.dataset.fecha = fecha;
    }
  });

  btnReservar?.addEventListener("click", () => {
    const fecha = btnReservar.dataset.fecha;
    const dias = Number(btnReservar.dataset.dias);
    const total = Number(btnReservar.dataset.total);
    if (!fecha || !Number.isFinite(dias) || !Number.isFinite(total)) {
      alert("Primero calculá el costo.");
      return;
    }
    const viajes = safeJSONParse(
      localStorage.getItem("itinerario") || "[]",
      []
    );
    viajes.push({
      destino: destinoActual || "Destino",
      fecha,
      dias,
      precioDia: precioDiaActual,
      total: Math.round(total),
    });
    localStorage.setItem("itinerario", JSON.stringify(viajes));
    alert("¡Reserva guardada en tu Itinerario!");
    cerrarModal();
  });
};

/* CONTACTO (validaciones)*/

/**
 * Valida que un campo no esté vacío.
 * @method validarNoVacio
 * @param {HTMLInputElement|null} el
 * @param {string} nombreCampo
 * @returns {boolean}
 */
const validarNoVacio = (el, nombreCampo) => {
  const valor = (el?.value || "").trim();
  setFieldError(el, false);
  if (!valor) {
    alert(`El campo "${nombreCampo}" es obligatorio.`);
    setFieldError(el, true);
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

/**
 * Valida letras+espacios (2–40) para inputs de texto.
 * @method validarSoloLetras
 * @param {HTMLInputElement|null} el
 * @param {string} nombreCampo
 * @returns {boolean}
 */
const validarSoloLetras = (el, nombreCampo) => {
  const v = (el?.value || "").trim();
  if (!isOnlyLettersAndSpaces(v)) {
    alert(
      `"${nombreCampo}" debe tener solo letras y espacios (2 a 40 caracteres).`
    );
    setFieldError(el, true);
    el.value = "";
    el.focus();
    return false;
  }
  setFieldError(el, false);
  return true;
};

/**
 * Valida email con reglas básicas.
 * @method validarEmail
 * @param {HTMLInputElement|null} el
 * @returns {boolean}
 */
const validarEmail = (el) => {
  const valor = (el?.value || "").trim();
  setFieldError(el, false);
  if (!isValidEmail(valor)) {
    alert("Ingresá un correo electrónico válido (ej: nombre@dominio.com).");
    setFieldError(el, true);
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

/**
 * Inicializa validaciones y envío del formulario de contacto.
 * @method initContacto
 * @returns {void}
 */
const initContacto = () => {
  const form = document.getElementById("form-contacto");
  if (!form) return;
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const pais = document.getElementById("pais");

  /**
   * Bloquea números/símbolos para nombre/apellido (solo letras+espacios).
   * @private
   * @param {HTMLInputElement|null} el
   * @returns {void}
   */
  const filtrarLetrasEspacios = (el) => {
    el?.addEventListener("input", () => {
      const orig = el.value || "";
      let limpio = "";
      for (let i = 0; i < orig.length; i++) {
        const ch = orig[i];
        const low = ch.toLowerCase();
        if (ch === " " || LETTERS.indexOf(low) !== -1) limpio += ch;
      }
      if (limpio !== orig) el.value = limpio;
      setFieldError(el, false);
    });
  };
  filtrarLetrasEspacios(nombre);
  filtrarLetrasEspacios(apellido);

  email?.addEventListener("input", () => setFieldError(email, false));
  pais?.addEventListener("change", () => setFieldError(pais, false));

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!validarNoVacio(nombre, "Nombre")) return;
    if (!validarSoloLetras(nombre, "Nombre")) return;
    if (!validarNoVacio(apellido, "Apellido")) return;
    if (!validarSoloLetras(apellido, "Apellido")) return;
    if (!validarNoVacio(email, "Correo electrónico")) return;
    if (!validarEmail(email)) return;
    if (!pais?.value) {
      alert("Seleccioná un país.");
      setFieldError(pais, true);
      pais?.focus();
      return;
    }

    alert("¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.");
    form.reset();
    setFieldError(nombre, false);
    setFieldError(apellido, false);
    setFieldError(email, false);
    setFieldError(pais, false);
    nombre?.focus();
  });
};

/* ITINERARIO  */

/**
 * Inicializa la vista de Itinerario: render, eliminar y vaciar.
 * @method initItinerario
 * @returns {void}
 */
const initItinerario = () => {
  const $lista = document.getElementById("lista-itinerario");
  const $vacio = document.getElementById("res-empty");
  const $acciones = document.getElementById("acciones-globales");
  const $btnVaciar = document.getElementById("btnVaciarRes");
  if (!$lista) return;

  /**
   * Convierte número a string “USD 1,234”.
   * @private
   * @param {number} n
   * @returns {string}
   */
  const toUSD = (n) => `USD ${Number(n || 0).toLocaleString("en-US")}`;

  /**
   * URL de mapa embebido para un destino.
   * @private
   * @param {string} dest
   * @returns {string}
   */
  const srcMapa = (dest) =>
    `https://www.google.com/maps?q=${encodeURIComponent(
      dest || ""
    )}&output=embed`;

  /**
   * Calcula total del item (días * USD/día).
   * @private
   * @param {Partial<ItinerarioItem>} item
   * @returns {number}
   */
  function calcularTotal(item) {
    const dias = Number(item.dias ?? item.Dias ?? 0);
    const usdDia = Number(item.usdDia ?? item.precioDia ?? item.usd ?? 0);
    return dias * usdDia;
  }

  /**
   * Renderiza la lista completa y ata eventos.
   * @private
   * @returns {void}
   */
  function render() {
    const data = safeJSONParse(localStorage.getItem("itinerario") || "[]", []);
    $lista.innerHTML = "";

    const hayItems = data.length > 0;
    if ($vacio) $vacio.hidden = hayItems;
    if ($acciones) $acciones.hidden = !hayItems;

    if (!hayItems) return;

    data.forEach((item, idx) => {
      const destino = item.destino ?? item.Destino ?? "Destino";
      const fecha = item.fecha ?? item.Fecha ?? "—";
      const dias = item.dias ?? item.Dias ?? "—";
      const usdDia = item.usdDia ?? item.precioDia ?? item.usd ?? "—";
      const total = calcularTotal(item);

      const art = document.createElement("article");
      art.className = "it-card";
      art.innerHTML = `
        <div class="it-card-body">
          <h3 class="it-card-titulo">${destino}</h3>
          <p class="it-card-linea"><strong>DESTINO:</strong> ${destino}</p>
          <p class="it-card-linea"><strong>FECHA:</strong> ${fecha}</p>
          <button class="btn btn-detalles" data-idx="${idx}">DETALLES</button>

          <div class="it-card-detalles" hidden>
            <div class="det-grid">
              <div><span>DÍAS</span><strong>${dias}</strong></div>
              <div><span>USD/día</span><strong>${toUSD(usdDia)}</strong></div>
              <div><span>Total</span><strong>${toUSD(total)}</strong></div>
            </div>
            <div class="det-acciones">
              <button class="btn btn-sec" data-eliminar="${idx}">ELIMINAR</button>
            </div>
          </div>
        </div>

        <div class="it-card-media">
          <iframe class="it-mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                  src="${srcMapa(
                    destino
                  )}" aria-label="Mapa ${destino}"></iframe>
        </div>
      `;
      $lista.appendChild(art);
    });

    // Botones "DETALLES"
    $lista.querySelectorAll(".btn-detalles").forEach((b) => {
      b.onclick = (e) => {
        const card = e.currentTarget.closest(".it-card");
        const panel = card.querySelector(".it-card-detalles");
        const abierto = panel.hidden === false;
        panel.hidden = abierto;
        card.classList.toggle("open", !abierto);
      };
    });

    // Botones "ELIMINAR"
    $lista.querySelectorAll("[data-eliminar]").forEach((b) => {
      b.onclick = (e) => {
        const i = Number(e.currentTarget.getAttribute("data-eliminar"));
        const data = safeJSONParse(
          localStorage.getItem("itinerario") || "[]",
          []
        );
        if (i >= 0 && i < data.length) {
          if (
            !confirm(
              `¿Eliminar "${data[i].destino ?? "este destino"}" del itinerario?`
            )
          )
            return;
          data.splice(i, 1);
          localStorage.setItem("itinerario", JSON.stringify(data));
          render();
        }
      };
    });

    // Botón "VACIAR ITINERARIO"
    if ($btnVaciar) {
      $btnVaciar.onclick = () => {
        const data = safeJSONParse(
          localStorage.getItem("itinerario") || "[]",
          []
        );
        if (data.length === 0) return;
        if (confirm("¿Vaciar todo el itinerario?")) {
          localStorage.removeItem("itinerario");
          render();
        }
      };
    }
  }

  render();
};

/* Inicialización general de la página */
/**
 * @method init
 * @returns {void}
 */
const init = () => {
  initAnio();           // Muestra el año actual en el footer
  initMenu();           // Controla la apertura del menú
  initBuscar();         // Activa el buscador de destinos
  initFiltrosOverlay(); // Maneja el filtro lateral
  initDetalles();       // Habilita el modal de detalles de destino
  initContacto();       // Valida el formulario de contacto
  initItinerario();     // Carga y gestiona las reservas del itinerario
};

document.addEventListener("DOMContentLoaded", init);
