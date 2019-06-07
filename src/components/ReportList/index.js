import React from 'react'

import { ReportItem } from '../ReportItem'

const SHOW_BUILDS_MAX = 10

export function ReportList(props) {
  const { reportData } = props

  if (!reportData) return null

  const latest = reportData[0]

  const list = [
    <ReportItem isLatest data={latest} />,
  ]


  for (let i = 1; i < reportData.length; i += 1) {
    list.push(
      <ReportItem data={reportData[i]} />,
    )
  }

  return (
    <div>
      {list}
    </div>
  )
}

export default ReportList
