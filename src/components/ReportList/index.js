import React from 'react'

import { ListGroup, ListGroupItem } from 'reactstrap'

import { ReportItem } from '../ReportItem'
import { REPORT_EXIST, REPORT_NOT_FETCHED_YET } from '../../constants'

const SHOW_BUILDS_MAX = 10

export function ReportList(props) {
  const { reportData, fetchReportCallback, repoName } = props

  if (!reportData) return null

  const latest = reportData.latest.data
  const buildNumber = parseInt(latest.build_number, 10)

  const list = [
    <ReportItem isLatest reportStatus={REPORT_EXIST} data={latest} repoName={repoName} buildNumber={buildNumber} fetchReportCallback={fetchReportCallback} />,
  ]

  let stopAt = buildNumber - SHOW_BUILDS_MAX
  if (stopAt < 0) stopAt = 0

  for (let i = buildNumber - 1; i > stopAt; i -= 1) {
    const dataObj = reportData[i] ? reportData[i].data : undefined
    const status = reportData[i] ? reportData[i].reportStatus : REPORT_NOT_FETCHED_YET

    list.push(
      <ReportItem reportStatus={status} data={dataObj} repoName={repoName} buildNumber={i} fetchReportCallback={fetchReportCallback} />,
    )
  }

  // this is a button that loads more report items
  list.push(
    <ListGroup>
      <ListGroupItem action disabled active>
        Load More
      </ListGroupItem>
    </ListGroup>
  )

  return (
    <div>
      {list}
    </div>
  )
}

export default ReportList
