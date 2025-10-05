/* ========================= UTILIDADES ========================= */

/**
 * Indica si el elemento existe 
 * @method ok
 * @param {any} el - Valor a evaluar.
 * @returns {boolean} 
 */
const ok = (el) => !!el;

/**
 * Formatea un número a 2 decimales simples para mostrar en USD.
 * @method fmtUSD
 * @param {number} n - Número a formatear.
 * @returns {string} Cadena con el número redondeado o "0".
 */
const fmtUSD = (n) => (Number.isFinite(n) ? (Math.round(n * 100) / 100).toString() : '0');

/**
 * Marca o limpia estado de error accesible en un campo.
 * @method setFieldError
 * @param {HTMLElement} el - Elemento input/select/etc.
 * @param {boolean} hasError - true si hay error.
 * @returns {void}
 */
const setFieldError = (el, hasError) => {
  if (!el) return;
  el.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  el.classList.toggle('is-invalid', !!hasError);
};

/**
 * Cuenta tarjetas visibles y aplica layout “is-single” si hay solo 1.
 * @method syncSingleGridClass
 * @param {HTMLElement} grid - Contenedor de tarjetas
 * @returns {void}
 */
const syncSingleGridClass = (grid) => {
  if (!ok(grid)) return;
  const visibles = [...grid.querySelectorAll('.card')].filter((c) => c.style.display !== 'none');
  grid.classList.toggle('is-single', visibles.length === 1);
};

/**
 * Parsea JSON si hay error.
 * @method safeJSONParse
 * @param {string} txt - Texto JSON.
 * @param {any} fallback - Valor por defecto
 * @returns {any} 
 */
const safeJSONParse = (txt, fallback) => {
  try { return JSON.parse(txt); } catch { return fallback; }
};


/* ========================= FOOTER ========================= */

/**
 * Coloca el año actual en el footer.
 * @method initAnio
 * @returns {void}
 */
const initAnio = () => {
  const span = document.getElementById('anio');
  if (span) span.textContent = String(new Date().getFullYear());
};


/* ========================= MENÚ ========================= */

/**
 * Inicializa el menú (abre/cierra con click, clic afuera)
 * @method initMenu
 * @returns {void}
 */
const initMenu = () => {
  const btn = document.getElementById('btnMenu');
  const wrapper = document.getElementById('menuWrapper');
  const panel = document.getElementById('panelMenu');
  if (!btn || !wrapper || !panel) return;

  const icon = btn.querySelector('.material-symbols-outlined');

  /**
   * Cambia el estado del menú.
   * @method setExpanded
   * @param {boolean} v - true para abrir, false para cerrar.
   * @returns {void}
   */
  const setExpanded = (v) => {
    btn.setAttribute('aria-expanded', String(v));
    wrapper.classList.toggle('is-open', v);
    if (icon) icon.textContent = v ? 'close' : 'menu';
  };

  btn.addEventListener('click', () => setExpanded(!wrapper.classList.contains('is-open')));

  document.addEventListener('click', (ev) => {
    if (wrapper.classList.contains('is-open') && !wrapper.contains(ev.target)) setExpanded(false);
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && wrapper.classList.contains('is-open')) {
      setExpanded(false);
      btn.focus();
    }
  });
};


/* ========================= BÚSQUEDA ========================= */

/**
 * Filtra por nombre de destino al enviar el form. Maneja estado vacío.
 * @method initBuscar
 * @returns {void}
 */
const initBuscar = () => {
  const form = document.getElementById('form-buscar');
  const q = document.getElementById('q');
  const grid = document.getElementById('destinosGrid');
  if (!form || !q || !grid) return;

  /** @type {HTMLDivElement|null} */
  let emptyEl = null;

  /**
   * Muestra/oculta el mensaje de “sin resultados”.
   * @method showEmpty
   * @param {boolean} noHay - true si no hay resultados.
   * @returns {void}
   */
  const showEmpty = (noHay) => {
    if (noHay) {
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'empty-msg';
        emptyEl.textContent = 'No se encontraron destinos. ';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'link-reset';
        btn.textContent = 'Ver todos';
        btn.addEventListener('click', resetear);
        emptyEl.appendChild(btn);
        grid.before(emptyEl);
      }
    } else {
      emptyEl?.remove();
      emptyEl = null;
    }
  };

  /**
   * Aplica filtro por texto (nombre del destino).
   * @method filtrar
   * @param {string} txt - Término de búsqueda.
   * @returns {void}
   */
  const filtrar = (txt) => {
    const term = (txt || '').trim().toLowerCase();
    let visibles = 0;
    [...grid.querySelectorAll('.card')].forEach((card) => {
      const nombre = (card.dataset.nombre || card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const show = !term || nombre.includes(term);
      card.style.display = show ? '' : 'none';
      if (show) visibles++;
    });
    showEmpty(visibles === 0);
    syncSingleGridClass(grid);
  };

  /**
   * Restablece tarjetas visibles, limpia buscador y filtros.
   * @method resetear
   * @returns {void}
   */
  const resetear = () => {
    [...grid.querySelectorAll('.card')].forEach((c) => (c.style.display = ''));
    q.value = '';
    const rango = document.getElementById('rangoPrecio');
    const cat = document.getElementById('categoria');
    const ord = document.getElementById('orden');
    if (rango) rango.value = rango.max || '300';
    if (cat) cat.value = 'todas';
    if (ord) ord.value = 'asc';
    showEmpty(false);
    syncSingleGridClass(grid);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = q.value.replace(/\s+/g, ' ').trim();
    if (term && !/[a-záéíóúñ]/i.test(term)) {
      alert('Ingresá letras para buscar un destino.');
      q.focus();
      return;
    }
    filtrar(term);
  });

  document.getElementById('btnVerTodo')?.addEventListener('click', resetear);
};


/* ========================= FILTROS (overlay) ========================= */

/**
 * Abre/cierra filtros y aplica precio/categoría/orden.
 * @method initFiltrosOverlay
 * @returns {void}
 */
const initFiltrosOverlay = () => {
  const btnOpen = document.getElementById('btnFiltros');
  const overlay = document.getElementById('filtrosOverlay');
  const form = document.getElementById('form-filtros');
  if (!btnOpen || !overlay || !form) return;

  const grid = document.getElementById('destinosGrid');
  const rango = document.getElementById('rangoPrecio');
  const out = document.getElementById('precioOut');
  const categoria = document.getElementById('categoria');
  const orden = document.getElementById('orden');

  /**
   * Cambia visibilidad 
   * @method setOpen
   * @param {boolean} v - true abre, false cierra.
   * @returns {void}
   */
  const setOpen = (v) => {
    overlay.hidden = !v;
    document.body.style.overflow = v ? 'hidden' : '';
    btnOpen.setAttribute('aria-expanded', String(v));
  };

  btnOpen.addEventListener('click', () => setOpen(true));
  overlay.querySelector('.filtros-close')?.addEventListener('click', () => setOpen(false));
  overlay.addEventListener('click', (e) => { if (e.target.dataset.close === '1') setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) setOpen(false); });

  /**
   * Actualiza el output del rango de precio.
   * @method writeOut
   * @returns {void}
   */
  const writeOut = () => { if (out && rango) out.textContent = rango.value; };
  rango?.addEventListener('input', writeOut);
  writeOut();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!grid || !rango || !categoria || !orden) return;

    const maxPrecio = Number(rango.value);
    const cat = (categoria.value || 'todas').toLowerCase();
    const cards = [...grid.querySelectorAll('.card')];

    cards.forEach((card) => {
      const precio = Number(card.dataset.precio || '999999');
      const cats = (card.dataset.categorias || '')
        .toLowerCase()
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const pasaPrecio = Number.isFinite(precio) ? precio <= maxPrecio : true;
      const pasaCat = cat === 'todas' ? true : cats.includes(cat);
      card.style.display = pasaPrecio && pasaCat ? '' : 'none';
    });

    const visibles = cards.filter((c) => c.style.display !== 'none');
    visibles.sort((a, b) => {
      const an = (a.dataset.nombre || '').toLowerCase();
      const bn = (b.dataset.nombre || '').toLowerCase();
      return orden.value === 'asc' ? an.localeCompare(bn) : bn.localeCompare(an);
    });
    visibles.forEach((c) => grid.appendChild(c));

    syncSingleGridClass(grid);
    setOpen(false);
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      if (!grid) return;
      grid.querySelectorAll('.card').forEach((c) => (c.style.display = ''));
      writeOut();
      syncSingleGridClass(grid);
    }, 0);
  });
};


/* ========================= DETALLES + RESERVA ========================= */

/** @type {number} Índice actual del slider */
let sliderIndex = 0;
/** @type {string[]} Rutas de imágenes del slider */
let sliderPaths = [];
/** @type {number|null} Precio por día del destino actual */
let precioDiaActual = null;
/** @type {string|null} Nombre del destino actual */
let destinoActual = null;

/**
 * Obtiene rutas de imágenes para el slider del modal.
 * Usa data-img1/2/3 si existen; si no, arma combinaciones por extensión.
 * @method getGaleria
 * @param {HTMLElement} card - Tarjeta con data-* del destino.
 * @returns {string[]} Lista de rutas de imagen candidatas.
 */
const getGaleria = (card) => {
  const direct = ['img1', 'img2', 'img3'].map((k) => card.dataset[k]).filter(Boolean);
  if (direct.length) return direct;
  const EXT = ['jpg', 'jpeg', 'webp', 'avif'];
  const id = card.dataset.id;
  const bases = [1, 2, 3].map((n) => `imagenes/destinos/detalle/${id}${n}`);
  const combos = [];
  for (const b of bases) for (const e of EXT) combos.push(`${b}.${e}`);
  return combos;
};

/**
 * Abre el modal de detalles y prepara slider e información del destino.
 * Limpia la sección de reserva anterior y bloquea el scroll de fondo.
 * @method abrirModal
 * @param {HTMLElement} card - Tarjeta del destino seleccionado.
 * @returns {void}
 */
const abrirModal = (card) => {
  const nombre = card.dataset.nombre || card.querySelector('.card-title')?.textContent || 'Destino';
  destinoActual = nombre;
  precioDiaActual = Number(card.dataset.precio || 0);

  const modal = document.getElementById('modal');
  const img = document.getElementById('slider-img');
  const h3 = document.getElementById('modal-title');
  const pHist = document.getElementById('modal-historia');
  const pAtr = document.getElementById('modal-atracciones');
  const pExtra = document.getElementById('modal-extra');

  sliderIndex = 0;
  sliderPaths = getGaleria(card);

  if (img && sliderPaths.length) {
    /**
     * Cambia la imagen actual del slider por índice.
     * @method setSrc
     * @param {number} i - Índice a mostrar.
     * @returns {void}
     */
    const setSrc = (i) => {
      sliderIndex = i % sliderPaths.length;
      img.src = sliderPaths[sliderIndex];
      img.alt = `Imagen ${sliderIndex + 1} de ${nombre}`;
    };
    img.onerror = () => {
      // Si falla la carga, avanza a la siguiente
      setSrc((sliderIndex + 1) % sliderPaths.length);
    };
    setSrc(0);
  }

  if (h3) h3.textContent = `${nombre}: Detalle de destino`;
  const hist = card.dataset.historia?.trim();
  const atr = card.dataset.atracciones?.trim();
  const dur = card.dataset.duracion?.trim();
  const temp = card.dataset.temporada?.trim();
  if (pHist) pHist.textContent = hist || `Historia breve de ${nombre}. (Reemplazar con contenido real.)`;
  if (pAtr) pAtr.textContent = atr || `Atracciones principales de ${nombre}. (Reemplazar con contenido real.)`;

if (pExtra) {
  const partes = [];
  if (dur) partes.push(`<strong>Duración sugerida:</strong> ${dur} día${/^\d+$/.test(dur) && Number(dur) !== 1 ? 's' : ''}`);
  if (temp) partes.push(`<strong>Mejor época:</strong> ${temp}`);
  partes.push(`<strong>Precio por día aprox.:</strong> USD ${Number.isFinite(precioDiaActual) && precioDiaActual > 0 ? fmtUSD(precioDiaActual) : '—'}`);
  pExtra.innerHTML = partes.join('<br>');
}

  // Limpiar reserva
  const f = document.getElementById('res-fecha');
  const d = document.getElementById('res-dias');
  const out = document.getElementById('res-total');
  const btnRes = document.getElementById('btnReservar');
  if (f) { f.value = ''; setFieldError(f, false); }
  if (d) { d.value = ''; setFieldError(d, false); }
  if (out) out.textContent = '';
  if (btnRes) btnRes.hidden = true;

  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
};

/**
 * Cierra el modal de detalles y libera el scroll.
 * @method cerrarModal
 * @returns {void}
 */
const cerrarModal = () => {
  const modal = document.getElementById('modal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
};

/**
 * Mueve el slider de imágenes del modal.
 * @method moverSlider
 * @param {number} dir - -1 anterior, +1 siguiente.
 * @returns {void}
 */
const moverSlider = (dir) => {
  const img = document.getElementById('slider-img');
  if (!img || sliderPaths.length === 0) return;
  sliderIndex = (sliderIndex + dir + sliderPaths.length) % sliderPaths.length;
  img.src = sliderPaths[sliderIndex];
  img.alt = `Imagen ${sliderIndex + 1} de ${destinoActual || 'Destino'}`;
};

/**
 * Valida fecha con formato yyyy-mm-dd y que no sea anterior a hoy.
 * @method fechaValidaNoPasado
 * @param {string} yyyy_mm_dd - Fecha en formato ISO corto (YYYY-MM-DD).
 * @returns {boolean} true si la fecha es válida y >= hoy.
 */
const fechaValidaNoPasado = (yyyy_mm_dd) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(yyyy_mm_dd)) return false;
  const f = new Date(`${yyyy_mm_dd}T00:00:00`);
  if (Number.isNaN(f.getTime())) return false;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  return f.getTime() >= hoy.getTime();
};

/**
 * Inicializa listeners de detalles/slider/reserva y su validación.
 * @method initDetalles
 * @returns {void}
 */
const initDetalles = () => {
  const grid = document.getElementById('destinosGrid');
  if (!grid) return;

  grid.querySelectorAll('.btn-detalles').forEach((btn) => {
    btn.addEventListener('click', () => abrirModal(btn.closest('.card')));
  });

  const modal = document.getElementById('modal');
  document.getElementById('modal-close')?.addEventListener('click', cerrarModal);
  modal?.addEventListener('click', (e) => { if (e.target.dataset.close === '1') cerrarModal(); });
  document.querySelector('.slider-prev')?.addEventListener('click', () => moverSlider(-1));
  document.querySelector('.slider-next')?.addEventListener('click', () => moverSlider(1));
  document.addEventListener('keydown', (ev) => {
    if (!modal || modal.hidden) return;
    if (ev.key === 'Escape') cerrarModal();
    if (ev.key === 'ArrowLeft') moverSlider(-1);
    if (ev.key === 'ArrowRight') moverSlider(1);
  });

  // Reserva
  const MAX_DIAS = 60;
  const btnCalcular = document.getElementById('btnCalcular');
  const btnReservar = document.getElementById('btnReservar');
  const inpFecha = document.getElementById('res-fecha');
  const inpDias = document.getElementById('res-dias');
  const outTotal = document.getElementById('res-total');

  btnCalcular?.addEventListener('click', () => {
    const fecha = inpFecha?.value || '';
    const dias = Number(inpDias?.value);

    setFieldError(inpFecha, false);
    setFieldError(inpDias, false);

    if (!fecha || !fechaValidaNoPasado(fecha)) {
      alert('Elegí una fecha válida que no sea anterior a hoy.');
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
      alert('No hay precio por día disponible para este destino.');
      return;
    }

    const total = dias * precioDiaActual;
    outTotal && (outTotal.textContent = `Costo estimado: USD ${fmtUSD(total)}`);
    if (btnReservar) {
      btnReservar.hidden = false;
      btnReservar.dataset.total = String(total);
      btnReservar.dataset.dias = String(dias);
      btnReservar.dataset.fecha = fecha;
    }
  });

  btnReservar?.addEventListener('click', () => {
    const fecha = btnReservar.dataset.fecha;
    const dias = Number(btnReservar.dataset.dias);
    const total = Number(btnReservar.dataset.total);
    if (!fecha || !Number.isFinite(dias) || !Number.isFinite(total)) {
      alert('Primero calculá el costo.');
      return;
    }
    const viajes = safeJSONParse(localStorage.getItem('itinerario') || '[]', []);
    viajes.push({
      destino: destinoActual || 'Destino',
      fecha,
      dias,
      precioDia: precioDiaActual,
      total: Math.round(total)
    });
    localStorage.setItem('itinerario', JSON.stringify(viajes));
    alert('¡Reserva guardada en tu Itinerario!');
    cerrarModal();
  });
};


/* ========================= CONTACTO ========================= */

/**
 * Valida campo obligatorio y setea estado de error accesible.
 * @method validarNoVacio
 * @param {HTMLInputElement} el - Input a validar.
 * @param {string} nombreCampo - Nombre legible del campo.
 * @returns {boolean} Si el valor es válido.
 */
const validarNoVacio = (el, nombreCampo) => {
  const valor = (el?.value || '').trim();
  setFieldError(el, false);
  if (!valor) {
    alert(`El campo "${nombreCampo}" es obligatorio.`);
    setFieldError(el, true);
    el.value = '';
    el.focus();
    return false;
  }
  return true;
};

/**
 * Valida que el texto contenga solo letras y espacios (2–40).
 * @method validarSoloLetras
 * @param {HTMLInputElement} el - Input a validar.
 * @param {string} nombreCampo - Nombre legible del campo.
 * @returns {boolean} true si es válido.
 */
const validarSoloLetras = (el, nombreCampo) => {
  const v = (el?.value || '').trim();
  if (v.length < 2 || v.length > 40 || !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(v)) {
    alert(`"${nombreCampo}" debe tener solo letras y espacios (2 a 40 caracteres).`);
    setFieldError(el, true);
    el.value = '';
    el.focus();
    return false;
  }
  setFieldError(el, false);
  return true;
};

/**
 * Valida email y largo máximo (≤ 60).
 * @method validarEmail
 * @param {HTMLInputElement} el - Input email.
 * @returns {boolean} true si es válido.
 */
const validarEmail = (el) => {
  const valor = (el?.value || '').trim();
  setFieldError(el, false);
  if (valor.length > 60) {
    alert('El correo es demasiado largo (máximo 60 caracteres).');
    setFieldError(el, true);
    el.focus();
    return false;
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(valor)) {
    alert('Ingresá un correo electrónico válido (ej: nombre@dominio.com).');
    setFieldError(el, true);
    el.value = '';
    el.focus();
    return false;
  }
  return true;
};

/**
 * Inicializa validaciones y envío del formulario de contacto.
 * Bloquea números/símbolos en nombre y apellido.
 * @method initContacto
 * @returns {void}
 */
const initContacto = () => {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const email = document.getElementById('email');
  const pais = document.getElementById('pais');

  // Bloqueo de números/símbolos para nombre/apellido
  const bloquearNumeros = (el) => {
    el?.addEventListener('input', () => {
      const limpio = el.value.replace(/[0-9._\-+*/=<>|\\[\]{}!"#$%&'`^~,:;?]/g, '');
      if (limpio !== el.value) el.value = limpio;
      setFieldError(el, false);
    });
  };
  bloquearNumeros(nombre);
  bloquearNumeros(apellido);

  email?.addEventListener('input', () => setFieldError(email, false));
  pais?.addEventListener('change', () => setFieldError(pais, false));

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!validarNoVacio(nombre, 'Nombre')) return;
    if (!validarSoloLetras(nombre, 'Nombre')) return;
    if (!validarNoVacio(apellido, 'Apellido')) return;
    if (!validarSoloLetras(apellido, 'Apellido')) return;
    if (!validarNoVacio(email, 'Correo electrónico')) return;
    if (!validarEmail(email)) return;
    if (!pais?.value) {
      alert('Seleccioná un país.');
      setFieldError(pais, true);
      pais?.focus();
      return;
    }

    alert('¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.');
    form.reset();
    setFieldError(nombre, false);
    setFieldError(apellido, false);
    setFieldError(email, false);
    setFieldError(pais, false);
    nombre?.focus();
  });
};

/**
 * Inicializa la página de Itinerario con tarjetas expandibles
 * @method initItinerario
 * @returns {void}
 */
const initItinerario = () => {
  const $lista = document.getElementById('lista-itinerario');
  const $vacio = document.getElementById('res-empty');
  const $acciones = document.getElementById('acciones-globales');
  const $btnVaciar = document.getElementById('btnVaciarRes');
  
  if (!$lista) return;

  const toUSD = (n) => `USD ${Number(n || 0).toLocaleString('en-US')}`;
  const srcMapa = (dest) => `https://www.google.com/maps?q=${encodeURIComponent(dest || '')}&output=embed`;

  function calcularTotal(item) {
    const dias = Number(item.dias ?? item.Dias ?? 0);
    const usdDia = Number(item.usdDia ?? item.precioDia ?? item.usd ?? 0);
    return dias * usdDia;
  }

  function render() {
    const data = safeJSONParse(localStorage.getItem('itinerario') || '[]', []);
    $lista.innerHTML = '';

    if (data.length === 0) {
      $vacio.hidden = false;
      $acciones.hidden = true;
      return;
    }
    $vacio.hidden = true;

    data.forEach((item, idx) => {
      const destino = item.destino ?? item.Destino ?? 'Destino';
      const fecha = item.fecha ?? item.Fecha ?? '—';
      const dias = item.dias ?? item.Dias ?? '—';
      const usdDia = item.usdDia ?? item.precioDia ?? item.usd ?? '—';
      const total = calcularTotal(item);

      const art = document.createElement('article');
      art.className = 'it-card';
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

    // Listeners botón detalles
    $lista.querySelectorAll('.btn-detalles').forEach((b) => {
      b.onclick = (e) => {
        const card = e.currentTarget.closest('.it-card');
        const panel = card.querySelector('.it-card-detalles');
        const abierto = panel.hidden === false;
        panel.hidden = abierto;
        card.classList.toggle('open', !abierto);

        const data = safeJSONParse(localStorage.getItem('itinerario') || '[]', []);
        const algunoAbierto = data.length > 0 && [...document.querySelectorAll('.it-card-detalles')].some((p) => p.hidden === false);
        $acciones.hidden = !algunoAbierto;
      };
    });

    // Listeners botón eliminar
    $lista.querySelectorAll('[data-eliminar]').forEach((b) => {
      b.onclick = (e) => {
        const i = Number(e.currentTarget.getAttribute('data-eliminar'));
        const data = safeJSONParse(localStorage.getItem('itinerario') || '[]', []);
        if (i >= 0 && i < data.length) {
          if (!confirm(`¿Eliminar "${data[i].destino}" del itinerario?`)) return;
          data.splice(i, 1);
          localStorage.setItem('itinerario', JSON.stringify(data));
          render();
        }
      };
    });

    // Botón vaciar
    if ($btnVaciar) {
      $btnVaciar.onclick = () => {
        if (confirm('¿Vaciar todo el itinerario?')) {
          localStorage.removeItem('itinerario');
          render();
        }
      };
    }
  }

  render();
};
/* ========================= INIT GLOBAL ========================= */

/**
 * Punto de entrada: inicializa todas las secciones necesarias
 * según los elementos presentes en cada página.
 * @method init
 * @returns {void}
 */
const init = () => {
  initAnio();
  initMenu();
  initBuscar();          
  initFiltrosOverlay();  
  initDetalles();        
  initContacto();        
  initItinerario();      
};

document.addEventListener('DOMContentLoaded', init);
