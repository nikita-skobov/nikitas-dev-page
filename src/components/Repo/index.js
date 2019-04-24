import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import { connect } from 'react-redux'

export function Repo(props) {
  console.log(props)
  const { name, updated_at } = props

  return (
    <div>
      <div>Name2: {name}</div>
      <div>Last updated: {updated_at}</div>
    </div>
  )
}


export default connect()(Repo)
