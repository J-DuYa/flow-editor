import * as React from 'react'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'

const EndNode = ({_, node }: any) => {
  const nodeRef = React.useRef<HTMLDivElement>()
  const {
    data: {
      tomato: {
        name = '结束',
      },
      onclick = () => {},
      background = '#599527',
      color = '#E3E3E3',
      schema = {},
    }
  } = node

  React.useEffect(() => {
    node.size({
      width: nodeRef.current?.clientWidth,
      height: nodeRef.current?.clientHeight,
    })
  }, [node.data])

  const handleClick = () => {
    // 将节点信息传递给侧边栏
    onclick({
      name,
      values: {
        name,
      },
      node,
      schema: schema?.default || {},
    })
  }

  return (
    <Button
      // @ts-ignore
      ref={nodeRef}
      shape='round'
      onDoubleClick={handleClick}
      style={{
        background,
        color,
        borderColor: background,
      }}
    >
      { name }
    </Button>
  )
}

register({
  shape: 'end-node',
  component: EndNode,
})
