import {
  LETTERS,
  hasAnyLetter,
  isOnlyLettersAndSpaces,
  normalizeSpaces,
  isValidEmail,
  fmtUSD,
  setFieldError,
  syncSingleGridClass,
  fechaValidaNoPasado,
} from "./validate.js";

import {
  readItinerario,
  writeItinerario,
} from "./storage.js";

/* =========================
   FOOTER + MENÚ
   ========================= */
function initAnio() {
  const span = document.getElementById("anio");
  if (span) span.textContent = String(new Date().getFullYear());
}

function initMenu() {
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

  const toggle = () => setExpanded(!wrapper.classList.contains("is-open"));
  const onDocClick = (ev) => {
    if (wrapper.classList.contains("is-open") && !wrapper.contains(ev.target)) setExpanded(false);
  };
  const onEsc = (ev) => {
    if (ev.key === "Escape" && wrapper.classList.contains("is-open")) {
      setExpanded(false); btn.focus();
    }
  };

  btn.addEventListener("click", toggle);
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onEsc);
}

/* =========================
   BÚSQUEDA (Destinos)
   ========================= */
function initBuscar() {
  const form = document.getElementById("form-buscar");
  const q = document.getElementById("q");
  const grid = document.getElementById("destinosGrid");
  if (!form || !q || !grid) return;

  // Evitar inicialización duplicada al volver a /destinos
  if (form.dataset.inited === "1") return;
  form.dataset.inited = "1";

  // Remover restos de inits anteriores
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
      // Mostrar cartel de "No se encontraron..." y dejar el botón Ver todos
      showStatus(typed, 0);
      // Limpiar el input, pero mantener visible el estado (pasamos 'typed' arriba)
      q.value = "";
      // (opcional) enfocá el botón Ver todos
      // btnVerTodo.focus?.();
      return;
    }

    // Si hay resultados o no hay término, mostrar/ocultar estado según corresponda
    showStatus(typed, count);
  });

  // “Ver todos” siempre limpia la búsqueda
  btnVerTodo.addEventListener("click", resetear);
}





/* =========================
   FILTROS (Destinos)
   ========================= */
function initFiltrosOverlay() {
  const btnOpen = document.getElementById("btnFiltros");
  const overlay = document.getElementById("filtrosOverlay");
  const form = document.getElementById("form-filtros");
  if (!btnOpen || !overlay || !form) return;

  const grid = document.getElementById("destinosGrid");
  const rango = document.getElementById("rangoPrecio");
  const out = document.getElementById("precioOut");
  const categoria = document.getElementById("categoria");
  const orden = document.getElementById("orden");

  const setOpen = (v) => {
    overlay.hidden = !v;
    document.body.style.overflow = v ? "hidden" : "";
    btnOpen.setAttribute("aria-expanded", String(v));
  };

  btnOpen.addEventListener("click", () => setOpen(true));
  overlay.querySelector(".filtros-close")?.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", (e) => { if (e.target.dataset.close === "1") setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) setOpen(false); });

  const writeOut = () => { if (out && rango) out.textContent = rango.value; };
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
      return orden.value === "asc" ? an.localeCompare(bn) : bn.localeCompare(an);
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
}

/* =========================
   DETALLES + SLIDER + RESERVA
   ========================= */
let sliderIndex = 0;
let sliderPaths = [];
let precioDiaActual = null;
let destinoActual = null;

function getGaleria(card) {
  const direct = ["img1", "img2", "img3"].map((k) => card.dataset[k]).filter(Boolean);
  if (direct.length) return direct;
  const EXT = ["jpg", "jpeg", "webp", "avif"];
  const id = card.dataset.id;
  const bases = [1, 2, 3].map((n) => `/imagenes/detalle/${id}${n}`); // ajustá si tu carpeta es distinta
  const combos = [];
  for (let i = 0; i < bases.length; i++)
    for (let j = 0; j < EXT.length; j++) combos.push(`${bases[i]}.${EXT[j]}`);
  return combos;
}

function abrirModal(card) {
  if (!card) return;
  const nombre = card.dataset.nombre || card.querySelector(".card-title")?.textContent || "Destino";
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
    const setSrc = (i) => {
      sliderIndex = i % sliderPaths.length;
      img.src = sliderPaths[sliderIndex];
      img.alt = `Imagen ${sliderIndex + 1} de ${nombre}`;
    };
    img.onerror = () => setSrc((sliderIndex + 1) % sliderPaths.length);
    setSrc(0);
  }

  if (h3) h3.textContent = `${nombre}: Detalle de destino`;
  const hist = (card.dataset.historia || "").trim();
  const atr = (card.dataset.atracciones || "").trim();
  const dur = (card.dataset.duracion || "").trim();
  const temp = (card.dataset.temporada || "").trim();

  if (pHist) pHist.textContent = hist || `Historia breve de ${nombre}.`;
  if (pAtr) pAtr.textContent = atr || `Atracciones principales de ${nombre}.`;

  if (pExtra) {
    const partes = [];
    if (dur) partes.push(`<strong>Duración sugerida:</strong> ${dur} día${Number(dur) === 1 ? "" : "s"}`);
    if (temp) partes.push(`<strong>Mejor época:</strong> ${temp}`);
    partes.push(
      `<strong>Precio por día aprox.:</strong> USD ${
        Number.isFinite(precioDiaActual) && precioDiaActual > 0 ? fmtUSD(precioDiaActual) : "—"
      }`
    );
    pExtra.innerHTML = partes.join("<br>");
  }

  // limpiar form
  const f = document.getElementById("res-fecha");
  const d = document.getElementById("res-dias");
  const out = document.getElementById("res-total");
  const btnRes = document.getElementById("btnReservar");
  if (f) { f.value = ""; setFieldError(f, false); }
  if (d) { d.value = ""; setFieldError(d, false); }
  if (out) out.textContent = "";
  if (btnRes) btnRes.hidden = true;

  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.hidden = true;
  document.body.style.overflow = "";
}

function moverSlider(dir) {
  const img = document.getElementById("slider-img");
  if (!img || sliderPaths.length === 0) return;
  sliderIndex = (sliderIndex + dir + sliderPaths.length) % sliderPaths.length;
  img.src = sliderPaths[sliderIndex];
  img.alt = `Imagen ${sliderIndex + 1} de ${destinoActual || "Destino"}`;
}

function initDetalles() {
  const grid = document.getElementById("destinosGrid");
  if (!grid) return;

  grid.querySelectorAll(".btn-detalles").forEach((btn) => {
    btn.addEventListener("click", () => abrirModal(btn.closest(".card")));
  });

  const modal = document.getElementById("modal");
  document.getElementById("modal-close")?.addEventListener("click", cerrarModal);
  modal?.addEventListener("click", (e) => { if (e.target.dataset.close === "1") cerrarModal(); });
  document.querySelector(".slider-prev")?.addEventListener("click", () => moverSlider(-1));
  document.querySelector(".slider-next")?.addEventListener("click", () => moverSlider(1));
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
      alert(`Ingresá una cantidad de días válida (entero entre 1 y ${MAX_DIAS}).`);
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
      alert("Primero calculá el costo."); return;
    }
    // Guardamos usando tus helpers para mantener consistencia
    const items = readItinerario();
    items.push({
      destino: destinoActual || "Destino",
      fecha,
      dias,
      precioDia: precioDiaActual,
      total: Math.round(total),
    });
    writeItinerario(items);
    alert("¡Reserva guardada en tu Itinerario!");
    cerrarModal();
  });
}

/* =========================
   CONTACTO (validaciones)
   ========================= */
function validarNoVacio(el, nombreCampo) {
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
}

function validarSoloLetras(el, nombreCampo) {
  const v = (el?.value || "").trim();
  if (!isOnlyLettersAndSpaces(v)) {
    alert(`"${nombreCampo}" debe tener solo letras y espacios (2 a 40 caracteres).`);
    setFieldError(el, true);
    el.value = "";
    el.focus();
    return false;
  }
  setFieldError(el, false);
  return true;
}

function validarEmailInput(el) {
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
}

function initContacto() {
  const form = document.getElementById("form-contacto");
  if (!form) return;

  if (form.dataset.inited === "1") return;
  form.dataset.inited = "1";

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const pais = document.getElementById("pais");

  // Usamos handlers directos (oninput/onchange) para no acumular
  const filtrarLetrasEspacios = (el) => {
    if (!el) return;
    el.oninput = () => {
      const orig = el.value || "";
      let limpio = "";
      for (let i = 0; i < orig.length; i++) {
        const ch = orig[i], low = ch.toLowerCase();
        if (ch === " " || LETTERS.indexOf(low) !== -1) limpio += ch;
      }
      if (limpio !== orig) el.value = limpio;
      setFieldError(el, false);
    };
  };
  filtrarLetrasEspacios(nombre);
  filtrarLetrasEspacios(apellido);

  if (email) email.oninput = () => setFieldError(email, false);
  if (pais) pais.onchange = () => setFieldError(pais, false);

  // Un solo submit handler
  form.onsubmit = (ev) => {
    ev.preventDefault();
    if (!validarNoVacio(nombre, "Nombre")) return;
    if (!validarSoloLetras(nombre, "Nombre")) return;
    if (!validarNoVacio(apellido, "Apellido")) return;
    if (!validarSoloLetras(apellido, "Apellido")) return;
    if (!validarNoVacio(email, "Correo electrónico")) return;
    if (!validarEmailInput(email)) return;
    if (!pais?.value) {
      alert("Seleccioná un país."); setFieldError(pais, true); pais?.focus(); return;
    }

    alert("¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.");
    form.reset();
    setFieldError(nombre, false);
    setFieldError(apellido, false);
    setFieldError(email, false);
    setFieldError(pais, false);
    nombre?.focus();
  };
}


/* =========================
   ITINERARIO (render/eliminar/vaciar)
   ========================= */
function initItinerario() {
  const $lista = document.getElementById("lista-itinerario");
  const $vacio = document.getElementById("res-empty");
  const $acciones = document.getElementById("acciones-globales");
  const $btnVaciar = document.getElementById("btnVaciarRes");
  if (!$lista) return;

  const toUSD = (n) => `USD ${Number(n || 0).toLocaleString("en-US")}`;
  const srcMapa = (dest) =>
    `https://www.google.com/maps?q=${encodeURIComponent(dest || "")}&output=embed`;

  function calcularTotal(item) {
    const dias = Number(item.dias ?? 0);
    const usdDia = Number(item.precioDia ?? 0);
    return dias * usdDia;
  }

  function render() {
    const data = readItinerario();
    $lista.innerHTML = "";

    const hayItems = data.length > 0;
    if ($vacio) $vacio.hidden = hayItems;
    if ($acciones) $acciones.hidden = !hayItems;
    if (!hayItems) return;

    data.forEach((item, idx) => {
      const destino = item.destino ?? "Destino";
      const fecha = item.fecha ?? "—";
      const dias = item.dias ?? "—";
      const usdDia = item.precioDia ?? 0;
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
                  src="${srcMapa(destino)}" aria-label="Mapa ${destino}"></iframe>
        </div>
      `;
      $lista.appendChild(art);
    });

    // Toggle detalles
    $lista.querySelectorAll(".btn-detalles").forEach((b) => {
      b.onclick = (e) => {
        const card = e.currentTarget.closest(".it-card");
        const panel = card.querySelector(".it-card-detalles");
        const abierto = panel.hidden === false;
        panel.hidden = abierto;
        card.classList.toggle("open", !abierto);
      };
    });

    // Eliminar
    $lista.querySelectorAll("[data-eliminar]").forEach((b) => {
      b.onclick = (e) => {
        const i = Number(e.currentTarget.getAttribute("data-eliminar"));
        const curr = readItinerario();
        if (i >= 0 && i < curr.length) {
          if (!confirm(`¿Eliminar "${curr[i].destino ?? "este destino"}" del itinerario?`)) return;
          curr.splice(i, 1);
          writeItinerario(curr);
          render();
        }
      };
    });

    // Vaciar
    if ($btnVaciar) {
      $btnVaciar.onclick = () => {
        const curr = readItinerario();
        if (curr.length === 0) return;
        if (confirm("¿Vaciar todo el itinerario?")) {
          writeItinerario([]);
          render();
        }
      };
    }
  }

  render();
}

/* =========================
   AUTO-INIT por ruta (SPA)
   ========================= */
function runPerRoute() {
  initAnio();
  initMenu();

  // Destinos
  if (document.getElementById("destinosGrid")) {
    initBuscar();
    initFiltrosOverlay();
    initDetalles();
  }

  // Contacto (si no lo llama la página)
  if (document.getElementById("form-contacto")) {
    initContacto();
  }

  // Itinerario (si no lo llama la página)
  if (document.getElementById("lista-itinerario")) {
    initItinerario();
  }
}

function init() {
  runPerRoute();
}

if (typeof window !== "undefined") {
  // Exponer igual que tu script original
  window.initAnio = initAnio;
  window.initMenu = initMenu;
  window.initBuscar = initBuscar;
  window.initFiltrosOverlay = initFiltrosOverlay;
  window.initDetalles = initDetalles;
  window.initContacto = initContacto;
  window.initItinerario = initItinerario;
  window.init = init;

  // Disparar en carga y al cambiar de ruta (HashRouter)
  window.addEventListener("DOMContentLoaded", init);
  window.addEventListener("hashchange", runPerRoute);
}

export {
  initAnio, initMenu, initBuscar, initFiltrosOverlay,
  initDetalles, initContacto, initItinerario, init
};
