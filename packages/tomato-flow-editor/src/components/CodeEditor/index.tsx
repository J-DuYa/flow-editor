import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { Drawer, Tree, } from 'antd'
import './index.less'

const { DirectoryTree } = Tree

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
]

export default ({
  open = false,
  onClose = () => {},
}: {
  open: boolean;
  onClose: () => void;
}) => {

  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco: any) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = monaco;
  }

  // 为了方便之后代码的扩充，这边定义在外面

  const onSelect = () => {}

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  }

  return (
    <Drawer
      open={open}
      placement='left'
      width={900}
      title='代码编辑器'
      onClose={onClose}
      closable={false}
      className='tomato-editor'
    >
      <div className='folder-menu'>
        <DirectoryTree
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </div>
       <Editor
          theme='vs-dark'
          defaultLanguage='javascript'
          defaultValue='// some comment'
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
    </Drawer>
  )
}