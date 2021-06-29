import React from "react"
import * as styles from "../../scss/components/modules/dropdown.module.scss"

class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.dropdown = React.createRef()
    this.onToggleDropdown = this.onToggleDropdown.bind(this)
    this.state = {
      open: false,
    }
  }

  onToggleDropdown() {
    this.dropdown.current.focus()
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    return (
      <div
        role="button"
        tabIndex="0"
        ref={this.dropdown}
        onClick={this.onToggleDropdown}
        onKeyDown={this.onToggleDropdown}
        className={`
          ${styles.dropdown} 
          ${this.state.open ? styles.active : ""} 
          ${this.props.small ? styles.dropdownSm : ""}
        `}
      >
        <div className={styles.select}>
          <span>{this.props.activeOption}</span>
          <svg>
            <use xlinkHref="/svg/main.svg#arrow-down"></use>
          </svg>
        </div>
        <ul className={styles.dropdownMenu}>{this.props.children}</ul>
      </div>
    )
  }
}

export default Dropdown
