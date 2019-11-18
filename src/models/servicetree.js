import request from '../utils/request'
// import { effects } from 'redux-saga';
import { delay } from 'dva/saga';
import dateformat from "dateformat";
import { notification } from 'antd';


var dateFormat = require('dateformat');
dateFormat.i18n = {
  dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
  ],
  monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ],
  timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', '上午', '下午'
  ]
};
export default {
  namespace: "servicetree",
  state: {
    branchNodeList: [],
    serviceList: [],
    clickedBranchNodeInfo: '',
    prevNodeStatus: '',
    count: 0,
  },
  reducers: {
    updateServiceList(state, { payload }) {
      return {
        ...state,
        serviceList: payload,
      }
    },

    updateBranch(state, { payload }) {
      return {
        ...state,
        branchNodeList: payload,
      }
    },

    updateBranchNodeCommitNumber(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        branchNodeList: state.branchNodeList.map((branchNode) => {
          if (branchNode.id === payload.id) {
            branchNode = {
              ...branchNode,
              commitnumber: payload.commitnumber,
            }
          }
          return branchNode
        }),
        clickedBranchNodeInfo: {
          id: payload.id,
          commitnumber: payload.commitnumber,
          name: payload.name
        }
      }
    },

    updateBranchNodeStatus(state, { payload }) {
      let prevNodeStatus = state.prevNodeStatus
      let count = state.count
      let branchNodeList = state.branchNodeList.map((branchNode) => {
        if (branchNode.id === payload.id) {
          branchNode = {
            ...branchNode,
            status: payload.status,
            detailedstatus: payload.detailedstatus
          }
          if (branchNode.status === 'running') {
            if(prevNodeStatus!==branchNode.status||count%10===0){
              notification['warning']({
                message: 'Rebuilding processing ',
                description:
                  'service: '+branchNode.id+'\n'+'version: '+branchNode.name,
              });
              prevNodeStatus = branchNode.status
              count = 0
            }else{
              count = count+1
            }
            branchNode = {
              ...branchNode,
              iconType: "icon-loading",
              badgestatus: "processing"
            }
          }
          else if (branchNode.status === 'failure') {
            if(prevNodeStatus!==branchNode.status){
              notification['error']({
                message: 'Rebuilding failed ',
                description:
                  'service: '+branchNode.id+'\n'+'version: '+branchNode.name,
              });
              prevNodeStatus = branchNode.status
            }
            branchNode = {
              ...branchNode,
              iconType: "close-circle",
              badgestatus: "error"
            }
          }
          else if (branchNode.status === 'success') {
            if(prevNodeStatus!==branchNode.status){
              notification['success']({
                message: 'Rebuilding succeeded ',
                description:
                  'service: '+branchNode.id+'\n'+'version: '+branchNode.name,
              });
              prevNodeStatus = branchNode.status
            }
            branchNode = {
              ...branchNode,
              // iconType: "check-circle",
              iconType: "icon-success",
              badgestatus: "success"
            }
          }
        }
        if(payload.detailedstatus.clone === "running"){
          branchNode = {
            ...branchNode,
            detailsnum: 1,
          }
        }
        if(payload.detailedstatus.publish === "running"){
          branchNode = {
            ...branchNode,
            detailsnum: 2,
          }
        }
        if(payload.detailedstatus.deploy === "running"){
          branchNode = {
            ...branchNode,
            detailsnum: 3,
          }
        }
        return branchNode
      })
      return {
        ...state,
        branchNodeList: branchNodeList,
        prevNodeStatus: prevNodeStatus
      }
    }

  },

  effects: {
    *getServiceList(_, { call, put }) {
      const response = yield call(request, {
        url: 'https://git.njuics.cn/api/v4/groups/typhoon/projects',
        options: {
          headers: {
            'Private-Token': 'hJMKkXgcTniyzWP_Prjo',
            'content-type': 'application/json'
          }
        }
      });
      yield put({
        type: 'updateServiceList', payload: response.map((value) => {
          return {
            url: value.http_url_to_repo,
            serviceName: value.name
          }
        })
      })
    },

    *getBranch({ payload }, { call, put, }) {
      const response = yield call(request, {
        url: 'https://git.njuics.cn/api/v4/projects/typhoon%2F' + payload[0] + '/repository/commits',
        options: {
          headers: {
            'Private-Token': 'hJMKkXgcTniyzWP_Prjo',
            'content-type': 'application/json'
          }
        }
      });
      yield put({
        type: 'updateBranch', payload: response.map((value) => {
          return {
            id: value.id,
            short_id: value.short_id,
            title: value.title,
            //createtime: value.created_at,
            createtime : dateFormat(value.created_at, "yyyy-mmmm-d,  HH:MM:ss"),
            parent_id: value.parent_ids,
            name: payload[0],
            iconType: "icon-commit",//"icon-services-copy",
            status: "pending",
            badgestatus: "default",
            detailedstatus: null,
            detailsnum: 0,
            commitnumber: "1"
          }
        })
      })
    },

    *executeDrone({ payload }, { call, put }) {
      console.log(payload)
      const response = yield call(request, {
        // url: '/api/repos/wdongyu/git-test/builds?branch='+payload[0]+'&commit='+payload[1],
        url: '/api/repos/typhoon/' + payload.id + '/builds?branch=master&commit=' + payload.name,
        options: {
          headers: {
            'Authorization': 'Bearer jK72ueqbrjm2TlADbYeZXTngd1UALBGY',
            'content-type': 'application/json'
          },
          method: "POST"
        }
      });
      //console.log(response)
      yield put({
        type: 'updateBranchNodeCommitNumber',
        payload: {
          id: payload.id,
          name: payload.name,
          commitnumber: response.number
        }
      })
      let i = 0
      while(i<7){
        yield put({
          type: 'getBranch',
          payload: payload.id
        })
        yield call(delay, 10000)
      }
    },

    *getBranchNodeStatus({ payload }, { call, put }) {
      console.log(payload)
      while (1) {
        const response = yield call(request, {
          url: '/api/repos/typhoon/' + payload.id + '/builds/' + payload.commitnumber,
          options: {
            headers: {
              'Authorization': 'Bearer jK72ueqbrjm2TlADbYeZXTngd1UALBGY',
              'content-type': 'application/json'
            }
          }
        });
        console.log(response)
        yield put({
          type: 'updateBranchNodeStatus',
          payload: {
            id: payload.name,
            status: response.status,
            detailedstatus: {
              clone: response.stages[0].steps[0].status,
              publish: response.stages[0].steps[1].status,
              deploy: response.stages[0].steps[2].status
            }
          }
        })
        yield call(delay, 5000)
      }
    },
  }
}