import G6 from '@antv/g6';

G6.registerNode('customNode', {
  anchor: [
    [0.5, 1],
    [0.5, 0],
    [1,0.5],
    [0,0.5]
  ],
  draw(item){
    const group = item.getGraphicGroup()
    const model = item.getModel()
    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: model.width,
        height: model.height,
        stroke: '#37ABFD',
        fill: model.isRun ? '#37ABFD' : ''
      }
    })
    group.addShape('text', {
      attrs: {
        x: model.width / 2,
        y: model.height / 2,
        fill: model.isRun ? '#fff' : '#000',
        text: model.text,
        textAlign: 'center',
        textBaseline: 'middle'
      }
    })
    return group
  }
})