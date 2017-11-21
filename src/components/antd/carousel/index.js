import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 函数去抖
import debounce from 'lodash.debounce';

// window.matchMedia 返回一个媒体查询字符串解析后的结果
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = mediaQuery => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

// 保证 matchMediaPolyfill运行在require('react-slick')之前
const SlickCarousel = require('react-slick').default;

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    // 函数去抖
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized.bind(this));
    }

    const { slick } = this.refs;
    this.innerSlider = slick && slick.innerSlider;
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized.bind(this));
      this.onWindowResized.cancel();
    }
  }

  onWindowResized() {
    const { slick } = this.refs;
    const { autoplay } = this.props;
    if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
      slick.innerSlider.autoPlay();
    }
  }

  render() {
    let props = {...this.props};

    if (props.effect === 'fade') {
      props.fade = true;
    }

    let className = props.prefixCls;
    if (props.vertical) {
      className = `${className} ${className}-vertical`;
    }

    return (
      <div className={className}>
        <SlickCarousel id='aa' ref='slick' {...props} />
      </div>
    );
  }
}

Carousel.defaultProps = {
  dots: true,
  arrows: false,
  prefixCls: 'ant-carousel',
  draggable: false,
  effect: 'scrollx',
  easing: 'linear',
}

Carousel.propTypes = {
  effect: PropTypes.oneOf(['scrollx', 'fade']),
  dots: PropTypes.bool,
  vertical: PropTypes.bool,
  autoplay: PropTypes.bool,
  easing: PropTypes.string,
  beforeChange: PropTypes.func,
  afterChange: PropTypes.func,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  accessibility: PropTypes.bool,
  nextArrow: PropTypes.any,
  prevArrow: PropTypes.any,
  pauseOnHover: PropTypes.bool,
  className: PropTypes.string,
  adaptiveHeight: PropTypes.bool,
  arrows: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  centerMode: PropTypes.bool,
  centerPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  cssEase: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  dotsClass: PropTypes.string,
  draggable: PropTypes.bool,
  fade: PropTypes.bool,
  focusOnSelect: PropTypes.bool,
  infinite: PropTypes.bool,
  initialSlide: PropTypes.bool,
  lazyLoad: PropTypes.bool,
  rtl: PropTypes.bool,
  slide: PropTypes.string,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  speed: PropTypes.number,
  swipe: PropTypes.bool,
  swipeToSlide: PropTypes.bool,
  touchMove: PropTypes.bool,
  touchThreshold: PropTypes.number,
  variableWidth: PropTypes.bool,
  useCss: PropTypes.bool,
  slickGoTo: PropTypes.number,
}