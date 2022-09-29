import React from 'react'
import { connect } from 'dva'
import { Map } from 'react-amap'

import styles from './stylesheets/TyphoonMap.css'
import Chart from './Chart'
import TyphoonMarker from './TyphoonMarker'
import FlexibleView from './FlexibleView'

const nameTransform = {
  'wind': '风力 ',
  'temp': '温度',
  'precipitation': '降雨量',
  'pressure': '气压',
  'Maanshan': '马鞍山',
  'Nanjing': '南京',
  'Shanghai': '上海',
  'suzhou': '苏州',
  'Changzhou': '常州',
  'hefei': '合肥'
}

const colorTransform = {
  'wind': 'rgba(216,191,216,1)',
  'temp': 'rgba(128,128,0,1)',
  'precipitation': 'rgba(240,128,128,1)',
  'pressure': 'rgba(255,165,0,1)'
}

class TyphoonMap extends React.Component {
  render() {

    /* 台风沿途受影响城市标记 */
    const cityMarkerList = this.props.cityWeatherList.map(cityWeather => (
      <TyphoonMarker key={cityWeather.city} className={styles.cityMarker} position={cityWeather.position}>
        <div className={styles.cityMarkerIcon} />
      </TyphoonMarker>
    ))

    /* 受影响城市天气信息 */
    const cityWeatherDiv = (
      <div className={styles.cityWeatherDiv}>
        <FlexibleView className={styles.cityWeatherDiv} propertyList={this.props.cityWeatherList} parser={this.cityWeatherParser} rowNum={1} />
      </div>
    )

    const chartLegend = this.props.cityWeatherList.length > 0 ? (
      <div className={styles.chartLegend}>
        <div style={{ position: "absolute", left: "0%", top: "6%", width: "30%", height: "3px", backgroundColor: colorTransform['wind'] }} />
        <div style={{ position: "absolute", left: "35%", top: "0%", width: "65%", height: "25%" }}>{nameTransform['wind']}</div>
        <div style={{ position: "absolute", left: "0%", top: "31%", width: "30%", height: "3px", backgroundColor: colorTransform['temp'] }} />
        <div style={{ position: "absolute", left: "35%", top: "25%", width: "65%", height: "25%" }}>{nameTransform['temp']}</div>
        <div style={{ position: "absolute", left: "0%", top: "56%", width: "30%", height: "3px", backgroundColor: colorTransform['precipitation'] }} />
        <div style={{ position: "absolute", left: "35%", top: "50%", width: "65%", height: "25%" }}>{nameTransform['precipitation']}</div>
        <div style={{ position: "absolute", left: "0%", top: "81%", width: "30%", height: "3px", backgroundColor: colorTransform['pressure'] }} />
        <div style={{ position: "absolute", left: "35%", top: "75%", width: "65%", height: "25%" }}>{nameTransform['pressure']}</div>
      </div>
    ) : null

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
    const typhoonOutsideCircle = this.props.typhoonOutsideCircle
    const typhoonInsideCircle = this.props.typhoonInsideCircle

    return (
      <div className={styles.container} >
        <Map center={{ longitude: 119.16, latitude: 34.69 }} zoom={6}>
          {pathPolyline}
          {pathMarker}
          {typhoonOutsideCircle}
          {typhoonInsideCircle}
          {typhoonMarker}
          {chartLegend}
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

    this.fetchInterval = this.fetchInterval.bind(this)
  }

  componentDidMount() {
    this.index = 0
    this.fetchInterval()
  }

  fetchInterval() {
    if (!this.props.pause) {
      this.props.dispatch({
        type: "typhoon/fetchData",
        url: "/weather",
        index: Math.floor((this.index) % 80)
      })

      this.props.dispatch({
        type: "typhoon/fetchData",
        // url: "http://114.212.189.141:32006/rain"
        url: "/rain",
        index: Math.floor((this.index++) % 80)
      })
    }

    setTimeout(this.fetchInterval, this.props.speed)
  }

  cityWeatherParser(cityWeather, parameters) {

    const { divWidth, divHeight, divMin, x, y } = parameters
    const edge = divMin

    const style = {
      position: "absolute",
      left: x + (divWidth - edge) * 0.5,
      top: y + (divHeight - edge) * 0.5,
      width: edge,
      height: edge,
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: "5px",
      boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.5)"
    }

    const options = {
      title: {
        text: nameTransform[cityWeather.city],
      },
      data: cityWeather.weatherData.map((weather) => {
        return {
          type: weather.type,
          color: colorTransform[weather.property],
          dataPoints: weather.dataPoints
        }
      }),
      backgroundColor: "rgba(0,0,0,0)"
    }

    return (
      <Chart key={Math.random()} style={style} options={options} />
    )
  }
}

export default connect((state) => { return state.typhoon })(TyphoonMap)
