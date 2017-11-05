import React, { Component } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, mount } from 'enzyme';

import { Button } from '..';
import Icon from '../../icon';

Enzyme.configure({ adapter: new Adapter() });


// render 用于将React组件渲染成静态HTML并分析HTML节
// mount (Full Rendering) 测试组件完整的声明周期
// shallow 仅仅渲染至virtual DOM，不会渲染至真实节点，能够提高测试性能
describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Button>Follow</Button>
    );
    // expect(value) 测试一个值
    // toMatchSnapshot快照测试，先渲染UI组件，然后截图(__snapshots__)，最后和独立于测试存储的参考图像进行比较
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(
      <Button>按钮</Button>
    );
    expect(wrapper).toMatchSnapshot();

    // 有icon的时候将不会插入空格
    const wrapper1 = render(
      <Button icon='search'>按钮</Button>
    );
    expect(wrapper1).toMatchSnapshot();
    const wrapper2 = render(
      <Button><Icon type='search' />按钮</Button>
    );
    expect(wrapper2).toMatchSnapshot();
  });

  it('have static property for type detecting', () => {
    const wrapper = mount(
      <Button>Button Text</Button>
    );
    // type() 返回当前节点，若它是一个组件，返回constructor；若它是一个native DOM节点，则返回tag Name
    expect(wrapper.type().__ANT_BUTTON).toBe(true);
  });

  it('should change loading state instantly by default', () => {
    class DefaultButton extends Component {
      constructor(props) {
        super(props);
        this.state = { loading: false };
        this.enterLoading = this.enterLoading.bind(this);
      }
      enterLoading() {
        this.setState({ loading: true });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>aa</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.find('button').hasClass("ant-btn-loading")).toBe(true);
  });

  it('should change loading state with delay', () => {
    class DefaultButton extends Component {
      constructor(props) {
        super(props);
        this.state = { loading: false };
        this.enterLoading = this.enterLoading.bind(this);
      }
      enterLoading() {
        this.setState({ loading: { delay: 1000 } });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.hasClass('ant-btn-loading')).toBe(false);
  });
});