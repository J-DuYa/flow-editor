import React from 'react';
import { Menu } from '@antv/x6-react-components';
import {
  CopyOutlined,
  ScissorOutlined,
  UndoOutlined,
  RedoOutlined,
  DeleteOutlined,
  SnippetsOutlined,
  ControlOutlined,
  DesktopOutlined,
  FullscreenOutlined
} from '@ant-design/icons';
import '@antv/x6-react-components/es/menu/style/index.css';
import './index.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

export default () => {
  return (
    <Menu hasIcon={true}>
      <MenuItem name="undo" icon={<UndoOutlined />} hotkey="Cmd+Z" text="Undo" />
      <MenuItem name="redo" icon={<RedoOutlined />} hotkey="Cmd+Shift+Z" text="Redo" />
      <Divider />
      <MenuItem name="cut" icon={<ScissorOutlined />} hotkey="Cmd+X" text="Cut" />
      <MenuItem name="copy" icon={<CopyOutlined />} hotkey="Cmd+C" text="Copy" />
      <MenuItem name="paste" icon={<SnippetsOutlined />} hotkey="Cmd+V" disabled={true} text="Paste" />
      <MenuItem name="delete" icon={<DeleteOutlined />} hotkey="Delete" text="Delete" />
      <Divider />
      <SubMenu text="Appearance" icon={<ControlOutlined />}>
        <MenuItem name="zen" icon={<DesktopOutlined />} hotkey="Cmd+K Z" text="Zen Mode" />
        <MenuItem name="fullscreen" icon={<FullscreenOutlined />} hotkey="Cmd+Shift+F" text="Full Screen" />
        <Divider />
        <MenuItem name="side-bar" text="Show Side Bar" />
        <MenuItem name="status-bar" text="Show Status Bar" />
        <MenuItem name="activity-bar" text="Show Activity Bar" />
        <MenuItem name="editor-area" text="Show Editor Area" />
        <MenuItem name="show-panel" text="Show Panel" />
      </SubMenu>
    </Menu>
  )
};