// 左侧工具栏菜单配置
import {
  start,
  end,
} from './../schema'

export default [
  {
    title: '基础节点',
    key: 'basic',
    icon: 'icon-chakangengduo',
    children: [
      {
        type: 'start-node',
        title: '开始节点',
        icon: 'icon-start',
        schema: start,
      },
      {
        type: 'end-node',
        title: '结束节点',
        icon: 'icon-Enable',
        schema: end,
      },
      {
        type: 'process-node',
        title: '活动/处理进程节点',
        icon: 'icon-rectangle',
        schema: {},
      },
      {
        type: 'prism-node',
        title: '判断/判定节点',
        icon: 'icon-prism-sharp',
        schema: {},
      }
    ]
  },
  {
    title: '任务节点',
    key: 'task',
    icon: 'icon-Cloud',
  },
  {
    title: '时序图节点',
    key: 'plantUML',
    remark: '时序图的绘制会先判断是否有其他类型的流程存在，如果有则会清空上一个流程，再填充数据（之前流程可还原）',
    icon: 'icon-moxingku',
  }
]
