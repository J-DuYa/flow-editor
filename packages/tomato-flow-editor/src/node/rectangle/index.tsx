import * as React from 'react'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'

const ProcessNode = ({_, node }: any) => {
  const nodeRef = React.useRef<HTMLDivElement>()
  const {
    data: {
      tomato: {
        name = '活动/处理进程', 
      },
      type ='primary',
      onclick = () => {},
    },
  } = node

  const handleClick = () => {
    // 将节点信息传递给侧边栏
    onclick({
      name,
      node,
    })
  }

  React.useEffect(() => {
    node.size({
      width: nodeRef.current?.clientWidth,
      height: nodeRef.current?.clientHeight,
    })
  }, [node.data])

  return (
    <Button
      // @ts-ignore
      ref={nodeRef}
      onDoubleClick={handleClick}
      type={type}
    >
      { name }
    </Button>
  )
}

register({
  shape: 'process-node',
  component: ProcessNode,
})
