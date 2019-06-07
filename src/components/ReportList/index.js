import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'

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


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  const latestReport = ownProps.reportData
  const { repoName } = ownProps

  return {
    repoName,
    reportList: [
      latestReport,
    ],
  }
}

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(ReportList)
