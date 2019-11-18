import React from 'react'
import { Slider } from 'antd'

import styles from './index.css'
import Icon from '../components/Icon'
import Drawer from '../components/Drawer'
import FlexibleView from '../components/FlexibleView'
import TyphoonMap from '../components/TyphoonMap'
import TyphoonTree from '../components/TyphoonTree'

import "antd/dist/antd.css"

class App extends React.Component {
  render() {

    /* 地图控件 */
    // const map = <TyphoonMap pause={this.state.pause} speed={this.state.speed} />
    const map = <div/>

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

    /* 运行速度控制条 */
    const speedSlider = (
      <Slider className={styles.speedSlider} vertical step={100} min={500} max={5000} onChange={(v) => { this.setState({ speed: v }) }} />
    )


    return (
      <div id={styles.app} onMouseMoveCapture={(e) => { this.pullDrawerCapture(e) }} >
        {map}
        {menuSwitch}
        {menu}
        {speedSlider}
        {bottomDrawer}
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
      { type: "fullScreen", icon: "document", body: () => { this.launchFullscreen(document.getElementById(styles.app)) } },
      { type: "pauseMove", icon: "circle", body: () => { this.setState({ pause: !this.state.pause }) } }
    ]

    /* 功能列表及抽屉开关 */
    this.state = {
      menuSwitchIn: true,
      menuIn: false,
      bottomDrawerPulled: false,
      pause: false,
      speed: 2000
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