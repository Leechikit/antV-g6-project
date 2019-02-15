import G6 from '@antv/g6'
// import Util from '@antv/g6/lib/util/path.js'
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

// function setLineDash (path, segment = 5) {
//   let result = []
//   path.reduce((acc, cur) => {
//     let accX = acc[1]
//     let accY = acc[2]
//     let curX = cur[1]
//     let curY = cur[2]
//     let xDirection = curX > accX ? 1 : -1
//     let yDirection = curY > accY ? 1 : -1
//     while (Math.abs(accX - curX) > segment || Math.abs(accY - curY) > segment) {
//       result.push([accX, accY])
//       if (Math.abs(accX - curX) > segment) {
//         accX = accX + xDirection * segment
//       }
//       if (Math.abs(accY - curY) > segment) {
//         accY = accY + yDirection * segment
//       }
//     }
//     result.push([curX, curY])
//     return cur
//   })
//   let timer = 0
//   result.map((item, index) => {
//     if (index % 2 === 0 && index < result.length - 1) {
//       item.unshift('M')
//       timer++
//     } else {
//       item.unshift('L')
//     }
//   })
//   console.log(result)
//   console.log(path)
//   return path
// }
// const MIN_ARROW_SIZE = 3
// // 注册边
// G6.registerEdge('line', {
//   // 获取路径
//   getPath (item) {
//     const points = item.getPoints()
//     const path = Util.pointsToPolygon(points)
//     return setLineDash(path, 5)
//   },
//   startArrow: {
//     path () {
//       const r = 5
//       const x = -5
//       const y = 0
//       return [
//         ['M', x, y - r],
//         ['a', r, r, 0, 1, 1, 0, 2 * r],
//         ['a', r, r, 0, 1, 1, 0, -2 * r],
//         ['z']
//       ]
//     },
//     shorten () {
//       return 10
//     },
//     style (item) {
//       const keyShape = item.getKeyShape()
//       const { strokeOpacity, stroke } = keyShape.attr()
//       return {
//         fillOpacity: strokeOpacity,
//         stroke
//       }
//     }
//   },
//   endArrow: {
//     path (item) {
//       const keyShape = item.getKeyShape()
//       let lineWidth = keyShape.attr('lineWidth')
//       lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE
//       const width = lineWidth * 10 / 3
//       const halfHeight = lineWidth * 4 / 3
//       const radius = lineWidth * 4
//       return [
//         ['M', -width, halfHeight],
//         ['L', 0, 0],
//         ['L', -width, -halfHeight],
//         ['A', radius, radius, 0, 0, 1, -width, halfHeight],
//         ['Z']
//       ]
//     },
//     shorten (item) {
//       const keyShape = item.getKeyShape()
//       const lineWidth = keyShape.attr('lineWidth')
//       return (lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE) * 3.1
//     },
//     style (item) {
//       const keyShape = item.getKeyShape()
//       const { strokeOpacity, stroke } = keyShape.attr()
//       return {
//         fillOpacity: strokeOpacity,
//         fill: stroke
//       }
//     }
//   }
// })