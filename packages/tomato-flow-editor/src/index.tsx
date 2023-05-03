import React, { useEffect, useState } from 'react'
import { Graph, } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { useReactive } from 'ahooks'
import { createSchemaField } from '@formily/react'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { Transform } from '@antv/x6-plugin-transform'
import { Export } from '@antv/x6-plugin-export'
import { createForm, onFormValuesChange } from '@formily/core'
import {
  Form,
  FormItem,
  NumberPicker,
  ArrayTable,
  Editable,
  Input,
} from '@formily/antd'
import { Drawer, message, } from 'antd'
import Toolbar from './components/Toolbar'
import Menu from './components/Menu'
import CodeEditor from './components/CodeEditor'
import TomatoEditorHeader from './components/TomatoEditorHeader'
import EditorTools from './components/EditorTools'
import ConfigBar from './components/ConfigBar'
import EventBus from './utils/event-bus'
import type { FlowEditorType } from './types/data.d'
import './index.less'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    NumberPicker,
    ArrayTable,
  },
})

const Bus = new EventBus()

// const form = createForm({
//   effects() {
//     onFormValuesChange(({values}) => {
//       Bus.notify('tomato-form-update', values)
//     })
//   },
// })

export default (props: FlowEditorType) => {
  const {
    title = '流程设计器',
  } = props
  const [graph, setGraph] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [ schema, setSchema] = useState<Record<string, any>>({})
  const [menu, setMenu] = useState<string>('lowcode')
  const form = useReactive<{
    [name: string]: any;
  }>({
    form: null,
    key: null,
    defaultValue: {},
  })
  const [messageApi, contextHolder] = message.useMessage()
  const cfgDrawer = useReactive({
    open: false
  })
  const codeDrawer = useReactive({
    open: false
  })
  const [menus] = useState<Array<any>>(
    [
      {
        key: 'lowcode',
        icon: <i className='iconfont icon-com' />,
        callback: () => {},
      },
      {
        key: 'request',
        label: '源配置',
        icon: <i className='iconfont icon-request' />,
        callback: () => {
          message.destroy()
          messageApi.warning({
            content: '“请求源配置”功能正在开发中，请耐心等待...',
            icon: <i className='iconfont icon-warning' />
          })
        }
      },
      {
        key: 'code',
        label: '代码编辑区域',
        icon: <i className='iconfont icon-code' />,
        callback: () => {
          codeDrawer.open = true
          setMenu('lowcode')
        }
      },
      {
        key: 'setting',
        label: '画布设置',
        icon: <i className='iconfont icon-setting' />,
        callback: () => {
          cfgDrawer.open = true
          setMenu('lowcode')
        }
      },
      {
        key: 'more',
        label: '更多配置项',
        icon: <i className='iconfont icon-more' />,
        callback: () => {
          message.destroy()
          messageApi.warning({
            content: '“更多配置项”功能正在开发中，请耐心等待...',
            icon: <i className='iconfont icon-warning' />
          })
        }
      }
    ]
  )

  Bus.subscribe(form.key, (value: any) => {
    if (graph?.getNodes && schema.node) {
      const node = graph.getNodes()
      console.log('----- node -----', node, schema)
      const n = node.find(el => schema.node.id === el.id)
      console.log('------n -----', n)
      n.prop('data/tomato', value)
    }
  })

  // 初始化画布
  const init = () => {
    // 通过 useState 建造一个单例模式的对象
    const  x6: Graph = new Graph({
      // @ts-ignore
      container: document.getElementById('x6-editor'),
      background: {
        color: '#F2F7FA',
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      width: window.screen.availWidth - 320,
      height: window.screen.availHeight- 60,
      clipboard: true,
      panning: true,
      selecting: true,
      connecting: {
        router: {
          name: 'manhattan',
        },
      },
    })

    x6.use(
      new Snapline({
        enabled: true,
        sharp: false,
      })
    )

    x6.use(
      new History({
        enabled: true,
      })
    )

    x6.use(
      new Keyboard({
        enabled: true,
        global: true,
        format(key) {
          return key.replace(/\s/g, '').replace('cmd', 'command')
        },
      })
    )

    // 注册变形功能
    x6.use(
      new Transform({
        resizing: {
          enabled: true,
          minWidth: 1,
          maxWidth: 200,
          minHeight: 1,
          maxHeight: 150,
          orthogonal: false,
          restrict: false,
          preserveAspectRatio: false,
        }
      })
    )

    x6.use(
      new Selection({
        enabled: true,
      })
    )

    // 注册导出功能，支持 png、svg、jpeg
    x6.use(new Export())

    // 绑定 ctrl + z 快捷键
    x6.bindKey('ctrl+z', () => {
      x6.undo()
    })

    // 绑定 ctrl + shift + z 快捷键
    x6.bindKey('ctrl+shift+z', () => {
      x6.redo()
    })

    x6.on('node:mouseenter', () => {
      changePortsVisible(true);
    })

    x6.on('node:mouseleave', () => {
      changePortsVisible(false);
    })

    x6.on('node:selected', ({ node }) => {
      node.addTools([
        {
          name: 'boundary',
          args: {
            padding: 5,
            attrs: {
              fill: '#FCFB3B',
              stroke: '#EE0404',
              strokeWidth: 1,
              fillOpacity: 0.2,
            },
          },
        },
      ])
      changePortsVisible(false);
    })

    x6.on('node:unselected', ({ node }) => {
      node.removeTools()
    })

    x6.on('node:change:position', (data) => {
      console.log('----- data', data)
    })

    setGraph(x6)
  }

  const changePortsVisible = (visible: boolean) => {
    const ports = document.getElementById('x6-editor')?.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGAElement>;
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = visible ? "visible" : "hidden";
    }
  };

  useEffect(() => {
    init()
  }, [])

  // 关闭编辑弹框
  const onClose = () => {
    Bus.unSubscribe(form.key)
    setOpen(false)
  }

  const handleClickNode = (params: Record<string, any> = {}) => {
    console.log('---- node ----', params)
    setSchema(params)
    form.key = Symbol()
    form.form = createForm({
      values: params.values,
      effects() {
        onFormValuesChange(({values}) => {
          Bus.notify(form.key, values)
        })
      },
    })

    setOpen(true)
  }

  const onChangeMenu = (value: string) => {
    const selected = menus.find(el => el.key === value)
    setMenu(value)
    selected.callback()
  }

  const handleCloseCfgDrawer = () => {
    cfgDrawer.open = false
  }

  const handleCloseEditorDrawer = () => {
    codeDrawer.open = false
  }

  const onGridChanged = (options: any) => {
    graph.drawGrid(options)
  }

  return (
    <section className='tomato-flow-editor'>
      <TomatoEditorHeader
        title={title}
      />
      <div className='tomato-flow-editor-container'>
        { contextHolder }
        {/* 菜单栏 */}
        <Menu
          className='tomato-menus'
          value={menu}
          onChange={onChangeMenu}
          items={menus}
        />
        {/* 左侧菜单栏 */}
        <EditorTools handleClickNode={handleClickNode} graph={graph} />
        {/* 流程内容区域 */}
         {/* 小地图 */}
         {/* <div id='minimap' /> */}
        <div id='x6-editor'/>
        <Toolbar graph={graph} />
        {/* 右侧编辑弹框 */}
        <Drawer
          title='节点配置'
          placement='right'
          open={open}
          onClose={onClose}
          width={560}
          closable={false}
        >
          <Form form={form.form} layout='vertical'>
            <SchemaField schema={schema?.schema || {}} />
          </Form>
        </Drawer>
      </div>

      {/* 设置 Drawer */}
      <ConfigBar
        onChange={onGridChanged}
        onClose={handleCloseCfgDrawer}
        open={cfgDrawer.open}
      />

      {/* 代码编辑器 */}
      <CodeEditor
        open={codeDrawer.open}
        onClose={handleCloseEditorDrawer}
      />
    </section>
  );
}