import { delay } from 'dva/saga';
import service from '../assets/service.svg'
import application from '../assets/application.svg'
import request from '../utils/request'

const Equals = (x, y) => {
  var f1 = x instanceof Object;
  var f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false
  }
  var newX = Object.keys(x);
  for (var p in newX) {
    p = newX[p];
    var a = x[p] instanceof Object;
    var b = y[p] instanceof Object;
    if (a && b) {
      Equals(x[p], y[p])
    } else if (x[p] !== y[p]) {
      return false;
    }
  }
  return true;

}
const DataClean = (services) => {
  const edges = services.elements.edges
  const dirtyNodes = services.elements.nodes
  const nodes = dirtyNodes.filter((item) => !item.data.isUnused)
  const serviceGraph = {
    nodes: nodes,
    edges: edges
  }
  const neatNodes = serviceGraph.nodes.map((item) => {
    if (item.data.isRoot === true) {
      return {
        ...item.data,
        label: 'gate-way',
        shape: 'background-animate',
        color: '#40a9ff',
        size: 25,
        labelCfg: {
          position: 'top',
          offset: 10
        }
      }
    }
    else if (item.data.nodeType === 'service') {
      return {
        ...item.data,
        label: item.data.service,
        shape: 'inner-animate',
        img: service,
        labelCfg: {
          position: 'top',
          offset: 10
        }
      }
    }
    else if (item.data.nodeType === 'app') {
      return {
        ...item.data,
        label: item.data.workload,
        shape: 'image',
        size: [22, 22],
        img: application,
        labelCfg: {
          position: 'top',
          offset: 10
        }
      }
    }
  })
  const neatEdges = serviceGraph.edges.map((item) => {
    return {
      ...item.data,
      shape: 'circle-running',
      lineWidth: 1
    }
  })
  return {
    nodes: neatNodes,
    edges: neatEdges
  }
}

var lastElements = {}

export default {
  namespace: 'networkgraph',
  state: {
    data: {
      nodes: [{
        "id": "6249668dd0a91adb9e62994d36563365", "nodeType": "app",
        "namespace": "istio-system",
        "workload": "istio-ingressgateway",
        "app": "istio-ingressgateway", "version": "unknown", "traffic": [
          {
            "protocol": "http", "rates": {
              "httpOut": "3.36"
            }
          }],
        "isRoot": true,
        'shape': 'background-animate',
        'color': '#40a9ff',
        'size': 25,
        'labelCfg': {
          position: 'top',
          offset: 10
        }
      }],
      edges: []
    }
  },
  reducers: {
    update(state, { payload }) {
      return {
        data: payload
      }
    }
  },
  effects: {
    *fetchGraphData(_, { call, put }) {
      let authString = 'admin:admin'
      let headers = new Headers()
      headers.set('Authorization', 'Basic ' + btoa(authString))
      while (true) {
        const response = yield call(request, {
          url: '/kiali/api/namespaces/graph?edges=requestsPercentage&graphType=versionedApp&namespaces=typhoon&injectServiceNodes=true&duration=40s&pi=15000&layout=dagre',
          // url: '/mockdata',
          options: {
            headers: headers
          }
        })
        const noUpdate = Equals(response, lastElements)
        if (noUpdate === true) {
          return
        }
        lastElements = response
        const elements = DataClean(response)
        yield put({ type: 'update', payload: elements })
        yield call(delay, 10000)
      }
    }
  }
}