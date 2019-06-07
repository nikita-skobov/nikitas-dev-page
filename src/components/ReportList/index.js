import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'

const reportTitles = {
  1: <h3>This repository has not been configured to generate build reports</h3>,
  2: <Spinner color="dark" />,
  3: <h3>Build Reports</h3>,
}

export class ReportList extends Component {
  render() {
    const { repoName, reportEnum } = this.props
    const reportTitle = reportTitles[reportEnum]


    return (
      <div>
        {reportTitle}
        <ListGroup>
          <ListGroupItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 8 8">
              <path d="M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" transform="translate(1)" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 8 8">
              <path d="M1.5 0l-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5-2.5-2.5z" transform="translate(0 1)" />
            </svg>
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  const latestReport = ownProps.reportData
  const { repoName } = ownProps

  // TODO: implement failed to fetch on report reducer
  // if failed to fetch it wont try to fetch again until page is refreshed
  // const failedToFetch = state.reports[ownProps.name].failedToFetch
  const failedToFetch = false

  let reportEnum = 2 // stilll fetching
  if (typeof latestReport === 'object') {
    reportEnum = 3 // report fetched and exists
  } else if (failedToFetch) {
    reportEnum = 1 // report doesnt exist for this repo
  }

  return {
    reportEnum,
    repoName,
    reportList: [
      latestReport,
    ],
  }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ReportList)
