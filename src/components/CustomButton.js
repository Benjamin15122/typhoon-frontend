import React from 'react'

class CustomButton extends React.Component {
  render() {

    return (
      <div className={this.props.className} onClick={(e) => { this.props.buttonClicked(e, this.props.clickId, this.props.clickName) }}>
        {this.props.children}
      </div>
    )
  }
}

export default CustomButton