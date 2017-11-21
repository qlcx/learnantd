import React, { Component } from 'react';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/carousel/style/css';
import { 
  Button as Btn,
  Icon,
  Carousel,
} from '../components/antd';

import styles from './Home.scss';

export default class Home extends Component {
  btnClickEvent() {
    // console.log('click')
  }

  render() {
    return <div>
      <Btn type='primary' size='large' onClick={this.btnClickEvent}>
        <Icon type='up' />Btn
      </Btn>
      <div style={{padding: '42px 20px 50px'}}>
        <Carousel autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </div>
    </div>;
  }
}