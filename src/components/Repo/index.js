import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Spinner,
  Container,
  Jumbotron,
} from 'reactstrap'

import { REPORT_EXIST, REPORT_NOT_FETCHED_YET, REPO_COMPONENT_CLASS_NAME } from '../../constants'
import { ReportList } from '../ReportList'
import { fetchRepo } from '../../actions/fetchRepo'
import { has, getUpdateString } from '../../utilities'
import { Badge } from '../Badge'
import { DetailTable } from '../DetailTable'
import { DetailTableEntry as Dte } from '../DetailTableEntry'
import { GroupSpacer } from '../GroupSpacer'
import { fetchReport } from '../../actions/fetchRepoReport'

const reportTitles = {
  1: <h3>This repository has not been configured to generate build reports</h3>,
  2: <Spinner color="dark" />,
  3: <h3>Build Reports</h3>,
}

export class Repo extends Component {
  componentDidMount() {
    const {
      noDataYet,
      getRepo,
      getRepoReport,
      repo,
      reportStatus,
    } = this.props

    const { name } = repo

    if (noDataYet) {
      getRepo(name)
    }
    if (reportStatus === REPORT_NOT_FETCHED_YET) {
      getRepoReport(name)
    }
  }

  render() {
    const { repo, noDataYet, reportStatus, reportData, getRepoReport } = this.props

    if (noDataYet) {
      return (
        <Container className={`d-flex h-100 ${REPO_COMPONENT_CLASS_NAME}`}>
          <Spinner className="mx-auto d-block align-self-center" color="dark" />
        </Container>
      )
    }

    const {
      name,
      size,
      forks,
      language,
      license,
      description,
      pushed_at: updatedAt,
      created_at: createdAt,
      html_url: htmlUrl,
      stargazers_count: stars,
      open_issues: openIssues,
    } = repo

    // destructure the license object to get the name property, and rename
    // the name property to licenseName (since name is already defined above)
    // if license is null, destructure from { name: 'None :(' } instead
    const { name: licenseName } = license === null ? { name: 'None :(' } : license

    const updateStr = getUpdateString(updatedAt)
    const createStr = getUpdateString(createdAt)

    const badges = [
      <Badge key={`updated${updateStr}`} template="flat-square" textA="Last updated" textB={updateStr} />,
      <Badge key={`size${size}`} template="flat-square" textA="Size" textB={size} />,
    ]

    if (reportStatus === REPORT_EXIST) {
      const latestReport = reportData.latest.data
      latestReport.badges.forEach((badgeData) => {
        const badgeKeys = {
          textA: badgeData.text[0],
          textB: badgeData.text[1],
          ...badgeData,
        }

        badges.push(
          <Badge
            key={`${name}_report_${badgeKeys.textA}`}
            template="flat-square"
            {...badgeKeys}
          />,
        )
      })
    }

    const reportTitle = reportTitles[reportStatus]

    return (
      <div className={REPO_COMPONENT_CLASS_NAME}>
        <Jumbotron style={{ paddingTop: 0 }} className="bg-white">
          <div className="repo-main-info">
            <h2 className="display-3">{name}</h2>
            <GroupSpacer>
              {badges}
            </GroupSpacer>
            <br />
            <p className="text-muted font-italic">{`"${description}"`}</p>
            <a rel="noopener noreferrer" target="_blank" href={htmlUrl}>{htmlUrl}</a>
            <br />
            <br />
          </div>
          <DetailTable>
            <Dte label="Created">{createStr}</Dte>
            <Dte label="Language">{language}</Dte>
            <Dte label="License">{licenseName}</Dte>
            <Dte label="Forks">{forks}</Dte>
            <Dte label="Stars">{stars}</Dte>
            <Dte label="Open Issues">{openIssues}</Dte>
          </DetailTable>
          {reportTitle}
          <ReportList fetchReportCallback={getRepoReport} repoName={name} reportData={reportData} />
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const propObj = {
    repo: { ...state.repo },
    noDataYet: false,
  }
  if (!has.call(propObj.repo, 'name')) {
    propObj.repo.name = ownProps.match.params.name
    propObj.noDataYet = true
  }
  const repoName = propObj.repo.name
  const thisReport = state.reports[repoName]

  const reportStatus = thisReport ? thisReport.latest.reportStatus : REPORT_NOT_FETCHED_YET
  propObj.reportStatus = reportStatus

  if (reportStatus === REPORT_EXIST) {
    propObj.reportData = { ...thisReport }
  }


  return propObj
}

const mapActionsToProps = {
  getRepo: fetchRepo,
  getRepoReport: fetchReport,
}

export default connect(mapStateToProps, mapActionsToProps)(Repo)
