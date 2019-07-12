import React from 'react'

class TyphoonMarker extends React.Component{
  render(){

    const currentPosition = this.props.__map__.lngLatToContainer([this.props.position.longitude,this.props.position.latitude])

    const style = {
      position: "absolute",
      left: currentPosition.x,
      top: currentPosition.y
    }

    return(
      <div className={this.props.className} style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default TyphoonMarker