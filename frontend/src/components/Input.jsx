/* Campo de texto reutilizable con label y mensaje de error. */
const Input = (props) => {
  const errorId = props.id + "-error";
  const tipo = props.type ? props.type : "text";

  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={tipo}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        required={props.required}
        autoComplete={props.autoComplete}
        className={props.error ? "is-invalid" : ""}
        aria-invalid={props.error ? "true" : "false"}
        aria-describedby={props.error ? errorId : undefined}
      />
      {props.error && (
        <small id={errorId} className="error-text" role="alert">
          {props.error}
        </small>
      )}
    </div>
  );
};

export default Input;
