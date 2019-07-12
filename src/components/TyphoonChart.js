import React from 'react'
import CanvasJSReact from '../libs/canvasjs-2.3.1/canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS

class TyphoonChart extends React.Component{

  static containerID = 0

  render(){

    const divPosition = this.props.__map__.lngLatToContainer([this.props.position.longitude,this.props.position.latitude])
    
    const style={
      ...this.props.style,
      left: divPosition.x,
      top: divPosition.y
    }

    return (
      <div id={this.chartID} style={style} />
    )
  }

  constructor(props){
    super(props)

    this.chartID = "chart-" + TyphoonChart.containerID++
  }

  componentDidMount(){
    this.chart = new CanvasJS.Chart(this.chartID,{
      title:this.props.title,
      data:this.props.data
    })

    this.chart.render()
  }

  componentDidUpdate(){
    this.chart.options={
      title: this.props.title,
      data:this.props.data
    }
    this.chart.render()
  }
}

export default TyphoonChart