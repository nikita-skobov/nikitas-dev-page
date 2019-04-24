import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import ConnectedList from './List'
import ConnectedRepo from './Repo'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ConnectedList} />
        <Route path="/repo/:name2" component={ConnectedRepo} />
      </Switch>
    </div>
  )
}


export default connect()(App)
