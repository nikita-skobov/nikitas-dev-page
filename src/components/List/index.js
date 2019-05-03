import React, { Component } from 'react'
import { Spinner, Container, ListGroup } from 'reactstrap'
import { connect } from 'react-redux'

import { LIST_COMPONENT_CLASS_NAME } from '../../constants'
import { fetchRepoList } from '../../actions/fetchRepoList'
import ConnectedListItem from '../ListItem'

export class List extends Component {
  componentDidMount() {
    const { fetchList, noDataYet } = this.props
    if (noDataYet) {
      fetchList()
    }
  }

  render() {
    const { repoList } = this.props
    const { list } = repoList

    if (!Array.isArray(list)) {
      // if not array, then it means reducer returned an error
      return (
        <div className={LIST_COMPONENT_CLASS_NAME}>
          Unable to load list
        </div>
      )
    }

    if (list.length === 0) {
      return (
        <Container className={`d-flex h-100 ${LIST_COMPONENT_CLASS_NAME}`}>
          <Spinner className="mx-auto d-block align-self-center" color="dark" />
        </Container>
      )
    }

    return (
      <div className={LIST_COMPONENT_CLASS_NAME}>
        <ListGroup>
          {list.map((item) => {
            if (item.fork) {
              // dont show repositories that are forks
              return null
            }
            return <ConnectedListItem key={item.node_id} item={item} />
          })}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const propObj = { ...state, noDataYet: true }

  const { repoList } = state
  const { list } = repoList
  if (Array.isArray(list) && list.length > 0) {
    propObj.noDataYet = false
  }

  return propObj
}

const mapActionsToProps = {
  fetchList: fetchRepoList,
}

export default connect(mapStateToProps, mapActionsToProps)(List)
