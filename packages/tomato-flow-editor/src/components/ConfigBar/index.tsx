import React from 'react'
import { Drawer, Form, Select, } from 'antd'

const grid = {
  type: [
    { label: '无 Grid 布局', value: null, },
    {
      label: '点状布局',
      options: [
        { label: '点状网格', value: 'dot' },
        { label: '固定网点大小的点状网格', value: 'fixedDot' },
      ],
    },
    {
      label: '网状布局',
      options: [
        { label: '网状网格', value: 'mesh', },
        { label: '双线网状网格', value: 'doubleMesh', }
      ],
    },
  ]
}

const defaultConfig = {
  'grid.type': null
}

export default ({
  open = false,
  onClose = () => {},
  onChange = () => {},
}: {
  open: boolean;
  onClose: () => void;
  onChange: any;
}) => {
  const [form] = Form.useForm()

  const onChangeGridType = (type: string) => {
    // 更新画布
    onChange({ type, visible: !!type, })
  }

  return (
    <Drawer
      closable={false}
      width={560}
      open={open}
      title='画布设置'
      onClose={onClose}
    >
      <Form layout='vertical'>
        <Form.Item label="网格类型" name="grid.type">
          <Select
            defaultValue={defaultConfig['grid.type']}
            onChange={onChangeGridType}
            options={grid.type}
          />
        </Form.Item>
        {/* 设置 Grid 布局样式 */}
      </Form>
    </Drawer>
  )
};