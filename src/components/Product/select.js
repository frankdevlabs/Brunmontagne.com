import React from "react"
import "./select.scss"

class Select extends React.Component {
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
        className={`dropdown${this.state.open ? " active" : ""}`}
      >
        <div className="select">
          <span>{this.props.activeOption}</span>
          <svg className="product-cart__icon">
            <use xlinkHref="/svg/main.svg#arrow-down"></use>
          </svg>
        </div>
        <ul className="dropdown-menu">{this.props.children}</ul>
      </div>
    )
  }
}

export default Select
