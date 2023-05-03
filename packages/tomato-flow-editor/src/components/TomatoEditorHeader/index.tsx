import React from 'react';
import type { FlowEditorHeaderType } from '../../types/data.d';
import './index.less';

export default ({
  title
}: FlowEditorHeaderType) => {
  return (
    <div className='flow-editor-header'>
      <h3 className='flow-editor-header-title'>
        <i className="logo iconfont icon-workflow" />
        {title}
      </h3>
      <a href='https://www.craft.do/s/JW1Otnc5H8102p' target='_blank'>计划日记</a>
    </div>
  )
};