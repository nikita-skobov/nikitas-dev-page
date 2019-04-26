import React, { Component } from 'react'
import { Spinner, Container, Jumbotron, Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'

import { fetchRepo } from '../../actions/fetchRepo'
import { REPO_COMPONENT_CLASS_NAME } from '../../constants'
import { has } from '../../utilities'
import { Badge } from '../Badge'

export class Repo extends Component {
  componentDidMount() {
    const { noDataYet, getRepo, repo } = this.props
    const { name } = repo
    if (noDataYet) {
      getRepo(name)
    }
  }

  render() {
    const { repo, noDataYet } = this.props
    const { name, description, updated_at: updatedAt } = repo
    if (noDataYet) {
      return (
        <Container className="d-flex h-100">
          <Spinner className={`mx-auto d-block align-self-center ${REPO_COMPONENT_CLASS_NAME}`} color="dark" />
        </Container>
      )
    }

    return (
      <div className={REPO_COMPONENT_CLASS_NAME}>
        <Jumbotron>
          <h2 className="display-3">{name}</h2>
          <Badge textA="Last updated" textB={updatedAt} />
          <p>
            <br />
            <span className="text-muted font-italic">{`"${description}"`}</span>
          </p>
          <hr className="my-2" />
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const propObj = { ...state, noDataYet: false }
  if (!has.call(propObj.repo, 'name')) {
    propObj.repo.name = ownProps.match.params.name
    propObj.noDataYet = true
  }
  return propObj
}

const mapActionsToProps = {
  getRepo: fetchRepo,
}

export default connect(mapStateToProps, mapActionsToProps)(Repo)
