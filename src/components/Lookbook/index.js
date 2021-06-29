import React from "react"
import LookbookItem from "./item"
import * as styles from "../../scss/components/modules/lookbook.module.scss"

const Lookbook = ({ items }) => {
  return (
    <div className={styles.lookbook__gallery}>
      {items.map(({ node }) => {
        return <LookbookItem key={node.id} node={node} />
      })}
    </div>
  )
}

export default Lookbook
