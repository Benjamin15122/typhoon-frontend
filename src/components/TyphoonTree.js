import React, { Component } from 'react';
import { Icon, Tree, Timeline, Row, Col, Badge } from 'antd';
import { connect } from 'dva';
import CustomButton from './CustomButton';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola'
import Steps from './Steps'
import styles from './stylesheets/TyphoonTree.css'
cytoscape.use(cola);

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
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
  }

  renderCytoscapeElement() {
    this.cy = cytoscape(
      {
        container: document.getElementById('cy'),
        layout: {
          name: 'cola',
          animate: false,
          randomize: false
        },
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#66ccff',
              'shape': 'data(type)',
              'label': 'data(name)',
              'width': 20,
              'height': 20
            }
          },
          {
            selector: ':parent',
            style: {
              'background-opacity': 0.333
            }
          },
          {
            selector: 'edge',
            style: {
              'curve-style': 'bezier',
              'width': 3,
              'target-arrow-shape': 'triangle',
              'line-color': '#61bffc',
              'target-arrow-color': '#61bffc'
            }
          }
        ],
        elements: this.props.serviceGraph.elements
      });
  }


  onTreeNodeSelect = (keys, e) => {
    this.props.dispatch({
      type: "servicetree/getBranch", payload: keys
    })
  }

  onBranchNodeSelect = (selectedName, selectedId) => {
    this.props.dispatch({
      type: "servicetree/executeDrone", payload: {
        id: selectedId,
        name: selectedName
      }
    })
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
    this.props.dispatch({
      type: "servicegraph/fetchGraphData",
    })
  }

  componentDidMount() {
    this.renderCytoscapeElement();
  }


  componentWillUpdate() {
    this.cy.unmount();
    this.renderCytoscapeElement();
  }


  componentDidUpdate(prevProps) {
    if (this.props.clickedBranchNodeInfo.id !== prevProps.clickedBranchNodeInfo.id) {
      this.onBranchNodeStatus(this.props.clickedBranchNodeInfo)
    }
  }


  render() {
    let cyStyle = {
      height: '550px',
      width: '300px',
      margin: '20px 0px'
    };

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

    const branchNodeListDisplay = this.props.branchNodeList.map((branchNodeInfo, index) => {
      const style = {
        position: "absolute",
        left: "8%",
        top: index * 120 + 20,
        width: 550,
        height: 100,
        boxShadow: "0.75px 0.75px 0.75px 0.5px black"
      }

      return (
        <div style={style} key={"branchNode-" + index}>
          <div className={styles.timeDiv}>
            <div className={styles.defaultTitle}>创建时间:</div>
            <div className={styles.defaultValue}>几点了？</div>
          </div>
          <div className={styles.statusDiv}>
            <div className={styles.defaultTitle}>当前状态:</div>
            <div className={styles.defaultValue}><Badge status="success" text="good" /></div>
          </div>
          <div className={styles.detailsDiv}>
            <div className={styles.detailsTitle}>运行细节:</div>
            <Steps className={styles.detailsValue}/>
          </div>
          <div className={styles.additionDiv} >
            <div className={styles.branchNodeIcon} />
            <svg className><line className={styles.connectLine} x1="12" y1="13" x2="12" y2="107" /></svg>
          </div>
        </div>
      )
    })




    return (
      <div className={styles.container}>
        <div className={styles.leftDiv}>
          {microservicesTree}
        </div>

        <div className={styles.middleDiv}>
          <div className="node_selected">
            <div style={cyStyle} id="cy" />
          </div>
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