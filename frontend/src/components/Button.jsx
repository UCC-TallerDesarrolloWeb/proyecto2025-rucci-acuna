/* Botón reutilizable. La variante "secundario" usa el estilo btn-sec. */
const Button = (props) => {
  const clase = props.variante === "secundario" ? "btn btn-sec" : "btn";
  const tipo = props.type ? props.type : "button";

  return (
    <button type={tipo} className={clase} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
