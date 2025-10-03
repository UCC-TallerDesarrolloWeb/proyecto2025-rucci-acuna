/**
 * Actualiza dinámicamente el año en el footer.
 * @method initAnio
 * @returns {void}
 */
const initAnio = () => {
  const span = document.getElementById('anio');
  if (span) { span.textContent = String(new Date().getFullYear()); }
};

/**
 * Punto de entrada de la home.
 * @method init
 * @returns {void}
 */
const init = () => {
  initAnio();
  // Esta página no tiene menú. El menú se inicializa en las otras vistas.
};

document.addEventListener('DOMContentLoaded', init);
