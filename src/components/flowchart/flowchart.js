import G6 from '@antv/g6';
import Icon from '@/assets/icon'

G6.registerNode('customNode', {
  anchor: [
    [0.5, 1],
    [0.5, 0],
    [1, 0.5],
    [0, 0.5]
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
        fill: model.isRun ? '#37ABFD' : '',
        radius: 4
      }
    })
    group.addShape('image', {
      attrs: {
        x: 20,
        y: model.height / 2 - 6,
        width: 12,
        height: 12,
        img: Icon[`${model.type}_${model.isRun ? 'white' : 'blue'}`]
      }
    })
    group.addShape('text', {
      attrs: {
        x: model.width / 2 + 5,
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