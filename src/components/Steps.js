import React from 'react'

import styles from './stylesheets/Steps.css'

class Steps extends React.Component {
  render() {

    var svg = null
    var title = null

    if (this.refs.container !== undefined && this.refs.container !== null) {

      const width = this.refs.container.clientWidth
      const height = this.refs.container.clientHeight

      const distance = width * 0.25

      svg = (
        <svg className={styles.svgContainer}>
          <circle className={styles.pending} cx={distance * 0.5} cy={height * 0.25} r={4} />
          <line className={styles.line} x1={distance * 0.5 + 5} y1={height * 0.25} x2={distance * 1.5 - 5} y2={height * 0.25} />
          <circle className={styles.pending} cx={distance * 1.5} cy={height * 0.25} r={4} />
          <line className={styles.line} x1={distance * 1.5 + 5} y1={height * 0.25} x2={distance * 2.5 - 5} y2={height * 0.25} />
          <circle className={styles.pending} cx={distance * 2.5} cy={height * 0.25} r={4} />
          <line className={styles.line} x1={distance * 2.5 + 5} y1={height * 0.25} x2={distance * 3.5 - 5} y2={height * 0.25} />
          <circle className={styles.pending} cx={distance * 3.5} cy={height * 0.25} r={4} />
        </svg>
      )

      title =(
        <div className={styles.titleContainer}>
          <div className={styles.step_1}>状态1</div>
          <div className={styles.step_2}>状态2</div>
          <div className={styles.step_3}>状态3</div>
          <div className={styles.step_4}>状态4</div>
        </div>
      )
    }

    return (
      <div className={this.props.className} ref="container">
        {svg}
        {title}
      </div>
    )
  }
}

export default Steps