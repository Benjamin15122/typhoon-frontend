const typhoonData = [
  {
    "typhoon": {
      "time": "2018年08月16日01时00分",
      "longitude": "124.8",
      "latitude": "29.8",
      "strong": "TS",
      "power": "20",
      "speed": "10",
      "move_dir": "WNW",
      "kind": "typhoon"
    },
    "cityList": [
      {
        "time": "2018年8月15日2点",
        "location": "Shanghai",
        "kind": "wind",
        "temp": "82",
        "wind": "4",
        "precipitation": "0.2",
        "pressure": "29.6",
        "longitude": "121.480283",
        "latitude": "31.232316"
      }
    ]
  }
]

var typhoonIndex = 0

export default {
  'GET /typhoon': (req, res) => {
    res.send(typhoonData[typhoonIndex])
    typhoonIndex = (typhoonIndex + 1) % typhoonData.length
  }
}