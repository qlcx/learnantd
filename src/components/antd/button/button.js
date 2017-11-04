import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import { omit } from '../../../utils';
import Group from './button-group';

// \u4e00 \u9fa5是Unicode表中汉字的头和尾
// 匹配两个汉字
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

function isString(str) {
  return typeof str === 'string';
}

function insertSpace(child, needInserted) {
  if (child == null) {
    return
  }

  const SPACE = needInserted ? ' ' : '';
  // 如果子组件不是字符串或者数字类型，并且子组件的html标签是string，子组件的子组件是两个汉字
  if (typeof child !== 'string' && 
    typeof child !== 'number' && 
    isString(child.type) && 
    isTwoCNChar(child.props.children)) {
    // React.cloneElement(element, [props], [...children]) =>
    // <element.type {...element.props} {...props}>{children}</element.type>
    return React.cloneElement(child, {}, child.props.children.splite('').join(SPACE));
  }

  // 如果子组件为string类型且是两个汉字，则在两个汉字间插入空格
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }

    return <span>{child}</span>;
  }

  return child;
}

export default class Button extends Component {
  static Group;

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      clicked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentLoading = this.props.loading;
    const loading = nextProps.loading;

    if (currentLoading) {
      clearTimeout(this.delayTimeout);
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      // 设置loading延迟时间
      this.delayTimeout = setTimeout(() => this.setState({ loading }), loading.delay);
    } else {
      this.setState({ loading });
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    } else {
      clearTimeout(this.delayTimeout);
    }
  }

  handleClick(e) {
    this.setState({ clicked: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ clicked: false }), 500);

    const onClick = this.props.onClick;
    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      type, shape, size, className, htmlType, children, icon, prefixCls, ghost, ...others,
    } = this.props;

    const { loading, clicked } = this.state;

    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-background-ghost`]: ghost,
    });

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    // React.Children.count(children) 返回子组件的个数
    // 如果只有一个子组件并且iconType未定义或者为loading则插入空格
    const needInserted = React.Children.count(children) === 1 && (!iconType || iconType === 'loading');
    // 对每个child执行function并返回一个数组，如果children是null或undefined则返回null或undefined，
    // 若子组件（或孙子组件）中有两个汉字，则插入空格
    const kids = React.Children.map(children, child => insertSpace(child, needInserted));

    return <button 
      // 删除others中loading对象
      {...omit(others, ['loading'])} 
      type={htmlType || 'button'} 
      className={classes} 
      onClick={this.handleClick.bind(this)}>
      {iconNode}{kids}
    </button>;
  }
}

Button.defaultProps = {
  prefixCls: 'ant-btn',
  loading: false,
  // 幽灵属性，使按键透明
  ghost: false,
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger']),
  htmlType: PropTypes.string,
  icon: PropTypes.string,
  shape: PropTypes.oneOf(['circle', 'circle-outline']),
  size: PropTypes.oneOf(['small', 'large']),
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  disabled: PropTypes.bool,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  ghost: PropTypes.bool
}