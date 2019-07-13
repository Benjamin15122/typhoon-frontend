import React from 'react'
import { connect } from 'dva'

import styles from './index.css'
import Icon from '../components/Icon'
import Drawer from '../components/Drawer'
import FlexibleView from '../components/FlexibleView'
import TyphoonMap from '../components/TyphoonMap'
import TyphoonTree from '../components/TyphoonTree'

class App extends React.Component {
  render() {

    /* 地图控件 */
    // const map = <TyphoonMap pauseSwitch={this.state.pauseSwitch} />

    /* 底部抽屉 */
    const bottomDrawer = (
      <Drawer
        className={styles.bottomDrawer}
        type="bottom"
        pulled={this.state.bottomDrawerPulled}
        close={() => { this.setState({ bottomDrawerPulled: false }) }} >
        <TyphoonTree />
      </Drawer>
    )

    /* 功能列表开关 */
    const menuSwitch = (
      <Icon type="doubleCircle" className={styles.menuSwitch} in={this.state.menuSwitchIn}
        onClick={() => {
          this.setState({
            menuSwitchIn: false,
            menuIn: true
          })
        }} />
    )

    /* 功能列表 */
    const menu = (
      <Drawer className={styles.menu} type="left-scale" pulled={this.state.menuIn}
        close={() => {
          this.setState({
            menuIn: false,
            menuSwitchIn: true
          })
        }} >
        <FlexibleView propertyList={this.mapFunctions} parser={this.mapFunctionsParser} rowNum={1} />
      </Drawer>
    )

    /* I2EC 水印 */
    const I2EC = (
      <svg className={styles.I2EC}>
        <path className={styles.path_I} d="M0 0 "/>
      </svg>
    )


    return (
      <div id={styles.app} onMouseMoveCapture={(e) => { this.pullDrawerCapture(e) }} >
        {/* {map} */}
        {menuSwitch}
        {menu}
        {bottomDrawer}
        {I2EC}
      </div>
    )
  }

  /* 监控mousemove事件 鼠标进入指定区域时唤醒对应Drawer */
  pullDrawerCapture(e) {
    const bottomDrawerTopEdge = window.innerHeight - 10
    if (e.clientY > bottomDrawerTopEdge) {
      e.stopPropagation()
      this.setState({ bottomDrawerPulled: true })
    }
  }

  constructor(props) {
    super(props)

    /* 功能列表可使用功能 */
    this.mapFunctions = [
      { type: "followSwitch", icon: "circle", body: () => { this.setState({ pauseSwitch: !this.state.pauseSwitch }) } },
      { type: "fullScreen", icon: "document", body: () => { this.launchFullscreen(document.getElementById(styles.app)) } }
    ]

    /* 功能列表及抽屉开关 */
    this.state = {
      menuSwitchIn: true,
      menuIn: false,
      bottomDrawerPulled: false,
      pauseSwitch: false
    }

    /* 监控鼠标移动事件唤醒抽屉 */
    this.pullDrawerCapture = this.pullDrawerCapture.bind(this)
  }

  /* 功能列表图标自排列解析方式 */
  mapFunctionsParser(func, parameters) {
    const { divHeight, divWidth, divMin, x, y } = parameters
    const side = divMin * 0.6

    const style = {
      position: "absolute",
      left: x + (divWidth - side) / 2,
      top: y + (divHeight - side) / 2,
      width: side,
      height: side
    }

    return <Icon key={func.type} type={func.icon} style={style} onClick={func.body} in={true} />
  }

  /* 全屏功能 */
  launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  }
}

export default App