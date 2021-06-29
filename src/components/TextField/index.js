import React from "react"
import * as styles from "../../scss/components/modules/textfield.module.scss"

const Required = () => {
  return <span className={styles.textfield__required}> *</span>
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
      <div className={styles.textfield}>
        <label htmlFor={name} className={styles.textfield__label}>
          {label}
          {required ? <Required /> : ""}
        </label>
        <input
          placeholder={placeholder}
          id={name}
          className={styles.textfield__input}
          type={type}
          name={name}
          required={required}
        />
      </div>
    )
  else if (mode === "textarea")
    return (
      <div className={styles.textfield}>
        <label htmlFor={name} className={styles.textfield__label}>
          {label}
          {required ? <Required /> : ""}
        </label>
        <textarea
          placeholder={placeholder}
          id={name}
          className={styles.textfield__textarea}
          name={name}
          required={required}
        />
      </div>
    )
}

export default TextField
