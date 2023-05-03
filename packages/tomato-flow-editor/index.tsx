import React from 'react'
import { createRoot } from 'react-dom/client'
import '@antv/x6-react-shape'
// 注册自定义节点
import './src/node'
// 注册自定义连接线
import './src/edge'
import Demo from './src'
import './src/theme/index.less'
import './index.less'

const container =document.getElementById('root') as HTMLElement
createRoot(container).render(<Demo title='Tomato 流程设计器' />)
