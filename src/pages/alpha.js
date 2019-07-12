import { Component } from 'react'
import G6 from '@antv/g6'
import * as d3 from 'd3'
import {connect} from 'dva'
var Util = G6.Util
var dashArray = [[0, 1], [0, 2], [1, 2], [0, 1, 1, 2], [0, 2, 1, 2], [1, 2, 1, 2], [2, 2, 1, 2], [3, 2, 1, 2], [4, 2, 1, 2]];
var lineDash = [4, 2, 1, 2];
var interval = 9;
G6.registerNode('size-animate', {
    afterDraw: function afterDraw(cfg, group) {
        var size = cfg.size;
        var width = size[0];
        var height = size[1];
        var shape = group.addShape('image', {
            attrs: {
                x: -width / 2,
                y: -height / 2 - 1,
                width: width,
                height: height,
                img: cfg.img
            }
        });
        shape.animate({
            repeat: true,
            onFrame: function onFrame(ratio) {
                var matrix = Util.mat3.create();
                var toMatrix = Util.transform(matrix, [['r', ratio * Math.PI * 4]]);
                return {
                    matrix: toMatrix
                };
            }
        }, 3000, 'easeCubic');
    }
}, 'rect');


G6.registerNode('inner-animate', {
    afterDraw: function afterDraw(cfg, group) {
        var size = cfg.size;
        var width = size[0] - 12;
        var height = size[1] - 12;
        var image = group.addShape('image', {
            attrs: {
                x: -width / 2,
                y: -height / 2 - 2,
                width: width,
                height: height,
                img: cfg.img
            }
        });
        image.animate({
            onFrame: function onFrame(ratio) {
                var matrix = Util.mat3.create();
                var toMatrix = Util.transform(matrix, [['r', ratio * Math.PI * 4]]);
                return {
                    matrix: toMatrix
                };
            },

            repeat: true
        }, 3000, 'easeCubic');
    }
}, 'circle');




G6.registerNode('background-animate', {
    afterDraw: function afterDraw(cfg, group) {
        var r = cfg.size / 2;
        var back1 = group.addShape('circle', {
            zIndex: -3,
            attrs: {
                x: 0,
                y: 0,
                r: r,
                fill: cfg.color,
                opacity: 0.6
            }
        });
        var back2 = group.addShape('circle', {
            zIndex: -2,
            attrs: {
                x: 0,
                y: 0,
                r: r,
                fill: cfg.color, // 为了显示清晰，随意设置了颜色
                opacity: 0.6
            }
        });

        var back3 = group.addShape('circle', {
            zIndex: -1,
            attrs: {
                x: 0,
                y: 0,
                r: r,
                fill: cfg.color,
                opacity: 0.6
            }
        });
        group.sort(); // 排序，根据zIndex 排序
        back1.animate({ // 逐渐放大，并消失
            r: r + 10,
            opacity: 0.1,
            repeat: true // 循环
        }, 3000, 'easeCubic', null, 0); // 无延迟

        back2.animate({ // 逐渐放大，并消失
            r: r + 10,
            opacity: 0.1,
            repeat: true // 循环
        }, 3000, 'easeCubic', null, 1000); // 1 秒延迟

        back3.animate({ // 逐渐放大，并消失
            r: r + 10,
            opacity: 0.1,
            repeat: true // 循环
        }, 3000, 'easeCubic', null, 2000); // 2 秒延迟
    }
}, 'circle');

G6.registerEdge('can-running', {
    afterDraw: function afterDraw(cfg, group) {
        var shape = group.get('children')[0]
        var length = shape.getTotalLength(); // 后续 G 增加 totalLength 的接口
        var totalArray = [];
        for (var i = 0; i < length; i += interval) {
            totalArray = totalArray.concat(lineDash);
        }
        var index = 0;
        shape.animate({
            onFrame: function onFrame(ratio) {
                var cfg = {
                    lineDash: dashArray[index].concat(totalArray)
                };
                index = (index + 1) % interval;
                return cfg;
            },

            repeat: true
        }, 3000);
    }
}, 'line');

G6.registerEdge('circle-running', {
    afterDraw(cfg, group) {
        const shape = group.get('children')[0];
        const startPoint = shape.getPoint(0);
        const circle = group.addShape('circle', {
            attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: 'green',
                r: 4
            }
        });
        circle.animate({
            onFrame(ratio) {
                const tmpPoint = shape.getPoint(ratio);
                return {
                    x: tmpPoint.x,
                    y: tmpPoint.y
                };

            },
            repeat: true
        }, 3000);
    }
}, 'line');



class AlphaNetwork extends Component {
    graph = {}
    data = {}

    componentWillMount() {
        this.props.dispatch({
          type: "networkgraph/fetchGraphData",
        })
      }

    componentDidMount() {
        var graph = new G6.Graph({
            container: 'mountNode',
            width: window.innerWidth,
            height: window.innerHeight,
            autoPaint: false,
            defaultNode: {
                size: [30, 30],
                color: 'steelblue'
            },
            defaultEdge: {
                size: 1,
                color: "rgb(76,122,187)",
            },
            nodeStyle: {
                default: {
                    lineWidth: 2,
                    fill: '#fff'
                }
            }
        });
        var data = this.props.data

        var simulation = d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
            return d.id;
        }).strength(0.02)).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

        function refreshPosition(e) {
            e.item.get('model').x = e.x;
            e.item.get('model').y = e.y;
            graph.refreshPositions();
        }

        graph.on('node:dragstart', function (e) {
            simulation.alphaTarget(0.3).restart();
            refreshPosition(e);
        });
        graph.on('node:drag', function (e) {
            refreshPosition(e);
        });
        graph.on('node:dragend', function (e) {
            simulation.alphaTarget(0);
            refreshPosition(e);
        });

        graph.data(data);
        simulation.nodes(data.nodes).on("tick", ticked);
        simulation.force("link").links(data.edges);

        graph.render();

        function ticked() {
            if (!graph.get('data')) {
                graph.data(data);
                graph.render();
            } else {
                graph.refreshPositions();
            }
            graph.paint();
        }
        this.graph = graph
    }


    componentDidUpdate(){
        var data = this.props.data
        var graph = this.graph
        var simulation = d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
            return d.id;
        }).strength(0.02)).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
        simulation.nodes(data.nodes).on("tick", ticked);
        simulation.force("link").links(data.edges);
        function ticked() {
            if (!graph.get('data')) {
                graph.data(data);
                graph.render();
            } else {
                graph.refreshPositions();
            }
            graph.paint();
        }
        // graph.clear()
        // graph.read(data)
        graph.read(data)
        this.graph = graph
    }



    render() {
        return <div id="mountNode" />
    }
}

export default connect((state) => {
    return {
      data: state.networkgraph.data
    }
  })(AlphaNetwork);