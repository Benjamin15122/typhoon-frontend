import React, { Component } from 'react';
import { Icon, Tree, Timeline, Badge, Descriptions, notification } from 'antd';
import { connect } from 'dva';
import CustomButton from './CustomButton'
import Steps from './Steps'
import styles from './stylesheets/TyphoonTree.css'
import Link from 'umi/link'
import DEBUG from '../utils/debug'
// import Network from '../pages/theta'
import Network from '../pages/beta'
// import Network from '../pages/alpha'

let clickable = true
const { TreeNode } = Tree;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1289537_wk8971gis7f.js',
});

class TyphoonTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treedivStyle: {
        position: 'absolute',
        bottom: 0
      },
      branchdivStyle: {
        position: 'absolute',
        right: 0,
        bottom: 0
      }
    }
  }

  onTreeNodeSelect = (keys, e) => {
    this.props.dispatch({
      type: "servicetree/updateService", payload: keys[0]
    })
    this.props.dispatch({
      type: "servicetree/getBranch", payload: keys
    })
  }

  onBranchNodeSelect = (selectedName, selectedId) => {
    // console.log(selectedId)
    // console.log(selectedName)
    notification['info']({
      message: 'Rebuilding started ',
      description:
        'service: ' + selectedId + '\n' + 'version: ' + selectedName,
    });
    this.props.dispatch({
      type: 'networkgraph/updateService',
      payload: selectedId
    })
    if (DEBUG) {
      setTimeout(() => {
        notification['info']({
          message: 'Update started ',
        });
        notification['warning']({
          message: 'Update processing ',
        });
        this.props.dispatch({
          type: "networkgraph/fakeUpdateAnimation"
        })
        this.props.dispatch({
          type: "networkgraph/fakeFinishAnimation"
        })
      },5000)
    }
    else {
      this.props.dispatch({
        type: "servicetree/executeDrone", payload: {
          id: selectedId,
          name: selectedName
        }
      })
    }
  }

  onBranchNodeStatus = (keys) => {
    this.props.dispatch({
      type: "servicetree/getBranchNodeStatus", payload: keys
    })
  }


  componentWillMount() {
    this.props.dispatch({
      type: "servicetree/getServiceList",
    });
  }


  componentDidUpdate(prevProps) {
    if (this.props.clickedBranchNodeInfo.id !== prevProps.clickedBranchNodeInfo.id) {
      this.onBranchNodeStatus(this.props.clickedBranchNodeInfo)
    }
  }


  render() {

    const serviceNodeList = this.props.serviceList.map((serviceNode) => {
      return (
        <TreeNode
          icon={<a href={"https://git.njuics.cn/typhoon/" + serviceNode.serviceName} target="_blank" rel="noopener noreferrer"><Icon type="github" /></a>}
          // icon={<Icon type="code" theme="twoTone" />}
          title={serviceNode.serviceName}
          key={serviceNode.serviceName} />
      )
    })

    const microservicesTree = (
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
        switcherIcon={<Icon type="down" />}
        onSelect={this.onTreeNodeSelect}>
        <TreeNode icon={<Icon type="folder" theme="twoTone" />}
          title="microservices" key="0-0" >
          {serviceNodeList}
        </TreeNode>
      </Tree>
    );

    // const branchNodeListDisplay = this.props.branchNodeList.map((branchNodeInfo, index) => {
    //   const style = {
    //     position: "absolute",
    //     left: "8%",
    //     top: index * 120 + 20,
    //     width: 550,
    //     height: 100,
    //     boxShadow: "0.75px 0.75px 0.75px 0.5px black"
    //   }

    //   return (
    //     <div style={style} key={"branchNode-" + index}>
    //       <div className={styles.timeDiv}>
    //         <div className={styles.defaultTitle}>创建时间:</div>
    //         <div className={styles.defaultValue}>{branchNodeInfo.createtime}</div>
    //       </div>
    //       <div className={styles.statusDiv}>
    //         <div className={styles.defaultTitle}>当前状态:</div>
    //         <div className={styles.defaultValue}><Badge status={branchNodeInfo.badgestatus} text={branchNodeInfo.status} /></div>
    //       </div>
    //       <div className={styles.detailsDiv}>
    //         <div className={styles.detailsTitle}>运行细节:</div>
    //         <Steps className={styles.detailsValue} status={branchNodeInfo.detailedstatus} />
    //       </div>
    //       <div className={styles.additionDiv} >
    //         <CustomButton
    //           className={styles.branchNodeIcon}
    //           clickId={branchNodeInfo.id}
    //           clickName={branchNodeInfo.name}
    //           buttonClicked={(id, name) => { this.onBranchNodeSelect(id, name) }} />
    //         <svg className><line className={styles.connectLine} x1="12" y1="13" x2="12" y2="107" /></svg>
    //       </div>
    //     </div>
    //   )
    // })

    const branchNodeListDisplay = this.props.branchNodeList.map((branchNodeInfo) => {
      // console.log(branchNodeInfo.status)
      return (
        <Timeline.Item key={branchNodeInfo.id}
          dot={
            <CustomButton
              clickId={branchNodeInfo.id}
              clickName={branchNodeInfo.name}
              buttonClicked={(e, id, name) => {
                this.onBranchNodeSelect(id, name)
                // this.props.branchNodeList.forEach((branchNode) => {
                //   if (branchNode.id===name) {
                //     this.onBranchNodeStatus(branchNode)
                //   }
                // })
              }}>
              {/* <IconFont type="icon-commit1" style={{ fontSize: '20px' }}/> */}
              {branchNodeInfo.iconType === "icon-loading" ? <Icon type="loading" style={{ fontSize: '20px' }} /> : <IconFont
                type={branchNodeInfo.iconType}
                //theme="twoTone"
                //twoToneColor="#52c41a"
                style={{ fontSize: '20px' }}
              />}
            </CustomButton>
          }
        >
          <Descriptions title={branchNodeInfo.short_id} border size="small" column={1}>
          </Descriptions>
          时间: {branchNodeInfo.createtime}<br />
          状态:  <Badge status={branchNodeInfo.badgestatus} text={branchNodeInfo.status} /><br />
          信息: <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clone: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.clone : ""}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;publish: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.publish : ""}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deploy: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.deploy : ""}
        </Timeline.Item>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.leftDiv}>
          <div style={{ margin: '5px' }}><h3>{"微服务代码仓库"}</h3></div>
          {microservicesTree}
        </div>

        <div className={styles.middleDiv}>
          <div style={{ margin: '5px' }}><h3>{"微服务拓扑结构"}</h3></div>
          <Network />
        </div>
        <div className={styles.contactDiv} onClick={() => {
          if (clickable) {
            console.log('clicked')
            clickable = false
            setTimeout(() => {
              clickable = true
            }, 5000)
          }
        }
        } />
        <div className={styles.rightDiv}>
          <h3>{"版本演化时间线"}</h3>
          <h3>{this.props.service ? this.props.service : ""}</h3>
          {branchNodeListDisplay}
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    ...state.servicetree,
    serviceGraph: state.servicegraph,
    service: state.servicetree.service
  }
})(TyphoonTree);