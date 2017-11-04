import React, { Component } from 'react'
import 'antd/lib/button/style/css'
import 'antd/lib/icon/style/css'
import { 
  Button as Btn,
  Icon,
} from '../components/antd'

import styles from './Home.scss'

export default class Home extends Component {
  btnClickEvent() {
    // console.log('click')
  }

  render() {
    return <div>
      <Btn type='primary' size='large' onClick={this.btnClickEvent}>
        <Icon type='up' />Btn
      </Btn>
    </div>
  }
}