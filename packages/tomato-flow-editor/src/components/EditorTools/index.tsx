import React, { useEffect, useState, } from 'react'
import { Tooltip, message } from 'antd'
import { Dnd } from '@antv/x6-plugin-dnd'
import { HolderOutlined } from '@ant-design/icons'
import menus from './../../config/menu'
import { registryDnd } from './../../utils/dnd'
import { start, end, } from './../../schema'
import './index.less'

export default (props: any) => {
  const { graph, handleClickNode, } = props
  const [dnd, setDnd] = useState<any>(null)
  const [dom, setContainer] = useState<HTMLDivElement>()

  useEffect(() => {
    initShape();
  }, [graph, dom])

  const dndContainerRef = (container: HTMLDivElement) => {
    setContainer(container)
  }

  const initShape = () => {
    if (graph && dom) {
      setDnd(new Dnd({
        target: graph,
        scaled: false,
        dndContainer: dom,
      }))
    }
  }

  // 拖拽节点到画布
  const  startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    console.log('---- 当前节点 ----')

    /* 查询现有的节点有哪些，用于排除 */
    const nodes = graph.getNodes()

    console.log('nodes', nodes)

    switch (type) {
      case 'start-node':
        const isExistStartNode = nodes.find((el: any) => el.shape === 'start-node')

        if (isExistStartNode) {
          message.warning('一个流程只能存在一个开始节点')
          return false
        }

        registryDnd({
          dnd,
          shape: 'start-node',
          onclick: handleClickNode,
          schema: start,
          e,
          graph,
        })
        break;
      case 'end-node':
        registryDnd({
          dnd,
          shape: 'end-node',
          onclick: handleClickNode,
          schema: end,
          e,
          graph,
        })
        break;
      case 'process-node':
        registryDnd({
          dnd,
          shape: 'process-node',
          onclick: handleClickNode,
          schema: end,
          e,
          graph,
        })
        break;
        case 'prism-node':
          registryDnd({
            dnd,
            shape: 'prism-node',
            onclick: handleClickNode,
            schema: end,
            e,
            graph,
          })
          break;
      default:
    }
  }

  return (
    <div ref={dndContainerRef} id='flow-editor-tools'>
      {
        menus.map(group => {
          return (
            <div className='flow-editor-menu' key={group.key}>
              <h2>
                <i className={`iconfont ${group.icon}`} />
                { group.title }
                {
                  group.remark && <Tooltip
                    placement='topLeft'
                    title={`⚡️ 备注：${group.remark}`}
                    color='#145CAC'
                    arrowPointAtCenter
                  >
                    <i className={`iconfont flow-editor-remark icon-A`} />
                  </Tooltip>
                }
              </h2>
              {
                (group?.children || []).map(menu => {
                  return (
                    <div key={menu.type} data-type={menu.type} onMouseDown={startDrag} className='flow-tools-item'>
                      <div className='flow-tools-left'>
                        <i className={`iconfont ${menu.icon}`} />
                        <span className='flow-tools-desc'>{menu.title}</span>
                      </div>
                      <HolderOutlined />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}