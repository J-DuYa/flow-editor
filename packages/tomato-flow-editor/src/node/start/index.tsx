import * as React from 'react'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'

const StartNode = ({_, node }: any) => {
  const nodeRef = React.useRef<HTMLDivElement>()

  const {
    data: {
      onclick = () => {},
      background = '#599527',
      color = '#E3E3E3',
      schema = {},
      tomato: {
        name = '开始', 
      },
    }
  } = node

  /**
   * 进入组件的时候创建连接桩
   * https://x6.antv.antgroup.com/tutorial/basic/port
  */
  React.useEffect(() => {
    node.size({
      width: nodeRef.current?.clientWidth,
      height: nodeRef.current?.clientHeight,
    })
  }, [node.data.tomato])
  

  const handleClick = () => {
    // 将节点信息传递给侧边栏
    onclick({
      name,
      values: {
        name: name,
      },
      schema: schema?.default || {},
      node,
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
  shape: 'start-node',
  component: StartNode,
})
