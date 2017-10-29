import React, { Component } from 'react'
import classNames from 'classnames'
import { Icon } from 'antd'
import { omit } from '../../utils'
import Group from './button-group'

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)
function isString(str) {
  return typeof str === 'string'
}

function insertSpace(child, needInserted) {
  if (child == null) {
    return
  }

  const SPACE = needInserted ? ' ' : ''
  if (typeof child !== 'string' && 
    typeof child !== 'number' && 
    isString(child.type) && 
    isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {}, child.props.children.splite('').join(SPACE))
  }

  if (typeof child === 'string') {
    if (isTwoChar(child) {
      child = child.split('').join(SPACE)
    }

    return <span>{child}</span>
  }
}

export default class Button extends Component {
  static Group
  static __ANT_BUTTON = true
  static defaultProps = {
    prefixCls: 'ant-btn',
    loading: false,
    ghost: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: props.loading,
      clicked: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentLoading = this.props.loading
    const loading = nextProps.loading

    if (currentLoading) {
      clearTimeout(this.delayTimeout)
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = setTimeout(() => this.setState({ loading }), loading.delay)
    } else {
      this.setState({ loading })
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    } else {
      clearTimeout(this.delayTimeout)
    }
  }

  handleClick = e => {
    this.setState({ clicked: true })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.setState({ clicked: false }), 500)

    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const {
      type, shape, size, className, htmlType, children, icon, prefixCls, ghost, ...others,
    } = this.props

    const { loading, clicked } = this.state

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

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-background-ghost`]: ghost,
    })

    const iconType = loading ? 'loading' : icon
    const iconNode = iconType ? <Icon type={iconType} /> : null
    const needInserted = React.Children.count(children) === 1 && (!iconType || iconType === 'loading')
    const kids = React.Children.map(children, child => insertSpace(child, needInserted))

    return <button 
      {...omit(others, ['loading'])} 
      type={htmlType | 'button'} 
      className={classes} 
      onClick={this.handleClick}>
      {iconNode}{kids}
    </button>
  }
}