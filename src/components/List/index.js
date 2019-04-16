import React, { Component } from 'react'
import { Card, CardText, CardBody, Spinner } from 'reactstrap'
import { connect } from 'react-redux'

import { fetchRepoList } from '../../actions/fetchRepoList'

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
        {list.map(item => (
          <div>
            {item.name}
          </div>
        ))}
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
