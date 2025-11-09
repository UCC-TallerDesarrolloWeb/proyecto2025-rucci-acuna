/**
 * Input reutilizable con el estilo del formulario de contacto.
 * - Muestra label, input y mensaje de error accesible.
 */
const Input = ({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  required = false,
  error = '',           
  autoComplete,
}) => {
  const describedId = error ? `${id}-err` : undefined
  const invalid = Boolean(error)

  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        autoComplete={autoComplete}
        className={invalid ? 'is-invalid' : ''}
        aria-invalid={invalid ? 'true' : 'false'}
        aria-describedby={describedId}
      />
      {/* Mensaje de error  */}
      {invalid && (
        <small id={describedId} className="error-text" role="alert">
          {error}
        </small>
      )}
    </div>
  )
}

export default Input

