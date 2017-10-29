import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './views/Home'
import NoRouter from './views/NoRouter'

const router = () => {
  return <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route component={NoRouter} />
    </Switch>
  </Router>
}

export default router