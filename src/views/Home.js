import React, { Component } from 'react'
import { Button } from 'antd'
import { Button as Btn } from '../components/button'

import styles from './Home.scss'

export default class Home extends Component {
  render() {
    return <div>
      <Button type='primary' size='large'>Button</Button>
      <Btn type='primary' size='large'>Btn</Btn>
      <h1 className={styles.text}>antd</h1>
    </div>
  }
}