
// ref: https://umijs.org/config/
export default {
  base: '/typhoon/',
  publicPath: '/typhoon/',
  "proxy": {
    "/api": {
      "target": "http://114.212.189.141:30170/",
      "changeOrigin": true,
    },
    "/kiali": {
      "target": "http://114.212.189.141:31597/",
      "changeOrigin": true
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi-typhoon',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
