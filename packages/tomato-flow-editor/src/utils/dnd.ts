// 注册 dnd
export const registryDnd = ({
  shape,
  dnd,
  e,
  schema,
  graph,
  onclick,
  attrs = {},
  props = {},
}: any) => {
  dnd.start(graph.createNode({
    shape,
    data: {
      onclick,
      schema,
      tomato: {},
      ...props,
    },
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          id: 'top',
          group: 'top',
        },
        {
          id: 'bottom',
          group: 'bottom',
        },
        {
          id: 'left',
          group: 'left',
        },
        {
          id: 'right',
          group: 'right',
        },
      ],
    },
  }), e.nativeEvent)
}