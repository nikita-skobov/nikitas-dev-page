import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import ConnectedList from './List'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ConnectedList} />
      </Switch>
    </div>
  )
}


export default connect()(App)
