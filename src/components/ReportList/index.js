import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'

import { ReportItem } from '../ReportItem'

const reportTitles = {
  1: <h3>This repository has not been configured to generate build reports</h3>,
  2: <Spinner color="dark" />,
  3: <h3>Build Reports</h3>,
}

const SHOW_BUILDS_MAX = 10

export class ReportList extends Component {
  render() {
    const { repoName, reportEnum, reportList } = this.props
    const reportTitle = reportTitles[reportEnum]

    const latest = reportList[0]

    if (!latest) {
      // report doesnt exist,  or not fetched yet
      return (
        <div>
          {reportTitle}
        </div>
      )
    }

    // eslint-disable-next-line
    const latestNumber = parseInt(latest.build_number, 10)

    const list = [
      <ReportItem isLatest data={latest} />,
    ]

    for (let i = latestNumber - 1; i > (latestNumber - SHOW_BUILDS_MAX); i -= 1) {
      list.push(
        <ReportItem data={reportList[i]} />,
      )
    }

    return (
      <div>
        {reportTitle}
        {list}
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
