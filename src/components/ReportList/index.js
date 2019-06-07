import React from 'react'

import { ReportItem } from '../ReportItem'

const SHOW_BUILDS_MAX = 10

export function ReportList(props) {
  const { reportData, fetchReportCallback, repoName } = props

  if (!reportData) return null

  const latest = reportData[0]
  const buildNumber = parseInt(latest.build_number, 10)

  const list = [
    <ReportItem isLatest data={latest} repoName={repoName} buildNumber={buildNumber} fetchReportCallback={fetchReportCallback} />,
  ]

  const latestNumber = parseInt(latest.build_number, 10)
  let stopAt = latestNumber - SHOW_BUILDS_MAX
  if (stopAt < 0) stopAt = 0

  for (let i = latestNumber - 1; i > stopAt; i -= 1) {
    list.push(
      <ReportItem data={reportData[i]} repoName={repoName} buildNumber={i} fetchReportCallback={fetchReportCallback} />,
    )
  }


  // for (let i = 1; i < reportData.length; i += 1) {
  // }

  return (
    <div>
      {list}
    </div>
  )
}

export default ReportList
