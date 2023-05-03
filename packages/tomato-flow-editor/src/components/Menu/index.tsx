import React, { ReactElement } from 'react'
import QueueAnim from 'rc-queue-anim'
import './index.less'

export default ({
  items = [],
  className = '',
  value = null,
  onChange = () => {},
}: {
  items: Array<{
    icon: ReactElement;
    label: String;
  }>;
  className: String;
  value: any;
  onChange: (value: any) => void;
}) => {

  return (
    <QueueAnim delay={300} className={`${className} tomato-menu`}>
      <ul>
        {
          items.map((el: any) => {
            return (
              <li onClick={() => onChange(el.key)} key={el.key} className={`${value === el.key || el.key ==='lowcode' ? 'select' : ''} ${el.key ==='lowcode' ? 'disabled' : ''}`}>
                { el.icon }
              </li>
            )
          })
        }
      </ul>
    </QueueAnim>
  )
}
