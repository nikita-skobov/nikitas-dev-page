import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import { connect } from 'react-redux'

import { fetchRepoList } from '../../actions/fetchRepoList'
import ListItem from '../ListItem'

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
        <div>
          Unable to load list
        </div>
      )
    }

    if (list.length === 0) {
      return (
        <Spinner color="dark" />
      )
    }

    return (
      <div>
        {list.map((item) => {
          if (item.fork) {
            // dont show repositories that are forks
            return null
          }
          return <ListItem key={item.node_id} {...item} />
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
