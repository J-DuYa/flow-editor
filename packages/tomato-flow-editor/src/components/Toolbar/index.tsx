import React, { useState, useEffect } from 'react';
import { DataUri, } from '@antv/x6'
import { Button, Upload, message, } from 'antd'
import { Toolbar } from '@antv/x6-react-components';
import { ZoomInOutlined, ZoomOutOutlined, UndoOutlined, RedoOutlined, } from '@ant-design/icons';

import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import './index.less';

const Item = Toolbar.Item
const Group = Toolbar.Group

export const MIN_ZOOM = 0.5
export const MAX_ZOOM = 1.5
export const ZOOM_STEP = 0.1

export default ({
  graph,
}: any) => {
  const [disabled, setDisabled] = useState(false)
  const [zoom, setZoom] = useState<number>(1)

  const undo = () => {
    graph.undo()
  }

  const redo = () => {
    graph.redo()
  }

  const zoomOut = () => {
    console.log('graph.zoom()', graph.zoom())
    if (graph.zoom() > MIN_ZOOM) {
      const nextZoom = (graph.zoom() - ZOOM_STEP).toPrecision(2)
      setZoom(Number(nextZoom))
      graph.zoomTo(Number(nextZoom))
    }
  }

  const zoomIn = () => {
    if (graph.zoom() < MAX_ZOOM) {
      const nextZoom = (graph.zoom() + ZOOM_STEP).toPrecision(2)
      setZoom(Number(nextZoom))
      graph.zoomTo(Number(nextZoom))
    }
  }

  // 导出为流程图
  const importToDSL = () => {
    const dsl = JSON.stringify(graph.toJSON(), null, 2)
    const blob = new Blob([dsl], { type: 'text/plain' })
    DataUri.downloadBlob(blob, 'tomato.dsl.json')
  }

  const beforeUpload = (file: any) => {
    setDisabled(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDisabled(false);
      if (!evt.target) {
        message.error('加载文件失败!');
      } else {
        const dsl = evt.target.result as string;
        try {
          graph.fromJSON(JSON.parse(dsl));
        } catch (err) {
          message.error('DSL解析失败!');
        }
      }
    };
    reader.readAsText(file);
  }

  return (
    <Toolbar className='tools'>
      <Group>
        <Upload
          accept={'.json'}
          disabled={disabled}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button type='link' size='small'>导入DSL</Button>
        </Upload>
      </Group>
      <Group>
        {/* 放大 */}
        <Item onClick={zoomIn} name="zoomIn" icon={<ZoomInOutlined />} />
        <span className='per'>{(zoom * 100).toFixed(0)}%</span>
        {/* 缩小 */}
        <Item onClick={zoomOut} name="zoomOut" icon={<ZoomOutOutlined />} />
      </Group>
      <Group>
        <Item onClick={undo} name="undo" tooltip="撤回 (Cmd + Z)" icon={<UndoOutlined />} />
        <Item onClick={redo}  name="redo" tooltip="恢复 (Cmd + Shift + Z)" icon={<RedoOutlined />} />
      </Group>
      <Group>
        <Button onClick={importToDSL} type='primary' size='small'>导出为DSL</Button>
      </Group>
    </Toolbar>
  )
}