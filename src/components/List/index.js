import React, { Component } from 'react'
import { Spinner, Container } from 'reactstrap'
import { connect } from 'react-redux'

import { LIST_COMPONENT_CLASS_NAME } from '../../constants'
import { fetchRepoList } from '../../actions/fetchRepoList'
import ConnectedListItem from '../ListItem'

export class List extends Component {
  componentDidMount() {
    const { fetchList } = this.props
    fetchList()
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
        <Container className="d-flex h-100">
          <Spinner className={`mx-auto d-block align-self-center ${LIST_COMPONENT_CLASS_NAME}`} color="dark" />
        </Container>
      )
    }

    return (
      <div className={LIST_COMPONENT_CLASS_NAME}>
        {list.map((item) => {
          if (item.fork) {
            // dont show repositories that are forks
            return null
          }
          return <ConnectedListItem key={item.node_id} item={item} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const mapActionsToProps = {
  fetchList: fetchRepoList,
}

export default connect(mapStateToProps, mapActionsToProps)(List)
