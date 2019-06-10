import React, { Component } from 'react'

import { ListGroup, ListGroupItem } from 'reactstrap'

import { ReportItem } from '../ReportItem'
import { REPORT_EXIST, REPORT_NOT_FETCHED_YET } from '../../constants'

const SHOW_BUILDS_MAX = 10

export class ReportList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBuildsMultiplier: 1,
    }

    this.loadMore = this.loadMore.bind(this)
  }

  loadMore() {
    this.setState((prevState) => {
      const tempState = prevState
      tempState.showBuildsMultiplier += 1
      return tempState
    })
  }

  render() {
    const { reportData, fetchReportCallback, repoName } = this.props

    const { showBuildsMultiplier } = this.state

    if (!reportData) return null

    const latest = reportData.latest.data
    const buildNumber = parseInt(latest.build_number, 10)

    const list = [
      <ReportItem
        isLatest
        reportStatus={REPORT_EXIST}
        data={latest}
        repoName={repoName}
        buildNumber={buildNumber}
        fetchReportCallback={fetchReportCallback}
      />,
    ]

    let stopAt = buildNumber - (SHOW_BUILDS_MAX * showBuildsMultiplier)
    if (stopAt < 0) stopAt = 0

    for (let i = buildNumber - 1; i > stopAt; i -= 1) {
      const dataObj = reportData[i] ? reportData[i].data : undefined
      const status = reportData[i] ? reportData[i].reportStatus : REPORT_NOT_FETCHED_YET

      list.push(
        <ReportItem
          reportStatus={status}
          data={dataObj}
          repoName={repoName}
          buildNumber={i}
          fetchReportCallback={fetchReportCallback}
        />,
      )
    }

    // this is a button that loads more report items
    list.push(
      <ListGroup onClick={this.loadMore}>
        <ListGroupItem action active className="text-center">
          Load More
        </ListGroupItem>
      </ListGroup>,
    )

    return (
      <div>
        {list}
      </div>
    )
  }
}


export default ReportList
