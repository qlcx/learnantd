import React from 'react'
import classNames from 'classnames'

const ButtonGroup = props => {
  const { prefixCls = 'ant-btn-group', size, className, ...others } = props

  let sizeCls = ''
  switch (size) {
    case 'large':
      sizeCls = 'lg'
      break
    case 'small':
      sizeCls = 'sm'
      break
    default:
      break
  }

  const classes = classNames(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
  }, className)

  return <div {...others} className={classes} />
}

export default ButtonGroup