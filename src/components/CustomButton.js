import React from 'react'

class CustomButton extends React.Component {
  render() {
    return (
      <div className={this.props.className} onClick={() => { this.props.buttonClicked(this.props.clickName, this.props.clickId) }}>
        {this.props.children}
      </div>
    )
  }
}

export default CustomButton