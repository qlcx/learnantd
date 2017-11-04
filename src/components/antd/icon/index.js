import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from '../../../utils';

const Icon = props => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true
  }, className);

  return <i {...omit(props, ['type', 'spin'])} className={classString} />;
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  spin: PropTypes.bool,
  style: PropTypes.object
};

export default Icon;