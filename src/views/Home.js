import React, { Component } from 'react'
import { Button } from 'antd'
import 'antd/lib/button/style/css'

import styles from './Home.scss'

export default class Home extends Component {
  render() {
    return <div>
      <Button type='primary' size='large'>primary</Button>
      <h1 className={styles.text}>antd</h1>
    </div>
  }
}