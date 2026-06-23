/* ===== DATOS ===== */
/* Lista de destinos. Cada destino se renderiza dinámicamente en destinos.html */
const destinos = [
  {
    id: "amalfi",
    nombre: "Amalfi",
    precio: 200,
    categorias: ["playa", "cultural"],
    duracion: 5,
    temporada: "Mayo-junio o septiembre-octubre",
    historia: "La ciudad de Amalfi fue una de las repúblicas marítimas más importantes de Italia en la Edad Media, destacándose por su comercio en el Mediterráneo. Su prosperidad dejó huella en sus iglesias y arquitectura, y hoy es Patrimonio de la Humanidad por la UNESCO.",
    atracciones: "Catedral de San Andrés, casas blancas colgadas de la montaña, playas como Marina Grande y caminos costeros con vistas espectaculares.",
    imagen: "imagenes/destinos/amalfi.avif",
    galeria: ["imagenes/destinos/detalle/amalfi1.webp", "imagenes/destinos/detalle/amalfi2.avif", "imagenes/destinos/detalle/amalfi3.avif"],
  },
  {
    id: "bali",
    nombre: "Bali",
    precio: 90,
    categorias: ["playa", "exotica"],
    duracion: 7,
    temporada: "Abril-octubre (estación seca)",
    historia: "Bali se distingue dentro de Indonesia por su fuerte identidad cultural hinduista. La isla es reconocida por sus tradiciones artísticas, la danza y la espiritualidad.",
    atracciones: "Templos Tanah Lot y Uluwatu, arrozales de Ubud, playas de surf en Kuta, retiros de yoga y cascadas.",
    imagen: "imagenes/destinos/bali.jpg",
    galeria: ["imagenes/destinos/detalle/bali1.jpg", "imagenes/destinos/detalle/bali2.jpg", "imagenes/destinos/detalle/bali3.webp"],
  },
  {
    id: "barcelona",
    nombre: "Barcelona",
    precio: 160,
    categorias: ["urbana", "cultural"],
    duracion: 4,
    temporada: "Abril-junio o septiembre-octubre",
    historia: "Fundada por los romanos, Barcelona creció como ciudad portuaria y en el siglo XIX fue el centro del modernismo catalán, con Gaudí como figura clave.",
    atracciones: "Sagrada Familia, Parque Güell, Barrio Gótico, Las Ramblas y playas urbanas.",
    imagen: "imagenes/destinos/barcelona.jpg",
    galeria: ["imagenes/destinos/detalle/barcelona1.jpg", "imagenes/destinos/detalle/barcelona2.webp", "imagenes/destinos/detalle/barcelona3.jpg"],
  },
  {
    id: "bariloche",
    nombre: "Bariloche",
    precio: 130,
    categorias: ["naturaleza", "aventura"],
    duracion: 5,
    temporada: "Julio-septiembre (ski) o diciembre-marzo (lagos/trek)",
    historia: "San Carlos de Bariloche nació a fines del siglo XIX con influencia de inmigrantes alemanes y suizos. Hoy es un polo turístico patagónico.",
    atracciones: "Lago Nahuel Huapi, Cerro Catedral, Circuito Chico y chocolates artesanales.",
    imagen: "imagenes/destinos/bariloche.jpg",
    galeria: ["imagenes/destinos/detalle/bariloche1.jpg", "imagenes/destinos/detalle/bariloche2.jpg", "imagenes/destinos/detalle/bariloche3.jpg"],
  },
  {
    id: "dubrovnik",
    nombre: "Dubrovnik",
    precio: 170,
    categorias: ["historica", "cultural"],
    duracion: 3,
    temporada: "Mayo-junio o septiembre",
    historia: "Fundada en el siglo VII, Dubrovnik se convirtió en una república independiente y próspera gracias al comercio marítimo. Su casco histórico amurallado es Patrimonio UNESCO.",
    atracciones: "Murallas medievales, casco antiguo de mármol, vistas al Adriático y escenarios de Game of Thrones.",
    imagen: "imagenes/destinos/dubrovnik.jpg",
    galeria: ["imagenes/destinos/detalle/dubrovnik1.jpg", "imagenes/destinos/detalle/dubrovnik2.webp", "imagenes/destinos/detalle/dubrovnik3.jpg"],
  },
  {
    id: "ibiza",
    nombre: "Ibiza",
    precio: 200,
    categorias: ["playa", "fiesta"],
    duracion: 4,
    temporada: "Junio-septiembre",
    historia: "Antigua colonia fenicia, Ibiza combina patrimonio histórico con fama mundial por su vida nocturna y sus playas.",
    atracciones: "Casco antiguo Dalt Vila (UNESCO), calas como Cala Comte y discotecas como Pacha o Amnesia.",
    imagen: "imagenes/destinos/ibiza.jpg",
    galeria: ["imagenes/destinos/detalle/ibiza1.jpg", "imagenes/destinos/detalle/ibiza2.jpg", "imagenes/destinos/detalle/ibiza3.jpeg"],
  },
  {
    id: "lisboa",
    nombre: "Lisboa",
    precio: 140,
    categorias: ["urbana", "historica"],
    duracion: 4,
    temporada: "Marzo-junio o septiembre-noviembre",
    historia: "Capital portuguesa desde hace siglos, Lisboa resurgió tras el terremoto de 1755 y hoy mezcla tradición y modernidad.",
    atracciones: "Torre de Belém, barrio de Alfama (fado), tranvía 28 y miradores como Santa Lucía.",
    imagen: "imagenes/destinos/lisboa.webp",
    galeria: ["imagenes/destinos/detalle/lisboa1.jpg", "imagenes/destinos/detalle/lisboa2.jpeg", "imagenes/destinos/detalle/lisboa3.jpg"],
  },
  {
    id: "londres",
    nombre: "Londres",
    precio: 220,
    categorias: ["urbana", "cultural"],
    duracion: 5,
    temporada: "Mayo-septiembre",
    historia: "Fundada por los romanos como Londinium, Londres fue capital del Imperio Británico y hoy es un centro financiero y cultural clave.",
    atracciones: "Big Ben, London Eye, British Museum, Hyde Park, Camden Market y Soho.",
    imagen: "imagenes/destinos/londres.jpg",
    galeria: ["imagenes/destinos/detalle/londres1.avif", "imagenes/destinos/detalle/londres2.webp", "imagenes/destinos/detalle/londres3.jpg"],
  },
  {
    id: "machupichu",
    nombre: "Machu Picchu",
    precio: 150,
    categorias: ["naturaleza", "historica"],
    duracion: 4,
    temporada: "Mayo-septiembre (seco)",
    historia: "Construida en el siglo XV por los incas, redescubierta en 1911 y una de las siete maravillas del mundo moderno.",
    atracciones: "Ciudadela y Templo del Sol, terrazas agrícolas, subida a Huayna Picchu y vistas andinas.",
    imagen: "imagenes/destinos/machupichu.jpg",
    galeria: ["imagenes/destinos/detalle/machupichu1.avif", "imagenes/destinos/detalle/machupichu2.jpeg", "imagenes/destinos/detalle/machupichu3.jpg"],
  },
  {
    id: "marrakech",
    nombre: "Marrakech",
    precio: 100,
    categorias: ["exotica", "cultural"],
    duracion: 4,
    temporada: "Marzo-mayo u octubre-noviembre",
    historia: "Fundada en el siglo XI, fue capital de varios imperios marroquíes y conserva una medina vibrante y colorida.",
    atracciones: "Plaza Jemaa el-Fna, zocos de artesanía, mezquita Koutoubia y jardines Majorelle.",
    imagen: "imagenes/destinos/marrakech.jpg",
    galeria: ["imagenes/destinos/detalle/marrakech1.jpg", "imagenes/destinos/detalle/marrakech2.webp", "imagenes/destinos/detalle/marrakech3.jpg"],
  },
  {
    id: "nuevayork",
    nombre: "Nueva York",
    precio: 260,
    categorias: ["urbana", "moderna"],
    duracion: 5,
    temporada: "Abril-junio o septiembre-octubre",
    historia: "De colonia holandesa a metrópoli mundial, símbolo de diversidad, finanzas y cultura del siglo XX.",
    atracciones: "Estatua de la Libertad, Central Park, Times Square, Broadway, MoMA y MET.",
    imagen: "imagenes/destinos/nuevayork.jpg",
    galeria: ["imagenes/destinos/detalle/nuevayork1.jpg", "imagenes/destinos/detalle/nuevayork2.jpg", "imagenes/destinos/detalle/nuevayork3.gif"],
  },
  {
    id: "paris",
    nombre: "París",
    precio: 230,
    categorias: ["cultural", "romantica"],
    duracion: 5,
    temporada: "Abril-junio o septiembre-octubre",
    historia: "Centro político, artístico y cultural europeo desde la Edad Media; capital del romanticismo y escenario de revoluciones.",
    atracciones: "Torre Eiffel, Museo del Louvre, Notre Dame, Campos Elíseos y Montmartre.",
    imagen: "imagenes/destinos/paris.jpg",
    galeria: ["imagenes/destinos/detalle/paris1.jpg", "imagenes/destinos/detalle/paris2.jpg", "imagenes/destinos/detalle/paris3.jpg"],
  },
  {
    id: "pde",
    nombre: "Punta del Este",
    precio: 180,
    categorias: ["playa", "urbana"],
    duracion: 3,
    temporada: "Diciembre-marzo (temporada alta)",
    historia: "Balneario uruguayo que desde el siglo XX atrae turismo internacional; conocida como la Mónaco de Sudamérica.",
    atracciones: "Playa Brava con “La Mano”, Playa Mansa, puerto e isla Gorriti.",
    imagen: "imagenes/destinos/pde.jpeg",
    galeria: ["imagenes/destinos/detalle/pde1.jpg", "imagenes/destinos/detalle/pde2.avif", "imagenes/destinos/detalle/pde3.avif"],
  },
  {
    id: "roma",
    nombre: "Roma",
    precio: 180,
    categorias: ["historica", "cultural"],
    duracion: 5,
    temporada: "Abril-junio o septiembre-octubre",
    historia: "Capital del Imperio Romano, cuna de la civilización occidental y sede del Vaticano.",
    atracciones: "Coliseo, Foro Romano, Fontana di Trevi, Piazza Navona y Basílica de San Pedro.",
    imagen: "imagenes/destinos/roma.webp",
    galeria: ["imagenes/destinos/detalle/roma1.jpg", "imagenes/destinos/detalle/roma2.jpeg", "imagenes/destinos/detalle/roma3.webp"],
  },
  {
    id: "shangai",
    nombre: "Shanghái",
    precio: 150,
    categorias: ["urbana", "moderna"],
    duracion: 4,
    temporada: "Marzo-mayo o septiembre-noviembre",
    historia: "De pueblo pesquero a gran centro financiero global, representa la modernización acelerada de China.",
    atracciones: "El Bund, Torre Perla Oriental, jardín Yuyuan y Nanjing Road.",
    imagen: "imagenes/destinos/shangai.jpg",
    galeria: ["imagenes/destinos/detalle/shangai1.avif", "imagenes/destinos/detalle/shangai2.jpg", "imagenes/destinos/detalle/shangai3.jpg"],
  },
  {
    id: "tokio",
    nombre: "Tokio",
    precio: 210,
    categorias: ["urbana", "tecnologica"],
    duracion: 5,
    temporada: "Marzo-mayo (sakura) o septiembre-noviembre (otoño)",
    historia: "Antiguamente Edo; capital desde 1868 con la Restauración Meiji. Combina tradición ancestral y alta tecnología.",
    atracciones: "Shibuya Crossing, Templo Sensō-ji, Torre de Tokio, Akihabara y jardines imperiales.",
    imagen: "imagenes/destinos/tokio.jpg",
    galeria: ["imagenes/destinos/detalle/tokio1.jpg", "imagenes/destinos/detalle/tokio2.jpg", "imagenes/destinos/detalle/tokio3.webp"],
  },
];

/* Letras permitidas para validar nombre y apellido (incluye acentos y ñ). */
const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

/* Variables del modal de detalle (se usan en el slider de imágenes). */
let sliderIndex = 0;
let sliderImagenes = [];
let destinoActual = "";
let precioActual = 0;

/* ===== FOOTER ===== */

/**
 * Muestra el año actual en el footer.
 * @method initAnio
 * @return No retorna valor.
 */
let initAnio = () => {
  let span = document.getElementById("anio");
  if (span != null) {
    span.textContent = new Date().getFullYear();
  }
};

/* ===== MENÚ ===== */

/**
 * Abre o cierra el menú lateral.
 * @method toggleMenu
 * @return No retorna valor.
 */
let toggleMenu = () => {
  const btn = document.getElementById("btnMenu");
  const panel = document.getElementById("panelMenu");
  const icono = btn.getElementsByClassName("material-symbols-outlined")[0];

  const abierto = panel.hidden;
  panel.hidden = !abierto;
  icono.textContent = abierto ? "close" : "menu";
};

/* ===== DESTINOS: render, búsqueda y filtros ===== */

/**
 * Dibuja las tarjetas de destinos en la grilla.
 * @method cargarDestinos
 * @param {Array} lista - Lista de destinos a mostrar (por defecto, todos).
 * @return No retorna valor.
 */
let cargarDestinos = (lista = destinos) => {
  let grid = document.getElementById("destinosGrid");

  if (lista.length === 0) {
    grid.innerHTML = "<p class='empty-msg'>No se encontraron destinos.</p>";
    return;
  }

  let contenido = "";
  lista.forEach((d) => {
    contenido += `<article class="card">
        <img src="${d.imagen}" alt="${d.nombre}" class="card-img" />
        <div class="card-body">
          <h3 class="card-title">${d.nombre}</h3>
          <button type="button" class="btn btn-detalles" onclick="abrirModal('${d.id}')">Detalles</button>
        </div>
      </article>`;
  });

  grid.innerHTML = contenido;
  grid.classList.toggle("is-single", lista.length === 1);
};

/**
 * Filtra los destinos por nombre, precio máximo, categoría y orden.
 * @method filtrarDestinos
 * @return No retorna valor.
 */
let filtrarDestinos = () => {
  let texto = document.getElementById("q").value.trim().toLowerCase();
  let maxPrecio = Number(document.getElementById("rangoPrecio").value);
  let categoria = document.getElementById("categoria").value;
  let orden = document.getElementById("orden").value;

  let lista = destinos.filter((d) => {
    let pasaNombre = d.nombre.toLowerCase().includes(texto);
    let pasaPrecio = d.precio <= maxPrecio;
    let pasaCategoria = categoria === "todas" || d.categorias.includes(categoria);
    return pasaNombre && pasaPrecio && pasaCategoria;
  });

  if (orden === "asc") {
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else {
    lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }

  cargarDestinos(lista);
};

/**
 * Muestra el valor elegido en el rango de precio.
 * @method mostrarPrecio
 * @param {string} valor - Valor actual del rango de precio.
 * @return No retorna valor.
 */
let mostrarPrecio = (valor) => {
  document.getElementById("precioOut").textContent = valor;
};

/**
 * Abre el panel de filtros.
 * @method abrirFiltros
 * @return No retorna valor.
 */
let abrirFiltros = () => {
  document.getElementById("filtrosOverlay").hidden = false;
  document.body.style.overflow = "hidden";
};

/**
 * Cierra el panel de filtros.
 * @method cerrarFiltros
 * @return No retorna valor.
 */
let cerrarFiltros = () => {
  document.getElementById("filtrosOverlay").hidden = true;
  document.body.style.overflow = "";
};

/**
 * Limpia la búsqueda y los filtros y muestra todos los destinos.
 * @method limpiarFiltros
 * @return No retorna valor.
 */
let limpiarFiltros = () => {
  document.getElementById("q").value = "";
  document.getElementById("rangoPrecio").value = 300;
  document.getElementById("precioOut").textContent = 300;
  document.getElementById("categoria").value = "todas";
  document.getElementById("orden").value = "asc";
  cargarDestinos();
};

/* ===== MODAL DE DETALLE Y SLIDER ===== */

/**
 * Abre el modal con el detalle del destino elegido.
 * @method abrirModal
 * @param {string} id - Identificador del destino.
 * @return No retorna valor.
 */
let abrirModal = (id) => {
  const destinosFiltrados = destinos.filter((destino) => destino.id === id);
  const d = destinosFiltrados[0];
  if (d == null) {
    return;
  }

  destinoActual = d.nombre;
  precioActual = d.precio;
  sliderImagenes = d.galeria;
  sliderIndex = 0;

  document.getElementById("slider-img").src = sliderImagenes[0];
  document.getElementById("slider-img").alt = "Imagen 1 de " + d.nombre;
  document.getElementById("modal-title").textContent = d.nombre + ": Detalle de destino";
  document.getElementById("modal-historia").textContent = d.historia;
  document.getElementById("modal-atracciones").textContent = d.atracciones;
  document.getElementById("modal-extra").innerHTML =
    "<strong>Duración sugerida:</strong> " + d.duracion + " días<br>" +
    "<strong>Mejor época:</strong> " + d.temporada + "<br>" +
    "<strong>Precio por día aprox.:</strong> USD " + d.precio;

  /* Limpia el formulario de reserva */
  document.getElementById("res-fecha").value = "";
  document.getElementById("res-dias").value = "";
  document.getElementById("res-total").textContent = "";
  document.getElementById("btnReservar").hidden = true;

  document.getElementById("modal").hidden = false;
  document.body.style.overflow = "hidden";
};

/**
 * Cierra el modal de detalle.
 * @method cerrarModal
 * @return No retorna valor.
 */
let cerrarModal = () => {
  document.getElementById("modal").hidden = true;
  document.body.style.overflow = "";
};

/**
 * Cambia la imagen del slider hacia adelante o atrás.
 * @method moverSlider
 * @param {number} dir - -1 para anterior, 1 para siguiente.
 * @return No retorna valor.
 */
let moverSlider = (dir) => {
  sliderIndex = sliderIndex + dir;
  if (sliderIndex < 0) {
    sliderIndex = sliderImagenes.length - 1;
  }
  if (sliderIndex >= sliderImagenes.length) {
    sliderIndex = 0;
  }
  document.getElementById("slider-img").src = sliderImagenes[sliderIndex];
  document.getElementById("slider-img").alt = "Imagen " + (sliderIndex + 1) + " de " + destinoActual;
};

/* ===== RESERVA ===== */

/**
 * Valida que una fecha (texto YYYY-MM-DD) no sea anterior a hoy.
 * @method fechaValidaNoPasado
 * @param {string} fecha - Fecha en formato YYYY-MM-DD.
 * @return {boolean} true si la fecha es hoy o futura.
 */
let fechaValidaNoPasado = (fecha) => {
  let partes = fecha.split("-");
  let f = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  let hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return f.getTime() >= hoy.getTime();
};

/**
 * Calcula el costo de la reserva (días x precio por día).
 * @method calcularCosto
 * @return No retorna valor.
 */
let calcularCosto = () => {
  let fecha = document.getElementById("res-fecha").value;
  let dias = Number(document.getElementById("res-dias").value);

  if (fecha === "" || !fechaValidaNoPasado(fecha)) {
    alert("Elegí una fecha válida que no sea anterior a hoy.");
    document.getElementById("res-fecha").value = "";
    return;
  }
  if (isNaN(dias) || dias % 1 !== 0 || dias < 1 || dias > 60) {
    alert("Ingresá una cantidad de días válida (entero entre 1 y 60).");
    document.getElementById("res-dias").value = "";
    return;
  }

  let total = dias * precioActual;
  document.getElementById("res-total").textContent = "Costo estimado: USD " + total;
  document.getElementById("btnReservar").hidden = false;
};

/**
 * Guarda la reserva actual en el itinerario (localStorage).
 * @method guardarReserva
 * @return No retorna valor.
 */
let guardarReserva = () => {
  let fecha = document.getElementById("res-fecha").value;
  let dias = Number(document.getElementById("res-dias").value);
  let total = dias * precioActual;

  let itinerario = leerItinerario();
  itinerario.push({
    destino: destinoActual,
    fecha: fecha,
    dias: dias,
    precioDia: precioActual,
    total: total,
  });
  localStorage.setItem("itinerario", JSON.stringify(itinerario));

  alert("¡Reserva guardada en tu Itinerario!");
  cerrarModal();
};

/* ===== CONTACTO ===== */

/**
 * Indica si el texto tiene solo letras y espacios (entre 2 y 40 caracteres).
 * @method soloLetras
 * @param {string} texto - Texto a validar.
 * @return {boolean} true si es válido.
 */
let soloLetras = (texto) => {
  if (texto.length < 2 || texto.length > 40) {
    return false;
  }
  for (let i = 0; i < texto.length; i++) {
    let ch = texto[i].toLowerCase();
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
let emailValido = (email) => {
  let arroba = email.indexOf("@");
  let punto = email.lastIndexOf(".");
  return arroba > 0 && punto > arroba + 1 && punto < email.length - 1;
};

/**
 * Borra los caracteres que no sean letras ni espacios de un campo.
 * @method filtrarLetras
 * @param {HTMLInputElement} el - Campo de texto a limpiar.
 * @return No retorna valor.
 */
let filtrarLetras = (el) => {
  let limpio = "";
  for (let i = 0; i < el.value.length; i++) {
    let ch = el.value[i];
    if (ch === " " || LETTERS.indexOf(ch.toLowerCase()) !== -1) {
      limpio += ch;
    }
  }
  el.value = limpio;
};

/**
 * Valida el formulario de contacto y avisa por alert si hay errores.
 * @method validarContacto
 * @return {boolean} false para evitar que el formulario recargue la página.
 */
let validarContacto = () => {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let email = document.getElementById("email");
  let pais = document.getElementById("pais");

  if (!soloLetras(nombre.value.trim())) {
    alert('"Nombre" debe tener solo letras y espacios (2 a 40 caracteres).');
    nombre.value = "";
    nombre.focus();
    return false;
  }
  if (!soloLetras(apellido.value.trim())) {
    alert('"Apellido" debe tener solo letras y espacios (2 a 40 caracteres).');
    apellido.value = "";
    apellido.focus();
    return false;
  }
  if (!emailValido(email.value.trim())) {
    alert("Ingresá un correo electrónico válido (ej: nombre@dominio.com).");
    email.value = "";
    email.focus();
    return false;
  }
  if (pais.value === "") {
    alert("Seleccioná un país.");
    pais.focus();
    return false;
  }

  alert("¡Gracias! Recibimos tus datos y te contactaremos a la brevedad.");
  document.getElementById("form-contacto").reset();
  return false;
};

/* ===== ITINERARIO ===== */

/**
 * Lee el itinerario guardado en localStorage.
 * @method leerItinerario
 * @return {Array} Lista de reservas guardadas.
 */
let leerItinerario = () => {
  let data = localStorage.getItem("itinerario");
  if (data == null) {
    return [];
  }
  return JSON.parse(data);
};

/**
 * Dibuja las reservas guardadas en la página de itinerario.
 * @method cargarItinerario
 * @return No retorna valor.
 */
let cargarItinerario = () => {
  let lista = leerItinerario();
  let contenedor = document.getElementById("lista-itinerario");
  let vacio = document.getElementById("res-empty");
  let acciones = document.getElementById("acciones-globales");

  if (lista.length === 0) {
    contenedor.innerHTML = "";
    vacio.hidden = false;
    acciones.hidden = true;
    return;
  }

  vacio.hidden = true;
  acciones.hidden = false;

  let contenido = "";
  lista.forEach((item, idx) => {
    let total = item.dias * item.precioDia;
    contenido += `<article class="it-card">
        <div class="it-card-body">
          <h3 class="it-card-titulo">${item.destino}</h3>
          <p class="it-card-linea"><strong>DESTINO:</strong> ${item.destino}</p>
          <p class="it-card-linea"><strong>FECHA:</strong> ${item.fecha}</p>
          <button class="btn btn-detalles" onclick="toggleDetalleItinerario(${idx})">DETALLES</button>
          <div class="it-card-detalles" id="detalle-${idx}" hidden>
            <div class="det-grid">
              <div><span>DÍAS</span><strong>${item.dias}</strong></div>
              <div><span>USD/día</span><strong>USD ${item.precioDia}</strong></div>
              <div><span>Total</span><strong>USD ${total}</strong></div>
            </div>
            <div class="det-acciones">
              <button class="btn btn-sec" onclick="eliminarReserva(${idx})">ELIMINAR</button>
            </div>
          </div>
        </div>
        <div class="it-card-media">
          <iframe class="it-mapa" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(item.destino)}&output=embed" title="Mapa de ${item.destino}"></iframe>
        </div>
      </article>`;
  });

  contenedor.innerHTML = contenido;
};

/**
 * Muestra u oculta el detalle de una reserva.
 * @method toggleDetalleItinerario
 * @param {number} idx - Posición de la reserva en la lista.
 * @return No retorna valor.
 */
let toggleDetalleItinerario = (idx) => {
  let panel = document.getElementById("detalle-" + idx);
  panel.hidden = !panel.hidden;
};

/**
 * Elimina una reserva del itinerario.
 * @method eliminarReserva
 * @param {number} idx - Posición de la reserva a eliminar.
 * @return No retorna valor.
 */
let eliminarReserva = (idx) => {
  let lista = leerItinerario();
  if (!confirm('¿Eliminar "' + lista[idx].destino + '" del itinerario?')) {
    return;
  }
  lista.splice(idx, 1);
  localStorage.setItem("itinerario", JSON.stringify(lista));
  cargarItinerario();
};

/**
 * Vacía todo el itinerario.
 * @method vaciarItinerario
 * @return No retorna valor.
 */
let vaciarItinerario = () => {
  let lista = leerItinerario();
  if (lista.length === 0) {
    return;
  }
  if (!confirm("¿Vaciar todo el itinerario?")) {
    return;
  }
  localStorage.removeItem("itinerario");
  cargarItinerario();
};
