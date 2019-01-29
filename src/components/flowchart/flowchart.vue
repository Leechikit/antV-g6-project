<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from '@antv/g6';
import './flowchart.js'
import API from '@/api/api.json'
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
    this.setNodes(Activities)
    this.setEdges(Rules)
    const data = {
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      edges: JSON.parse(JSON.stringify(this.edges))
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      fitview: 'autoZoom', // 为了防止布局超出屏幕，使用 fitview: 'autoZoom' 进行自动放缩
      width: 800,
      height: 600
    });
    graph.read(data);
  },
  methods: {
    setNodes (list) {
      list.forEach(item => {
        this.nodes.push({
          shape: 'customNode',
          id: item.ActivityCode,
          x: item.X,
          y: item.Y,
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
