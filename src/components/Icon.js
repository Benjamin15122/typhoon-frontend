import React from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './stylesheets/Icon.css'

class Icon extends React.Component {
  render() {
    return (
      <CSSTransition timeout={1000} in={this.props.in?this.props.in:true} classNames={this.state.transition} unmountOnExit >
        <div className={this.props.className} style={this.props.style} ref="container">
          <svg className={styles.container} onClick={this.props.onClick}>
            {this.state.icon}
          </svg>
        </div>
      </CSSTransition>
    )
  }

  constructor(props) {
    super(props)

    const type = this.props.type

    this.state = {
      icon: null,
      transition: {
        enter: styles[type + "-enter"],
        enterActive: styles[type + "-enterActive"],
        exit: styles[type + "-exit"],
        exitActive: styles[type + "-exitActive"]
      }
    }

    this.types = {

      /* 圆 */
      circle: (width, height) => {
        return <circle className={styles.default} cx={width * 0.5} cy={height * 0.5} r={width * 0.4} />
      },

      /* 文档 */
      document: (width, height) => {
        const points = [
          width * 0.1, height * 0.1,
          width * 0.7, height * 0.1,
          width * 0.9, width * 0.3,
          width * 0.9, height * 0.9,
          width * 0.1, height * 0.9
        ]
        return <polygon className={styles.default} points={points} />
      },

      doubleCircle: (width, height) => {
        return (
          <svg>
            <circle cx={width * 0.5} cy={height * 0.5} r={width * 0.4} />
            <circle cx={width * 0.5} cy={height * 0.5} r={width * 0.2} />
          </svg>
        )
      },

      /* 无 */
      none: () => { return null }
    }
  }

  componentDidMount() {
    this.setState({
      icon: this.types[this.props.type](this.refs.container.clientWidth, this.refs.container.clientHeight)
    })
  }
}

export default Icon