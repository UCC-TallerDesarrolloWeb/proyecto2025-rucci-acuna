export const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
};
/**
 * Verifica si una cadena contiene solo letras y espacios.
 * @method isOnlyLettersAndSpaces
 * @param {string} str - Cadena a verificar.
 * @returns {boolean} True si la cadena solo tiene letras y espacios.
 */
const LETTERS = "abcdefghijklmnopqrstuvwxyzáéíóúüñ";

