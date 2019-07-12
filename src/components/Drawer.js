import React from 'react'
import styles from './stylesheets/Drawer.css'
import { CSSTransition } from 'react-transition-group'

class Drawer extends React.Component {
  render() {

    const type = this.props.type

    const transition = {
      enter: styles[type + "-enter"],
      enterActive: styles[type + "-enterActive"],
      exit: styles[type + "-exit"],
      exitActive: styles[type + "-exitActive"]
    }

    return (
      <CSSTransition timeout={10000} in={this.props.pulled} classNames={transition} unmountOnExit>
        <div className={this.props.className} onMouseLeave={() => { this.props.close() }}>
          {this.props.children}
        </div>
      </CSSTransition>
    )
  }
}

export default Drawer