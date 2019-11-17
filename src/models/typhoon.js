import request from '../utils/request'
import { Polyline, Circle } from 'react-amap'

export default {
  namespace: "typhoon",
  state: {
    mapCenter: null,
    time: null,
    typhoon: {
      position: null,
      strong: null,
      power: null,
      speed: null
    },
    path: [],
    typhoonPathPolyline: null,
    typhoonCircle: null,
    cityWeatherList: []
  },
  reducers: {
    updateData(state, { time, typhoonData, cityWeatherDataList }) {

      /* 生成台风路径 由于路径点为循环获取 当路径闭合时不再进行绘制 */
      var newPath = state.path

      if (newPath.length === 0) {
        newPath = newPath.concat(typhoonData.position)
      }
      else if (typhoonData.position.longitude === 127.5 && typhoonData.position.latitude === 27.0) {
        newPath = [typhoonData.position]
      }
      else {
        newPath = newPath.concat(typhoonData.position)
      }
      // 127.5 27.0

      var centerIndex = Math.floor(newPath.length / 2)

      /* 生成城市天气信息 */
      const newCityWeatherList = cityWeatherDataList.map((cityWeatherData) => {

        var cityWeather = state.cityWeatherList.find(cityWeather => cityWeather.city === cityWeatherData.city)

        if (cityWeather === undefined || cityWeather === null) {
          cityWeather = {
            city: cityWeatherData.city,
            position: cityWeatherData.position,
            weatherData: []
          }
        }

        cityWeatherData.weatherData.forEach((data) => {
          var dataRef = cityWeather.weatherData.find(weather => weather.property === data.type)

          if (dataRef === undefined || cityWeather === null) {
            cityWeather.weatherData.push({
              property: data.type,
              type: "line",
              dataPoints: []
            })
          }

          dataRef = cityWeather.weatherData.find(weather => weather.property === data.type)

          dataRef.dataPoints = dataRef.dataPoints.concat({
            label: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
            y: data.value + Math.random() * 5
          })

          if (dataRef.dataPoints.length > 10) { dataRef.dataPoints.shift() }
        })

        return {
          city: cityWeatherData.city,
          position: cityWeatherData.position,
          weatherData: cityWeather.weatherData
        }
      })

      return {
        ...state,
        time: time,
        mapCenter: newPath[centerIndex],
        typhoon: typhoonData,
        path: newPath,
        typhoonOutsideCircle: <Circle center={typhoonData.position} radius={90000} style={{
          fillColor: "yellow",
          fillOpacity: 0.3,
          strokeOpacity: 0
        }} />,
        cityWeatherList: newCityWeatherList,
        typhoonPathPolyline: <Polyline path={newPath} style={{ strokeColor: "#FFFFFF", strokeWeight: "3" }} />
      }
    }
  },
  effects: {
    *fetchData({ url, index }, { call, put }) {
      const { typhoon, cityList } = yield call(request, { url: url+'?index='+index})

      const typhoonData = {
        position: {
          longitude: Number(typhoon.longitude),
          latitude: Number(typhoon.latitude)
        },
        strong: typhoon.strong,
        power: Number(typhoon.power),
        speed: Number(typhoon.speed)
      }

      const cityWeatherDataList = cityList.map((city) => {

        const position = {
          longitude: Number(city.longitude),
          latitude: Number(city.latitude)
        }

        const weatherProperties = Object.getOwnPropertyNames(city).filter(property =>
          property !== "time" &&
          property !== "kind" &&
          property !== "longitude" &&
          property !== "latitude" &&
          property !== "location")

        const weatherData = weatherProperties.map((property) => {
          return {
            type: property,
            value: Number(city[property])
          }
        })

        return {
          city: city.location,
          position: position,
          weatherData: weatherData
        }
      })

      yield put({
        type: "updateData",
        time: new Date(),
        typhoonData: typhoonData,
        cityWeatherDataList: cityWeatherDataList
      })
    },

    *fakeData({ url }, { call, put }) {
      const response = yield call(request, { url: url })
    }
  }
}