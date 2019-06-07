import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem } from 'reactstrap'


export class ReportList extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem>dsadsa</ListGroupItem>
      </ListGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const latestReport = ownProps.reportData
  const { repoName } = ownProps

  // TODO: implement failed to fetch on report reducer
  // if failed to fetch it wont try to fetch again until page is refreshed
  // const failedToFetch = state.reports[ownProps.name].failedToFetch
  const failedToFetch = false

  let hasReportEnum = 0 // stilll fetching
  if (typeof latestReport === 'object') {
    hasReportEnum = 1 // report fetched and exists
  } else if (failedToFetch) {
    hasReportEnum = -1 // report doesnt exist for this repo
  }

  return {
    hasReportEnum,
    repoName,
    reportList: [
      latestReport,
    ],
  }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ReportList)
