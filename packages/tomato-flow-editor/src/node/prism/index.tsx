import * as React from 'react'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'
import './index.less'

const PrismNode = ({_, node }: any) => {
  const nodeRef = React.useRef<HTMLDivElement>()
  const {
    data: {
      tomato: {
        name = '',
      },
      onclick = () => {},
      background = '#F8A306',
      color = '#E3E3E3',
      height = '100px',
    },
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
      node,
    })
  }

  return (
    <Button
      // @ts-ignore
      ref={nodeRef}
      className='flow-prism'
      onDoubleClick={handleClick}
      style={{
        background,
        color,
        height,
        width: height,
        borderColor: background,
      }}
    >
      &nbsp;
    </Button>
  )
}

register({
  shape: 'prism-node',
  component: PrismNode,
})
