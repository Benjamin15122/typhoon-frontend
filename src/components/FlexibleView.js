import React from 'react'
import styles from './stylesheets/FlexibleView.css'

class FlexibleView extends React.Component {
  render() {

    var grids = null

    if (this.refs.container !== undefined) {
      const width = this.refs.container.clientWidth
      const height = this.refs.container.clientHeight

      var rowNum = this.props.rowNum
      var colNum = this.props.colNum

      if (rowNum) { colNum = Math.floor((this.props.propertyList.length + rowNum - 1) / rowNum) }
      else if (colNum) { rowNum = Math.floor((this.props.propertyList.length + colNum - 1) / colNum) }

      const divWidth = width / colNum
      const divHeight = height / rowNum
      const divMin = divWidth > divHeight ? divHeight : divWidth
      const divMax = divWidth < divHeight ? divHeight : divWidth

      grids = this.props.propertyList.map((value, index) => {
        const row = Math.floor(index / colNum)
        const col = Math.floor(index - row * colNum)

        const parameters = {
          divWidth: divWidth,
          divHeight: divHeight,
          divMin: divMin,
          divMax: divMax,
          x: divWidth * col,
          y: divHeight * row
        }

        return this.props.parser(value, parameters)
      })
    }

    return (
      <div className={styles.container} ref="container">
        {grids}
      </div>
    )
  }
}

export default FlexibleView