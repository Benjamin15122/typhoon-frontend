import { delay } from 'dva/saga';
import service from '../assets/service.svg'
import application from '../assets/application.svg'
import request from '../utils/request'
import status from '../utils/status'
const KIALIURL = '/kiali/api/namespaces/graph?edges=requestsPercentage&graphType=versionedApp&namespaces=typhoon&injectServiceNodes=true&duration=60s&pi=15000&layout=dagre'
// const KIALIURL = '/mockdata'

const DataFakeUpdate = (elements, serviceName) => {
    let nodes = elements.nodes
    let edges = elements.edges
    // find node to update
    let uid = ""
    nodes.forEach((item)=>{
        if(item.name===serviceName){
            item.shape = status.UPDATING
            uid = item.id
        }
    })
    let aids = []
    edges.forEach((item)=>{
        if(item.target===uid){
            aids.push(item.source)
        }
    })
    nodes.forEach((item)=>{
        if(aids.includes(item.id)){
            item.shape = status.AFFECTED
        }
    })
    return {
        nodes,
        edges
    }
}

const DataFakeFinish = (elements) => {
    let nodes = elements.nodes
    nodes.forEach((item)=>{
        if(item.shape!==item.recover){
            item.shape = status.FINISHED
        }
    })
    return {
        nodes: nodes,
        edges: elements.edges
    }
}

const Erase = (services) =>{
    const nodes = services.elements.nodes.map((item)=>{
        return {
            data: {
              id: item.data.id,
              isRoot: item.data.isRoot,
              nodeType: item.data.nodeType,
              isUnused: item.data.isUnused,
              app: item.data.app,
              service: item.data.service,
              workload: item.data.workload
            }
        }
    })
    const edges = services.elements.edges.map((item)=>{
        return {
            data: {
              id: item.data.id,
              source: item.data.source,
              target: item.data.target
            }
        }
    })
    return {
        elements: {
            nodes: nodes,
            edges: edges
        }
    }
}

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
    var fsid//frontend service id
    var fvid = []//frontend versions id
    var nkid//unknown id
    var cid = []//controllers id
    const nodes = dirtyNodes.filter((item) => {
        if(item.data.isUnused){
            return false
        }
        //获取unknown节点id
        if(item.data.nodeType==='unknown'){
            nkid = item.data.id
            return false
        }
        return true
    })
    const serviceGraph = {
        nodes: nodes,
        edges: edges
    }
    const neatNodes = serviceGraph.nodes.map((item) => {
        if (item.data.isRoot === true) {
            return {
                ...item.data,
                label: item.data.app,
                name: item.data.app,
                shape: 'background-animate',
                recover: 'background-animate',
                color: '#40a9ff',
                size: 25,
                labelCfg: {
                    position: 'top',
                    offset: 10
                }
            }
        }
        else if (item.data.nodeType === 'service') {
            if(item.data.service==='frontend'){
                fsid = item.data.id
            }
            return {
                ...item.data,
                label: item.data.service,
                name: item.data.service,
                shape: 'inner-animate',
                recover: 'inner-animate',
                updating: false,
                affected: false,
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
                name: item.data.workload,
                shape: 'image',
                recover: 'image',
                size: [22,22],
                img: application,
                labelCfg: {
                    position: 'top',
                    offset: 10
                }
            }
        }
    })
    //获取所有frontend-version节点id
    
    const dirtyEdges = serviceGraph.edges.map((item) => {
        if(item.data.source===fsid){
            fvid.push(item.data.target)
        }
        return {
            ...item.data,
            shape: 'circle-running',
            lineWidth: 1
        }
    })
    
    //删除unknown节点连接的边，获取target节点id
    var neatEdges = dirtyEdges.filter((item)=>{
        if(item.source===nkid){
            cid.push(item.target)
            return false
        }
        return true
    })
    
    fvid.forEach((item)=>{
        cid.forEach((citem)=>{
            neatEdges.push({
                id: item+citem,
                source: item,
                target: citem
            })
        })
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
        },
    },
    effects: {
        *fakeUpdateAnimation({payload}, {call, put}){
            const serviceName = payload
            let authString = 'admin:admin'
            let headers = new Headers()
            headers.set('Authorization', 'Basic ' + btoa(authString))
            let response = yield call(request, {
                url: KIALIURL,
                options: {
                    headers: headers
                }
            })
            let pureRes = Erase(response)
            let elements = DataClean(pureRes)
            const updatingElements = DataFakeUpdate(elements, serviceName)
            yield put({ type: 'update', payload: updatingElements })
            yield call(delay, 5000)
            const finishedElements = DataFakeFinish(updatingElements)
            yield put({ type: 'update', payload: finishedElements })
            yield call(delay, 2000)
            response = yield call(request, {
                url: KIALIURL,
                options: {
                    headers: headers
                }
            })
            pureRes = Erase(response)
            elements = DataClean(pureRes)
            yield put({ type: 'update', payload: elements })
        },
        *fetchGraphData(_, { call, put }) {
            let authString = 'admin:admin'
            let headers = new Headers()
            headers.set('Authorization', 'Basic ' + btoa(authString))
            while (true) {
                const response = yield call(request, {
                    url: KIALIURL,
                    options: {
                        headers: headers
                    }
                })
                // console.log(response)
                const pureRes = Erase(response)
                const noUpdate = Equals(pureRes,lastElements)
                if(noUpdate===true){
                    return
                }
                lastElements = pureRes
                const elements = DataClean(pureRes)
                yield put({ type: 'update', payload: elements })
                yield call(delay, 2000)
            }
        }
    }
}