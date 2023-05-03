import {  Shape } from '@antv/x6'

Shape.Edge.define({
  router: {
    name: 'metro',
    args: {
      startDirections: ['bottom'],
      endDirections: ['top'],
    },
  },
})