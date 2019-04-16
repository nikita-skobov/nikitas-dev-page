import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import Footer from './Footer'
import List from './List'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Footer} />
        <Route path="/article/:id" component={List} />
      </Switch>
    </div>
  )
}


export default connect()(App)
