/* Botón reutilizable. La variante "secundario" usa el estilo btn-sec. */
const Button = ({ children, onClick, type = "button", variante = "primary" }) => {
  const clase = variante === "secundario" ? "btn btn-sec" : "btn";

  return (
    <button type={type} className={clase} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
