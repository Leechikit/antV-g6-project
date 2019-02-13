<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from '@antv/g6'
import '@antv/g6/build/plugin.edge.polyline'
import './flowchart.js'
import API from '@/api/api.json'

export default {
  name: 'flowchart',
  data () {
    return {
      nodes: [], // 流程节点
      edges: [] // 链接流程的边
    }
  },
  mounted () {
    const { Activities, Rules } = this.getData()
    const { graphWidth, graphHeight, minX, minY } = this.getGraphSize(Activities)
    this.setNodes(Activities, minX, minY)
    this.setEdges(Rules, minX, minY)
    const data = {
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      edges: JSON.parse(JSON.stringify(this.edges))
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      width: graphWidth,
      height: graphHeight
    });
    graph.read(data);
  },
  methods: {
    // 获取数据
    getData () {
      const Activities = API.ReturnData.datas.WorkflowTemplate.Data.Activities
      const Rules = API.ReturnData.datas.WorkflowTemplate.Data.Rules
      return {
        Activities,
        Rules
      }
    },
    // 设置流程节点
    setNodes (list, minX, minY) {
      list.forEach(item => {
        this.nodes.push({
          shape: 'customNode',
          id: item.ActivityCode,
          x: item.X - item.Width / 2 - minX,
          y: item.Y - item.Height / 2 - minY,
          width: item.Width,
          height: item.Height,
          text: item.DisplayName,
          isRun: item.isRun,
          type: item.ActivityType.toLowerCase()
        })
      })
    },
    // 设置流程的边
    setEdges (list, minX, minY) {
      list.forEach(item => {
        let points = []
        item.Points.forEach((point, index) => {
          if (index > 0 && index < item.Points.length - 1) {
            const pointArrs = point.split(',')
            points.push({
              x: pointArrs[0] - minX,
              y: pointArrs[1] - minY
            })
          }
        })
        this.edges.push({
          id: item.Id,
          source: item.PreActivityCode,
          target: item.PostActivityCode,
          color: '#37ABFD',
          endArrow: true,
          controlPoints: points,
          label: {
            text: item.DisplayName || '',
            fill: '#37ABFD'
          },
          labelRectStyle: {
            fill: 'transparent'
          }
          // shape: 'polyline-round'
        })
      })
    },
    // 获取画布信息
    getGraphSize (list) {
      // X轴最大坐标值
      let maxX = 0
      // Y轴最大坐标值
      let maxY = 0
      // X轴最小坐标值
      let minX = 0
      // Y轴最小坐标值
      let minY = 0
      // 空隙
      const SPACE = 10
      list.forEach((item, index) => {
        if (index === 0) {
          minX = item.X - item.Width / 2
          minY = item.Y - item.Height / 2
        } else {
          minX = item.X < minX ? item.X - item.Width / 2 : minX
          minY = item.Y < minY ? item.Y - item.Height / 2 : minY
        }
        maxX = (item.X + item.Width / 2) > maxX ? item.X + item.Width / 2 : maxX
        maxY = (item.Y + item.Height / 2) > maxY ? item.Y + item.Height / 2 : maxY
      })
      return {
        graphWidth: maxX - minX + SPACE, // 画布宽度
        graphHeight: maxY - minY + SPACE, // 画布高度
        minX: minX - SPACE / 2, // 最左边离画布边界距离
        minY: minY - SPACE / 2 // 最上边离画布边界距离
      }
    }
  }
}
</script>
<style lang="css" scoped>
#mountNode {
  overflow: auto;
}
</style>
