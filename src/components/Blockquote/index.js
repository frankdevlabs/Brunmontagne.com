import React from "react"
import * as styles from "../../scss/components/modules/blockquote.module.scss"

const Blockquote = ({ children, author, size }) => {
  return (
    <blockquote
      className={`${styles.blockquote} ${
        size === "base" ? styles.blockquoteBase : ""
      }`}
    >
      <span className={styles.blockquote__text}>{children}</span>
      <span className={styles.blockquote__author}>{author}</span>
    </blockquote>
  )
}

export default Blockquote
