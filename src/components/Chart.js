import React from 'react'
import CanvasJSReact from '../libs/canvasjs-2.3.1/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS

class Chart extends React.Component {

  static containerIDCounter = 0

  render() {
    return (
      <div id={this.containerID} className={this.props.className} style={this.props.style} />
    )
  }

  constructor(props) {
    super(props)

    this.containerID = "chart-" + Chart.containerIDCounter++
  }

  componentDidMount() {
    this.chart = new CanvasJS.Chart(this.containerID, this.props.options)

    this.chart.render()
  }

  componentDidUpdate() {
    this.chart.options = this.props.options
    this.chart.render()
  }

}

export default Chart