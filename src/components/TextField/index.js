import React from "react"
import "./textfield.scss"

const Required = () => {
  return <span className="textfield__required"> *</span>
}

const TextField = ({
  label,
  name,
  type,
  required = true,
  mode = "input",
  placeholder,
}) => {
  if (mode === "input")
    return (
      <div className="textfield">
        <label htmlFor={name} className="textfield__label">
          {label}
          {required ? <Required /> : ""}
        </label>
        <input
          placeholder={placeholder}
          id={name}
          className="textfield__input"
          type={type}
          name={name}
          required={required}
        />
      </div>
    )
  else if (mode === "textarea")
    return (
      <div className="textfield">
        <label htmlFor={name} className="textfield__label">
          {label}
          {required ? <Required /> : ""}
        </label>
        <textarea
          placeholder={placeholder}
          id={name}
          className="textfield__textarea"
          name={name}
          required={required}
        />
      </div>
    )
}

export default TextField
