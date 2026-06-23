/* Campo de texto reutilizable con label y mensaje de error. */
const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  error,
  required = false,
  autoComplete,
}) => {
  const errorId = id + "-error";

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        autoComplete={autoComplete}
        className={error ? "is-invalid" : ""}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <small id={errorId} className="error-text" role="alert">
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;
