<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from '@antv/g6';
import './flowchart.js'
import API from '@/api/api.json'
const winW = document.body.offsetWidth

export default {
  name: 'flowchart',
  data () {
    return {
      nodes: [],
      edges: []
    }
  },
  mounted () {
    const Activities = API.ReturnData.datas.WorkflowTemplate.Data.Activities
    const Rules = API.ReturnData.datas.WorkflowTemplate.Data.Rules
    const { graphWidth, graphHeight, minX, minY } = this.getGraphSize(Activities)
    this.setNodes(Activities, minX, minY)
    this.setEdges(Rules)
    const data = {
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      edges: JSON.parse(JSON.stringify(this.edges))
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      fitview: 'autoZoom', // 为了防止布局超出屏幕，使用 fitview: 'autoZoom' 进行自动放缩
      width: graphWidth,
      height: graphHeight
    });
    graph.read(data);
  },
  methods: {
    setNodes (list, minX, minY) {
      list.forEach(item => {
        this.nodes.push({
          shape: 'customNode',
          id: item.ActivityCode,
          x: item.X - minX,
          y: item.Y - minY,
          width: item.Width,
          height: item.Height,
          text: item.DisplayName,
          isRun: item.isRun
        })
      })
    },
    setEdges (list) {
      list.forEach(item => {
        this.edges.push({
          id: item.Id,
          source: item.PreActivityCode,
          target: item.PostActivityCode,
          color: '#37ABFD',
          endArrow: true
        })
      })
    },
    getGraphSize (list) {
      let maxX = 0
      let maxY = 0
      let minX = 0
      let minY = 0
      list.forEach((item, index) => {
        if (index === 0) {
          minX = item.X
          minY = item.Y
        } else {
          minX = item.X < minX ? item.X : minX
          minY = item.Y < minY ? item.Y : minY
        }
        maxX = (item.X + item.Width) > maxX ? item.X + item.Width : maxX
        maxY = (item.Y + item.Height) > maxY ? item.Y + item.Height : maxY
      })
      return {
        graphWidth: maxX - minX,
        graphHeight: maxY - minY,
        minX,
        minY
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
