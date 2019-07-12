import React from 'react'
import { connect } from 'dva'
import { Map } from 'react-amap'

import styles from './stylesheets/TyphoonMap.css'
import Chart from './Chart'
import TyphoonMarker from './TyphoonMarker'
import FlexibleView from './FlexibleView'

class TyphoonMap extends React.Component {
  render() {

    /* 台风沿途受影响城市标记 */
    const cityMarkerList = this.props.cityWeatherList.map((cityWeather) => {
      return (
        <TyphoonMarker key={cityWeather.city} className={styles.cityMarker} position={cityWeather.position}>
          <div className={styles.cityMarkerIcon} />
        </TyphoonMarker>
      )
    })

    /* 受影响城市天气信息 */
    const cityWeatherDiv = (
      <div className={styles.cityWeatherDiv}>
        <FlexibleView className={styles.cityWeatherDiv} propertyList={this.props.cityWeatherList} parser={this.cityWeatherParser} rowNum={1} />
      </div>
    )

    /* 台风当前位置标记 */
    const typhoonMarker = this.props.typhoon.position ? (
      <TyphoonMarker className={styles.typhoonMarker} position={this.props.typhoon.position}>
        <div className={styles.typhoonMarkerIcon} />
      </TyphoonMarker>
    ) : null

    /* 台风路径点标记 */
    const pathMarker = this.props.path.map((value) => {
      return (
        <TyphoonMarker key={Math.random()} className={styles.pathMarker} position={value}>
          <div className={styles.pathMarkerIcon} />
        </TyphoonMarker>
      )
    })

    /* 台风路径 */
    const pathPolyline = this.props.typhoonPathPolyline

    /* 台风范围 */
    const typhoonCircle = this.props.typhoonCircle

    return (
      <div className={styles.container} >
        <Map center={{ longitude: 119.16, latitude: 34.69 }} zoom={6}>
          {pathPolyline}
          {pathMarker}
          {typhoonMarker}
          {typhoonCircle}
          {cityMarkerList}
          {cityWeatherDiv}
        </Map>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      menuSwitchIn: true,
      menuIn: false,
      mapChange: true
    }

    // this.fetchInterval = this.fetchInterval.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({
        type: "typhoon/fetchData",
        url: "http://10.244.8.176:8888/wind"
        // url: "http://192.168.1.105:8888/typhoon"
      })
    }, 1000)
  }

  // fetchInterval() {
  //   if (this.props.pauseSwitch)
  //     return;
  //   else {
  //     this.props.dispatch({
  //       type: "typhoon/fetchData",
  //       // url: "/typhoon"
  //       url: "http://192.168.1.105:8888/typhoon"
  //     })
  //     setTimeout(this.fetchInterval(), 1000)
  //   }
  // }

  cityWeatherParser(cityWeather, parameters) {

    const { divWidth, divHeight, divMin, x, y } = parameters
    const edge = divMin

    const style = {
      position: "absolute",
      left: x + (divWidth - edge) * 0.5,
      top: y + (divHeight - edge) * 0.5,
      width: edge,
      height: edge,
      backgroundColor: "blue"
    }

    const options = {
      title: {
        text: cityWeather.city,
      },
      data: cityWeather.weatherData.map((weather) => {
        return {
          type: weather.type,
          dataPoints: weather.dataPoints
        }
      })
    }

    return (
      <Chart key={Math.random()} style={style} options={options} />
    )
  }
}

export default connect((state) => { return state.typhoon })(TyphoonMap)
