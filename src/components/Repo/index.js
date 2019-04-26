import React, { Component } from 'react'
import { Spinner, Container } from 'reactstrap'
import { connect } from 'react-redux'

import { REPO_COMPONENT_CLASS_NAME } from '../../constants'
import { has, objectOnlyHas } from '../../utilities'

export class Repo extends Component {
  constructor(props) {
    super(props)
    const { name, updated_at: updatedAt } = props.repo
    this.name = name
    this.updatedAt = updatedAt
    // props.repo should ALWAYS have name, but if it doesnt have
    // anything else, that means no data was fetched yet
    this.noDataYet = objectOnlyHas(props.repo, 'name')
  }

  render() {
    const { name, updatedAt, noDataYet } = this
    if (noDataYet) {
      return (
        <Container className="d-flex h-100">
          <Spinner className={`mx-auto d-block align-self-center ${REPO_COMPONENT_CLASS_NAME}`} color="dark" />
        </Container>
      )
    }

    return (
      <div className={REPO_COMPONENT_CLASS_NAME}>
        <div>Name2: {name}</div>
        <div>Last updated: {updatedAt}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const propObj = { ...state }
  if (!has.call(propObj.repo, 'name')) {
    propObj.repo.name = ownProps.match.params.name
  }
  return propObj
}

export default connect(mapStateToProps)(Repo)
