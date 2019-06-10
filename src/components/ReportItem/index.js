import React, { Component } from 'react'

import { ListGroup, ListGroupItem, Collapse, Spinner } from 'reactstrap'

import { REPORT_NOT_EXIST, REPORT_NOT_FETCHED_YET } from '../../constants'
import { getDurationString } from '../../utilities'

import './style.css'


function Arrow(props) {
  const { collapseOpen } = props
  if (collapseOpen) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 8 8">
        <path d="M1.5 0l-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5-2.5-2.5z" transform="translate(0 1)" />
      </svg>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 8 8">
      <path d="M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" transform="translate(1)" />
    </svg>
  )
}

function Stages(props) {
  const { stageData } = props
  if (!stageData) return null

  const stageList = []
  stageData.forEach((stage) => {
    stageList.push(
      <li>
        {stage.name}: {getDurationString({ duration: stage.duration, unitsToShow: 2, seperator: ' ' })}
      </li>,
    )
  })

  return (
    <div>
      <h5>Stages: </h5>
      <ul>
        {stageList}
      </ul>
    </div>
  )
}

function BuildInfo(props) {
  const { data, reportStatus, repoName } = props
  if (reportStatus === REPORT_NOT_FETCHED_YET) {
    return (
      <ListGroupItem>
        <Spinner color="dark" />
      </ListGroupItem>
    )
  }

  if (reportStatus === REPORT_NOT_EXIST) {
    return (
      <ListGroupItem className="ns-list-group-outline">
        <ul>
          <li>This report failed to load</li>
        </ul>
      </ListGroupItem>
    )
  }

  const shortCommit = data.current_commit.substr(0, 7)
  const commitUrl = `https://github.com/nikita-skobov/${repoName}/commit/${data.current_commit}`
  const durationString = getDurationString({ duration: data.duration * 1000, unitsToShow: 2, seperator: ' ' })
  // data.duration is in seconds, getDurationString needs milliseconds

  return (
    <ListGroupItem className="ns-list-group-outline">
      <ul>
        <li>Status: {data.status}</li>
        <li>Finished: {new Date(data.time_ended * 1000).toDateString()}</li>
        <li>Branch: {data.branch}</li>
        <li>Commit: <a target="_blank" rel="noopener noreferrer" href={commitUrl}>{shortCommit}</a></li>
        <li>commits since previous build: {data.num_commits}</li>
        <li>Duration: {durationString}</li>
      </ul>
      <Stages stageData={data.stages} />
    </ListGroupItem>
  )
}

export class ReportItem extends Component {
  constructor(props) {
    super(props)

    const { isLatest } = props

    this.state = {
      // if on the latest build report, have it open by default
      // otherwise keep the report items closed
      collapseOpen: isLatest,
      haveFetched: false,
    }

    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  toggleCollapse() {
    const {
      data,
      fetchReportCallback,
      repoName,
      buildNumber,
    } = this.props

    this.setState((prevState) => {
      const tempState = prevState

      let { collapseOpen, haveFetched } = prevState

      if (!data && !haveFetched) {
        haveFetched = true
        fetchReportCallback(repoName, `report_${buildNumber}.json`)
      }

      collapseOpen = !collapseOpen
      tempState.collapseOpen = collapseOpen
      tempState.haveFetched = haveFetched
      return tempState
    })
  }

  render() {
    const {
      isLatest,
      data,
      buildNumber,
      reportStatus,
      repoName,
    } = this.props

    const { collapseOpen } = this.state

    let buildNumberText = `Build Number ${buildNumber}`

    if (isLatest) {
      buildNumberText = `${buildNumberText} (latest)`
    }

    return [
      <ListGroup>
        <ListGroupItem className="ns-list-group-outline">
          <span onClick={this.toggleCollapse} style={{ marginRight: '1em' }}>
            <Arrow collapseOpen={collapseOpen} />
          </span>
          {buildNumberText}
        </ListGroupItem>
        <Collapse isOpen={collapseOpen}>
          <BuildInfo repoName={repoName} data={data} reportStatus={reportStatus} />
        </Collapse>
      </ListGroup>,
      <br />,
    ]
  }
}

export default ReportItem
