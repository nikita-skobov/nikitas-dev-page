import React from 'react'
import { connect } from 'react-redux'

import { fetchSpecific } from '../actions/fetchData'
import './App.css'

export function SomeComponent(props) {
  return (
    <div>
      <button id="test-button" type="button" onClick={props.func1}>Click here</button>
    </div>
  )
}

export function App(props) {
  const { fetchSomething, someText } = props

  return (
    <div className="app-container">
      <SomeComponent func1={fetchSomething} />
      <h1>{someText}</h1>
    </div>
  )
}

const mapStateToProps = state => ({ someText: state.app.url })

const mapActionsToProps = {
  fetchSomething: fetchSpecific,
}

export default connect(mapStateToProps, mapActionsToProps)(App)
