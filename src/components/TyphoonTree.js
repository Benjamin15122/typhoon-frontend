import React, { Component } from 'react';
import { Icon, Tree, Timeline, Badge, Descriptions } from 'antd';
import { connect } from 'dva';
import CustomButton from './CustomButton'
import Steps from './Steps'
import styles from './stylesheets/TyphoonTree.css'
// import Network from '../pages/theta'
import Network from '../pages/beta'
// import Network from '../pages/alpha'

const { TreeNode } = Tree;

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
      type: "servicetree/getBranch", payload: keys
    })
  }

  onBranchNodeSelect = (selectedName, selectedId) => {
    console.log(selectedId)
    console.log(selectedName)
    this.props.dispatch({
      type: 'networkgraph/fakeUpdateAnimation',
      payload: selectedId
    })
    // this.props.dispatch({
    //   type: "servicetree/executeDrone", payload: {
    //     id: selectedId,
    //     name: selectedName
    //   }
    // })
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
          icon={<Icon type="code" theme="twoTone" />}
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
      console.log(branchNodeInfo.status)
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
              <Icon
                type={branchNodeInfo.iconType}
                //theme="twoTone"
                //twoToneColor="#52c41a"
                style={{ fontSize: '20px' }}
              />
            </CustomButton>
          }
        >
          <Descriptions  title={branchNodeInfo.short_id} border size="small" column={1}>
            </Descriptions>
            Time: {branchNodeInfo.createtime}<br />
            Status:  <Badge status={branchNodeInfo.badgestatus} text={branchNodeInfo.status} /><br />
            Details: <br />
            &nbsp;&nbsp;&nbsp;&nbsp;clone: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.clone : ""}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;publish: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.publish : ""}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;deploy: {branchNodeInfo.detailedstatus !== null ? branchNodeInfo.detailedstatus.deploy : ""}
        </Timeline.Item>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.leftDiv}>
          {microservicesTree}
        </div>

        <div className={styles.middleDiv}>
          <Network />
        </div>

        <div className={styles.rightDiv}>
          {branchNodeListDisplay}
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    ...state.servicetree,
    serviceGraph: state.servicegraph
  }
})(TyphoonTree);